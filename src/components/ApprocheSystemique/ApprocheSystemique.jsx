import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const ApprocheSystemique = () => {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = useState("bounded");

  const blocks = [
    { key: "bounded", titleKey: "common.approche_bounded_title", descKey: "common.approche_bounded_desc" },
    { key: "aggregates", titleKey: "common.approche_aggregates_title", descKey: "common.approche_aggregates_desc" },
    { key: "value", titleKey: "common.approche_value_title", descKey: "common.approche_value_desc" },
  ];

  return (
    <section
      id="toapproche"
      className="w-full py-12 sm:py-16 px-4 sm:px-6"
      aria-labelledby="approche-heading"
    >
      <div className="max-w-3xl mx-auto w-full">
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <h2
            id="approche-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-wide"
          >
            {t("common.approche_title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            {t("common.approche_subtitle")}
          </p>
        </motion.header>

        <ul className="space-y-3 list-none p-0 m-0">
          {blocks.map((block) => {
            const isOpen = openKey === block.key;
            return (
              <li
                key={block.key}
                className="bg-slate-50/80 dark:bg-slate-800/80 rounded-sm border border-slate-200 dark:border-slate-600 border-l-4 border-l-cyan-500 dark:border-l-cyan-400 overflow-hidden min-w-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenKey(isOpen ? null : block.key)}
                  className="w-full max-w-full box-border flex items-center justify-between gap-4 p-5 pr-4 text-left hover:bg-slate-100/80 dark:hover:bg-slate-700/50 transition-colors min-w-0"
                  aria-expanded={isOpen}
                  aria-controls={`approche-content-${block.key}`}
                  id={`approche-trigger-${block.key}`}
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-wide min-w-0 truncate pr-2">
                    {t(block.titleKey)}
                  </h3>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`approche-content-${block.key}`}
                      role="region"
                      aria-labelledby={`approche-trigger-${block.key}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-slate-200 dark:border-slate-600 overflow-hidden"
                    >
                      <p className="p-5 pt-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                        {t(block.descKey)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ApprocheSystemique;
