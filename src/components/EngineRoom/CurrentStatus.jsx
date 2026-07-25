import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { DEFAULT_AVAILABLE } from "../../config/availability";
import { FaCodeBranch, FaVideo } from "react-icons/fa";
import { HiOutlineDocumentText, HiOutlineServer } from "react-icons/hi";

const tools = [
  {
    key: "written",
    Icon: HiOutlineDocumentText,
    labelKey: "common.status_tool_written",
  },
  {
    key: "repo",
    Icon: FaCodeBranch,
    labelKey: "common.status_tool_repo",
  },
  {
    key: "ci",
    Icon: HiOutlineServer,
    labelKey: "common.status_tool_ci",
  },
  {
    key: "sync",
    Icon: FaVideo,
    labelKey: "common.status_tool_sync",
  },
];

const CurrentStatus = () => {
  const { t } = useTranslation();
  const available = DEFAULT_AVAILABLE;

  return (
    <div
      id="tostatus"
      className="w-full rounded-sm bg-slate-200/95 dark:bg-slate-800/95 border border-slate-300 dark:border-slate-600/50 overflow-hidden"
      aria-labelledby="status-dashboard-heading"
    >
      <div className="p-6 sm:p-8">
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3
              id="status-dashboard-heading"
              className="text-cyan-600 dark:text-cyan-400/90 font-mono text-sm uppercase tracking-wider"
            >
              {t("common.status_dashboard_heading")}
            </h3>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <span
                className={`inline-flex h-2.5 w-2.5 rounded-full ${
                  available ? "bg-emerald-500" : "bg-amber-500"
                }`}
                aria-hidden="true"
              />
              {available
                ? t("common.status_availability")
                : t("common.status_availability_focus")}
            </div>
          </div>
          <p className="mt-2 text-base font-medium text-slate-800 dark:text-slate-100">
            {t("common.status_work_mode")}
          </p>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {t("common.status_availability_blurb")}
          </p>
        </motion.div>

        <motion.div
          className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <div className="rounded-lg bg-slate-100 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600/40 px-4 py-3">
            <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400/90 uppercase tracking-wider mb-1">
              {t("common.status_pillar_autonomy_label")}
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-snug">
              {t("common.status_pillar_autonomy")}
            </p>
          </div>
          <div className="rounded-lg bg-slate-100 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600/40 px-4 py-3">
            <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400/90 uppercase tracking-wider mb-1">
              {t("common.status_pillar_clarity_label")}
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-snug">
              {t("common.status_pillar_clarity")}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            {t("common.status_workflow_title")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {tools.map(({ key, Icon, labelKey }) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600/50 text-slate-700 dark:text-slate-200 text-sm font-medium"
              >
                <Icon
                  className="w-4 h-4 text-slate-500 dark:text-slate-400"
                  aria-hidden="true"
                />
                {t(labelKey)}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CurrentStatus;
