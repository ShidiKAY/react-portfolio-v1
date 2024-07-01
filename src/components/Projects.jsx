import React from "react";
import Project from "./Project";

const projects = [
  {
    title: "Harmonia Mundi Livre",
    description:
      "Les livres. Web application for connecting with friends and social networking.",
    image: "/src/public/images/project-images/hml/logo.png",
    technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  },
  {
    title: "BUBO CYBERSEC",
    description:
      "Développer un outil pour surveiller le système d'information (SI) des entreprises et améliorer sa qualité et la protection des données.",
    image: "/src/public/images/project-images/bubo/logo.png",
    technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  },
  {
    title: "BUBO CYBERSEC Freelance",
    description:
      "Développer un outil pour surveiller le système d'information (SI) des entreprises et améliorer sa qualité et la protection des données.",
    image: "/src/public/images/project-images/bubo/logo.png",
    technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  },
  {
    title: "Hopps Group",
    description:
      "Web application for connecting with friends and social networking.",
    image: "/src/public/images/project-images/bubo/logo.png",
    technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  },
  {
    title: "Projet personnel",
    description:
      "Web application for connecting with friends and social networking.",
    image: "/src/public/images/project-images/bubo/logo.png",
    technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  },
  {
    title: "Apigem",
    description:
      "Web application for connecting with friends and social networking.",
    image: "/src/public/images/project-images/bubo/logo.png",
    technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  },
  // {
  //   title: "Animesthetic 4 Social Media",
  //   description:
  //     "Web application for connecting with friends and social networking.",
  //   image: "/src/public/images/project-images/bubo/logo.png",
  //   technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
  //   link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
  // },
  // ... Add more project objects here
];

const Projects = () => {
  return (
    <div className="w-full pb-32">
      <div className="grid grid-cols-3 grid-rows-2 gap-4 justify-items-center">
        <div>Element 1</div>
        <div>Element 2</div>
        <div>Element 3</div>
        <div>Element 4</div>
        <div>Element 5</div>
        <div>Element 6</div>
      </div>
      <div className="mx-auto flex flex-col justify-center md:px-0 lg:px-0">
        <p className="font-bold text-blue-900 text-3xl pb-4 text-center">
          Projects
        </p>
        <div className="grid grid-cols-3 grid-rows-2 gap-4 justify-items-center">
          {projects.map((project) => (
            <Project key={project.title} {...project} />
          ))}
          {/* {projects.map((project) => (
            <Project key={project.title} {...project} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Projects;
