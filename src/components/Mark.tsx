/**
 * The open triangle from Karin's own logo, redrawn as a clean vector.
 * Legs only, open at the base with small feet, and a gap where the
 * logo's name bar crosses. DEMO concept, not the official logo file.
 */
type MarkProps = {
  color?: string;
  bar?: string | null;
  strokeWidth?: number;
  className?: string;
  title?: string;
};

export const MARK_PATHS = {
  upper: "M25.3 48 L50 4 L74.7 48",
  lowerLeft: "M17.46 62 L4 86 L30 86",
  lowerRight: "M82.54 62 L96 86 L70 86",
};

export function Mark({ color = "currentColor", bar = null, strokeWidth = 9, className, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 90"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinejoin="miter" strokeLinecap="butt">
        <path d={MARK_PATHS.upper} />
        <path d={MARK_PATHS.lowerLeft} />
        <path d={MARK_PATHS.lowerRight} />
      </g>
      {bar ? <rect x="2" y="50.5" width="96" height="9" fill={bar} /> : null}
    </svg>
  );
}
