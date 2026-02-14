import { useTranslation } from "react-i18next";
import Project from "./Project";
import { motion } from "framer-motion";

const projects = [
  {
    projectId: "bbg",
  },
  {
    projectId: "freelance",
  },
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
  const { t } = useTranslation();
  const hasProjects = projects && projects.length > 0;

  return (
    <div className="w-full pb-16 sm:pb-20 overflow-x-hidden">
      {/* <div className="grid grid-cols-3 grid-rows-2 gap-4 justify-items-center">
        <div>Element 1</div>
        <div>Element 2</div>
        <div>Element 3</div>
        <div>Element 4</div>
        <div>Element 5</div>
        <div>Element 6</div>
      </div> */}
      <div className="mx-auto flex flex-col justify-center max-w-full overflow-hidden px-2 md:px-0 lg:px-0 min-w-0">
        <p className="font-bold text-blue-900 dark:text-blue-200 text-3xl pb-6 text-center tracking-wide">
          {t("common.projects")}
        </p>
        {hasProjects ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-stretch items-stretch w-full overflow-hidden min-w-0"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {projects.map((project, idx) => (
              <Project key={project.projectId} {...project} idx={idx} />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <img
              src="/images/empty-state.svg"
              alt="No projects"
              className="w-32 h-32 mb-4 opacity-60"
              width="128"
              height="128"
              loading="lazy"
              decoding="async"
            />
            <p className="text-lg text-gray-500 dark:text-slate-400">{t("portfolio.noProjects")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
