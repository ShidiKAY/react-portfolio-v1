import {
  FaCss3Alt,
  FaHtml5,
  FaJs,
  FaPhp,
  FaLinux,
  FaGithub,
  FaChartBar,
  FaDatabase,
  FaServer,
  FaClock,
  FaNetworkWired,
  FaBootstrap,
  FaCube,
  FaPuzzlePiece,
  FaKey,
  FaCogs,
  FaNodeJs,
} from "react-icons/fa";
import { DiDotnet } from "react-icons/di";
import {
  SiMysql,
  SiSymfony,
  SiDocker,
  SiZend,
  SiVuedotjs,
  SiApache,
  SiJira,
  SiDotnet,
  SiUikit,
  SiYarn,
  SiNestjs,
  SiTypescript,
  SiCypress,
  SiKubernetes,
  SiGitlab,
  SiReact,
} from "react-icons/si";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const SKILL_DESCRIPTIONS = {
  Symfony: "PHP framework for scalable web apps.",
  NestJS: "Node.js framework for scalable server-side apps.",
  Zend: "Enterprise PHP framework.",
  PHP: "Popular server-side scripting language.",
  "Node.js": "JavaScript runtime for server-side applications.",
  MySQL: "Relational database management system.",
  SQL: "Structured Query Language for databases.",
  "REST API": "Web API using RESTful principles.",
  DDD: "Domain-Driven Design for clear business boundaries.",
  HTML: "Markup language for web pages.",
  CSS: "Styling language for web pages.",
  JavaScript: "Dynamic scripting for web apps.",
  TypeScript: "Typed superset of JavaScript.",
  "Vue.js": "Progressive JavaScript framework.",
  React: "Library for building user interfaces.",
  ".NET": ".NET platform for apps.",
  "C#": "Modern object-oriented language.",
  "ASP.NET": ".NET web framework.",
  Docker: "Containerization platform.",
  Kubernetes: "Container orchestration platform.",
  "GitLab CI": "CI/CD pipelines with GitLab.",
  GIT: "Version control system.",
  Apache: "Web server software.",
  Cron: "Task scheduler for Unix systems.",
  Samba: "File sharing for networks.",
  Ubuntu: "Popular Linux distribution.",
  ApexCharts: "Data visualization library.",
  Jira: "Project management tool.",
  Cypress: "End-to-end testing framework.",
  BDD: "Behavior-Driven Development for shared specs.",
  "E2E Testing": "End-to-end tests on critical user journeys.",
  Bootstrap: "Popular CSS framework for responsive web design.",
  UIkit: "Lightweight and modular front-end framework.",
  Yarn: "Fast, reliable, and secure dependency management.",
  DQL: "Doctrine Query Language for database queries in PHP.",
  Sphinx: "Full-text search engine for fast information retrieval.",
  Powershell:
    "Task automation and configuration management framework from Microsoft.",
  LDAP: "Protocol for accessing and maintaining distributed directory information services.",
  "API Platform": "Framework to build modern API-driven projects.",
  "Autonomous Work": "Ability to work independently.",
  "Written Culture": "Clear written collaboration: tickets, docs, and PRs that keep teams aligned.",
  "Business & Quality Vision":
    "Business-aware delivery with a strong quality mindset.",
  Communication: "Effectively conveying information and ideas.",
  "Problem Solving": "Ability to analyze and resolve complex issues.",
  French: "Native French.",
  English: "Professional working English.",
  Italian: "Italian language skills.",
  "Chinese (basics)": "Basic Chinese.",
};

/** Internal skill names → i18n key under common.* for pill display. */
const SOFT_SKILL_LABEL_KEY = {
  "Autonomous Work": "softskill_autonomous_work",
  "Written Culture": "softskill_written_culture",
  "Business & Quality Vision": "softskill_business_quality",
  Communication: "softskill_communication",
  "Problem Solving": "softskill_problem_solving",
};

const LANGUAGE_LABEL_KEY = {
  French: "lang_french",
  English: "lang_english",
  Italian: "lang_italian",
  "Chinese (basics)": "lang_chinese_basics",
};

