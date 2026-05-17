"use client";

import { Box, Flex, Text, Icon, Link } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiLinkedin, FiTwitter, FiMail, FiArrowUpRight } from "react-icons/fi";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3A2DFF" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path d="M14 2L26 10V18L14 26L2 18V10L14 2Z" fill="url(#logo-grad)" />
        <path
          d="M14 8L20 12V16L14 20L8 16V12L14 8Z"
          fill="rgba(255,255,255,0.3)"
        />
      </svg>
      <Link href="/">
        <span
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          Mondu
        </span>
      </Link>
    </div>
  );
}
const footerLinks = {
  Product: [
    "Business Accounts",
    "Cross-Border Payments",
    "Treasury Platform",
    "Pricing",
    "API Documentation",
  ],
  Company: ["About Us", "Careers", "Press Kit", "Contact", "Blog"],
  Resources: [
    "Help Center",
    "API Status",
    "Security",
    "Privacy Policy",
    "Terms of Service",
  ],
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    x: -12,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.15,
  });

  return (
    <Box
      bg="#070D1D"
      position="relative"
      overflow="hidden"
      pt={{ base: "5rem", md: "7rem" }}
      pb="2rem"
      px={{ base: "1.25rem", md: "2rem" }}
    >

      <MotionBox
        ref={ref}
        maxW="1280px"
        mx="auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        position="relative"
        zIndex={2}
      >
        {/* Top Grid */}
        <Box
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            md: "1.5fr repeat(3, 1fr)",
          }}
          gap={{ base: "3rem", md: "4rem" }}
          pb="4rem"
        >
          {/* Brand Section */}
          <MotionBox variants={itemVariants}>
            {/* Logo */}
            <Logo />

            {/* Description */}
            <Text color="#9CA3AF" lineHeight={1.9} maxW="320px" fontSize="14px">
              Cross-border payments that work. Built for businesses in emerging
              markets, ready for the world.
            </Text>

            {/* Social Icons */}
            <Flex gap="0.9rem" mt="2rem">
              {[FiLinkedin, FiTwitter, FiMail].map((IconComp, i) => (
                <MotionFlex
                  key={i}
                  whileHover={{
                    y: -4,
                    scale: 1.08,
                    borderColor: "rgba(168,85,247,0.4)",
                    background: "rgba(168,85,247,0.12)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  width="40px"
                  height="40px"
                  borderRadius="8px"
                  bg="rgba(26, 29, 36, 0.5)"
                  align="center"
                  justify="center"
                  cursor="pointer"
                  color="rgba(255,255,255,0.75)"
                  backdropFilter="blur(10px)"
                >
                  <Icon as={IconComp} boxSize={5} />
                </MotionFlex>
              ))}
            </Flex>
          </MotionBox>

          {/* Footer Columns */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <MotionBox key={title} variants={itemVariants}>
              <Text color="white" fontWeight={600} mb="1.5rem" fontSize="14px">
                {title}
              </Text>

              <Flex direction="column" gap="1rem">
                {links.map((link, i) => (
                  <MotionBox key={link} custom={i} variants={linkVariants}>
                    <Link
                      href="#"
                      _hover={{ textDecoration: "none"}}
                      role="group"
                    >
                      <Flex align="center" gap="0.4rem" width="fit-content">
                        <Text
                          color="#9CA3AF"
                          fontSize="14px"
                          transition="all 0.25s ease"
                          _groupHover={{
                            color: "white",
                          }}
                        >
                          {link}
                        </Text>

                        <MotionBox
                          initial={{ opacity: 0, x: -6 }}
                          whileHover={{ opacity: 1, x: 0 }}
                        >
                          <Icon
                            as={FiArrowUpRight}
                            color="#A855F7"
                            boxSize={3.5}
                          />
                        </MotionBox>
                      </Flex>
                    </Link>
                  </MotionBox>
                ))}
              </Flex>
            </MotionBox>
          ))}
        </Box>

        {/* Divider */}
        <MotionBox
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1 }}
          transformOrigin="left"
          borderTop="1px solid rgba(255,255,255,0.06)"
        />

        {/* Bottom Row */}
        <MotionFlex
          variants={itemVariants}
          pt="1.8rem"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap="1rem"
        >
          <Text color="#6B7280" fontSize="12px">
            © {new Date().getFullYear()} Mondu Financial Technologies. All
            rights reserved.
          </Text>

          <Flex gap="1.5rem" wrap="wrap">
            {["Privacy Policy", "Terms of Service", "Security"].map((item) => (
              <Link
                key={item}
                href="#"
                color="#6B7280"
                fontSize="12px"
                transition="all 0.25s ease"
                _hover={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {item}
              </Link>
            ))}
          </Flex>
        </MotionFlex>
      </MotionBox>
    </Box>
  );
}
