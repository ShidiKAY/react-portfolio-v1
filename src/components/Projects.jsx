import React from "react";
import Project from "./Project";

const projects = [
  {
    title: "Animesthetic Social Media",
    description:
      "Web application for connecting with friends and social networking.",
    image: "/src/public/images/project-images/bubo/logo.png",
    technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  },
  {
    title: "Animesthetic 2 Social Media",
    description:
      "Web application for connecting with friends and social networking.",
    image: "/src/public/images/project-images/bubo/logo.png",
    technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  },
  {
    title: "Animesthetic 3 Social Media",
    description:
      "Web application for connecting with friends and social networking.",
    image: "/src/public/images/project-images/bubo/logo.png",
    technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  },
  {
    title: "Animesthetic 4 Social Media",
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
    <div className="w-full pb-32">
      <div className="mx-auto flex flex-col justify-center">
        <p className="font-bold text-blue-900 text-3xl pb-4 text-center">
          Projects
        </p>
        <div className="project-grid flex justify-start items-center flex-row flex-wrap">
          {projects.map((project) => (
            <Project key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
