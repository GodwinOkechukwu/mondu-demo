"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  wordRevealContainerVariants,
  wordRevealVariants,
} from "@/lib/animations/variants";

// ─── Code content ─────────────────────────────────────────────────────────────

type CodeToken = { text: string; color: string };
type CodeLine = CodeToken[];

const CODE_LINES: CodeLine[] = [
  [{ text: "// Initialize a cross-border payment", color: "#6b7a8d" }],
  [
    { text: "const ", color: "#c792ea" },
    { text: "payment", color: "#82aaff" },
    { text: " = await ", color: "#89ddff" },
    { text: "mondu", color: "#ffcb6b" },
    { text: ".payments.", color: "#89ddff" },
    { text: "create", color: "#82aaff" },
    { text: "({", color: "#ffffff" },
  ],
  [
    { text: "  amount: ", color: "#ffffff" },
    { text: "5000", color: "#f78c6c" },
    { text: ",", color: "#ffffff" },
  ],
  [
    { text: "  currency: ", color: "#ffffff" },
    { text: "'USD'", color: "#c3e88d" },
    { text: ",", color: "#ffffff" },
  ],
  [{ text: "  destination: {", color: "#ffffff" }],
  [
    { text: "    country: ", color: "#ffffff" },
    { text: "'NG'", color: "#c3e88d" },
    { text: ",", color: "#ffffff" },
  ],
  [
    { text: "    currency: ", color: "#ffffff" },
    { text: "'NGN'", color: "#c3e88d" },
  ],
  [{ text: "  }", color: "#ffffff" }],
  [{ text: "});", color: "#ffffff" }],
  [{ text: "", color: "" }],
  [{ text: "// Webhook response on completion", color: "#6b7a8d" }],
  [{ text: "{", color: "#ffffff" }],
  [
    { text: '  "event"', color: "#c3e88d" },
    { text: ": ", color: "#ffffff" },
    { text: '"payment.completed"', color: "#c3e88d" },
    { text: ",", color: "#ffffff" },
  ],
  [
    { text: '  "data"', color: "#c3e88d" },
    { text: ": {", color: "#ffffff" },
  ],
  [
    { text: '    "paymentId"', color: "#c3e88d" },
    { text: ": ", color: "#ffffff" },
    { text: '"pay_abc123"', color: "#c3e88d" },
    { text: ",", color: "#ffffff" },
  ],
  [
    { text: '    "status"', color: "#c3e88d" },
    { text: ": ", color: "#ffffff" },
    { text: '"completed"', color: "#c3e88d" },
    { text: ",", color: "#ffffff" },
  ],
  [
    { text: '    "settledAmount"', color: "#c3e88d" },
    { text: ": ", color: "#ffffff" },
    { text: '"7,450,000.00"', color: "#c3e88d" },
    { text: ",", color: "#ffffff" },
  ],
  [
    { text: '    "settledCurrency"', color: "#c3e88d" },
    { text: ": ", color: "#ffffff" },
    { text: '"NGN"', color: "#c3e88d" },
  ],
  [{ text: "  }", color: "#ffffff" }],
  [{ text: "}", color: "#ffffff" }],
];

const FEATURES = [
  "RESTful API with predictable endpoints",
  "Sandbox environment for testing",
  "Webhooks for real-time updates",
  "24/7 developer support",
];

const HEADING_WORDS = [
  "Powerful",
  "APIs",
  "Developers",
  "Actually",
  "Want",
  "to",
  "Use",
];

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

const featureContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ctaContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.65 } },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const windowVariants = {
  hidden: { opacity: 0, x: 60, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.2,
    },
  },
};

// Code line wipe — each line reveals left→right
const codeLineVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.6 + i * 0.06,
    },
  }),
};

// ─── Blinking cursor ──────────────────────────────────────────────────────────

