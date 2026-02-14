import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EngineCard from "./EngineCard";
import CurrentStatus from "./CurrentStatus";

const EngineRoom = () => {
  const { t } = useTranslation();

  return (
    <section
      id="toengine"
      className="w-full py-12 sm:py-16 px-4 sm:px-6"
      aria-labelledby="engine-room-heading"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <h2
            id="engine-room-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-wide"
          >
            {t("common.engine_section_title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl mx-auto">
            {t("common.engine_lab_subtitle")}
          </p>
        </motion.header>

        <div className="space-y-10">
          <EngineCard />
          <CurrentStatus />
          <motion.div
            className="rounded-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 sm:p-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
              {t("common.engine_lab_title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
              {t("common.labs_teaser_home")}
            </p>
            <Link
              to="/labs"
              className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-medium text-sm hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
            >
              {t("common.labs_explore_btn")}
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EngineRoom;