const MASTERED_SKILLS = [
  "Symfony",
  "PHP",
  "Vue.js",
  "MySQL",
  "Docker",
  "GIT",
  "JavaScript",
  "TypeScript",
  "Cypress",
  "NestJS",
];

const SOFT_SKILLS = [
  "Autonomous Work",
  "Written Culture",
  "Business & Quality Vision",
  "Communication",
  "Problem Solving",
];

const skills = {
  Backend: [
    { name: "PHP", icon: FaPhp },
    { name: "Symfony", icon: SiSymfony },
    { name: "NestJS", icon: SiNestjs },
    { name: "Node.js", icon: FaNodeJs },
    { name: "DDD" },
    { name: "REST API", icon: FaServer },
    { name: "API Platform", icon: FaPuzzlePiece },
    { name: "C#", icon: SiDotnet },
    { name: "ASP.NET", icon: SiDotnet },
    { name: ".NET", icon: DiDotnet },
    { name: "Zend", icon: SiZend },
  ],
  Frontend: [
    { name: "Vue.js", icon: SiVuedotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "JavaScript", icon: FaJs },
    { name: "React", icon: SiReact },
    { name: "HTML", icon: FaHtml5 },
    { name: "CSS", icon: FaCss3Alt },
    { name: "Bootstrap", icon: FaBootstrap },
    { name: "UIkit", icon: SiUikit },
  ],
  Quality: [
    { name: "Cypress", icon: SiCypress },
    { name: "BDD" },
    { name: "E2E Testing" },
    { name: "GitLab CI", icon: SiGitlab },
  ],
  DevOps: [
    { name: "Docker", icon: SiDocker },
    { name: "Kubernetes", icon: SiKubernetes },
    { name: "GIT", icon: FaGithub },
    { name: "Ubuntu", icon: FaLinux },
    { name: "Apache", icon: SiApache },
    { name: "Cron", icon: FaClock },
    { name: "Samba", icon: FaNetworkWired },
    { name: "Powershell", icon: FaCogs },
  ],
  Data: [
    { name: "MySQL", icon: SiMysql },
    { name: "SQL", icon: FaDatabase },
    { name: "DQL", icon: FaKey },
    { name: "ApexCharts", icon: FaChartBar },
    { name: "Sphinx", icon: FaCube },
    { name: "Jira", icon: SiJira },
    { name: "Yarn", icon: SiYarn },
    { name: "LDAP", icon: FaKey },
  ],
  SoftSkills: SOFT_SKILLS.map((name) => ({ name, isSoft: true })),
  Languages: [
    { name: "French" },
    { name: "English" },
    { name: "Italian" },
    { name: "Chinese (basics)" },
  ],
};

const categories = ["All", ...Object.keys(skills)];

const SkillPill = ({ skill, idx, mastered, masteredTooltip, isSoft }) => {
  const { t } = useTranslation();
  const Icon = skill.icon;
  const hasDesc = !!SKILL_DESCRIPTIONS[skill.name];
  const [showTooltip, setShowTooltip] = useState(false);
  const pillRef = useRef(null);

  let displayName = skill.name;
  const softLabelKey = SOFT_SKILL_LABEL_KEY[skill.name];
  if (softLabelKey) displayName = t(`common.${softLabelKey}`);
  const langLabelKey = LANGUAGE_LABEL_KEY[skill.name];
  if (langLabelKey) displayName = t(`common.${langLabelKey}`);

  const isSoftSkill = isSoft || SOFT_SKILLS.includes(skill.name);
  const pillClass = isSoftSkill
    ? "relative inline-flex items-center gap-1 px-3 py-1 bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm border border-purple-300 dark:border-purple-700 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer select-none transition"
    : "relative inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-slate-200 rounded-full text-sm border border-blue-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer select-none transition";
  const tooltipClass = isSoftSkill
    ? "absolute left-0 bottom-full mb-1 z-50 px-2 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200 text-xs text-center whitespace-pre-line pointer-events-none min-w-max max-w-xs break-words"
    : "absolute left-0 bottom-full mb-1 z-50 px-2 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-600 text-gray-700 dark:text-slate-200 text-xs text-center whitespace-pre-line pointer-events-none min-w-max max-w-xs break-words";

  const tooltipText = t(
    `skills_desc.${skill.name}`,
    SKILL_DESCRIPTIONS[skill.name]
      ? { defaultValue: SKILL_DESCRIPTIONS[skill.name] }
      : {}
  );
  return (
    <motion.span
      ref={pillRef}
      className={pillClass}
      tabIndex={0}
      aria-label={skill.name + (hasDesc ? ": " + tooltipText : "")}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: idx * 0.03 }}
    >
      {Icon && (
        <Icon
          size={18}
          className={isSoftSkill ? "text-purple-400" : "text-blue-500"}
          aria-hidden
          focusable={false}
        />
      )}
      {displayName}
      {mastered && (
        <span className="ml-1" title={masteredTooltip}>
          ⭐
        </span>
      )}
      {hasDesc && showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className={tooltipClass}
          aria-live="polite"
        >
          {tooltipText}
        </motion.div>
      )}
    </motion.span>
  );
};