function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{
        display: "inline-block",
        width: "2px",
        height: "14px",
        background: "#7B5CF0",
        marginLeft: "2px",
        verticalAlign: "middle",
        borderRadius: "1px",
      }}
    />
  );
}

// ─── Code window ─────────────────────────────────────────────────────────────

function CodeWindow({ inView }: { inView: boolean }) {
  return (
    <motion.div
      variants={windowVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      // Slow infinite float
      style={{
        background: "#0f111a",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(123,92,240,0.1)",
        width: "100%",
        maxWidth: "560px",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.875rem 1rem",
          background: "#151728",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "6px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div
              key={c}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
        <span
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.75rem",
            marginLeft: "0.5rem",
            fontFamily: "monospace",
          }}
        >
          payment.js
        </span>
      </div>

      {/* Code body */}
      <div
        style={{
          padding: "1.25rem 1rem",
          fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
          fontSize: "0.8rem",
          lineHeight: 1.75,
          overflowX: "auto",
        }}
      >
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={codeLineVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              display: "flex",
              alignItems: "center",
              minHeight: "1.75em",
            }}
          >
            {/* Line number */}
            <span
              style={{
                color: "rgba(255,255,255,0.15)",
                width: "28px",
                flexShrink: 0,
                userSelect: "none",
                textAlign: "right",
                marginRight: "1rem",
                fontSize: "0.72rem",
              }}
            >
              {i + 1}
            </span>

            {/* Tokens */}
            <span>
              {line.map((token, j) => (
                <span key={j} style={{ color: token.color }}>
                  {token.text}
                </span>
              ))}
              {/* Blinking cursor on last line */}
              {i === CODE_LINES.length - 1 && inView && <Cursor />}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── DevelopersSection ────────────────────────────────────────────────────────

export function DevelopersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const leftInView = useInView(leftRef, { once: true, amount: 0.3 });
  const rightInView = useInView(rightRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#120F27",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          gap: "clamp(2rem, 6vw, 5rem)",
          padding: "clamp(120px, 14vw, 112px) clamp(1rem, 5vw, 3rem) 5rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* ── Left column ── */}
        <div
          ref={leftRef}
          style={{
            flex: "1 1 340px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Label */}
          <motion.div
            variants={labelVariants}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div
              style={{
                height: "1px",
                width: "32px",
                background: "#A78BFA",
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
              Developers
            </span>
            <div
              style={{
                height: "1px",
                width: "32px",
                background: "#A78BFA",
              }}
            />
          </motion.div>

          {/* Heading */}
          <motion.div
            style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
            variants={wordRevealContainerVariants}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
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
                    color: "whi#F7F6F6te",
                    fontWeight: 800,
                    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.025em",
                    paddingLeft: "5px",
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={subtextVariants}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            style={{
              color: "#9CA3AF",
              fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              lineHeight: 1.75,
              margin: 0,
              maxWidth: "440px",
            }}
          >
            Integrate cross-border payments into your platform with our RESTful
            APIs and comprehensive documentation.
          </motion.p>

          {/* Checklist */}
          <motion.div
            variants={featureContainerVariants}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f}
                variants={featureItemVariants}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "6px",
                    background: "rgba(20, 184, 166, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l2.5 2.5L10 3.5"
                      stroke="#a78bfa"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    color: "#D1D5DB",
                    fontSize: "14px",
                  }}
                >
                  {f}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={ctaContainerVariants}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <motion.div variants={ctaVariants}>
              <button
                style={{
                  background: "#A78BFA",
                  color: "white",
                  fontWeight: 600,
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                View API Reference
              </button>
            </motion.div>

            <motion.div variants={ctaVariants}>
              <button
                style={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 500,
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  border: "1px solid #252A33",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  transition:
                    "border-color 0.2s, background 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Read Documentation
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Right column — code window ── */}
        <div
          ref={rightRef}
          style={{
            flex: "1 1 420px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Floating wrapper */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "100%" }}
          >
            <CodeWindow inView={rightInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
