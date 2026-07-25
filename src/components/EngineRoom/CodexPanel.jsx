import { useTranslation } from "react-i18next";
import { FaCube } from "react-icons/fa";

/**
 * CODEX kept in the atelier as exploratory R&D — not a production pitch.
 * No demo link until a real public artifact exists.
 */
const CodexPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <FaCube className="w-6 h-6 text-slate-600 dark:text-slate-400" aria-hidden="true" />
        <span className="text-xl font-bold text-slate-900 dark:text-white">
          {t("common.engine_codex_title")}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
          {t("common.engine_codex_badge")}
        </span>
      </div>
      <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
        {t("common.engine_codex_description")}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-l-2 border-slate-300 dark:border-slate-600 pl-3">
        {t("common.engine_codex_insight")}
      </p>
    </div>
  );
};

export default CodexPanel;
