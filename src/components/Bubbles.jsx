import React from "react";

const Bubbles = ({ children }) => {
  return (
    // Conteneur pour les bulles
    <div className="overflow-hidden">{children}</div>
  );
};

export default Bubbles;
