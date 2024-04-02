import React, { useState } from "react";

const Project = ({ title, description, image, technologies, link }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="project-card">
      <img src={image} alt="Image du projet" />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        Lien vers le projet
      </a>
      <button className="open-modal-btn" onClick={handleOpenModal}>
        Voir plus
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{title}</h2>
            <img src={image} alt="Image du projet" />
            <p>{description}</p>
            <ul>
              {technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Lien vers le projet
            </a>
            <button className="close-modal-btn" onClick={handleCloseModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
