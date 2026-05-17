export type FadeDirection = "up" | "down" | "left" | "right" | "none";

export interface BaseAnimationProps {
  /** Delay before the animation starts (seconds) */
  delay?: number;
  /** Animation duration override (seconds) */
  duration?: number;
  /** Re-trigger animation each time the element enters the viewport */
  once?: boolean;
  /** Fraction of element visible before triggering (0–1) */
  threshold?: number;
}