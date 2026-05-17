"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  wordRevealContainerVariants,
  wordRevealVariants,
} from "@/lib/animations/variants";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    status: "LIVE",
    statusColor: "#22c55e",
    imageBg: "linear-gradient(135deg, #e8e8f0 0%, #c8c8e8 50%, #9090c8 100%)",
    imageContent: (
      <Image
        src="/images/map1.jpg"
        alt="Cross-Border Payments"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    ),
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.5" />
        <path
          d="M10 3v2M10 15v2M3 10h2M15 10h2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Cross-Border Payments",
    description:
      "Send money across borders with speed and transparency. Currently available over-the-counter with full platform launch coming soon.",
    features: [
      "US-Nigeria-Canada corridors",
      "Competitive FX",
      "Real-time tracking",
    ],
    cta: "Get Started",
    href: "#",
  },
  {
    status: null,
    statusColor: null,
    imageBg: "linear-gradient(135deg, #2d1060 0%, #4a1090 50%, #6020b0 100%)",
    imageContent: (
      // Online banking placeholder
      <Image
        src="/images/purplebank.webp"
        alt="Cross-Border Payments"
        fill
        sizes=""
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    ),
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect
          x="2"
          y="5"
          width="16"
          height="11"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M2 8h16M6 12h3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Business Accounts",
    description:
      "Named accounts in multiple currencies. Hold USD, NGN, and CAD with local banking details.",
    features: [
      "Named business accounts",
      "Same-day settlements",
      "No minimum balance",
    ],
    cta: "Learn More",
    href: "#",
  },
  {
    status: "COMING SOON",
    statusColor: "#7B5CF0",
    imageBg: "linear-gradient(135deg, #1a1a2e 0%, #2a2a4e 50%, #1e1e3e 100%)",
    imageContent: (
      // Dashboard placeholder
      <Image
        src="/images/map3.jpg"
        alt="Cross-Border Payments"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    ),
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 6v4l3 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Treasury Platform",
    description:
      "A complete dashboard to manage collections, conversions, and payouts — all in one place.",
    features: [
      "Multi-currency dashboard",
      "Automated workflows",
      "Team permissions",
    ],
    cta: "Join Waitlist",
    href: "#",
  },
];

const HEADING_WORDS = [
  "Everything",
  "You",
  "Need",
  "to",
  "Move",
  "Money",
  "Globally",
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
      delay: 0.25,
    },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Image wipe reveal — clip-path sweeps left to right
const imageRevealVariants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.2,
    },
  },
};

const featureContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── ProductCard ──────────────────────────────────────────────────────────────

function ProductCard({
  product,
  inView,
}: {
  product: (typeof PRODUCTS)[0];
  inView: boolean;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        borderColor: "rgba(123, 92, 240, 0.4)",
        boxShadow: "0 24px 60px rgba(123, 92, 240, 0.12)",
        transition: { duration: 0.25 },
      }}
      style={{
        flex: "1 1 280px",
        background: "#120D2E",
        border: "1px solid #120D2E",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
      }}
    >
      {/* ── Image area ── */}
      <div
        style={{ position: "relative", height: "200px", overflow: "hidden" }}
      >
        <motion.div
          variants={imageRevealVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            position: "absolute",
            inset: 0,
            background: product.imageBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Image zoom on card hover */}
          <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {product.imageContent}
          </motion.div>
        </motion.div>

        {/* Status badge */}
        {product.status && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              padding: "0.25rem 0.625rem",
              borderRadius: "6px",
              background:
                product.statusColor === "#22c55e"
                  ? "rgba(34,197,94,0.15)"
                  : "rgba(123,92,240,0.2)",
              border: `1px solid ${product.statusColor}40`,
              color: product.statusColor!,
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            {product.status}
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          flexGrow: 1,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "#EDEAF6",
            border: "1px solid rgba(209, 193, 247, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9B5DE5",
          }}
        >
          {product.icon}
        </div>

        {/* Title */}
        <div
          style={{
            color: "#FCFCFE",
            fontWeight: 600,
            fontSize: "1.1rem",
            letterSpacing: "-0.01em",
          }}
        >
          {product.title}
        </div>

        {/* Description */}
        <div
          style={{
            color: "#E8E8EA",
            fontSize: "14px",
            lineHeight: 1.7,
            flexGrow: 1,
          }}
        >
          {product.description}
        </div>

        {/* Feature checklist */}
        <motion.div
          variants={featureContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
        >
          {product.features.map((f) => (
            <motion.div
              key={f}
              variants={featureItemVariants}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7l3.5 3.5L12 4"
                  stroke="#9287FF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ color: "#C3C3C4", fontSize: "14px" }}>{f}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.a
          href={product.href}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            color: "#9B5DE5",
            fontSize: "0.875rem",
            fontWeight: 500,
            textDecoration: "none",
            width: "fit-content",
            marginTop: "0.25rem",
          }}
          whileHover="hover"
          initial="rest"
        >
          {product.cta}
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
      </div>
    </motion.div>
  );
}

// ─── ProductsSection ──────────────────────────────────────────────────────────

export function ProductsSection() {
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const labelInView = useInView(labelRef, { once: true, amount: 0.8 });
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const subtextInView = useInView(subtextRef, { once: true, amount: 0.5 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.15 });

  return (
    <section
      style={{ background: "#0A0B0F",  }}
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
            Products
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
          style={{ textAlign: "center", marginBottom: "1.25rem" }}
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
                    color: "#F7F6F6",
                    fontWeight: 800,
                    fontSize: "clamp(1.75rem, 4vw, 3rem)",
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

        {/* ── Subtext ── */}
        <motion.p
          ref={subtextRef}
          variants={subtextVariants}
          initial="hidden"
          animate={subtextInView ? "visible" : "hidden"}
          style={{
            color: "#D8DCE3",
            fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
            lineHeight: 1.7,
            textAlign: "center",
            maxWidth: "520px",
            margin: "0 auto 4rem",
          }}
        >
          From collections to payouts, Mondu gives you complete control over
          your cross-border treasury.
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
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              inView={cardsInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
