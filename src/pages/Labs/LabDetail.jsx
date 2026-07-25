import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Helmet as Head } from "react-helmet-async";
import labsData from "../../data/labs_exp.json";
import LabPreview from "./LabPreview";
import { getLabContent } from "../../utils/labContent";

const STATUS_KEYS = {
  Experimental: "labs_status_experimental",
  "Internal Tool": "labs_status_internal_tool",
  "Production-Ready": "labs_status_production_ready",
  Alpha: "labs_status_alpha",
  "Experimental Build - v0.2": "labs_status_experimental_build",
  "Artistic PoC - Interactive Experience": "labs_status_artistic_poc",
  "Polish in progress": "labs_status_polish_in_progress",
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

const LabDetail = () => {
  const { labId } = useParams();
  const { t } = useTranslation();
  const labs = labsData.labs ?? [];
  const lab = labs.find((l) => l.id === labId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [labId]);

  if (!lab && labs.length > 0) {
    return <Navigate to="/labs" replace />;
  }
  if (!lab) {
    return <Navigate to="/404" replace />;
  }

  const statusLabel = t("common." + (STATUS_KEYS[lab.status] ?? "labs_status_experimental"));
  const categoryLabel = t("common." + (CATEGORY_KEYS[lab.category] ?? "labs_category_automation"));
  const copy = getLabContent(t, lab.id);

  return (
    <div className="min-h-screen bg-slate-900">
      <Head>
        <title>{copy.title} · {t("common.labs_page_header")}</title>
        <meta name="description" content={copy.problem} />
      </Head>
      <div className="fixed top-4 left-4 z-[200]">
        <Link
          to="/labs"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-slate-600/80 bg-slate-900/90 text-slate-200 text-sm font-medium backdrop-blur-sm hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
          aria-label={t("common.labs_back_to_list")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {t("common.labs_back_to_list")}
        </Link>
      </div>

      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-20">
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{categoryLabel}</span>
            <span className="text-xs font-medium text-slate-400">{statusLabel}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            {copy.title}
          </h1>
        </header>

        <dl className="space-y-6 text-slate-300">
          <div>
            <dt className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">{t("common.labs_label_problem")}</dt>
            <dd className="leading-relaxed">{copy.problem}</dd>
          </div>
          <div>
            <dt className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">{t("common.labs_label_approach")}</dt>
            <dd className="leading-relaxed">{copy.approach}</dd>
          </div>
          {copy.result && (
            <div>
              <dt className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">{t("common.labs_insight_label")}</dt>
              <dd className="leading-relaxed font-medium text-slate-200">{copy.result}</dd>
            </div>
          )}
          {(lab.stack ?? []).length > 0 && (
            <div>
              <dt className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">{t("common.labs_label_stack")}</dt>
              <dd className="flex flex-wrap gap-2">
                {lab.stack.map((tech) => (
                  <span key={tech} className="px-2 py-1 rounded text-sm bg-slate-800 text-slate-200 border border-slate-600">
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>

        {lab.vercelUrl && (
          <div className="mt-8">
            <LabPreview url={lab.vercelUrl} />
          </div>
        )}

        {lab.link && (
          <a
            href={lab.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
          >
            {t("common.labs_link_vercel")}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        <div className="mt-12">
          <Link to="/" state={{ scrollToEngine: true }} className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-sm">
            <span>←</span> {t("common.home")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LabDetail;
