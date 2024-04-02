import React from "react";
import Project from "./Project";

const projects = [
  {
    title: "Animesthetic 2 Social Media",
    description:
      "Web application for connecting with friends and social networking.",
    image: "/src/public/images/project-images/bubo/logo.png",
    technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  },
  {
    title: "Animesthetic Social Media",
    description:
      "Web application for connecting with friends and social networking.",
    image: "/src/public/images/project-images/bubo/logo.png",
    technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  },
  // ... Add more project objects here
];

const Projects = () => {
  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">Mes Projets</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <Project key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
