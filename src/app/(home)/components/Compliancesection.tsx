"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  wordRevealContainerVariants,
  wordRevealVariants,
} from "@/lib/animations/variants";

// ─── Data ─────────────────────────────────────────────────────────────────────

const JURISDICTIONS = [
  { flag: "🇳🇬", title: "CBN Licensed", subtitle: "Nigeria" },
  { flag: "🇨🇦", title: "FINTRAC Registered", subtitle: "Canada" },
  { flag: "🇺🇸", title: "US MSB Compliant", subtitle: "United States" },
  { flag: "🌐", title: "ISO 27001 Aligned", subtitle: "Global" },
  { flag: "🔒", title: "PCI DSS Standards", subtitle: "Global" },
];

const INFRA_ITEMS = [
  "256-bit encryption",
  "Segregated customer funds",
  "Real-time transaction monitoring",
  "SOC 2 Type II (target)",
];

const DATA_ITEMS = [
  "GDPR Compliant",
  "NDPR Compliant (Nigeria)",
  "Privacy by Design",
  "No unauthorized data sharing",
];

const HEADING_WORDS = ["Your", "Security", "Is", "Our", "Foundation"];

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
      delay: 0.2,
    },
  },
};

const jurisdictionContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const jurisdictionCardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const dividerVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.1 + i * 0.1,
    },
  }),
};

const infraCardVariants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const dataCardVariants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const checklistContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};

const checklistItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Shield icon ──────────────────────────────────────────────────────────────

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1.5L2 3.5V7C2 10 4.5 12.5 7 13C9.5 12.5 12 10 12 7V3.5L7 1.5Z"
        stroke="#3A2DFF"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M5 7l1.5 1.5L9 5.5"
        stroke="#3A2DFF"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="3"
        y="6"
        width="8"
        height="6"
        rx="1.5"
        stroke="#A78BFA"
        strokeWidth="1.4"
      />
      <path
        d="M5 6V4.5a2 2 0 014 0V6"
        stroke="#A78BFA"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="7" cy="9" r="1" fill="#A78BFA" />
    </svg>
  );
}

// ─── SecurityCard ─────────────────────────────────────────────────────────────

function SecurityCard({
  title,
  items,
  icon,
  variants,
  inView,
}: {
  title: string;
  items: string[];
  icon: "shield" | "lock";
  variants: typeof infraCardVariants;
  inView: boolean;
}) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{
        borderColor: "rgba(123,92,240,0.35)",
        boxShadow: "0 16px 48px rgba(123,92,240,0.1)",
        transition: { duration: 0.25 },
      }}
      style={{
        flex: "1 1 280px",
        background: "#120F27",
        border: "1px solid rgba(37, 42, 51, 0.2)",
        borderRadius: "12px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <div
        style={{
          color: "#F7F6F6",
          fontWeight: 600,
          fontSize: "18px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>

      <motion.div
        variants={checklistContainerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}
      >
        {items.map((item) => (
          <motion.div
            key={item}
            variants={checklistItemVariants}
            style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
          >
            <div style={{ flexShrink: 0 }}>
              {icon === "shield" ? <ShieldIcon /> : <LockIcon />}
            </div>
            <span style={{ color: "#9CA3AF", fontSize: "14px" }}>{item}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── ComplianceSection ────────────────────────────────────────────────────────

export function ComplianceSection() {
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const jurisdictionRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const labelInView = useInView(labelRef, { once: true, amount: 0.8 });
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const subtextInView = useInView(subtextRef, { once: true, amount: 0.5 });
  const jurisdictionInView = useInView(jurisdictionRef, {
    once: true,
    amount: 0.3,
  });
  const securityInView = useInView(securityRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.8 });

  return (
    <section
      style={{ background: "#0A0B0F",  }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          padding: "clamp(120px, 14vw, 112px) clamp(1rem, 5vw, 3rem) 5rem",
        }}
      >
        {/* ── Label ── */}
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
          }}
        >
          <div
            style={{
              height: "1px",
              width: "40px",
              background: "#FFFFFF",
            }}
          />
          <span
            style={{
              color: "#fff",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
            }}
          >
            Compliance
          </span>
          <div
            style={{
              height: "1px",
              width: "40px",
              background: "#FFFFFF",
            }}
          />
        </motion.div>

        {/* ── Heading ── */}
        <div
          ref={headingRef}
          style={{ textAlign: "center", marginTop: "-1rem" }}
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
                  paddingLeft: "5px",
                }}
              >
                <motion.span
                  variants={wordRevealVariants}
                  style={{
                    display: "inline-block",
                    color: "#F7F6F6",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 5vw, 3.25rem)",
                    lineHeight: 1.1,
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
            color: "#9CA3AF",
            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
            lineHeight: 1.7,
            textAlign: "center",
            maxWidth: "520px",
            margin: "-1.5rem auto 0",
          }}
        >
          Built on bank-grade infrastructure with regulatory compliance at every
          layer.
        </motion.p>

        {/* ── Jurisdiction cards row ── */}
        <motion.div
          ref={jurisdictionRef}
          variants={jurisdictionContainerVariants}
          initial="hidden"
          animate={jurisdictionInView ? "visible" : "hidden"}
          style={{
            display: "flex",
            borderRadius: "16px",
            overflow: "hidden",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {JURISDICTIONS.map((j, i) => (
            <div key={j.title} style={{ display: "flex", flex: "1 1 160px" }}>
              {/* Vertical divider */}
              {i > 0 && (
                <motion.div
                  custom={i}
                  variants={dividerVariants}
                  initial="hidden"
                  animate={jurisdictionInView ? "visible" : "hidden"}
                  style={{
                    width: "1px",
                    background: "rgba(17, 19, 24, 0.5)",
                    transformOrigin: "top",
                    alignSelf: "stretch",
                  }}
                />
              )}

              {/* Card */}
              <motion.div
                variants={jurisdictionCardVariants}
                whileHover={{
                  background: "rgba(17, 19, 24, 0.5)",
                  transition: { duration: 0.2 },
                }}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.625rem",
                  padding: "1.75rem 1rem",
                  cursor: "default",
                  background: "rgba(17, 19, 24, 0.5)",
                  border: "1px solid rgba(37, 42, 51, 0.3)",
                  borderRadius: "12px",
                }}
              >
                <motion.span
                  whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                  style={{ fontSize: "1.75rem", display: "block" }}
                >
                  {j.flag}
                </motion.span>
                <div
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "14px",
                    textAlign: "center",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {j.title}
                </div>
                <div
                  style={{
                    color: "#6B7280",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {j.subtitle}
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* ── Security cards row ── */}
        <div
          ref={securityRef}
          style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}
        >
          <SecurityCard
            title="Infrastructure Security"
            items={INFRA_ITEMS}
            icon="shield"
            variants={infraCardVariants}
            inView={securityInView}
          />
          <SecurityCard
            title="Data Protection"
            items={DATA_ITEMS}
            icon="lock"
            variants={dataCardVariants}
            inView={securityInView}
          />
        </div>

        {/* ── CTA ── */}
        <motion.div
          ref={ctaRef}
          variants={ctaVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <motion.button
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "transparent",
              color: "white",
              fontWeight: 500,
              padding: "0.75rem 1.75rem",
              borderRadius: "10px",
              fontSize: "0.875rem",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "all 0.2s ease",
            }}
          >
            Learn About Our Security
            <motion.span style={{ display: "inline-block" }}>→</motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
