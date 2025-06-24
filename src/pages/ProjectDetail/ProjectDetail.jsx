import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import Head from "react-helmet";
import { useEffect, useState } from "react";
import GoToTop from "../../components/GoToTop";
import i18n from "../../i18n";
import {
  SkillPill,
  SKILL_DESCRIPTIONS,
  skillIcons,
} from "../../components/SkillsModern";

const PROJECT_ORDER = ["hml", "scf", "bubo", "hopps", "apigem"];

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const navigate = useNavigate();
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
        "gi"
      );
      let parts = rest.split(techPattern).map((part, index) => {
        if (
          technicalTerms.some(
            (term) => term.toLowerCase() === part.toLowerCase()
          )
        ) {
          return (
            <span key={`tech-${lineIdx}-${index}`} className="text-blue-700">
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
                (term) => term.toLowerCase() === subPart.toLowerCase()
              )
            ) {
              return (
                <span
                  key={`impact-${lineIdx}-${index}-${subIndex}`}
                  className="text-purple-700"
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        navigate("/#projects");
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [navigate]);

  const project = t(`projects.${projectId}`, { returnObjects: true });

  if (!project) {
    return <div>Project not found.</div>;
  }

  const technologies = project.technologies || [];
  const externalLinks = project.externalLinks || [];
  const challenges = project.challenges || [];
  const solutions = project.solutions || [];
  const mainTechnologies = project.mainTechnologies || [];
  const softSkills = project.softSkills || [];

  // In the Project Header, use custom values for SC Francophone (scf), Bubo Cybersec (bubo), Alertcenter (hopps), and Harmonia Mundi Livre (hml)
  const isSCF = projectId === "scf";
  const isBubo = projectId === "bubo";
  const isHopps = projectId === "hopps";
  const isHml = projectId === "hml";

  // Find next/previous project IDs
  const currentIdx = PROJECT_ORDER.indexOf(projectId);
  const prevProjectId =
    PROJECT_ORDER[
      (currentIdx - 1 + PROJECT_ORDER.length) % PROJECT_ORDER.length
    ];
  const nextProjectId = PROJECT_ORDER[(currentIdx + 1) % PROJECT_ORDER.length];

  return (
    <div className="relative min-h-screen bg-white">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150 z-[100]"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Fixed back button */}
      <div className="fixed top-4 left-4 z-[200]">
        <button
          onClick={() => navigate("/#projects")}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
          aria-label="Go back"
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
          Back
        </button>
      </div>

      {/* Floating Language Switcher and Print Button - aligned */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-row items-center space-x-2">
        <div className="language-switcher mt-1.5">
          <ul className="flex space-x-2">
            <li
              className="inline-flex items-center cursor-pointer"
              onClick={() => i18n.changeLanguage("en")}
              tabIndex={0}
              aria-label="Switch to English"
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  i18n.changeLanguage("en");
              }}
            >
              <span
                className="i-flagpack-gb-ukm w-8 mt-px"
                title="English"
              ></span>{" "}
              <span className="hidden lg:block">English</span>
            </li>
            <li
              className="inline-flex items-center cursor-pointer"
              onClick={() => i18n.changeLanguage("fr")}
              tabIndex={0}
              aria-label="Switch to French"
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  i18n.changeLanguage("fr");
              }}
            >
              <span
                className="i-flagpack-fr w-8 mb-1 mt-1"
                title="French"
              ></span>
              <span className="hidden lg:block">French</span>
            </li>
          </ul>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
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
          className="fixed top-0 left-0 h-full w-32 z-[100] group cursor-pointer transition flex items-center justify-start"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setTimeout(() => navigate(`/projects/${prevProjectId}`), 200);
          }}
          aria-label="Previous project"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") &&
            navigate(`/projects/${prevProjectId}`)
          }
          role="button"
        >
          {/* Overlay on hover */}
          <div className="absolute inset-0 z-0 transition duration-200 opacity-100 white group-hover:bg-gray-200/40" />
          <div className="relative z-10 flex items-center justify-center w-full">
            <div className="w-14 h-14 rounded-full bg-white/90 border border-gray-300 flex items-center justify-center transition">
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
          className="fixed top-0 right-0 h-full w-32 z-[100] group cursor-pointer transition flex items-center justify-end"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setTimeout(() => navigate(`/projects/${nextProjectId}`), 200);
          }}
          aria-label="Next project"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") &&
            navigate(`/projects/${nextProjectId}`)
          }
          role="button"
        >
          {/* Overlay on hover */}
          <div className="absolute inset-0 z-0 transition duration-200 opacity-100 white group-hover:bg-gray-200/40" />
          <div className="relative z-10 flex items-center justify-center w-full">
            <div className="w-14 h-14 rounded-full bg-white/90 border border-gray-300 flex items-center justify-center transition">
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

      <div className="container mx-auto py-8 px-4">
        <Head>
          <title>
            {project.introduction.name} Project - Kamal Ait Yous Portfolio
          </title>
          <meta name="description" content={project.description} />
        </Head>

        {/* Project Header */}
        <div className="max-w-4xl mx-auto mt-16 mb-12">
          <h1 className="text-5xl font-bold mb-8 text-gray-900 text-left font-montserrat uppercase">
            {project.introduction.name}
          </h1>

          {/* Project Image */}
          {project.img && (
            <img
              src={project.img}
              alt={project.introduction.name}
              className="mb-8 w-full max-h-72 object-contain rounded-lg shadow"
              style={{ background: "#f8fafc" }}
            />
          )}

          <p className="text-xl text-gray-600 mb-8 leading-relaxed text-justify">
            {project.description}
          </p>

          {/* Project Stats */}
          <div className="flex flex-wrap gap-6 mb-8 -ml-4">
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
              <span className="text-gray-700">
                {isSCF
                  ? "12 months"
                  : isBubo
                  ? "12 months"
                  : isHopps
                  ? "24 months"
                  : isHml
                  ? "12 months"
                  : "6 months"}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="text-gray-700">
                {isSCF
                  ? "2 person team"
                  : isBubo
                  ? "3 person team"
                  : isHopps
                  ? "2 person team"
                  : isHml
                  ? "2 person team"
                  : "Team of 5"}
              </span>
            </div>
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
              <span className="text-gray-700">
                {isSCF
                  ? "2021 - 2022"
                  : isBubo
                  ? "2019 - 2020"
                  : isHopps
                  ? "2017 - 2019"
                  : isHml
                  ? "2022 - 2023"
                  : "2023"}
              </span>
            </div>
          </div>

          {/* Main Technologies and Soft Skills */}
          <div className="space-y-4 mb-8">
            {/* Main Technologies */}
            {mainTechnologies.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium min-w-[120px]">
                  {t("common.technologies")}
                </span>
                <div className="flex flex-wrap gap-1.5">
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
                            : {}
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
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium min-w-[120px]">
                  {t("common.softSkills")}
                </span>
                <div className="flex flex-wrap gap-1.5">
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
                            : {}
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
            <div className="mb-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 text-left">
                Technologies & Skills
              </h2>
              <div className="flex flex-wrap gap-2 justify-start">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm border border-blue-500"
                  >
                    {highlightTerms(tech)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Overview */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 p-6 rounded-lg">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 text-left">
                  {t("common.projectContext")}
                </h2>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {project.introduction.introduction}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 text-left">
                  {t("common.myRole")}
                </h2>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {project.introduction.description}
                </p>
              </div>
            </div>
          </div>

          {/* Key Actions & Impact */}
          {project.tasks && project.tasks.length > 0 && (
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 text-left">
                {t("common.keyActions")}
              </h2>
              <div className="space-y-8">
                {project.tasks.map((taskGroup, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="relative bg-gray-50 p-6 rounded-lg"
                  >
                    <h3 className="text-lg font-bold mb-4 text-gray-800 text-left">
                      {taskGroup.group.titre}
                    </h3>
                    {taskGroup.group.intro && (
                      <p className="mb-4 text-gray-700 leading-relaxed text-justify">
                        {taskGroup.group.intro}
                      </p>
                    )}
                    <div className="space-y-6">
                      {Object.keys(taskGroup.data).map((taskId, dataIndex) => (
                        <div
                          key={dataIndex}
                          className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1 before:h-[calc(100%-1rem)] before:bg-blue-500"
                        >
                          <h4 className="font-semibold text-gray-800 mb-3 text-left">
                            {taskGroup.data[taskId].title}
                          </h4>
                          <div className="text-gray-700 space-y-3">
                            {taskGroup.data[taskId].description.map(
                              (desc, idx) => (
                                <p
                                  key={idx}
                                  className="leading-relaxed text-justify"
                                >
                                  {highlightTerms(desc)}
                                </p>
                              )
                            )}
                          </div>
                          {taskGroup.data[taskId].img && (
                            <img
                              src={taskGroup.data[taskId].img}
                              alt={taskGroup.data[taskId].title}
                              className="mt-4 max-w-full h-auto rounded-lg mx-auto"
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
            <div className="max-w-4xl mx-auto mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {challenges.length > 0 && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 text-left">
                      {t("common.keyChallenges")}
                    </h2>
                    <ul className="space-y-3">
                      {challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-gray-700 text-justify">
                            {challenge}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {solutions.length > 0 && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 text-left">
                      {t("common.solutionsImplemented")}
                    </h2>
                    <ul className="space-y-3">
                      {solutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-gray-700 text-justify">
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

          {/* External Links */}
          {externalLinks.length > 0 && (
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 text-left">
                {t("common.externalLinks")}
              </h2>
              <div className="flex flex-wrap gap-3 justify-start">
                {externalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {link.name}
                  </a>
                ))}
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