SkillPill.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    isSoft: PropTypes.bool,
  }).isRequired,
  idx: PropTypes.number.isRequired,
  mastered: PropTypes.bool.isRequired,
  masteredTooltip: PropTypes.string.isRequired,
  isSoft: PropTypes.bool,
};

const SkillsModern = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fadeIn, setFadeIn] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const allSkills = Object.entries(skills)
    .filter(([cat]) => cat !== "SoftSkills" && cat !== "Languages")
    .flatMap(([cat, arr]) => arr.map((s) => ({ ...s, category: cat })));
  let displayedSkills;
  if (selectedCategory === "All") {
    displayedSkills = allSkills.filter((s) =>
      s.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  } else if (selectedCategory === "SoftSkills") {
    displayedSkills = skills.SoftSkills.filter((s) =>
      s.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  } else if (selectedCategory === "Languages") {
    displayedSkills = skills.Languages.filter((s) =>
      s.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  } else {
    displayedSkills = allSkills.filter(
      (s) =>
        s.category === selectedCategory &&
        s.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }

  return (
    <section
      className={`w-full py-10 px-2 transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-5xl mx-auto max-w-full overflow-hidden px-2 md:px-0 lg:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 dark:text-blue-200 mb-6 tracking-tight">
          {t("common.skills")}
        </h2>
        <div className="flex flex-col md:flex-row gap-2 mb-6 items-center w-full">
          <div
            className="skills-scrollbar flex flex-row gap-2 overflow-x-auto flex-nowrap md:overflow-x-visible md:flex-wrap w-full md:max-w-fit md:w-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent py-2 px-1"
            style={{ scrollbarColor: "#cbd5e1 #fff", scrollbarWidth: "thin" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-3 py-1 rounded-full font-medium border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                  ${
                    selectedCategory === cat
                      ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500"
                      : "bg-white dark:bg-slate-800 text-blue-700 dark:text-slate-200 border-blue-200 dark:border-slate-600 hover:bg-blue-100 dark:hover:bg-slate-700"
                  }
                `}
                onClick={() => setSelectedCategory(cat)}
                tabIndex={0}
                aria-label={cat}
              >
                {cat === "All"
                  ? t("common.skills_category_All")
                  : t("common.skills_category_" + cat)}
              </button>
            ))}
          </div>
          <div className="relative flex-shrink-0 min-w-[130px] max-w-[180px] w-full ml-0 md:ml-1 mt-2 md:mt-0">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M21 21l-3.5-3.5"
                />
              </svg>
            </span>
            <input
              type="text"
              className="pl-9 pr-3 py-1.5 rounded-full border border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full min-w-0"
              placeholder={t("common.skills_search_placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label={t("common.skills_search_aria")}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center items-center w-full mx-auto py-2 px-1">
          {displayedSkills.map((skill, idx) => {
            const mastered = MASTERED_SKILLS.includes(skill.name);
            return (
              <SkillPill
                key={skill.name}
                skill={skill}
                idx={idx}
                mastered={mastered}
                masteredTooltip={t("common.skills_mastered_tooltip")}
                isSoft={skill.isSoft}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsModern;
export { SkillPill };

export const skillIcons = {};
Object.values(skills)
  .flat()
  .forEach(({ name, icon }) => {
    if (icon) skillIcons[name] = icon;
  });

export { SKILL_DESCRIPTIONS };
