type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, center, className = "" }: Props) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <div className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)] ${center ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-[color:var(--gold)]" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-[2.6rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
