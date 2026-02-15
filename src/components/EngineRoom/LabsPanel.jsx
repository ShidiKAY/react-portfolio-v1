import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import labsData from "../../data/labs_exp.json";

const LabsPanel = () => {
  const { t } = useTranslation();
  const labs = labsData.labs ?? [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {t("common.labs_page_header")}
      </h3>
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        {t("common.labs_teaser_home")}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {labs.map((lab) => (
          <Link
            key={lab.id}
            to={`/labs/${lab.id}`}
            className="aspect-square rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 overflow-hidden hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-md transition-all flex flex-col"
          >
            {lab.previewImage ? (
              <img
                src={lab.previewImage}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                <span className="text-2xl font-mono">{(lab.title || "?").charAt(0)}</span>
              </div>
            )}
            <div className="p-2 bg-white dark:bg-slate-700/90 border-t border-slate-200 dark:border-slate-600">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate" title={lab.title}>
                {lab.title}
              </p>
            </div>
          </Link>
        ))}
        {/* Placeholder: cartes labs pour remplir et tester le comportement */}
        {Array.from({ length: Math.max(0, 6 - labs.length) }, (_, i) => (
          <div
            key={`placeholder-${i}`}
            className="aspect-square rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-100/80 dark:bg-slate-800/80 flex flex-col overflow-hidden"
          >
            <div className="flex-1 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
              <span className="text-sm">Lab placeholder {i + 1}</span>
            </div>
            <div className="p-2 border-t border-slate-200 dark:border-slate-600">
              <div className="h-3 w-3/4 rounded bg-slate-300 dark:bg-slate-600" />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Labs section placeholder</p>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 flex-1 rounded bg-slate-200 dark:bg-slate-700" />
          ))}
        </div>
      </div>
      <Link
        to="/labs"
        className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-medium text-sm hover:text-cyan-700 dark:hover:text-cyan-300"
      >
        {t("common.labs_explore_btn")}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
};

export default LabsPanel;
