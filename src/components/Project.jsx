import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SkillPill, SKILL_DESCRIPTIONS } from "./SkillsModern";
import {
  SiSymfony,
  SiCakephp,
  SiZend,
  SiMysql,
  SiDocker,
  SiJira,
  SiVuedotjs,
  SiJquery,
  SiApache,
  SiDotnet,
  SiUikit,
  SiYarn,
  SiWebpack,
} from "react-icons/si";
import {
  FaPhp,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGithub,
  FaDatabase,
  FaServer,
  FaClock,
  FaNetworkWired,
  FaLinux,
  FaChartBar,
  FaCloud,
  FaSync,
  FaBootstrap,
  FaCube,
  FaPuzzlePiece,
  FaKey,
  FaCogs,
  FaLayerGroup,
} from "react-icons/fa";
import { DiDotnet } from "react-icons/di";
import { useState } from "react";

import "/src/styles/radixui.css";

const Project = ({ projectId, idx }) => {
  const { t } = useTranslation();
  const mainTech = t(`projects.${projectId}.mainTechnologies`, {
    returnObjects: true,
  });
  const role = t(`projects.${projectId}.role`, {
    defaultValue: "",
    fallback: "",
  });
  const title = t(`projects.${projectId}.introduction.name`);
  const description = t(`projects.${projectId}.description`);
  const img = t(`projects.${projectId}.img`);

  // Helper for SkillPill: find icon for tech name (from SkillsModern)
  const skillIcons = {
    Symfony: SiSymfony,
    Cake: SiCakephp,
    Zend: SiZend,
    PHP: FaPhp,
    MySQL: SiMysql,
    SQL: FaDatabase,
    "REST API": FaServer,
    HTML: FaHtml5,
    CSS: FaCss3Alt,
    JavaScript: FaJs,
    "Vue.js": SiVuedotjs,
    jQuery: SiJquery,
    ".NET": DiDotnet,
    "C#": SiDotnet,
    "ASP.NET": SiDotnet,
    Docker: SiDocker,
    GIT: FaGithub,
    Apache: SiApache,
    Cron: FaClock,
    Samba: FaNetworkWired,
    Ubuntu: FaLinux,
    ApexCharts: FaChartBar,
    Jira: SiJira,
    Webservices: FaCloud,
    AJAX: FaSync,
    Bootstrap: FaBootstrap,
    UIkit: SiUikit,
    Yarn: SiYarn,
    DQL: FaKey,
    Sphinx: FaCube,
    Powershell: FaCogs,
    LDAP: FaKey,
    "API Platform": FaPuzzlePiece,
    "Material Design": FaLayerGroup,
    OpenVas: FaCogs,
    "Webpack Encore": SiWebpack,
  };
  const masteredSkills = [
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

  // For badge overflow
  const MAX_BADGES = 3;
  const mainTechToShow = Array.isArray(mainTech)
    ? mainTech.slice(0, MAX_BADGES)
    : [];
  const extraTech = Array.isArray(mainTech) ? mainTech.slice(MAX_BADGES) : [];
  const [showExtraTooltip, setShowExtraTooltip] = useState(false);

  return (
    <motion.div
      className="relative group bg-white dark:bg-slate-800 rounded-sm overflow-visible w-full max-w-[95vw] sm:max-w-xs min-h-[320px] flex flex-col border border-slate-200 dark:border-slate-600 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-all duration-200 focus-within:border-cyan-500/50 dark:focus-within:border-cyan-400/50 cursor-pointer box-border"
      tabIndex={0}
      aria-label={`View project: ${title}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08, duration: 0.5, type: "spring" }}
      style={{ outline: "none" }}
    >
      <Link
        to={`/projects/${projectId}`}
        className="flex flex-col h-full w-full focus:outline-none"
        tabIndex={-1}
        aria-label={t("common.seeMore") + ": " + title}
        style={{ textDecoration: "none" }}
      >
        {/* Title always visible */}
        <h3
          className="text-blue-900 dark:text-slate-100 text-lg font-bold px-4 pt-4 pb-2 leading-tight truncate"
          title={title}
        >
          {title}
        </h3>
        {/* Image / logo : fond clair en dark pour bon contraste des logos PNG sans fond */}
        <div className="relative h-40 w-full flex items-center justify-center bg-blue-50 dark:bg-slate-200 border-b border-blue-100 dark:border-slate-300 overflow-hidden z-0">
          <img
            src={img}
            alt={title}
            className="object-contain object-center w-full h-full max-h-40 transition-transform duration-300 group-hover:scale-105 dark:drop-shadow-sm"
            width="320"
            height="160"
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* Tech badges (SkillPill) */}
        <div className="flex flex-wrap gap-2 px-4 pt-3 pb-1">
          {mainTechToShow.map((tech, i) => (
            <SkillPill
              key={tech}
              skill={{ name: tech, icon: skillIcons[tech] }}
              idx={i}
              mastered={masteredSkills.includes(tech)}
              masteredTooltip={t("common.skills_mastered_tooltip")}
              isSoft={SKILL_DESCRIPTIONS[tech]?.isSoft}
              color={SKILL_DESCRIPTIONS[tech]?.color}
              description={SKILL_DESCRIPTIONS[tech]?.description}
            />
          ))}
          {extraTech.length > 0 && (
            <span
              className="relative inline-flex items-center justify-center gap-1 px-3 py-1 bg-blue-100 dark:bg-slate-600 text-blue-700 dark:text-slate-200 rounded-full text-sm border border-blue-300 dark:border-slate-500 cursor-pointer select-none transition min-w-[40px]"
              tabIndex={0}
              aria-label={t("common.more_skills_aria", {
                count: extraTech.length,
                skills: extraTech.join(", "),
              })}
              onMouseEnter={() => setShowExtraTooltip(true)}
              onMouseLeave={() => setShowExtraTooltip(false)}
              onFocus={() => setShowExtraTooltip(true)}
              onBlur={() => setShowExtraTooltip(false)}
            >
              +{extraTech.length}
              {showExtraTooltip && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 z-50 px-2 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-600 text-gray-700 dark:text-slate-200 text-xs text-center whitespace-pre-line pointer-events-none min-w-max max-w-xs break-words"
                  aria-live="polite"
                >
                  {extraTech.join(", ")}
                </span>
              )}
            </span>
          )}
        </div>
        {/* Description */}
        <div className="flex-1 flex flex-col justify-between px-4 pb-3">
          <p className="text-gray-700 dark:text-slate-300 text-base mb-2 leading-snug line-clamp-4 text-justify">
            {description}
          </p>
          {role && (
            <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-semibold px-2 py-1 rounded-full mt-2">
              {role}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

Project.propTypes = {
  projectId: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
};

export default Project;
