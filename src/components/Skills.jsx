import { DiDotnet } from "react-icons/di";

import {
  FaAws,
  FaCss3Alt,
  FaGithub,
  FaGitlab,
  FaHtml5,
  FaLaravel,
  FaLinux,
  FaNode,
  FaPhp,
  FaPython,
  FaReact,
  FaVuejs,
  FaWindows,
} from "react-icons/fa"; // Font Awesome icons
import { SiMysql, SiPostgresql } from "react-icons/si"; // Simple Icons

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false); // State for animation

  useEffect(() => {
    // Add a slight delay before starting animation
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      variants={isVisible ? "visible" : "hidden"}
    >
      <div className="w-full pb-32">
        <div className="mx-auto flex flex-col justify-center">
          <p className="font-bold text-blue-900 pb-4 text-center">Skills</p>

          <ul className="flex justify-start items-center flex-row flex-wrap gap-8 mb-2 bg-blue-50 p-8 rounded-2xl">
            <span className="text-blue-500 text-2xl w-full text-center md:w-fit">
              Backend
            </span>

            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaPhp size="40px" /> {/* Use FaPhp for PHP icon */}
              PHP
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaPython size="40px" />
              Python
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaNode size="40px" />
              Node.js
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <SiMysql size="40px" />
              MySQL
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <SiPostgresql size="40px" />
              PostgreSQL
            </li>
          </ul>

          <ul className="flex justify-start items-center flex-row gap-8 flex-wrap mb-2 bg-blue-50 p-8 rounded-2xl">
            <span className="text-blue-500 text-2xl w-full text-center md:w-fit">
              Frontend
            </span>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaReact size="40px" />
              React
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaVuejs size="40px" /> {/* Use FaVuejs for Vue.js icon */}
              Vue.js
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaHtml5 size="40px" />
              HTML
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaCss3Alt size="40px" />
              CSS
            </li>
          </ul>

          <ul className="flex justify-start items-center flex-row gap-8 flex-wrap mb-2 bg-blue-50 p-8 rounded-2xl">
            <span className="text-blue-500 text-2xl w-full text-center md:w-fit">
              Full-Stack
            </span>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <DiDotnet size="40px" /> {/* Use DiDotnet for .NET icon */}
              .NET
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaLaravel size="40px" /> {/* Use FaLaravel for Laravel icon */}
              Laravel
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaLinux size="40px" />
              Linux
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaWindows size="40px" />
              Windows
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaAws size="40px" />
              AWS
            </li>
          </ul>

          <ul className="flex justify-start items-center flex-row gap-8 flex-wrap mb-2 bg-blue-50 p-8 rounded-2xl">
            <span className="text-blue-500 text-2xl w-full text-center md:w-fit">
              DevOps
            </span>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaGitlab />{" "}
              {/* You might need to install an icon library for Gitlab */}
              GitLab
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaGithub size="40px" />
              GitHub
            </li>
          </ul>

          <ul className="flex justify-start items-center flex-row gap-8 flex-wrap mb-2 bg-blue-50 p-8 rounded-2xl">
            <span className="text-blue-500 text-2xl w-full text-center md:w-fit">
              Others
            </span>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <i className="text-red-500 fab fa-cssdbalternate"></i>{" "}
              {/* You might need to install an icon library for CSS Database */}
              CSS Frameworks
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <i className="text-green-500 fab fa-wpforms"></i>{" "}
              {/* You might need to install an icon library for WordPress */}
              WordPress
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <i className="text-violet-500 fab fa-jsfiddle"></i>{" "}
              {/* You might need to install an icon library for JSFiddle */}
              JavaScript Testing
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
