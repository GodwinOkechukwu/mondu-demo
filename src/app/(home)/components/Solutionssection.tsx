"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  wordRevealContainerVariants,
  wordRevealVariants,
} from "@/lib/animations/variants";
import { Text } from "@chakra-ui/react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOLUTIONS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M6 8l-4 3 4 3M16 8l4 3-4 3M13 5l-4 12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Direct API Integration",
    description:
      "Full control via RESTful APIs. Build custom payment flows directly into your platform.",
    bestFor: "Fintechs, platforms, large enterprises",
    cta: "View API Docs",
    href: "#",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect
          x="2"
          y="5"
          width="18"
          height="13"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M2 9h18M6 13h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Hosted Checkout",
    description:
      "Pre-built, optimized payment pages. Start accepting payments in minutes, not months.",
    bestFor: "E-commerce, SaaS, marketplaces",
    cta: "See Demo",
    href: "#",
    featured: true, // slightly elevated
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Payment Links",
    description:
      "No-code payment collection. Create and share links via email, WhatsApp, or SMS.",
    bestFor: "Freelancers, agencies, B2B services",
    cta: "Try It Free",
    href: "#",
  },
];

const HEADING_WORDS = ["Built", "How", "You", "Work"];

// ─── Variants ─────────────────────────────────────────────────────────────────

const labelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const subtextVariants = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 12 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.3,
    },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

// 3D tilt entrance
const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── SolutionCard ─────────────────────────────────────────────────────────────

function SolutionCard({
  icon,
  title,
  description,
  bestFor,
  cta,
  href,
  featured,
}: (typeof SOLUTIONS)[0]) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        borderColor: "rgba(123, 92, 240, 0.45)",
        boxShadow: "0 20px 60px rgba(123, 92, 240, 0.15)",
        transition: { duration: 0.25 },
      }}
      style={{
        flex: "1 1 280px",
        background: "rgba(30, 41, 69, 0.5)",
        border: "1px solid rgba(37, 42, 51, 0.3)",
        borderRadius: "12px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        cursor: "default",
        // Middle card elevated
        marginTop: featured ? "-12px" : "0",
        marginBottom: featured ? "-12px" : "0",
        position: "relative" as const,
      }}
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "rgba(244, 247, 255, 0.1)",
          border: "1px solid rgba(230, 233, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(167, 139, 250, 1)",
          flexShrink: 0,
        }}
      >
        {icon}
      </motion.div>

      {/* Title */}
      <div
        style={{
          color: "#F7F6F6",
          fontWeight: 700,
          fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          color: "#9CA3AF",
          fontSize: "0.9rem",
          lineHeight: 1.7,
          flexGrow: 1,
        }}
      >
        {description}
      </div>

      {/* Best for chip */}
      <div
        style={{
          background: "#120D2E",
          padding: "0.875rem 1rem",
        }}
      >
        <div
          style={{
            color: "#6B7280",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "0.35rem",
          }}
        >
          Best for
        </div>
        <div
          style={{
            color: "#D1D5DB",
            fontSize: "0.875rem",
            fontWeight: 400,
          }}
        >
          {bestFor}
        </div>
      </div>

      {/* CTA link */}
      <motion.a
        href={href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          color: "#A78BFA",
          fontSize: "0.875rem",
          fontWeight: 500,
          textDecoration: "none",
          width: "fit-content",
        }}
        whileHover="hover"
        initial="rest"
      >
        {cta}
        <motion.span
          variants={{
            rest: { x: 0 },
            hover: {
              x: 5,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          style={{ display: "inline-block" }}
        >
          →
        </motion.span>
      </motion.a>
    </motion.div>
  );
}

// ─── SolutionsSection ─────────────────────────────────────────────────────────

export function SolutionsSection() {
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const labelInView = useInView(labelRef, { once: true, amount: 0.8 });
  const headingInView = useInView(headingRef, { once: true, amount: 0.6 });
  const subtextInView = useInView(subtextRef, { once: true, amount: 0.6 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  return (
    <section
      style={{
        background: "#120F27",
        perspective: "1200px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(120px, 14vw, 112px) clamp(1rem, 5vw, 3rem) 5rem",
        }}
      >
        {/* ── Section label ── */}
        <motion.div
          ref={labelRef}
          variants={labelVariants}
          initial="hidden"
          animate={labelInView ? "visible" : "hidden"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              height: "1px",
              width: "40px",
              background: "rgba(123,92,240,0.6)",
            }}
          />
          <span
            style={{
              color: "#A78BFA",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
            }}
          >
            Solutions
          </span>
          <div
            style={{
              height: "1px",
              width: "40px",
              background: "rgba(123,92,240,0.6)",
            }}
          />
        </motion.div>

        {/* ── Heading ── */}
        <div
          ref={headingRef}
          style={{ marginBottom: "1.25rem", textAlign: "center" }}
        >
          <motion.div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.3em",
              justifyContent: "center",
            }}
            variants={wordRevealContainerVariants}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
          >
            {HEADING_WORDS.map((word) => (
              <span
                key={word}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  paddingBottom: "0.06em",
                  color: "#F7F6F6",
                }}
              >
                <motion.span
                  variants={wordRevealVariants}
                  style={{
                    display: "inline-block",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    lineHeight: 1.1,
                    paddingLeft: "5px",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Subtext ── */}
        <motion.p
          ref={subtextRef}
          variants={subtextVariants}
          initial="hidden"
          animate={subtextInView ? "visible" : "hidden"}
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
            lineHeight: 1.7,
            textAlign: "center",
            maxWidth: "560px",
            margin: "0 auto 4rem",
          }}
        >
          Whether you're a growing exporter or a global marketplace, we have the
          right integration for your business.
        </motion.p>

        {/* ── Cards ── */}
        <motion.div
          ref={cardsRef}
          variants={cardContainerVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          style={{
            display: "flex",
            gap: "1.25rem",
            flexWrap: "wrap",
            alignItems: "stretch",
          }}
        >
          {SOLUTIONS.map((solution) => (
            <SolutionCard key={solution.title} {...solution} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
