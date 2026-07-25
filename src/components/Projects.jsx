import { useTranslation } from "react-i18next";
import Project from "./Project";
import { motion } from "framer-motion";
import {
  FLAGSHIP_PROJECT_ORDER,
  EARLIER_PROJECT_ORDER,
} from "../constants/projects";

const Projects = () => {
  const { t } = useTranslation();
  const hasFlagship = FLAGSHIP_PROJECT_ORDER.length > 0;
  const hasEarlier = EARLIER_PROJECT_ORDER.length > 0;

  return (
    <div className="w-full pb-16 sm:pb-20 overflow-x-hidden">
      <div className="mx-auto flex flex-col justify-center max-w-full overflow-hidden px-2 md:px-0 lg:px-0 min-w-0">
        <p className="font-bold text-blue-900 dark:text-blue-200 text-3xl pb-6 text-center tracking-wide">
          {t("common.projects")}
        </p>
        {hasFlagship ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-stretch items-stretch w-full overflow-hidden min-w-0"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {FLAGSHIP_PROJECT_ORDER.map((projectId, idx) => (
              <Project key={projectId} projectId={projectId} idx={idx} />
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
            <p className="text-lg text-gray-500 dark:text-slate-400">
              {t("portfolio.noProjects")}
            </p>
          </div>
        )}

        {hasEarlier && (
          <div className="mt-14 sm:mt-16">
            <p className="text-lg font-semibold text-slate-600 dark:text-slate-400 pb-5 text-center tracking-wide">
              {t("common.projects_earlier")}
            </p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 justify-items-stretch items-stretch w-full overflow-hidden min-w-0"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {EARLIER_PROJECT_ORDER.map((projectId, idx) => (
                <Project
                  key={projectId}
                  projectId={projectId}
                  idx={idx}
                  variant="earlier"
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
