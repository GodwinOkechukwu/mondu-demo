"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Box, BoxProps } from "@chakra-ui/react";
import { fadeVariants, slideVariants } from "@/lib/animations/variants";
import { BaseAnimationProps, FadeDirection } from "@/types/animation";

interface FadeInProps extends BaseAnimationProps, BoxProps {
  direction?: FadeDirection;
  distance?: number;
  children: React.ReactNode;
}

export function FadeIn({
  direction = "up",
  delay = 0,
  duration,
  distance = 32,
  once = true,
  threshold = 0.15,
  children,
  ...boxProps
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const variants: Variants =
    direction === "none" ? fadeVariants : slideVariants[direction](distance);

  const resolvedVariants: Variants = {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        // @ts-expect-error transition lives inside the variant object
        ...(variants.visible as { transition?: object }).transition,
        ...(delay    !== undefined && { delay }),
        ...(duration !== undefined && { duration }),
      },
    },
  };

  return (
    <Box
      ref={ref}
      as={motion.div}
      variants={resolvedVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="exit"
      {...boxProps}
    />
  );
}