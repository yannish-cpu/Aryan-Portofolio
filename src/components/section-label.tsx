type SectionLabelProps = {
  index: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
};

/** Small mono eyebrow row that opens each section: "(01) Selected work ......... 05" */
export function SectionLabel({ index, children, aside }: SectionLabelProps) {
  return (
    <div className="mb-10 flex items-baseline justify-between gap-6 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground lg:mb-14">
      <span>
        <span className="text-accent">({index})</span> {children}
      </span>
      {aside ? <span className="tabular-nums">{aside}</span> : null}
    </div>
  );
}
