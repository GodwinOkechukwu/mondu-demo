"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  wordRevealContainerVariants,
  wordRevealVariants,
} from "@/lib/animations/variants";
import { Button } from "@chakra-ui/react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const HEADING_WORDS = [
  "Ready",
  "to",
  "Simplify",
  "Your",
  "Cross-Border",
  "Payments?",
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const bannerVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 32 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
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

const btnContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};

const btnVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── CTASection ───────────────────────────────────────────────────────────────

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, rgba(122,160,242,1) 0%, rgba(18,20,25,1) 50%, rgba(167,139,250,1) 100%)",
        
      }}
    >
      <motion.div
        ref={sectionRef}
        variants={bannerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          overflow: "hidden",
          position: "relative",
          padding: "clamp(120px, 14vw, 112px) clamp(1rem, 5vw, 3rem) 5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "1.5rem",
          minHeight: "300px",
        }}
      >
        {/* ── Animated gradient overlay — slow hue drift ── */}
        <motion.div
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        />

        {/* ── Floating orb 1 — top left ── */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-60px",
            left: "-40px",
            width: "280px",
            height: "280px",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        {/* ── Content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            width: "100%",
          }}
        >
          {/* Heading */}
          <motion.div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.3em",
              justifyContent: "center",
            }}
            variants={wordRevealContainerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
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
                    color: "#F7F6F6",
                    fontWeight: 700,
                    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.025em",
                    textShadow: "0 2px 20px rgba(0,0,0,0.3)",
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
            animate={inView ? "visible" : "hidden"}
            style={{
              color: "#9CA3AF",
              fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
              lineHeight: 1.7,
              maxWidth: "440px",
              margin: 0,
              textShadow: "0 1px 8px rgba(0,0,0,0.2)",
            }}
          >
            Join businesses already using Mondu to move money faster, smarter,
            and more affordably across borders.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={btnContainerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <motion.div variants={btnVariants}>
              <Button
                bg="#3A2DFF"
                color="white"
                fontSize="sm"
                fontWeight="600"
                px={6}
                h="40px"
                borderRadius="6px"
                _hover={{
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s ease"
              >
                Create Free Account
              </Button>
            </motion.div>

            <motion.div variants={btnVariants}>
              <Button
                bg="transparent"
                border="1px solid #252A33"
                color="white"
                fontSize="sm"
                fontWeight="600"
                px={6}
                h="40px"
                borderRadius="6px"
                _hover={{
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s ease"
              >
                Talk to Our Team
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
