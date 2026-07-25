import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { getLabContent } from "../../utils/labContent";

const STATUS_STYLES = {
  Experimental:
    "bg-amber-500/15 text-amber-300 border-amber-500/40",
  "Internal Tool":
    "bg-slate-500/20 text-slate-200 border-slate-500/40",
  "Production-Ready":
    "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  Alpha:
    "bg-blue-500/15 text-blue-300 border-blue-500/40",
  "Experimental Build - v0.2":
    "bg-violet-500/15 text-violet-300 border-violet-500/40",
  "Artistic PoC - Interactive Experience":
    "bg-rose-500/20 text-rose-300 border-rose-400/50",
  "Polish in progress":
    "bg-yellow-500/15 text-yellow-300 border-yellow-500/40",
};

const CATEGORY_KEYS = {
  Automation: "labs_category_automation",
  "AI Assistance": "labs_category_ai_assistance",
  Architecture: "labs_category_architecture",
  Simulation: "labs_category_simulation",
  "Art & Interactive": "labs_category_art_interactive",
  Geospatial: "labs_category_geospatial",
  Linguistic: "labs_category_linguistic",
};

const STATUS_KEYS = {
  Experimental: "labs_status_experimental",
  "Internal Tool": "labs_status_internal_tool",
  "Production-Ready": "labs_status_production_ready",
  Alpha: "labs_status_alpha",
  "Experimental Build - v0.2": "labs_status_experimental_build",
  "Artistic PoC - Interactive Experience": "labs_status_artistic_poc",
  "Polish in progress": "labs_status_polish_in_progress",
};

export default function LabCard({ lab, index = 0 }) {
  const { t } = useTranslation();
  const copy = getLabContent(t, lab.id);
  const statusStyle = STATUS_STYLES[lab.status] ?? STATUS_STYLES["Internal Tool"];
  const statusLabel = t("common." + (STATUS_KEYS[lab.status] ?? "labs_status_experimental"));
  const categoryLabel = t("common." + (CATEGORY_KEYS[lab.category] ?? "labs_category_automation"));

  return (
    <motion.article
      id={lab.id}
      className="group relative bg-slate-800/60 dark:bg-slate-900/80 border border-slate-600/60 dark:border-slate-700 rounded-sm overflow-hidden hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col h-full scroll-mt-24"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      aria-labelledby={`lab-title-${lab.id}`}
    >
      {/* Blueprint-style top bar */}
      <div className="px-4 py-2 border-b border-slate-600/60 dark:border-slate-700 bg-slate-900/40 flex items-center justify-between gap-3 min-h-[2.5rem]">
        <span className="text-xs font-mono text-cyan-400/90 uppercase tracking-wider whitespace-nowrap shrink-0">
          {categoryLabel}
        </span>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border whitespace-nowrap shrink min-w-0 ${statusStyle}`}
          title={t("common.labs_label_maturity")}
        >
          {statusLabel}
        </span>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <h2
          id={`lab-title-${lab.id}`}
          className="text-lg font-bold text-slate-100 dark:text-white mb-3 font-sans"
        >
          {copy.title}
        </h2>

        <dl className="space-y-3 text-sm flex-1">
          <div>
            <dt className="text-cyan-400/90 font-mono text-xs uppercase tracking-wider mb-0.5">
              {t("common.labs_label_problem")}
            </dt>
            <dd className="text-slate-300 dark:text-slate-300 leading-relaxed">
              {copy.problem}
            </dd>
          </div>
          <div className="group-hover:opacity-100 opacity-95 transition-opacity duration-200">
            <dt className="text-cyan-400/90 font-mono text-xs uppercase tracking-wider mb-0.5">
              {t("common.labs_label_approach")}
            </dt>
            <dd className="text-slate-300 dark:text-slate-300 leading-relaxed">
              {copy.approach}
            </dd>
          </div>
          {copy.result && (
            <div>
              <dt className="text-cyan-400/90 font-mono text-xs uppercase tracking-wider mb-0.5">
                {t("common.labs_insight_label")}
              </dt>
              <dd className="text-slate-200 dark:text-slate-200 leading-relaxed text-sm font-medium">
                {copy.result}
              </dd>
            </div>
          )}
        </dl>

        {(lab.stack ?? []).length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-600/40 dark:border-slate-700">
            <dt className="text-cyan-400/90 font-mono text-xs uppercase tracking-wider mb-2">
              {t("common.labs_label_stack")}
            </dt>
            <dd className="flex flex-wrap gap-1.5">
              {lab.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700/60 dark:bg-slate-800 text-slate-200 dark:text-slate-300 border border-slate-600/50 dark:border-slate-600"
                >
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        )}

        {lab.vercelUrl ? (
          <a
            href={lab.vercelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>{t("common.labs_link_vercel")}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        ) : (
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-400 dark:text-slate-500">
            <span>{t("common.labs_link_internal_rnd")}</span>
          </span>
        )}
      </div>
    </motion.article>
  );
}
