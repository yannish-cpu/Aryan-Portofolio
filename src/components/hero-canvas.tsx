"use client";

import { useEffect, useRef } from "react";

/*
 * Animated topographic contour field, drawn with a tiny WebGL2 fragment shader.
 * Thin brass iso-lines drift slowly; a soft warm light follows the pointer.
 * - Pauses when off-screen or when the tab is hidden.
 * - Draws a single still frame for prefers-reduced-motion or software-only GL.
 * - Starts after load + idle, capped at 30 fps.
 * - Falls back to the CSS background of the parent if WebGL2 is unavailable.
 */

const VERTEX = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
out vec4 outColor;

// Integer hash on lattice points: exact on every GPU (float fract() hashes lose precision
// on some drivers and draw straight streaks across the field).
float hash(vec2 p) {
  uvec2 q = uvec2(ivec2(p) + 32768) * uvec2(1597334673u, 3812015801u);
  uint n = (q.x ^ q.y) * 1597334673u;
  return float(n) * (1.0 / 4294967295.0);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 m = (uPointer - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.035;

  vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 - t + 3.7));
  float d = length(p - m);
  float lift = 0.07 * exp(-d * d * 5.0);
  float h = fbm(p * 1.1 + q * 1.6 + vec2(t * 0.7, -t * 0.5)) + lift;

  float k = h * 22.0;
  float w = fwidth(k);
  float minor = 1.0 - smoothstep(0.0, w * 1.1, abs(fract(k + 0.5) - 0.5));
  float k5 = k / 5.0;
  float w5 = fwidth(k5);
  float major = 1.0 - smoothstep(0.0, w5 * 1.6, abs(fract(k5 + 0.5) - 0.5));

  float light = exp(-d * d * 2.2);
  vec3 ink = vec3(0.043, 0.039, 0.035);
  vec3 brass = vec3(0.79, 0.655, 0.486);
  vec3 cream = vec3(0.925, 0.902, 0.863);

  float intensity = minor * (0.10 + 0.55 * light) + major * (0.22 + 0.7 * light);
  vec3 col = ink + brass * intensity;
  col = mix(col, cream, major * light * 0.35);
  col += brass * 0.06 * light;

  vec2 uv = gl_FragCoord.xy / uRes;
  float vig = smoothstep(1.15, 0.35, length(uv - vec2(0.5, 0.55)));
  col = mix(ink, col, vig);

  outColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HeroCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPointer = gl.getUniformLocation(program, "uPointer");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Software GL (no GPU) makes a continuous shader expensive: show one still frame instead.
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)) : "";
    const softwareGl = /swiftshader|llvmpipe|software|basic render/i.test(renderer);
    const reduceMotion = prefersReducedMotion || softwareGl;
    const isSmallScreen = window.innerWidth < 768;
    const FRAME_INTERVAL = 1000 / 30;
    let width = 0;
    let height = 0;
    const target = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };

    const resize = () => {
      // Full-ish resolution keeps the thin contour lines smooth (lower values alias into dashes).
      const dpr = Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1 : 1.5);
      width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      if (target.x === 0 && target.y === 0) {
        target.x = pointer.x = width * 0.68;
        target.y = pointer.y = height * 0.55;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      target.x = (event.clientX - rect.left) * scaleX;
      target.y = (rect.bottom - event.clientY) * scaleY;
    };

    let frame = 0;
    let running = false;
    let started = false;
    let lastDraw = 0;
    const start = performance.now();

    const draw = (now: number) => {
      pointer.x += (target.x - pointer.x) * 0.06;
      pointer.y += (target.y - pointer.y) * 0.06;
      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, reduceMotion ? 12 : (now - start) / 1000);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (now - lastDraw >= FRAME_INTERVAL) {
        lastDraw = now;
        draw(now);
      }
      if (running) frame = requestAnimationFrame(loop);
    };

    const play = () => {
      if (running || reduceMotion || !started) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    draw(performance.now());
    canvas.dataset.ready = "true";

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && document.visibilityState === "visible") play();
      else pause();
    });
    visibility.observe(canvas);

    const onVisibilityChange = () => (document.visibilityState === "visible" ? play() : pause());

    // Start animating only once the page has loaded and the main thread is idle.
    let idleHandle = 0;
    const begin = () => {
      started = true;
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) play();
    };
    const scheduleStart = () => {
      // Safari has no requestIdleCallback; fall back to a short delay.
      const ric: typeof window.requestIdleCallback | undefined = window.requestIdleCallback;
      idleHandle = ric ? ric.call(window, begin, { timeout: 2500 }) : window.setTimeout(begin, 1200);
    };
    if (document.readyState === "complete") scheduleStart();
    else window.addEventListener("load", scheduleStart, { once: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!reduceMotion) window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      pause();
      window.removeEventListener("load", scheduleStart);
      const cic: typeof window.cancelIdleCallback | undefined = window.cancelIdleCallback;
      if (cic) cic.call(window, idleHandle);
      window.clearTimeout(idleHandle);
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`opacity-0 transition-opacity duration-[1500ms] data-[ready=true]:opacity-100 ${className ?? ""}`}
    />
  );
}
