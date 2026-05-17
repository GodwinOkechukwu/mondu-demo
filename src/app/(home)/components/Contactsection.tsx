"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  wordRevealContainerVariants,
  wordRevealVariants,
} from "@/lib/animations/variants";

// ─── Data ─────────────────────────────────────────────────────────────────────

const OFFICES = [
  {
    country: "United States",
    address:
      "4929 Wilshire Blvd, Ste 245 Los Angeles, California 90010 United States",
    phone: "+1 (213) 751-2865",
  },
  {
    country: "Canada",
    address: "114-900 Steeles Avenue West, Thornhill ON L4J 8C2",
    phone: null,
  },
  {
    country: "Nigeria",
    address: "200C Muri Okunola Street, Victoria Island, Lagos",
    phone: null,
  },
];

const HOW_OPTIONS = [
  "Select an option",
  "General Inquiry",
  "Sales",
  "Partnership",
  "Technical Support",
  "Other",
];

const HEADING_WORDS = ["Let's", "Connect"];

// ─── Form types ───────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  howCanWeHelp: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  companyName?: string;
  workEmail?: string;
  phoneNumber?: string;
  howCanWeHelp?: string;
  message?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) errors.fullName = "Full name is required.";

  if (!data.companyName.trim())
    errors.companyName = "Company name is required.";

  if (!data.workEmail.trim()) {
    errors.workEmail = "Work email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.workEmail)) {
    errors.workEmail = "Enter a valid email address.";
  }

  if (!data.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!/^[+\d\s\-().]{7,20}$/.test(data.phoneNumber)) {
    errors.phoneNumber = "Enter a valid phone number.";
  }

  if (!data.howCanWeHelp || data.howCanWeHelp === "Select an option")
    errors.howCanWeHelp = "Please select an option.";

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

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

const contactRowContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const contactRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const officeContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const officeVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const formCardVariants = {
  hidden: { opacity: 0, x: 48, y: 16 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const formFieldContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const formFieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Shared styles ────────────────────────────────────────────────────────────

const baseInputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "8px",
  padding: "0.75rem 1rem",
  color: "white",
  fontSize: "0.875rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
};

const fieldLabelStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.6)",
  fontSize: "0.8rem",
  marginBottom: "0.4rem",
  display: "block",
};

const errorStyle: React.CSSProperties = {
  color: "#f87171",
  fontSize: "0.72rem",
  marginTop: "0.3rem",
  display: "block",
};

// ─── Field helpers ────────────────────────────────────────────────────────────

function getInputBorder(focused: boolean, error?: string) {
  if (error) return "1px solid rgba(248,113,113,0.7)";
  if (focused) return "1px solid rgba(123,92,240,0.7)";
  return "1px solid #0A0B0F";
}

function getInputShadow(focused: boolean, error?: string) {
  if (error) return "0 0 0 3px rgba(248,113,113,0.15)";
  if (focused) return "0 0 0 3px rgba(123,92,240,0.15)";
  return "none";
}

// ─── ContactSection ───────────────────────────────────────────────────────────

