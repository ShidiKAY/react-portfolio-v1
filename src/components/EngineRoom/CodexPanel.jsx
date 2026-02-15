import { useTranslation } from "react-i18next";
import { FaCube } from "react-icons/fa";

const CODEX_DEMO_URL = "https://vercel.com";

const CodexPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <FaCube className="w-6 h-6 text-slate-600 dark:text-slate-400" aria-hidden="true" />
        <span className="text-xl font-bold text-slate-900 dark:text-white">
          {t("common.engine_codex_title")}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
          {t("common.engine_codex_badge")}
        </span>
      </div>
      <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
        {t("common.engine_codex_description")}
      </p>
      <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400">
        {t("common.engine_codex_insight")}
      </p>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-600">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
          {t("common.engine_codex_snippets_title")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-900 dark:bg-slate-950 border border-slate-700 overflow-hidden">
            <p className="px-3 py-2 text-xs font-medium text-cyan-400 border-b border-slate-700">
              {t("common.engine_codex_snippet_1_title")}
            </p>
            <pre className="p-3 text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
              {t("common.engine_codex_snippet_1_code")}
            </pre>
          </div>
          <div className="rounded-lg bg-slate-900 dark:bg-slate-950 border border-slate-700 overflow-hidden">
            <p className="px-3 py-2 text-xs font-medium text-cyan-400 border-b border-slate-700">
              {t("common.engine_codex_snippet_2_title")}
            </p>
            <pre className="p-3 text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
              {t("common.engine_codex_snippet_2_code")}
            </pre>
          </div>
        </div>
      </div>

      <a
        href={CODEX_DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors"
      >
        {t("common.engine_codex_demo_btn")}
        <span aria-hidden="true">↗</span>
      </a>

      {/* Placeholder: remplir la section pour tester le comportement */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-600 space-y-3">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Placeholder</p>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 w-20 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
          ))}
        </div>
        <div className="h-24 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
          <span className="text-xs text-slate-500 dark:text-slate-400">Codex placeholder block</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded bg-slate-200/80 dark:bg-slate-700/80" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodexPanel;
