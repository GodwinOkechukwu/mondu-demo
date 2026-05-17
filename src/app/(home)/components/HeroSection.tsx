"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import {
  kenBurnsVariants,
  badgePillContainerVariants,
  badgePillVariants,
  blurFadeVariants,
  ctaContainerVariants,
  ctaButtonVariants,
  trustRowVariants,
} from "@/lib/animations/variants";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BADGES = [
  { icon: "⚡", label: "Fast" },
  { icon: "✓", label: "Secure" },
  { icon: "🌐", label: "Global" },
];

const FLAGS = [
  { emoji: "🇺🇸", label: "US" },
  { emoji: "🇳🇬", label: "Nigeria" },
  { emoji: "🇨🇦", label: "Canada" },
];

// ─── HeroSection ──────────────────────────────────────────────────────────────

export function HeroSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <motion.section
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#0A0B0F",
      }}
    >
      {/* ── Background — Ken Burns ── */}
      <motion.div
        style={{ position: "absolute", inset: 0 }}
        variants={kenBurnsVariants}
        initial="hidden"
        animate={controls}
      >
        <Image
          src="/images/herobg.webp"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center right" }}
        />
        {/* Gradient overlay — heavy left so text stays readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(4,4,15,0.92) 0%, rgba(4,4,15,0.70) 50%, rgba(4,4,15,0.25) 100%)",
          }}
        />
      </motion.div>

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(120px, 14vw, 160px) clamp(1rem, 5vw, 3rem) 5rem",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
            maxWidth: "660px",
            width: "100%",
          }}
        >
          {/* ── Badge pills ── */}
          <motion.div
            style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
            variants={badgePillContainerVariants}
            initial="hidden"
            animate={controls}
          >
            {BADGES.map((b) => (
              <motion.span
                key={b.label}
                variants={badgePillVariants}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.375rem 1rem",
                  borderRadius: "9999px",
                  background: "#1A1D24",
                  border: "1px solid #252A3380",
                  color: "#FBFDFF",
                  fontSize: "0.75rem",
                  letterSpacing: "0.04em",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <span>{b.icon}</span>
                {b.label}
              </motion.span>
            ))}
          </motion.div>

          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "flex-start", lg: "center" }}
            gap={{ base: 0, lg: 4 }}
            flexWrap="wrap"
          >
            <Text
              color="white"
              fontWeight="700"
              fontSize="clamp(2.5rem, 6vw, 4.5rem)"
              lineHeight="1.05"
              letterSpacing="-0.03em"
              mb={{ base: "0.5rem", lg: 0 }}
            >
              Cross-Border{" "}
              <Box as="span" color="#3A2DFF">
                Payment
              </Box>
            </Text>

            <Text
              color="white"
              fontWeight="700"
              fontSize="clamp(2.5rem, 6vw, 4.5rem)"
              lineHeight="1.05"
              letterSpacing="-0.03em"
            >
              That Works
            </Text>
          </Flex>

          {/* ── Subtext — blur fade ── */}
          <motion.p
            style={{
              color: "#9CA3AF",
              fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
              lineHeight: 1.75,
              maxWidth: "480px",
              margin: 0,
            }}
            variants={blurFadeVariants}
            initial="hidden"
            animate={controls}
          >
            Send, receive, and settle across borders with the speed and
            reliability emerging market businesses deserve. No friction. No
            delays. No excuses.
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
            variants={ctaContainerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div variants={ctaButtonVariants}>
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
                Open Account
              </Button>
            </motion.div>

            <motion.div variants={ctaButtonVariants}>
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
                Talk to sales
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Trust + flags ── */}
          <motion.div
            variants={trustRowVariants}
            initial="hidden"
            animate={controls}
          >
            <p
              style={{
                color: "#C3C7CD",
                fontSize: "12px",
                marginBottom: "0.75rem",
                letterSpacing: "0.02em",
                margin: "0 0 0.75rem 0",
              }}
            >
              Regulated in multiple jurisdictions. Your funds are always
              protected.
            </p>

            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              {FLAGS.map((f) => (
                <div
                  key={f.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  <span style={{ fontSize: "0.875rem" }}>{f.emoji}</span>
                  <span
                    style={{
                      color: "#9CA3AF",
                      fontSize: "0.75rem",
                    }}
                  >
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
