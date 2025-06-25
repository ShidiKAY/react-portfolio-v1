import {
  FaCss3Alt,
  FaHtml5,
  FaJs,
  FaPhp,
  FaLinux,
  FaGithub,
  FaChartBar,
  FaDatabase,
  FaCloud,
  FaSync,
  FaServer,
  FaClock,
  FaNetworkWired,
  FaBootstrap,
  FaCube,
  FaPuzzlePiece,
  FaKey,
  FaCogs,
  FaLayerGroup,
} from "react-icons/fa";
import { DiDotnet } from "react-icons/di";
import {
  SiMysql,
  SiSymfony,
  SiDocker,
  SiZend,
  SiCakephp,
  SiJquery,
  SiVuedotjs,
  SiApache,
  SiJira,
  SiCsharp,
  SiDotnet,
  SiUikit,
  SiYarn,
  SiWebpack,
} from "react-icons/si";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const SKILL_DESCRIPTIONS = {
  Symfony: "PHP framework for scalable web apps.",
  Cake: "Rapid development PHP framework.",
  Zend: "Enterprise PHP framework.",
  PHP: "Popular server-side scripting language.",
  MySQL: "Relational database management system.",
  SQL: "Structured Query Language for databases.",
  "REST API": "Web API using RESTful principles.",
  HTML: "Markup language for web pages.",
  CSS: "Styling language for web pages.",
  JavaScript: "Dynamic scripting for web apps.",
  "Vue.js": "Progressive JavaScript framework.",
  jQuery: "JS library for DOM manipulation.",
  ".NET": ".NET platform for apps.",
  "C#": "Modern object-oriented language.",
  "ASP.NET": ".NET web framework.",
  Docker: "Containerization platform.",
  GIT: "Version control system.",
  Apache: "Web server software.",
  Cron: "Task scheduler for Unix systems.",
  Samba: "File sharing for networks.",
  Ubuntu: "Popular Linux distribution.",
  ApexCharts: "Data visualization library.",
  Jira: "Project management tool.",
  Webservices: "Interoperable machine-to-machine services.",
  AJAX: "Asynchronous JS and XML.",
  "Méthode Agile": "Agile project management.",
  "Conception Web": "Web design best practices.",
  Bootstrap: "Popular CSS framework for responsive web design.",
  UIkit: "Lightweight and modular front-end framework.",
  Yarn: "Fast, reliable, and secure dependency management.",
  DQL: "Doctrine Query Language for database queries in PHP.",
  Sphinx: "Full-text search engine for fast information retrieval.",
  Powershell:
    "Task automation and configuration management framework from Microsoft.",
  LDAP: "Protocol for accessing and maintaining distributed directory information services.",
  "API Platform": "Framework to build modern API-driven projects.",
  "Material Design":
    "Design language developed by Google for consistent UI/UX.",
  OpenVas: "Open-source vulnerability scanner and manager.",
  "Webpack Encore": "Symfony's wrapper for Webpack, for asset management.",
  Teamwork: "Ability to work effectively within a team.",
  "Team Collaboration": "Ability to work effectively within a team.",
  "Problem Solving": "Ability to analyze and resolve complex issues.",
  "Technical Documentation": "Writing and maintaining technical documentation.",
  "User Experience Design":
    "Designing user-friendly and accessible interfaces.",
  "Data Visualization": "Presenting data in a clear and impactful way.",
  "UI/UX Design": "Designing modern, responsive user interfaces.",
  "Version Control": "Managing code changes and collaboration.",
  "Leadership Technique":
    "Leading teams and projects with technical expertise.",
  "Architecture Système": "Designing robust and scalable system architectures.",
  "Optimisation des Performances":
    "Improving application speed and efficiency.",
  "Fullstack Development":
    "Experience with both front-end and back-end development.",
  "API Design": "Designing robust and scalable APIs.",
  "Community Management": "Managing and engaging with user communities.",
  "Process Automation": "Automating repetitive tasks and processes.",
  "Data Processing": "Handling and transforming data efficiently.",
  Reliability: "Ensuring systems are dependable and robust.",
  "Autonomous Work": "Ability to work independently.",
  Proactivity: "Taking initiative and acting in advance.",
  Responsiveness: "Reacting quickly and positively.",
  Initiative: "Ability to assess and initiate things independently.",
  Communication: "Effectively conveying information and ideas.",
  "Force de proposition": "Ability to propose ideas and solutions.",
  "Travail en autonomie": "Ability to work independently.",
  Réactivité: "Ability to react quickly and efficiently.",
  "Automatisation des processus":
    "Implementing solutions to automate repetitive tasks.",
  "Traitement de données": "Efficient data management and transformation.",
  Fiabilité: "Ensuring system robustness and stability.",
};

