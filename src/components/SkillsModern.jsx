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

const skills = {
  Backend: [
    { name: "Symfony", icon: SiSymfony },
    { name: "Cake", icon: SiCakephp },
    { name: "Zend", icon: SiZend },
    { name: "PHP", icon: FaPhp },
    { name: "MySQL", icon: SiMysql },
    { name: "SQL", icon: FaDatabase },
    { name: "REST API", icon: FaServer },
  ],
  Frontend: [
    { name: "HTML", icon: FaHtml5 },
    { name: "CSS", icon: FaCss3Alt },
    { name: "JavaScript", icon: FaJs },
    { name: "Vue.js", icon: SiVuedotjs },
    { name: "jQuery", icon: SiJquery },
  ],
  Fullstack: [
    { name: ".NET", icon: DiDotnet },
    { name: "C#", icon: SiCsharp },
    { name: "ASP.NET", icon: SiDotnet },
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
  ],
  Other: [{ name: "Méthode Agile" }, { name: "Conception Web" }],
};

const categories = ["All", ...Object.keys(skills)];

const SkillPill = ({ skill, idx, mastered, masteredTooltip }) => {
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
  return (
    <motion.span
      ref={pillRef}
      className="relative inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer select-none transition"
      tabIndex={0}
      aria-label={
        skill.name + (hasDesc ? ": " + SKILL_DESCRIPTIONS[skill.name] : "")
      }
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: idx * 0.03 }}
    >
      {Icon && <Icon size={18} className="text-blue-500" />}
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
          className="absolute left-0 bottom-full mb-1 z-30 px-2 py-1.5 rounded-xl bg-white/90 shadow-lg border border-blue-100 text-gray-700 text-xs text-center whitespace-pre-line pointer-events-none min-w-max max-w-xs break-words"
          aria-live="polite"
        >
          {SKILL_DESCRIPTIONS[skill.name]}
        </motion.div>
      )}
    </motion.span>
  );
};

SkillPill.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
  }).isRequired,
  idx: PropTypes.number.isRequired,
  mastered: PropTypes.bool.isRequired,
  masteredTooltip: PropTypes.string.isRequired,
};

const SkillsModern = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fadeIn, setFadeIn] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Flatten skills for "All"
  const allSkills = Object.entries(skills).flatMap(([cat, arr]) =>
    arr.map((s) => ({ ...s, category: cat }))
  );
  const displayedSkills = (
    selectedCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === selectedCategory)
  ).filter((s) => s.name.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <section
      className={`w-full py-10 px-2 transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-6 tracking-tight">
          {t("common.skills")}
        </h2>
        {/* Filtres catégories + recherche */}
        <div className="flex flex-wrap justify-center md:justify-between gap-2 mb-6 items-center">
          <div className="flex flex-wrap gap-2">
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
                {cat === "All" ? "All" : t("common.skills_category_" + cat)}
              </button>
            ))}
          </div>
          <div className="flex-grow max-w-xs w-full relative ml-2">
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
              className="pl-9 pr-3 py-1.5 rounded-full border border-blue-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              placeholder={t("common.skills_search_placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label={t("common.skills_search_aria")}
            />
          </div>
        </div>
        {/* Pills grid */}
        <div className="flex flex-wrap gap-2 justify-center">
          {displayedSkills.map((skill, idx) => {
            const mastered = MASTERED_SKILLS.includes(skill.name);
            return (
              <SkillPill
                key={skill.name}
                skill={skill}
                idx={idx}
                mastered={mastered}
                masteredTooltip={t("common.skills_mastered_tooltip")}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsModern;
