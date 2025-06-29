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
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false); // State for animation
  const { t } = useTranslation();

  useEffect(() => {
    // Add a slight delay before starting animation
    setTimeout(() => setIsVisible(true), 500);
  }, []);

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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      variants={isVisible ? "visible" : "hidden"}
    >
      <div className="w-full pb-32">
        <div className="mx-auto flex flex-col justify-center">
          <p className="font-bold text-blue-900 pb-4 text-center">
            {t("common.skills")}
          </p>

          {Object.keys(skills).map((category, index) => (
            <ul
              key={index}
              className="flex flex-col md:flex-row justify-start items-center flex-wrap gap-8 mb-2 bg-blue-50 p-8 rounded-2xl"
            >
              <span className="text-blue-500 text-2xl w-full text-center md:w-fit">
                {category}
              </span>
              {skills[category].map((skill, skillIndex) => (
                <li
                  key={skillIndex}
                  className="text-xl font-bold flex justify-center items-center flex-col"
                >
                  {skill.icon && <skill.icon size="40px" />}
                  {skill.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
