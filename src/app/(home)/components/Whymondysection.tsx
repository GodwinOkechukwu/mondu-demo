"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  wordRevealContainerVariants,
  wordRevealVariants,
} from "@/lib/animations/variants";
import { IoMdRocket } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Box } from "@chakra-ui/react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <IoMdRocket />,
    title: "Built for Speed",
    description:
      "Settlements in hours, not days. Our optimized rails cut through traditional banking delays.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 2C10 2 6 6 6 10C6 14 10 18 10 18"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M10 2C10 2 14 6 14 10C14 14 10 18 10 18"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M2 10h16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Emerging Market Focus",
    description:
      "We understand the unique challenges of doing business in and with emerging markets.",
  },
  {
    icon: <BiSupport />,
    title: "Human Support",
    description: "Real people, real responses. No bots, no runarounds.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2L3 5.5V10C3 14 6.5 17.5 10 18C13.5 17.5 17 14 17 10V5.5L10 2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M7 10l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Compliance-First",
    description:
      "Bank-grade security with KYC, KYB, and transaction monitoring built in from day one.",
  },
  {
    icon: <RiMoneyDollarCircleLine />,
    title: "Transparent Pricing",
    description:
      "What you see is what you pay. No hidden fees, no surprise charges.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M6 8l-4 3 4 3M14 8l4 3-4 3M12 5l-4 10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Developer Friendly",
    description:
      "Clean APIs, sandbox environment, and documentation that actually makes sense.",
  },
];

const HEADING_WORDS = ["Why", "Businesses", "Choose", "Mondu"];

// ─── Variants ─────────────────────────────────────────────────────────────────

const labelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Diagonal stagger — each card gets a custom delay based on its row + col position
// index: 0=top-left → 5=bottom-right, delay increases diagonally
function getCardDelay(index: number): number {
  const col = index % 3;
  const row = Math.floor(index / 3);
  return (col + row) * 0.1; // diagonal wave
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -15 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: delay + 0.1,
    },
  }),
};

// ─── FeatureCard ──────────────────────────────────────────────────────────────

function FeatureCard({
  icon,
  title,
  description,
  delay,
  inView,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{
        y: -5,
        borderColor: "rgba(123, 92, 240, 0.4)",
        background: "rgba(123, 92, 240, 0.05)",
        transition: { duration: 0.22 },
      }}
      style={{
        background: "rgba(17, 19, 24, 0.4)",
        border: "1px solid rgba(37, 42, 51, 0.2)",
        borderRadius: "16px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        cursor: "default",
      }}
    >
      {/* Icon */}
      <motion.div
        custom={delay}
        variants={iconVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        whileHover={{
          scale: 1.12,
          background: "rgba(123,92,240,0.25)",
          transition: { duration: 0.2 },
        }}
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "12px",
          background: "rgba(123,92,240,0.15)",
          border: "1px solid rgba(123,92,240,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#a78bfa",
          flexShrink: 0,
        }}
      >
        {icon}
      </motion.div>

      {/* Title */}
      <div
        style={{
          color: "white",
          fontWeight: 700,
          fontSize: "1.05rem",
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.875rem",
          lineHeight: 1.7,
        }}
      >
        {description}
      </div>
    </motion.div>
  );
}

// ─── WhyMondySection ──────────────────────────────────────────────────────────

export function WhyMondySection() {
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const labelInView = useInView(labelRef, { once: true, amount: 0.8 });
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section
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
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              height: "1px",
              width: "40px",
              background: "#F7F6F6",
            }}
          />
          <span
            style={{
              color: "#F7F6F6",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
            }}
          >
            Why Mondu
          </span>
          <div
            style={{
              height: "1px",
              width: "40px",
              background: "#F7F6F6",
            }}
          />
        </motion.div>

        {/* ── Heading ── */}
        <div
          ref={headingRef}
          style={{ textAlign: "center", marginBottom: "4rem" }}
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
                }}
              >
                <motion.span
                  variants={wordRevealVariants}
                  style={{
                    display: "inline-block",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 5vw, 3.25rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                    paddingLeft: "5px",
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Feature grid ── */}
        <Box
          ref={gridRef}
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="1.25rem"
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={getCardDelay(index)}
              inView={gridInView}
            />
          ))}
        </Box>
      </div>
    </section>
  );
}
