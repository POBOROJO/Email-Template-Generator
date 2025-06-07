"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 text-white py-4 text-center text-4xl tracking-tight md:text-7xl"
        style={{
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
        }}
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}
