import { DiDotnet } from "react-icons/di";
import {
  FaCss3Alt,
  FaHtml5,
  FaJs,
  FaPhp,
  FaReact,
  FaNode,
  FaLinux,
  FaWindows,
  FaGitlab,
  FaGithub,
} from "react-icons/fa";
import {
  SiMysql,
  SiPostgresql,
  SiSymfony,
  SiDocker,
  SiZend,
  SiCakephp,
} from "react-icons/si"; // Simple Icons
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

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
      { name: "Node.js", icon: FaNode },
      { name: "MySQL", icon: SiMysql },
    ],
    Frontend: [
      { name: "React", icon: FaReact },
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },
      { name: "JavaScript", icon: FaJs },
    ],
    FullStack: [
      { name: ".NET", icon: DiDotnet },
      { name: "Linux", icon: FaLinux },
      { name: "Windows", icon: FaWindows },
    ],
    DevOps: [
      { name: "Docker", icon: SiDocker },
      { name: "GitLab", icon: FaGitlab },
      { name: "GitHub", icon: FaGithub },
    ],
    Others: [
      { name: "API REST", icon: null },
      { name: "Web Services" },
      { name: "Méthode Agile", icon: null },
      { name: "Conception Web" },
    ],
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
              className="flex justify-start items-center flex-row flex-wrap gap-8 mb-2 bg-blue-50 p-8 rounded-2xl"
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