const MASTERED_SKILLS = [
  "Symfony",
  "Cake",
  "PHP",
  "MySQL",
  "HTML",
  "CSS",
  "JavaScript",
  "Docker",
  "GIT",
  "Ubuntu",
  "Jira",
];

const SOFT_SKILLS = [
  "Teamwork",
  "Team Collaboration",
  "Problem Solving",
  "Technical Documentation",
  "User Experience Design",
  "Data Visualization",
  "UI/UX Design",
  "Version Control",
  "Leadership Technique",
  "Architecture Système",
  "Optimisation des Performances",
  "Fullstack Development",
  "API Design",
  "Community Management",
  "Process Automation",
  "Data Processing",
  "Reliability",
  "Autonomous Work",
  "Proactivity",
  "Responsiveness",
  "Initiative",
  "Communication",
  "Force de proposition",
  "Travail en autonomie",
  "Réactivité",
  "Automatisation des processus",
  "Traitement de données",
  "Fiabilité",
];

const skills = {
  Backend: [
    { name: "Symfony", icon: SiSymfony },
    { name: "Cake", icon: SiCakephp },
    { name: "Zend", icon: SiZend },
    { name: "PHP", icon: FaPhp },
    { name: "MySQL", icon: SiMysql },
    { name: "SQL", icon: FaDatabase },
    { name: "REST API", icon: FaServer },
    { name: "DQL", icon: FaKey },
    { name: "Sphinx", icon: FaCube },
    { name: "LDAP", icon: FaKey },
    { name: "API Platform", icon: FaPuzzlePiece },
    { name: "OpenVas", icon: FaCogs },
  ],
  Frontend: [
    { name: "HTML", icon: FaHtml5 },
    { name: "CSS", icon: FaCss3Alt },
    { name: "JavaScript", icon: FaJs },
    { name: "Vue.js", icon: SiVuedotjs },
    { name: "jQuery", icon: SiJquery },
    { name: "Bootstrap", icon: FaBootstrap },
    { name: "UIkit", icon: SiUikit },
    { name: "Material Design", icon: FaLayerGroup },
  ],
  Fullstack: [
    { name: ".NET", icon: DiDotnet },
    { name: "C#", icon: SiCsharp },
    { name: "ASP.NET", icon: SiDotnet },
    { name: "Yarn", icon: SiYarn },
    { name: "Webpack Encore", icon: SiWebpack },
  ],
  DevOps: [
    { name: "Docker", icon: SiDocker },
    { name: "GIT", icon: FaGithub },
    { name: "Apache", icon: SiApache },
    { name: "Cron", icon: FaClock },
    { name: "Samba", icon: FaNetworkWired },
    { name: "Ubuntu", icon: FaLinux },
  ],
  Data: [
    { name: "ApexCharts", icon: FaChartBar },
    { name: "Jira", icon: SiJira },
    { name: "Webservices", icon: FaCloud },
    { name: "AJAX", icon: FaSync },
    { name: "Powershell", icon: FaCogs },
  ],
  Other: [{ name: "Méthode Agile" }, { name: "Conception Web" }],
  SoftSkills: SOFT_SKILLS.map((name) => ({ name, isSoft: true })),
};

