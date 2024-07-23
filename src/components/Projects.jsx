import React from "react";
import Project from "./Project";
import { useTranslation } from "react-i18next";

const projects = [
  {
    projectId: "hml",
  },
  {
    projectId: "scf",
  },
  {
    projectId: "bubo",
  },
  {
    projectId: "hopps",
  },
  {
    projectId: "apigem",
  },
];

const Projects = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="w-full pb-32">
      {/* <div className="grid grid-cols-3 grid-rows-2 gap-4 justify-items-center">
        <div>Element 1</div>
        <div>Element 2</div>
        <div>Element 3</div>
        <div>Element 4</div>
        <div>Element 5</div>
        <div>Element 6</div>
      </div> */}
      <div className="mx-auto flex flex-col justify-center md:px-0 lg:px-0">
        <p className="font-bold text-blue-900 text-3xl pb-4 text-center">
          {t("common.projects")}
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
