import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaCube } from "react-icons/fa";

const CODEX_DEMO_URL = "https://vercel.com"; // Replace with your CODEX Vault demo when ready

const EngineCard = () => {
  const { t } = useTranslation();

  return (
    <motion.article
      className="relative w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-600 overflow-hidden hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-labelledby="engine-codex-title"
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            id="engine-codex-title"
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            {t("common.engine_codex_title")}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
            {t("common.engine_codex_badge")}
          </span>
        </div>
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
            <FaCube className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {t("common.engine_codex_description")}
            </p>
            <p className="mt-2 text-xs font-medium text-cyan-600 dark:text-cyan-400">
              {t("common.engine_codex_insight")}
            </p>
            <a
              href={CODEX_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors"
            >
              {t("common.engine_codex_demo_btn")}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default EngineCard;
