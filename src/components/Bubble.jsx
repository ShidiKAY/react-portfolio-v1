import { motion } from "framer-motion";
import React from "react";

const Bubble = ({ language, color, position, direction }) => {
  // Handle potential errors and missing props:
  if (!position || !direction) {
    console.error("Bubble: Missing required props 'position' or 'direction'");
    return null; // Or render a placeholder element
  }

  const animationDuration = 1 * 0.2; // Adjust duration as needed

  return (
    <motion.div
      className="bg-white rounded-full p-2 shadow-lg flex items-center justify-center relative"
      style={{
        backgroundColor: color,
        position: "absolute",
        top: position.y,
        left: position.x,
        animation: `bubble ${animationDuration}s linear infinite`,
        width: "100px",
        height: "100px",
        zIndex: 10,
      }}
    >
      {/* Cercle parfait avec une div opaque */}
      <div className="absolute w-full h-full rounded-full bg-opacity-50"></div>
      <p className="text-lg font-bold text-center">{language}</p>
    </motion.div>
  );
};

export default Bubble;