export function ContactSection() {
  // ── Scroll refs ──
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const labelInView = useInView(labelRef, { once: true, amount: 0.8 });
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const subtextInView = useInView(subtextRef, { once: true, amount: 0.5 });
  const leftInView = useInView(leftRef, { once: true, amount: 0.2 });
  const rightInView = useInView(rightRef, { once: true, amount: 0.2 });

  // ── Form state ──
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    workEmail: "",
    phoneNumber: "",
    howCanWeHelp: "Select an option",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  // ── Handlers ──
  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleFocus(field: keyof FormData) {
    setFocused((prev) => ({ ...prev, [field]: true }));
  }

  function handleBlur(field: keyof FormData) {
    setFocused((prev) => ({ ...prev, [field]: false }));
    // Validate single field on blur
    const fieldErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  }

  function handleSubmit() {
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("📨 Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({
      fullName: "",
      companyName: "",
      workEmail: "",
      phoneNumber: "",
      howCanWeHelp: "Select an option",
      message: "",
    });
    setErrors({});
  }

  // ── Input helpers ──
  function inputStyle(field: keyof FormData): React.CSSProperties {
    return {
      ...baseInputStyle,
      border: getInputBorder(!!focused[field], errors[field]),
      boxShadow: getInputShadow(!!focused[field], errors[field]),
    };
  }

  return (
    <section
      style={{ background: "#060608",  }}
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
            style={{ height: "1px", width: "40px", background: "#3A2DFF" }}
          />
          <span
            style={{
              color: "#3A2DFF",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
            }}
          >
            Contact
          </span>
          <div
            style={{ height: "1px", width: "40px", background: "#3A2DFF" }}
          />
        </motion.div>

        {/* ── Heading ── */}
        <div
          ref={headingRef}
          style={{ textAlign: "center", marginBottom: "1rem" }}
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
                    fontWeight: 700,
                    fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
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
            color: "#9CA3AF",
            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
            lineHeight: 1.7,
            textAlign: "center",
            maxWidth: "500px",
            margin: "0 auto 3.5rem",
          }}
        >
          We're here to help whether you want to learn more, get support, or
          explore partnership opportunities.
        </motion.p>

        {/* ── Two-column layout ── */}
        <div
          style={{
            display: "flex",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* ── Left: contact info ── */}
          <div
            ref={leftRef}
            style={{
              flex: "1 1 260px",
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
            }}
          >
            {/* Contact rows */}
            <motion.div
              variants={contactRowContainerVariants}
              initial="hidden"
              animate={leftInView ? "visible" : "hidden"}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Email */}
              <motion.div
                variants={contactRowVariants}
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(123,92,240,0.15)",
                    border: "1px solid rgba(245,158,11,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect
                      x="1"
                      y="3"
                      width="14"
                      height="10"
                      rx="2"
                      stroke="#a78bfa"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M1 5.5l7 4.5 7-4.5"
                      stroke="#a78bfa"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <div style={{ color: "#6B7280", fontSize: "14px" }}>
                    General inquiries
                  </div>
                  <div
                    style={{
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    info@mondu.io
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                variants={contactRowVariants}
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(20,184,166,0.1)",
                    border: "1px solid rgba(20,184,166,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 2h3l1.5 3.5-1.75 1.25C6.75 8.5 7.5 9.25 8.25 9.75L9.5 8l3.5 1.5V13c0 .55-.45 1-1 1C5.5 14 2 10.5 2 6.5 2 3.5 2.45 2 3 2Z"
                      stroke="#a78bfa"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div style={{ color: "#6B7280", fontSize: "14px" }}>
                    US office
                  </div>
                  <div
                    style={{
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    +1 (213) 751-2865
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Office locations */}
            <motion.div
              variants={officeContainerVariants}
              initial="hidden"
              animate={leftInView ? "visible" : "hidden"}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.75rem",
              }}
            >
              {OFFICES.map((office) => (
                <motion.div key={office.country} variants={officeVariants}>
                  <div
                    style={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: "14px",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {office.country}
                  </div>
                  <div
                    style={{
                      color: "#9CA3AF",
                      fontSize: "14px",
                      lineHeight: 1.6,
                    }}
                  >
                    {office.address}
                  </div>
                  {office.phone && (
                    <div
                      style={{
                        color: "#9CA3AF",
                        fontSize: "0.825rem",
                        marginTop: "0.2rem",
                      }}
                    >
                      {office.phone}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: contact form ── */}
          <motion.div
            ref={rightRef}
            variants={formCardVariants}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
            style={{
              flex: "1 1 420px",
              background: "rgba(41,47,64,0.5)",
              border: "1px solid rgba(37,42,51,0.3)",
              borderRadius: "12px",
              padding: "33px",
            }}
          >
            {/* Success message */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  minHeight: "300px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(123,92,240,0.2)",
                    border: "1px solid rgba(123,92,240,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l4 4L19 7"
                      stroke="#a78bfa"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                  }}
                >
                  Message Sent!
                </div>
                <div
                  style={{
                    color: "#9CA3AF",
                    fontSize: "0.9rem",
                    maxWidth: "300px",
                    lineHeight: 1.6,
                  }}
                >
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: "0.5rem",
                    background: "transparent",
                    color: "#7B5CF0",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    textDecoration: "underline",
                  }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.div
                variants={formFieldContainerVariants}
                initial="hidden"
                animate={rightInView ? "visible" : "hidden"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {/* Row 1: Full Name + Company Name */}
                <motion.div
                  variants={formFieldVariants}
                  style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                >
                  <div style={{ flex: "1 1 160px" }}>
                    <label style={fieldLabelStyle}>Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      style={inputStyle("fullName")}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      onFocus={() => handleFocus("fullName")}
                      onBlur={() => handleBlur("fullName")}
                    />
                    {errors.fullName && (
                      <span style={errorStyle}>{errors.fullName}</span>
                    )}
                  </div>
                  <div style={{ flex: "1 1 160px" }}>
                    <label style={fieldLabelStyle}>Company Name</label>
                    <input
                      type="text"
                      placeholder="Acme Inc"
                      value={formData.companyName}
                      style={inputStyle("companyName")}
                      onChange={(e) =>
                        handleChange("companyName", e.target.value)
                      }
                      onFocus={() => handleFocus("companyName")}
                      onBlur={() => handleBlur("companyName")}
                    />
                    {errors.companyName && (
                      <span style={errorStyle}>{errors.companyName}</span>
                    )}
                  </div>
                </motion.div>

                {/* Row 2: Work Email + Phone */}
                <motion.div
                  variants={formFieldVariants}
                  style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                >
                  <div style={{ flex: "1 1 160px" }}>
                    <label style={fieldLabelStyle}>Work Email</label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      value={formData.workEmail}
                      style={inputStyle("workEmail")}
                      onChange={(e) =>
                        handleChange("workEmail", e.target.value)
                      }
                      onFocus={() => handleFocus("workEmail")}
                      onBlur={() => handleBlur("workEmail")}
                    />
                    {errors.workEmail && (
                      <span style={errorStyle}>{errors.workEmail}</span>
                    )}
                  </div>
                  <div style={{ flex: "1 1 160px" }}>
                    <label style={fieldLabelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phoneNumber}
                      style={inputStyle("phoneNumber")}
                      onChange={(e) =>
                        handleChange("phoneNumber", e.target.value)
                      }
                      onFocus={() => handleFocus("phoneNumber")}
                      onBlur={() => handleBlur("phoneNumber")}
                    />
                    {errors.phoneNumber && (
                      <span style={errorStyle}>{errors.phoneNumber}</span>
                    )}
                  </div>
                </motion.div>

                {/* How can we help */}
                <motion.div variants={formFieldVariants}>
                  <label style={fieldLabelStyle}>How can we help?</label>
                  <select
                    value={formData.howCanWeHelp}
                    style={{
                      ...baseInputStyle,
                      border: getInputBorder(
                        !!focused.howCanWeHelp,
                        errors.howCanWeHelp,
                      ),
                      boxShadow: getInputShadow(
                        !!focused.howCanWeHelp,
                        errors.howCanWeHelp,
                      ),
                      appearance: "none",
                      cursor: "pointer",
                      color:
                        formData.howCanWeHelp === "Select an option"
                          ? "rgba(255,255,255,0.4)"
                          : "white",
                    }}
                    onChange={(e) =>
                      handleChange("howCanWeHelp", e.target.value)
                    }
                    onFocus={() => handleFocus("howCanWeHelp")}
                    onBlur={() => handleBlur("howCanWeHelp")}
                  >
                    {HOW_OPTIONS.map((o) => (
                      <option
                        key={o}
                        value={o}
                        style={{ background: "#1a1a2e", color: "white" }}
                      >
                        {o}
                      </option>
                    ))}
                  </select>
                  {errors.howCanWeHelp && (
                    <span style={errorStyle}>{errors.howCanWeHelp}</span>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div variants={formFieldVariants}>
                  <label style={fieldLabelStyle}>Message</label>
                  <div style={{ position: "relative" }}>
                    <textarea
                      placeholder="Tell us about your needs..."
                      maxLength={500}
                      rows={5}
                      value={formData.message}
                      style={{
                        ...baseInputStyle,
                        resize: "none",
                        border: getInputBorder(
                          !!focused.message,
                          errors.message,
                        ),
                        boxShadow: getInputShadow(
                          !!focused.message,
                          errors.message,
                        ),
                        borderColor: focused.message
                          ? "rgba(123,92,240,0.7)"
                          : "rgba(37,42,51,0.5)",
                      }}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onFocus={() => handleFocus("message")}
                      onBlur={() => handleBlur("message")}
                    />
                    <span
                      style={{
                        position: "absolute",
                        bottom: "0.625rem",
                        right: "0.75rem",
                        color: "rgba(255,255,255,0.3)",
                        fontSize: "0.7rem",
                      }}
                    >
                      {formData.message.length}/500
                    </span>
                  </div>
                  {errors.message && (
                    <span style={errorStyle}>{errors.message}</span>
                  )}
                </motion.div>

                {/* Submit */}
                <motion.div variants={formFieldVariants}>
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%",
                      background: "#3A2DFF",
                      color: "white",
                      fontWeight: 600,
                      padding: "0.875rem",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      border: "none",
                      cursor: "pointer",
                      letterSpacing: "0.01em",
                      boxSizing: "border-box",
                    }}
                  >
                    Send Message
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
