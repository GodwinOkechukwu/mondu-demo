"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  useDisclosure,
  Link,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  navbarVariants,
  navLinksContainerVariants,
  navLinkVariants,
} from "@/lib/animations/variants";
import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Compliance", href: "/compliance" },
  { label: "Contact", href: "/contact" },
];

// ─── Mobile menu animation variants ──────────────────────────────────────────

const mobileMenuVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Container that staggers the links inside the mobile menu
const mobileLinkContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1, // slight delay after the menu panel opens
    },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

// Each individual mobile link
const mobileLinkVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.2 },
  },
};

// Mobile action buttons fade up after links
const mobileActionsVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.0, 0.0, 0.58, 1.0] as const,
      delay: 0.55,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};
// ─── Logo ─────────────────────────────────────────────────────────────────────

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

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const { open, onToggle } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(5, 5, 20, 0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}
      variants={navbarVariants}
      initial="hidden"
      animate={controls}
    >
      <Flex
        maxW="1280px"
        mx="auto"
        px={{ base: 4, md: 8, lg: 12 }}
        py={4}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Logo />

        {/* Desktop nav links */}
        <motion.ul
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="desktop-nav"
          variants={navLinksContainerVariants}
          initial="hidden"
          animate={controls}
        >
          {NAV_LINKS.map((link) => (
            <motion.li key={link.label} variants={navLinkVariants}>
              <Link
                href={link.href}
                fontSize="sm"
                color="#D1D5DB"
                fontWeight="400"
                letterSpacing="0.01em"
                _hover={{ color: "#3A2DFF", textDecoration: "none" }}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Desktop right actions */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
          className="desktop-actions"
          variants={navLinksContainerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.span variants={navLinkVariants}>
            <Button
              variant="ghost"
              color="#D1D5DB"
              fontSize="sm"
              fontWeight="400"
              _hover={{
                background: "transparent",
                color: "#fff",
                transform: "translateY(-2px)",
                borderColor: "rgba(255,255,255,0.3)",
              }}
            >
              Login
            </Button>
          </motion.span>

          <motion.span variants={navLinkVariants}>
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
              Get Started
            </Button>
          </motion.span>
        </motion.div>

        {/* Mobile hamburger */}
        <IconButton
          display={{ base: "flex", lg: "none" }}
          aria-label="Toggle menu"
          onClick={onToggle}
          variant="ghost"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
        >
          {open ? <IoCloseOutline size={20} /> : <RxHamburgerMenu size={20} />}
        </IconButton>
      </Flex>

      {/* ── Mobile menu ── */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ overflow: "hidden" }}
          >
            <Box
              bg="rgba(5, 5, 20, 0.96)"
              backdropFilter="blur(16px)"
              borderTop="1px solid rgba(255,255,255,0.06)"
              px={6}
              py={6}
            >
              {/* Staggered nav links */}
              <motion.div
                variants={mobileLinkContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <VStack align="start" gap={0}>
                  {NAV_LINKS.map((link) => (
                    <motion.div
                      key={link.label}
                      variants={mobileLinkVariants}
                      style={{ width: "100%" }}
                    >
                      <Link
                        href={link.href}
                        display="block"
                        py={3}
                        fontSize="md"
                        color="whiteAlpha.800"
                        fontWeight="400"
                        borderBottom="1px solid rgba(255,255,255,0.05)"
                        _hover={{
                          color: "white",
                          textDecoration: "none",
                          pl: 2,
                        }}
                        onClick={onToggle}
                        style={{ transition: "all 0.2s" }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </VStack>

                {/* Action buttons fade up after links */}
                <motion.div
                  variants={mobileActionsVariants}
                  style={{ marginTop: "1.5rem" }}
                >
                  <VStack align="stretch" gap={3}>
                    <Button
                      variant="ghost"
                      color="#D1D5DB"
                      fontSize="sm"
                      fontWeight="400"
                      border={"1px solid rgba(255,255,255,0.1)"}
                      _hover={{
                        background: "transparent",
                        color: "#fff",
                        transform: "translateY(-2px)",
                        borderColor: "rgba(255,255,255,0.3)",
                      }}
                    >
                      Login
                    </Button>
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
                      Get Started
                    </Button>
                  </VStack>
                </motion.div>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide desktop nav on mobile via CSS */}
      <style>{`
        @media (max-width: 991px) {
          .desktop-nav, .desktop-actions { display: none !important; }
        }
        @media (min-width: 992px) {
          .desktop-nav, .desktop-actions { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