const categories = ["All", ...Object.keys(skills)];

const SkillPill = ({ skill, idx, mastered, masteredTooltip, isSoft }) => {
  const { t } = useTranslation();
  const Icon = skill.icon;
  const hasDesc = !!SKILL_DESCRIPTIONS[skill.name];
  const [showTooltip, setShowTooltip] = useState(false);
  const pillRef = useRef(null);
  // Traduction pour les skills "Other"
  let displayName = skill.name;
  if (skill.name === "Méthode Agile")
    displayName = t("common.skills_other_agile");
  if (skill.name === "Conception Web")
    displayName = t("common.skills_other_webdesign");
  // Determine if soft skill
  const isSoftSkill = isSoft || SOFT_SKILLS.includes(skill.name);
  const pillClass = isSoftSkill
    ? "relative inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 cursor-pointer select-none transition"
    : "relative inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer select-none transition";
  const tooltipClass = isSoftSkill
    ? "absolute left-0 bottom-full mb-1 z-50 px-2 py-1.5 rounded-xl bg-white/90 border border-purple-200 text-purple-800 text-xs text-center whitespace-pre-line pointer-events-none min-w-max max-w-xs break-words"
    : "absolute left-0 bottom-full mb-1 z-50 px-2 py-1.5 rounded-xl bg-white/90 border border-blue-100 text-gray-700 text-xs text-center whitespace-pre-line pointer-events-none min-w-max max-w-xs break-words";
  // Tooltip: use translation if available, else fallback
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
        />
      )}
      {displayName}
      {mastered && (
        <span className="ml-1" title={masteredTooltip}>
          ⭐
        </span>
      )}
      {/* Custom tooltip */}
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

  // Only include soft skills in 'SoftSkills' filter, not in 'All'
  const allSkills = Object.entries(skills)
    .filter(([cat]) => cat !== "SoftSkills")
    .flatMap(([cat, arr]) => arr.map((s) => ({ ...s, category: cat })));
  let displayedSkills;
  if (selectedCategory === "All") {
    displayedSkills = allSkills.filter((s) =>
      s.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  } else if (selectedCategory === "SoftSkills") {
    displayedSkills = skills["SoftSkills"].filter((s) =>
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
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-6 tracking-tight">
          {t("common.skills")}
        </h2>
        {/* Filtres catégories + recherche */}
        <div className="flex flex-col md:flex-row gap-2 mb-6 items-center w-full">
          <div
            className="skills-scrollbar flex flex-row gap-2 overflow-x-auto flex-nowrap md:overflow-x-visible md:flex-wrap w-full md:max-w-fit md:w-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent"
            style={{ scrollbarColor: "#cbd5e1 #fff", scrollbarWidth: "thin" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-3 py-1 rounded-full font-medium border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                  ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-700 border-blue-200 hover:bg-blue-100"
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
              {/* Icône loupe SVG */}
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
              className="pl-9 pr-3 py-1.5 rounded-full border border-blue-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full min-w-0"
              placeholder={t("common.skills_search_placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label={t("common.skills_search_aria")}
            />
          </div>
        </div>
        {/* Pills grid */}
        <div className="flex flex-wrap gap-2 justify-center items-center w-full mx-auto">
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

// Flat map of skill name to icon for easy lookup
export const skillIcons = {};
Object.values(skills)
  .flat()
  .forEach(({ name, icon }) => {
    if (icon) skillIcons[name] = icon;
  });

export { SKILL_DESCRIPTIONS };

/* Add this CSS to your global stylesheet (e.g., src/styles/globals.css):
@media (min-width: 768px) {
  .skills-scrollbar {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  .skills-scrollbar::-webkit-scrollbar {
    display: none !important;
  }
}
*/
