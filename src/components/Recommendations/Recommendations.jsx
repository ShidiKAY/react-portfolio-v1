import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BsLinkedin } from "react-icons/bs";
import recommendationsData from "../../data/recommendations.json";

const formatDate = (dateStr, locale) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const PLACEHOLDER_COUNT = 8;

const Recommendations = () => {
  const { t, i18n } = useTranslation();
  const recommendations = recommendationsData.recommendations ?? [];
  const placeholders = Array.from({ length: Math.max(0, PLACEHOLDER_COUNT - recommendations.length) }, (_, i) => ({
    id: `placeholder-${i}`,
    isPlaceholder: true,
  }));

  return (
    <section
      id="torecommendations"
      className="w-full py-8 sm:py-10 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800"
      aria-labelledby="recommendations-heading"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          id="recommendations-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-5 sm:mb-6 text-center tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t("common.recommendations_title")}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {recommendations.map((rec, idx) => (
            <motion.article
              key={rec.id}
              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-0"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.3) }}
              aria-labelledby={`rec-name-${rec.id}`}
            >
              <blockquote className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-snug mb-3 flex-1 line-clamp-4">
                « {rec.quote} »
              </blockquote>
              <footer className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700 flex-shrink-0">
                {rec.companyLogo ? (
                  <img
                    src={rec.companyLogo}
                    alt=""
                    className="w-8 h-8 rounded-md object-contain bg-slate-100 dark:bg-slate-700 flex-shrink-0"
                    width={32}
                    height={32}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-md bg-slate-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center text-slate-500 dark:text-slate-400 text-[10px] font-semibold"
                    aria-hidden="true"
                  >
                    {(rec.company || rec.name || "?").charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p
                    id={`rec-name-${rec.id}`}
                    className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm truncate"
                  >
                    {rec.name}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                    {[rec.role, rec.company, rec.date ? formatDate(rec.date, i18n.language) : ""].filter(Boolean).join(" · ")}
                  </p>
                </div>
                {rec.linkedInUrl && (
                  <a
                    href={rec.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-1.5 text-[#0A66C2] hover:bg-[#0A66C2]/10 rounded-md transition-colors"
                    aria-label={t("common.recommendations_view_linkedin")}
                  >
                    <BsLinkedin className="w-4 h-4" />
                  </a>
                )}
              </footer>
            </motion.article>
          ))}
          {placeholders.map((ph, idx) => (
            <motion.article
              key={ph.id}
              className="bg-slate-50 dark:bg-slate-800/70 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 p-3 sm:p-4 flex flex-col min-h-0"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.25, delay: Math.min((recommendations.length + idx) * 0.04, 0.3) }}
              aria-hidden="true"
            >
              <div className="space-y-2 mb-3 flex-1">
                <div className="h-3 rounded bg-slate-200 dark:bg-slate-700 w-full" />
                <div className="h-3 rounded bg-slate-200 dark:bg-slate-700 w-4/5" />
                <div className="h-3 rounded bg-slate-200 dark:bg-slate-700 w-3/5" />
              </div>
              <footer className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-600 flex-shrink-0">
                <div className="w-8 h-8 rounded-md bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="h-3 w-20 rounded bg-slate-300 dark:bg-slate-600" />
                  <div className="h-2.5 w-28 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </footer>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">Recommendation placeholder {idx + 1}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
