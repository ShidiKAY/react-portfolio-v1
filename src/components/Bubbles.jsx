import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const bubbleVariants = {
  hover: {
    scale: 1.2, // Augmenter la taille au survol
  },
};

const Bubbles = ({ bubbles }) => {
  // Vérifier si bubbles est un tableau
  if (!Array.isArray(bubbles)) {
    console.error(typeof bubbles);
    console.error("bubbles prop devrait être un tableau");
    return null; // Ou afficher un état de chargement
  }

  const [positions, setPositions] = useState(() => {
    return bubbles.map((bubble) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
  });

  const updatePositions = () => {
    setPositions((prevPositions) => {
      // Mettre à jour les positions en fonction d'une logique (exemple : mouvement aléatoire)
      return prevPositions.map((position) => ({
        x: position.x + Math.random() * 2 - 1, // Déplacement horizontal aléatoire
        y: position.y + Math.random() * 2 - 1, // Déplacement vertical aléatoire
      }));
    });
  };

  useEffect(() => {
    const intervalId = setInterval(updatePositions, 1000 / 30); // Mise à jour toutes les 30ms (30 FPS)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="overflow-hidden">
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          variants={bubbleVariants}
          whileHover="hover" // Déclencher l'animation hover au survol
          className={`bubble w-20 h-20 rounded-full bg-${bubble.color} opacity-75`}
          style={{
            position: "absolute",
            left: positions[index].x,
            top: positions[index].y,
          }}
        >
          <div className="absolute w-full h-full rounded-full bg-opacity-50"></div>
          <p className="text-lg font-bold text-center">{bubble.language}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Bubbles;
