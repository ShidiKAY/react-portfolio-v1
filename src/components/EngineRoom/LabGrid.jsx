import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import labData from "../../data/lab.json";

const statusStyles = {
  "Production-Ready": "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700",
  Experimental: "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700",
};

const LabGrid = () => {
  const { t } = useTranslation();
  const prototypes = labData.ai_prototypes ?? [];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
        {prototypes.map((proto, idx) => (
          <motion.article
            key={proto.id}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm overflow-hidden hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-md transition-all duration-300 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            aria-labelledby={`lab-title-${proto.id}`}
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h3
                  id={`lab-title-${proto.id}`}
                  className="text-lg font-bold text-slate-900 dark:text-white"
                >
                  {proto.title}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    statusStyles[proto.status] ?? "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600"
                  }`}
                >
                  {proto.status}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                {proto.concept}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {(proto.stack ?? []).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <dl className="space-y-3 text-sm flex-1">
                <div>
                  <dt className="font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                    {t("common.lab_label_challenge")}
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proto.challenge}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                    {t("common.lab_label_exploration")}
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proto.exploration}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                    {t("common.lab_label_result")}
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium text-emerald-700 dark:text-emerald-400">
                    {proto.result}
                  </dd>
                </div>
              </dl>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default LabGrid;
