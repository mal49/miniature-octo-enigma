"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function MotionSection({
  children,
  className,
  delay = 0,
  id,
}: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
