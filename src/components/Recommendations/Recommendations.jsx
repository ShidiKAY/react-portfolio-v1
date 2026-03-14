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

const Recommendations = () => {
  const { t, i18n } = useTranslation();
  const recommendations = recommendationsData.recommendations ?? [];
  const isSingle = recommendations.length === 1;

  if (recommendations.length === 0) return null;

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

        {isSingle ? (
          <motion.article
            className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 p-8 sm:p-12 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            aria-labelledby={`rec-name-${recommendations[0].id}`}
          >
            <blockquote className="text-xl sm:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed mb-8 font-serif italic">
              « {recommendations[0].quote} »
            </blockquote>
            <footer className="flex items-center gap-4">
              <div className="w-14 h-14 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700">
                {recommendations[0].companyLogo && !recommendations[0].companyLogo.includes("placeholder") ? (
                  <img
                    src={recommendations[0].companyLogo}
                    alt={recommendations[0].company || recommendations[0].name}
                    className="h-full w-full object-cover"
                    width={56}
                    height={56}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="h-full w-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xl font-semibold"
                    aria-hidden="true"
                  >
                    {(recommendations[0].company || recommendations[0].name || "?").charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  id={`rec-name-${recommendations[0].id}`}
                  className="font-semibold text-slate-900 dark:text-white text-lg"
                >
                  {recommendations[0].name}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {[recommendations[0].role, recommendations[0].company, recommendations[0].date ? formatDate(recommendations[0].date, i18n.language) : ""].filter(Boolean).join(" · ")}
                </p>
              </div>
              {recommendations[0].linkedInUrl && (
                <a
                  href={recommendations[0].linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-2 text-[#0A66C2] hover:bg-[#0A66C2]/10 rounded-lg transition-colors"
                  aria-label={t("common.recommendations_view_linkedin")}
                >
                  <BsLinkedin className="w-6 h-6" />
                </a>
              )}
            </footer>
          </motion.article>
        ) : (
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
                  <div className="w-8 h-8 flex-shrink-0 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-700">
                    {rec.companyLogo && !rec.companyLogo.includes("placeholder") ? (
                      <img
                        src={rec.companyLogo}
                        alt={rec.company || rec.name}
                        className="h-full w-full object-cover"
                        width={32}
                        height={32}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div
                        className="h-full w-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-semibold"
                        aria-hidden="true"
                      >
                        {(rec.company || rec.name || "?").charAt(0)}
                      </div>
                    )}
                  </div>
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
          </div>
        )}
      </div>
    </section>
  );
};

export default Recommendations;
