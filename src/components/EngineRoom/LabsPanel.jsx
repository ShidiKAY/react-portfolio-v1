import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import labsData from "../../data/labs_exp.json";

const LabCardShell = ({ lab }) => {
  const [imgError, setImgError] = useState(false);
  const showThumbnail = lab.thumbnail && !imgError;

  return (
    <Link
      to={`/labs#${lab.id}`}
      className="aspect-[4/3] rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/80 overflow-hidden hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-lg transition-all flex flex-col group"
    >
      <div className="relative w-full flex-1 min-h-0 bg-slate-200 dark:bg-slate-700">
        {showThumbnail ? (
          <img
            src={lab.thumbnail}
            alt={lab.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 dark:text-slate-400" aria-hidden="true">
            <span className="text-3xl font-mono font-semibold">{(lab.title || "?").charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-600 flex-shrink-0">
        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate" title={lab.title}>
          {lab.title}
        </p>
      </div>
    </Link>
  );
};

const LabsPanel = () => {
  const { t } = useTranslation();
  const allLabs = labsData.labs ?? [];
  const featuredLabs = allLabs.filter((lab) => lab.featured === true).slice(0, 3);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {t("common.labs_page_header")}
      </h3>
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        {t("common.labs_teaser_home")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {featuredLabs.map((lab) => (
          <LabCardShell key={lab.id} lab={lab} />
        ))}
      </div>
      <Link
        to="/labs"
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto py-4 px-6 text-base font-semibold text-white bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        {t("common.labs_explore_cta")}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
};

export default LabsPanel;
