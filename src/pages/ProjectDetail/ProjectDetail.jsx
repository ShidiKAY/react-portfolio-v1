import { useTranslation } from "react-i18next";
import {
  useParams,
  useNavigate,
  useLocation,
  Navigate,
  Link,
} from "react-router-dom";
import { Helmet as Head } from "react-helmet-async";
import { SEO_BASE_URL, SEO_DEFAULT_IMAGE } from "../../config/seo";
import { useEffect, useLayoutEffect, useState } from "react";
import GoToTop from "../../components/GoToTop";
import { switchLanguage } from "../../i18n";
import {
  SkillPill,
  SKILL_DESCRIPTIONS,
  skillIcons,
} from "../../components/SkillsModern";
import { PROJECT_ORDER, isValidProjectId } from "../../constants/projects";
import { scrollToTopInstant } from "../../utils/scroll";

const scrollToMissionAnchor = (anchorId) => {
  const el = document.getElementById(anchorId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const MissionAnchorCard = ({ anchor, caseStudyLabel }) => {
  const inner = (
    <>
      {anchor.img && (
        <div className="h-24 sm:h-28 flex items-center justify-center bg-white dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-600 p-3">
          <img
            src={anchor.img}
            alt=""
            className="max-h-full max-w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1.5">
          {anchor.title}
        </h3>
        <p className="text-gray-600 dark:text-slate-400 text-sm leading-snug flex-1">
          {anchor.summary}
        </p>
        {anchor.href && (
          <span className="mt-3 text-cyan-600 dark:text-cyan-400 text-xs font-medium">
            {caseStudyLabel} →
          </span>
        )}
      </div>
    </>
  );

  const className =
    "flex flex-col h-full min-h-[220px] rounded-lg border border-slate-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 overflow-hidden transition-colors hover:border-cyan-500/60 dark:hover:border-cyan-400/60 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500";

  if (anchor.href) {
    return (
      <Link to={anchor.href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={`#${anchor.anchorId}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        scrollToMissionAnchor(anchor.anchorId);
      }}
    >
      {inner}
    </a>
  );
};

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Function to highlight technical terms and impactful words
  const highlightTerms = (text) => {
    // Expanded technical terms to include all languages and technologies
    const technicalTerms = [
      // Languages
      "PHP",
      "JavaScript",
      "TypeScript",
      "Python",
      "Node.js",
      "C#",
      "HTML",
      "CSS",
      "SQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Samba",
      "Apache",
      "Ubuntu",
      "FPDF",
      "Zend Framework",
      "Jira API",
      "WebSocket",
      "AJAX",
      "REST API",
      "GraphQL",
      "Bootstrap",
      "UIkit",
      "Material Design",
      "ApexCharts",
      "OpenVas",
      "Webpack Encore",
      "Twig",
      "Smarty",
      "Discord API",
      // Formats
      "PDF",
      "Excel",
      "CSV",
      "WebP",
      // Other
      "Template F",
      "Template G",
      "pixel-by-pixel",
      "drag-and-drop",
    ];

    // Impactful terms to highlight in purple
    const impactfulTerms = [
      // Performance improvements
      "one day to 20 minutes",
      "performance bottlenecks",
      "memory management",
      "d'une journée à 20 minutes",
      "goulots d'étranglement",
      "gestion de la mémoire",
      "60% reduction",
      "60%",
      "reduced response time",
      "optimized",
      "optimization",
      "code splitting",
      "lazy loading",
      "real-time",
      "dynamic filtering",
      "dynamic field",
      "modular architecture",
      "responsive",
      "mobile-first",
      "seamless integration",
      "zero downtime",
      "data integrity",
      "secure configurations",
      "sans interruption",
      "intégrité des données",
      "configurations sécurisées",
      "user-friendly",
      "intuitive interface",
      "automated notification",
      "interface intuitive",
      "notification automatisée",
      "role-based access",
      "granular permissions",
      "field-level permissions",
      "contrôle d'accès",
      "permissions granulaire",
      "niveau des champs",
      "template-based generation",
      "caching mechanisms",
      "automated validation",
      "génération basée sur des modèles",
      "mécanismes de cache",
      "validation automatisée",
      "audit logging",
      "unit testing",
      "automated deployment",
      "backup systems",
      "incident management",
      "incident escalation",
      "multi-tenant",
      "data isolation",
      "provisioning",
      "deprovisioning",
      "synchronization",
      "workflow",
      "escalation",
      "incident history",
      "log viewing",
      "metrics visualization",
      "push notifications",
      "service worker",
      "offline functionality",
    ];

    // If not a string, return as is
    if (typeof text !== "string") return text;

    // Don't highlight the first word of each line
    // Split into lines (for multiline descriptions)
    return text.split(/\n/).map((line, lineIdx) => {
      // Find the first word (with possible punctuation)
      const match = line.match(/^(\s*\w+[\w\-.]*)/);
      let firstWord = "";
      let rest = line;
      if (match) {
        firstWord = match[0];
        rest = line.slice(firstWord.length);
      }
      // Highlight technical terms in the rest
      const techPattern = new RegExp(
        `\\b(${technicalTerms.join("|")})\\b`,
        "gi",
      );
      let parts = rest.split(techPattern).map((part, index) => {
        if (
          technicalTerms.some(
            (term) => term.toLowerCase() === part.toLowerCase(),
          )
        ) {
          return (
            <span
              key={`tech-${lineIdx}-${index}`}
              className="text-blue-700 dark:text-blue-400"
            >
              {part}
            </span>
          );
        }
        return part;
      });
      // Highlight impactful terms in the rest
      const impactPattern = new RegExp(`(${impactfulTerms.join("|")})`, "gi");
      parts = parts.map((part, index) => {
        if (typeof part === "string") {
          return part.split(impactPattern).map((subPart, subIndex) => {
            if (
              impactfulTerms.some(
                (term) => term.toLowerCase() === subPart.toLowerCase(),
              )
            ) {
              return (
                <span
                  key={`impact-${lineIdx}-${index}-${subIndex}`}
                  className="text-purple-700 dark:text-purple-400"
                >
                  {subPart}
                </span>
              );
            }
            return subPart;
          });
        }
        return part;
      });
      // Return with the first word untouched
      return (
        <span key={`line-${lineIdx}`}>
          {firstWord}
          {parts}
          {lineIdx < text.split(/\n/).length - 1 ? <br /> : null}
        </span>
      );
    });
  };

  // Toujours ouvrir en haut, y compris en changeant de projet (prev/next) sans démontage.
  // `scrollToTopInstant` désactive temporairement `scroll-behavior: smooth` (globals.css)
  // avant de scroller, sinon le saut en haut de page serait animé.
  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    scrollToTopInstant();
  }, [projectId]);

  // Filet de sécurité : la mise en page peut encore bouger juste après le premier paint
  // (chargement du logo, police, etc.), on reconfirme le haut sur quelques frames.
  useEffect(() => {
    const rafs = [0, 1, 2].map(() => requestAnimationFrame(scrollToTopInstant));
    return () => rafs.forEach((id) => cancelAnimationFrame(id));
  }, [projectId]);

  // Nettoyer l'URL (retirer ?t=...) après montage pour garder une barre d'adresse propre
  useEffect(() => {
    if (window.location.search) {
      navigate(`/projects/${projectId}`, { replace: true });
    }
  }, [navigate, projectId]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key press: retour à l'accueil scrollé sur la section Projets
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        navigate("/", { state: { scrollToProjects: true } });
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [navigate]);

  const project = t(`projects.${projectId}`, { returnObjects: true });
  const missionAnchors = Array.isArray(project?.missionAnchors)
    ? project.missionAnchors
    : [];
  const projectValid =
    isValidProjectId(projectId) &&
    project &&
    typeof project === "object" &&
    project.introduction;

  if (!projectValid) {
    return <Navigate to="/404" replace />;
  }

  const technologies = project.technologies || [];
  const externalLinks = project.externalLinks || [];
  const challenges = project.challenges || [];
  const solutions = project.solutions || [];
  const mainTechnologies = project.mainTechnologies || [];
  const softSkills = project.softSkills || [];

  // Find next/previous project IDs
  const currentIdx = PROJECT_ORDER.indexOf(projectId);
  const prevProjectId =
    PROJECT_ORDER[
      (currentIdx - 1 + PROJECT_ORDER.length) % PROJECT_ORDER.length
    ];
  const nextProjectId = PROJECT_ORDER[(currentIdx + 1) % PROJECT_ORDER.length];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150 z-[100]"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Fixed back button */}
      <div className="fixed top-4 left-4 z-[200]">
        <button
          onClick={() => navigate("/", { state: { scrollToProjects: true } })}
          className="flex items-center gap-2 cursor-pointer bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm text-gray-800 dark:text-slate-100 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
          aria-label={t("common.back")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          {t("common.back")}
        </button>
      </div>

      {/* Floating Language Switcher and Print Button - aligned */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-row items-center space-x-2">
        <div className="language-switcher mt-1.5">
          <ul className="flex space-x-2">
            <li
              className="inline-flex items-center cursor-pointer"
              onClick={() => switchLanguage("fr")}
              tabIndex={0}
              aria-label={t("common.lang_french")}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  switchLanguage("fr");
              }}
            >
              <span
                className="i-flagpack-fr w-8 mb-1 mt-1"
                title={t("common.lang_french")}
              ></span>
              <span className="hidden lg:block">{t("common.lang_french")}</span>
            </li>
            <li
              className="inline-flex items-center cursor-pointer"
              onClick={() => switchLanguage("en")}
              tabIndex={0}
              aria-label={t("common.lang_english")}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  switchLanguage("en");
              }}
            >
              <span
                className="i-flagpack-gb-ukm w-8 mt-px"
                title={t("common.lang_english")}
              ></span>{" "}
              <span className="hidden lg:block">{t("common.lang_english")}</span>
            </li>
          </ul>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
          aria-label="Print this project"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2m-6 0v4m0 0h4m-4 0H8"
            />
          </svg>
          Print
        </button>
      </div>

      {/* Side Navigation Buttons (fixed, full height, always visible, each on its side) */}
      <div>
        {/* Left Side */}
        <div
          className="hidden md:block fixed top-0 left-0 h-full w-32 z-[100] group cursor-pointer transition flex items-center justify-start"
          onClick={() => {
            scrollToTopInstant();
            navigate(`/projects/${prevProjectId}`);
          }}
          aria-label="Previous project"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              scrollToTopInstant();
              navigate(`/projects/${prevProjectId}`);
            }
          }}
          role="button"
        >
          {/* Overlay on hover */}
          <div className="absolute inset-0 z-0 transition duration-200 opacity-100 white group-hover:bg-gray-200/40" />
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 flex items-center justify-center transition">
              <svg
                className="h-8 w-8 text-gray-500 transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </div>
          {/* Tooltip */}
          <div className="absolute left-36 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
            {t("common.project_nav_prev")}
          </div>
        </div>
        {/* Right Side */}
        <div
          className="hidden md:block fixed top-0 right-0 h-full w-32 z-[100] group cursor-pointer transition flex items-center justify-end"
          onClick={() => {
            scrollToTopInstant();
            navigate(`/projects/${nextProjectId}`);
          }}
          aria-label="Next project"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              scrollToTopInstant();
              navigate(`/projects/${nextProjectId}`);
            }
          }}
          role="button"
        >
          {/* Overlay on hover */}
          <div className="absolute inset-0 z-0 transition duration-200 opacity-100 white group-hover:bg-gray-200/40" />
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 flex items-center justify-center transition">
              <svg
                className="h-8 w-8 text-gray-500 transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          {/* Tooltip */}
          <div className="absolute right-36 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
            {t("common.project_nav_next")}
          </div>
        </div>
      </div>

      {/* Mobile-only: show just the circle button with arrow, fixed at bottom left */}
      <button
        className="md:hidden fixed left-4 top-1/2 -translate-y-1/2 z-[101] w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 flex items-center justify-center shadow transition"
        onClick={() => {
          scrollToTopInstant();
          navigate(`/projects/${prevProjectId}`);
        }}
        aria-label="Previous project"
      >
        <svg
          className="h-8 w-8 text-gray-500 transition"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Mobile-only: show just the circle button with arrow, fixed at bottom right */}
      <button
        className="md:hidden fixed right-4 top-1/2 -translate-y-1/2 z-[101] w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 flex items-center justify-center shadow transition"
        onClick={() => {
          scrollToTopInstant();
          navigate(`/projects/${nextProjectId}`);
        }}
        aria-label="Next project"
      >
        <svg
          className="h-8 w-8 text-gray-500 transition"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="container mx-auto w-full py-6 px-2 sm:px-4">
        <Head>
          <title>
            {project.introduction.name} Project - Kamal Ait Yous Portfolio
          </title>
          <meta name="description" content={project.description} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={SEO_BASE_URL + location.pathname} />
          <meta
            property="og:title"
            content={`${project.introduction.name} Project - Kamal Ait Yous Portfolio`}
          />
          <meta property="og:description" content={project.description} />
          <meta property="og:image" content={SEO_DEFAULT_IMAGE} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={SEO_BASE_URL + location.pathname} />
          <meta
            name="twitter:title"
            content={`${project.introduction.name} Project - Kamal Ait Yous Portfolio`}
          />
          <meta name="twitter:description" content={project.description} />
          <meta name="twitter:image" content={SEO_DEFAULT_IMAGE} />
        </Head>

        {/* Project Header */}
        <div className="max-w-4xl w-full mx-auto mt-10 sm:mt-16 mb-8 sm:mb-12 px-0 sm:px-4">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white text-left font-montserrat uppercase break-words">
            {project.introduction.name}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-400 mb-6 sm:mb-8 leading-snug max-w-3xl">
            {project.description}
          </p>

          {/* Project Image */}
          {project.img && (
            <img
              src={project.img}
              alt={project.introduction.name}
              className="mb-8 w-full max-h-72 object-contain rounded-lg shadow"
              style={{ background: "#f8fafc" }}
              width={640}
              height={288}
              loading="eager"
              decoding="async"
            />
          )}

          {project.impactSummary && (
            <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
              <h2 className="text-sm font-semibold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider mb-2">
                {t("common.project_impact_title")}
              </h2>
              <p className="text-gray-700 dark:text-slate-200 leading-relaxed">
                {project.impactSummary}
              </p>
            </div>
          )}

          {project.postDeliveryTitle && project.postDeliveryBody && (
            <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-600">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                {project.postDeliveryTitle}
              </h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-justify">
                {project.postDeliveryBody}
              </p>
              {project.postDeliveryFootnote && (
                <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-600 pt-3">
                  {project.postDeliveryFootnote}
                </p>
              )}
            </div>
          )}

          {/* Project Stats — only show known values (no fake fallbacks) */}
          {(typeof project.duration === "number" ||
            typeof project.team === "number" ||
            project.period ||
            project.location) && (
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8 -ml-2 sm:-ml-4">
              {typeof project.duration === "number" && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-slate-300">
                    {t("common.duration", { count: project.duration })}
                  </span>
                </div>
              )}
              {typeof project.team === "number" && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span className="text-gray-700 dark:text-slate-300">
                    {t("common.team", { count: project.team })}
                  </span>
                </div>
              )}
              {project.period && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-slate-300">
                    {t("common.period", { period: project.period })}
                  </span>
                </div>
              )}
              {project.location && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-slate-300">
                    {project.location}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Main Technologies and Soft Skills */}
          <div className="space-y-4 mb-6 sm:mb-8">
            {/* Main Technologies */}
            {mainTechnologies.length > 0 && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <span className="text-gray-700 dark:text-slate-300 font-medium min-w-[100px] sm:min-w-[120px]">
                  {t("common.technologies")}
                </span>
                <div className="flex flex-wrap gap-1.5 w-full">
                  {mainTechnologies.map((tech, index) => (
                    <SkillPill
                      key={tech}
                      skill={{
                        name: tech,
                        icon: skillIcons[tech],
                        description: t(
                          `skills_desc.${tech}`,
                          SKILL_DESCRIPTIONS[tech]
                            ? { defaultValue: SKILL_DESCRIPTIONS[tech] }
                            : {},
                        ),
                      }}
                      idx={index}
                      mastered={false}
                      masteredTooltip={t("common.skills_mastered_tooltip")}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Soft Skills */}
            {softSkills.length > 0 && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <span className="text-gray-700 dark:text-slate-300 font-medium min-w-[100px] sm:min-w-[120px]">
                  {t("common.softSkills")}
                </span>
                <div className="flex flex-wrap gap-1.5 w-full">
                  {softSkills.map((skill, index) => (
                    <SkillPill
                      key={skill}
                      skill={{
                        name: skill,
                        isSoft: true,
                        description: t(
                          `skills_desc.${skill}`,
                          SKILL_DESCRIPTIONS[skill]
                            ? { defaultValue: SKILL_DESCRIPTIONS[skill] }
                            : {},
                        ),
                      }}
                      idx={index}
                      mastered={false}
                      masteredTooltip={t("common.skills_mastered_tooltip")}
                      isSoft={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Technologies Used */}
          {technologies.length > 0 && (
            <div className="mb-8 sm:mb-12 bg-gray-50 dark:bg-slate-800 p-4 sm:p-6 rounded-lg w-full overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white text-left">
                Technologies & Skills
              </h2>
              <div className="flex flex-wrap gap-2 justify-start w-full">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-slate-200 rounded-full text-sm border border-blue-500 dark:border-slate-600"
                  >
                    {highlightTerms(tech)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Overview */}
          <div className="max-w-4xl w-full mx-auto mb-8 sm:mb-12 px-0 sm:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 bg-gray-50 dark:bg-slate-800 p-4 sm:p-6 rounded-lg w-full">
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white text-left">
                  {t("common.projectContext")}
                </h2>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-justify text-sm sm:text-base">
                  {project.introduction.introduction}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white text-left">
                  {t("common.myRole")}
                </h2>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-justify text-sm sm:text-base">
                  {project.introduction.description}
                </p>
              </div>
            </div>
          </div>

          {missionAnchors.length > 0 && (
            <div className="max-w-4xl w-full mx-auto mb-8 sm:mb-12 px-0 sm:px-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white text-left">
                {t("common.project_missions_title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {missionAnchors.map((anchor) => (
                  <MissionAnchorCard
                    key={anchor.anchorId || anchor.href || anchor.title}
                    anchor={anchor}
                    caseStudyLabel={t("common.project_anchor_case_study")}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Key Actions & Impact */}
          {project.tasks && project.tasks.length > 0 && (
            <div className="max-w-4xl w-full mx-auto mb-8 sm:mb-12 px-0 sm:px-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white text-left">
                {t("common.keyActions")}
              </h2>
              <div className="space-y-6 sm:space-y-8">
                {project.tasks.map((taskGroup, groupIndex) => (
                  <div
                    key={groupIndex}
                    id={taskGroup.group.anchorId || undefined}
                    className="relative bg-gray-50 dark:bg-slate-800 p-4 sm:p-6 rounded-lg w-full overflow-x-auto scroll-mt-28"
                  >
                    <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white text-left">
                      {taskGroup.group.titre}
                    </h3>
                    {taskGroup.group.intro && (
                      <p className="mb-4 text-gray-700 dark:text-slate-300 leading-relaxed text-justify">
                        {taskGroup.group.intro}
                      </p>
                    )}
                    <div className="space-y-6">
                      {Object.keys(taskGroup.data).map((taskId, dataIndex) => (
                        <div
                          key={dataIndex}
                          className="relative pl-4 sm:pl-6 before:absolute before:left-0 before:top-2 before:w-1 before:h-[calc(100%-1rem)] before:bg-blue-500"
                        >
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-2 text-left">
                            {taskGroup.data[taskId].title}
                          </h4>
                          <ul className="list-disc list-inside text-gray-700 dark:text-slate-300 space-y-1 sm:space-y-1.5 break-words">
                            {taskGroup.data[taskId].description.map(
                              (desc, idx) => (
                                <li
                                  key={idx}
                                  className="leading-relaxed text-justify"
                                >
                                  {highlightTerms(desc)}
                                </li>
                              ),
                            )}
                          </ul>
                          {taskGroup.data[taskId].img && (
                            <img
                              src={taskGroup.data[taskId].img}
                              alt={taskGroup.data[taskId].title}
                              className="mt-4 max-w-full h-auto rounded-lg mx-auto"
                              style={{ maxWidth: "100%" }}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges & Solutions */}
          {(challenges.length > 0 || solutions.length > 0) && (
            <div className="max-w-4xl w-full mx-auto mb-8 sm:mb-12 px-0 sm:px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 w-full">
                {challenges.length > 0 && (
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 sm:p-6 rounded-lg w-full overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white text-left">
                      {t("common.keyChallenges")}
                    </h2>
                    <ul className="space-y-2 sm:space-y-3">
                      {challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-gray-700 dark:text-slate-300 text-justify">
                            {challenge}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {solutions.length > 0 && (
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 sm:p-6 rounded-lg w-full overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white text-left">
                      {t("common.solutionsImplemented")}
                    </h2>
                    <ul className="space-y-2 sm:space-y-3">
                      {solutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-gray-700 dark:text-slate-300 text-justify">
                            {solution}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Expert Insights / Log de Fiabilisation (Blachère) */}
          {projectId === "bbg" && (
            <div className="max-w-4xl w-full mx-auto mb-8 sm:mb-12 px-0 sm:px-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white text-left">
                {t("common.expert_insights_title")}
              </h2>
              <div className="space-y-4 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 p-4 sm:p-6">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-sm font-mono">
                    1
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm uppercase tracking-wider mb-0.5">
                      {t("common.changelog_refactor_title")}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                      {t("common.changelog_refactor_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-sm font-mono">
                    2
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm uppercase tracking-wider mb-0.5">
                      {t("common.changelog_perf_title")}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                      {t("common.changelog_perf_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-sm font-mono">
                    3
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm uppercase tracking-wider mb-0.5">
                      {t("common.changelog_qa_title")}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                      {t("common.changelog_qa_desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* External Links */}
          {externalLinks.length > 0 && (
            <div className="max-w-4xl w-full mx-auto mb-8 sm:mb-12 px-0 sm:px-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white text-left">
                {t("common.externalLinks")}
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-start w-full">
                {externalLinks.map((link, index) => {
                  const linkClass =
                    "inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors duration-200";
                  const icon = (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  );
                  if (link.url?.startsWith("/")) {
                    return (
                      <Link key={index} to={link.url} className={linkClass}>
                        {icon}
                        {link.name}
                      </Link>
                    );
                  }
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {icon}
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Go to Top button */}
      <GoToTop />
    </div>
  );
};

export default ProjectDetail;
