import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Bubble = ({ language, color }) => {
  const [position, setPosition] = useState(() => {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let randomX = Math.random() * 2 - 1;
      let randomY = Math.random() * 2 - 1;

      const newPosition = {
        x: position.x + randomX,
        y: position.y + randomY,
      };

      // Maintien des bulles dans la zone visible
      if (newPosition.x < 0 || newPosition.x > window.innerWidth) {
        randomX = -randomX;
      }
      if (newPosition.y < 0 || newPosition.y > window.innerHeight) {
        randomY = -randomY;
      }

      setPosition(newPosition);
    }, 1000);

    // Nettoyage de l'interval lors du démontage du composant
    return () => clearInterval(interval);
  }, [position]);

  return (
    <motion.div
      className="bg-white rounded-full p-2 shadow-lg flex items-center justify-center relative"
      style={{
        backgroundColor: color,
        position: "absolute",
        top: position.y,
        left: position.x,
        animation: `bubble ${1 * 0.2}s linear infinite`,

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
