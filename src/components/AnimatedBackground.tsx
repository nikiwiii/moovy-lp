"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const defaultColors = [
    "#1E1B4B", // Deep indigo top-left
    "#0F172A", // Dark slate top-right
    "#312E81", // Deep violet bottom-left
    "#0C0A1D", // Dark base bottom-right
    "#1A103C", // Deep purple center fill
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden bg-transparent"
    >
      {/* Top-Left Glowing Orb */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ backgroundColor: defaultColors[0] }}
        className="absolute -top-[10%] -left-[15%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] opacity-45"
      />

      {/* Top-Right Glowing Orb */}
      <motion.div
        animate={{
          x: [0, -70, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ backgroundColor: defaultColors[1] }}
        className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-[130px] opacity-35"
      />

      {/* Bottom-Left Glowing Orb */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -70, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ backgroundColor: defaultColors[2] }}
        className="absolute -bottom-[10%] -left-[10%] w-[65vw] h-[65vw] max-w-[750px] max-h-[750px] rounded-full blur-[140px] opacity-40"
      />

      {/* Bottom-Right Dark Base Orb */}
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -90, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ backgroundColor: defaultColors[3] }}
        className="absolute -bottom-[15%] -right-[15%] w-[75vw] h-[75vw] max-w-[850px] max-h-[850px] rounded-full blur-[150px] opacity-30"
      />

      {/* Center Subtle Orb */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ backgroundColor: defaultColors[4] }}
        className="absolute top-[30%] left-[25%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[110px] opacity-25"
      />

      {/* Accent Vibe Corner Highlights matching moovy-front */}
      <div
        className="absolute bottom-5 right-5 w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ backgroundColor: "#9B5DE5" }}
      />
      <div
        className="absolute top-20 left-1/3 w-80 h-80 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ backgroundColor: "#0279b5" }}
      />
    </div>
  );
}
