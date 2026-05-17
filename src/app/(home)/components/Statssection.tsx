"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  wordRevealContainerVariants,
  wordRevealVariants,
} from "@/lib/animations/variants";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  {
    value: 2.4,
    suffix: "B+",
    prefix: "$",
    label: "Transactions Processed",
    decimals: 1,
  },
  {
    value: 5,
    suffix: "+",
    prefix: "",
    label: "Supported Currencies",
    decimals: 0,
  },
  {
    value: 150,
    suffix: "+",
    prefix: "",
    label: "Countries Coverage",
    decimals: 0,
  },
  { value: 99, suffix: "%", prefix: "", label: "Uptime SLA", decimals: 0 },
];

const BADGES = ["CBN", "FINTRAC", "US MSB", "ISO 27001", "PCI DSS"];

const HEADING_WORDS = [
  "Trusted",
  "by",
  "Businesses",
  "Moving",
  "Money",
  "Across",
  "Borders",
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const badgeContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Animated counter hook ────────────────────────────────────────────────────

function useCountUp(target: number, decimals: number, isInView: boolean) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const duration = 1800; // ms
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      // ease out: slower near the end
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));

      if (current >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, target, decimals]);

  return count;
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({
  value,
  suffix,
  prefix,
  label,
  decimals,
  isInView,
}: {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  decimals: number;
  isInView: boolean;
}) {
  const count = useCountUp(value, decimals, isInView);

  return (
    <motion.div
      variants={cardVariants}
      style={{
        flex: "1 1 200px",
        background:
          "linear-gradient(180deg, rgba(245, 158, 11, 0.05) 0%, rgba(0, 0, 0, 0) 100%)",

        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        minWidth: 0,
      }}
      whileHover={{
        borderColor: "rgba(123, 92, 240, 0.35)",
        background: "rgba(123, 92, 240, 0.07)",
        y: -4,
        transition: { duration: 0.25 },
      }}
    >
      {/* Animated number */}
      <div
        style={{
          fontSize: "clamp(2.25rem, 4vw, 3rem)",
          fontWeight: 800,
          background: "linear-gradient(135deg, #7B5CF0, #60A5FA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          color: "#5044FE",
        }}
      >
        {prefix}
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
        {suffix}
      </div>

      {/* Label */}
      <div
        style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.875rem",
          fontWeight: 400,
          letterSpacing: "0.01em",
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

// ─── StatsSection ─────────────────────────────────────────────────────────────

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.3 });
  const badgesInView = useInView(badgesRef, { once: true, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0A0B0F",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(120px, 14vw, 112px) clamp(1rem, 5vw, 3rem) 5rem",
        }}
      >
        {/* ── Heading — word clip reveal ── */}
        <div ref={headingRef} style={{ marginBottom: "3.5rem" }}>
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
                }}
              >
                <motion.span
                  variants={wordRevealVariants}
                  style={{
                    display: "inline-block",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "clamp(1.75rem, 4vw, 3rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    paddingLeft: "5px",
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Stat cards ── */}
        <motion.div
          ref={cardsRef}
          style={{
            display: "flex",
            gap: "1.25rem",
            flexWrap: "wrap",
            marginBottom: "3.5rem",
          }}
          variants={cardContainerVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
        >
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} isInView={cardsInView} />
          ))}
        </motion.div>

        {/* ── Compliance badges ── */}
        <motion.div
          ref={badgesRef}
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          variants={badgeContainerVariants}
          initial="hidden"
          animate={badgesInView ? "visible" : "hidden"}
        >
          {BADGES.map((badge) => (
            <motion.div
              key={badge}
              variants={badgeVariants}
              whileHover={{
                borderColor: "rgba(123, 92, 240, 0.5)",
                background: "rgba(123, 92, 240, 0.08)",
                y: -2,
                transition: { duration: 0.2 },
              }}
              style={{
                padding: "0.625rem 1.5rem",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                cursor: "default",
              }}
            >
              {badge}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
