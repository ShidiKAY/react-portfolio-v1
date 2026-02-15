import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Helmet as Head } from "react-helmet-async";
import { motion } from "framer-motion";
import labsData from "../../data/labs_exp.json";
import { SEO_BASE_URL, SEO_DEFAULT_IMAGE } from "../../config/seo";
import LabCard from "./LabCard";

const Labs = () => {
  const { t } = useTranslation();
  const labs = labsData.labs ?? [];

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Head>
        <title>{t("common.seo_labs_title")}</title>
        <meta name="description" content={t("common.seo_labs_description")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SEO_BASE_URL + "/labs"} />
        <meta property="og:title" content={t("common.seo_labs_title")} />
        <meta property="og:description" content={t("common.seo_labs_description")} />
        <meta property="og:image" content={SEO_DEFAULT_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SEO_BASE_URL + "/labs"} />
        <meta name="twitter:title" content={t("common.seo_labs_title")} />
        <meta name="twitter:description" content={t("common.seo_labs_description")} />
        <meta name="twitter:image" content={SEO_DEFAULT_IMAGE} />
      </Head>
      {/* Bouton Retour */}
      <div className="fixed top-4 left-4 z-[200]">
        <Link
          to="/"
          state={{ scrollToEngine: true }}
          className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-4 py-2 rounded-sm border border-slate-200 dark:border-slate-600 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          aria-label={t("common.labs_back_to_expertise")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          ← {t("common.labs_back_to_expertise")}
        </Link>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-20">
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {t("common.labs_page_header")}
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            {t("common.labs_manifesto")}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {labs.map((lab, idx) => (
            <LabCard key={lab.id} lab={lab} index={idx} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/"
            state={{ scrollToEngine: true }}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors"
          >
            <span>←</span> {t("common.labs_back_to_expertise")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Labs;
