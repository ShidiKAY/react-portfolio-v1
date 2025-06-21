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
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

const SkillsModern = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Flatten skills for "All"
  const allSkills = Object.entries(skills).flatMap(([cat, arr]) =>
    arr.map((s) => ({ ...s, category: cat }))
  );
  const displayedSkills =
    selectedCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === selectedCategory);

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
        {/* Filtres catégories */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
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
              {cat}
            </button>
          ))}
        </div>
        {/* Pills grid */}
        <div className="flex flex-wrap gap-2 justify-center">
          {displayedSkills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.span
                key={skill.name}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer select-none transition"
                tabIndex={0}
                aria-label={
                  skill.name +
                  (SKILL_DESCRIPTIONS[skill.name]
                    ? ": " + SKILL_DESCRIPTIONS[skill.name]
                    : "")
                }
                title={SKILL_DESCRIPTIONS[skill.name] || skill.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: idx * 0.03 }}
              >
                {Icon && <Icon size={18} className="text-blue-500" />}
                {skill.name}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsModern;
