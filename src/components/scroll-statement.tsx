"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type Segment = { text: string; emphasis?: boolean };

const UNLIT = "#6e6960";
const LIT = "#ece6dc";
const LIT_ACCENT = "#c9a77c";

function Word({
  children,
  progress,
  range,
  emphasis,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  emphasis?: boolean;
}) {
  // Unlit words stay at >= 3:1 contrast on the dark background (large text, WCAG AA).
  const color = useTransform(progress, range, [UNLIT, emphasis ? LIT_ACCENT : LIT]);
  return (
    <motion.span style={{ color }} className={emphasis ? "italic" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

/** A large statement whose words light up one by one as it scrolls through the viewport. */
export function ScrollStatement({ segments, className }: { segments: readonly Segment[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  const words = segments.flatMap((segment) =>
    segment.text.split(" ").map((word) => ({ word, emphasis: segment.emphasis })),
  );
  const fullText = segments.map((s) => s.text).join(" ");

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden>
        {words.map(({ word, emphasis }, i) => (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            emphasis={emphasis}
          >
            {word}
          </Word>
        ))}
      </span>
    </p>
  );
}
