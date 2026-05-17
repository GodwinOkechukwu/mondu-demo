import { Variants } from "framer-motion";

// ─── Generic Fade ─────────────────────────────────────────────────────────────

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit:   { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

// ─── Directional Slide + Fade ─────────────────────────────────────────────────

export const slideVariants = {
  up: (distance = 32): Variants => ({
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit:   { opacity: 0, y: distance / 2, transition: { duration: 0.3 } },
  }),
  down: (distance = 32): Variants => ({
    hidden: { opacity: 0, y: -distance },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit:   { opacity: 0, y: -distance / 2, transition: { duration: 0.3 } },
  }),
  left: (distance = 32): Variants => ({
    hidden: { opacity: 0, x: distance },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit:   { opacity: 0, x: distance / 2, transition: { duration: 0.3 } },
  }),
  right: (distance = 32): Variants => ({
    hidden: { opacity: 0, x: -distance },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit:   { opacity: 0, x: -distance / 2, transition: { duration: 0.3 } },
  }),
};

// ─── Generic stagger container ────────────────────────────────────────────────

export const staggerContainerVariants = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

// ─── Scale ────────────────────────────────────────────────────────────────────

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

/** Whole navbar slides down from above */
export const navbarVariants: Variants = {
  hidden:  { y: -80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** Container that staggers individual nav links */
export const navLinksContainerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

/** Each nav link fades+slides down */
export const navLinkVariants: Variants = {
  hidden:  { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── HERO — badge pills ───────────────────────────────────────────────────────

export const badgePillContainerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
};

export const badgePillVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.78, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// ─── HERO — heading word-clip reveal ─────────────────────────────────────────
// Each word sits inside overflow:hidden so it clips during the slide-up.

export const wordRevealContainerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.8 } },
};

export const wordRevealVariants: Variants = {
  hidden:  { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// ─── HERO — subtext blur-fade ─────────────────────────────────────────────────

export const blurFadeVariants: Variants = {
  hidden:  { opacity: 0, filter: "blur(10px)", y: 18 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.75, ease: "easeOut", delay: 1.35 },
  },
};

// ─── HERO — CTA buttons ───────────────────────────────────────────────────────

export const ctaContainerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 1.55 } },
};

export const ctaButtonVariants: Variants = {
  hidden:  { opacity: 0, y: 26, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── HERO — trust + flags row ─────────────────────────────────────────────────

export const trustRowVariants: Variants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 1.9 } },
};

// ─── HERO — background Ken Burns ─────────────────────────────────────────────

export const kenBurnsVariants: Variants = {
  hidden:  { scale: 1.1, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 9, ease: "easeOut" } },
};