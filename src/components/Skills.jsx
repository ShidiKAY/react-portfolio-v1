import { DiDjango } from "react-icons/di"; // Dev Icons
import {
  FaAws,
  FaBootstrap,
  FaCss3Alt,
  FaGithub,
  FaHtml5,
  FaNode,
  FaPython,
  FaReact,
} from "react-icons/fa"; // Font Awesome icons
import {
  SiMysql,
  SiNumpy,
  SiPandas,
  SiSqlite,
  SiTailwindcss,
  SiTensorflow,
} from "react-icons/si"; // Simple Icons

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

            <li className=" text-xl font-bold flex justify-center items-center flex-col">
              <DiDjango size="40px" />
              Django
            </li>
            <li className=" text-xl font-bold flex justify-center items-center flex-col">
              <FaPython size="40px" />
              Python
            </li>
            <li className=" text-xl font-bold flex justify-center items-center flex-col">
              <FaNode size="40px" />
              Node Js
            </li>
            <li className=" text-xl font-bold flex justify-center items-center flex-col">
              <SiSqlite size="40px" />
              DB sqlite
            </li>
            <li className=" text-xl font-bold flex justify-center items-center flex-col">
              <SiMysql size="40px" />
              Mysql
            </li>
            <li className=" text-xl font-bold flex justify-center items-center flex-col">
              <FaBootstrap size="40px" />
              Bootstrap
            </li>
          </ul>

          <ul className="flex justify-start items-center flex-row gap-8 flex-wrap mb-2 bg-blue-50 p-8 rounded-2xl">
            <span className="text-blue-500 text-2xl w-full text-center md:w-fit">
              Frontend
            </span>
            <li className=" text-xl font-bold flex justify-center items-center flex-col">
              <FaReact size="40px" />
              React
            </li>
            <li className=" text-xl font-bold flex justify-center items-center flex-col">
              Bluma CSS
            </li>
            <li className=" text-xl font-bold flex justify-center items-center flex-col">
              <FaHtml5 size="40px" />
              HTML
            </li>
            <li className=" text-xl font-bold flex justify-center items-center flex-col">
              <FaCss3Alt size="40px" />
              CSS
            </li>
            <li className=" text-xl font-bold flex justify-center items-center flex-col">
              <SiTailwindcss size="40px" />
              Tailwind CSS
            </li>
          </ul>

          <ul className="flex justify-start items-center flex-row gap-8 flex-wrap mb-2 bg-blue-50 p-8 rounded-2xl">
            <span className="text-blue-500 text-2xl w-full text-center md:w-fit">
              Data Science
            </span>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <SiTensorflow size="40px" />
              Tensorflow
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <SiNumpy size="40px" />
              Numpy
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <SiPandas size="40px" />
              Pandas
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              Matplotlib
            </li>
          </ul>

          <ul className="flex items-center flex-row gap-8 flex-wrap mb-2 bg-blue-50 p-8 rounded-2xl">
            <span className="text-blue-500 text-2xl w-full text-center lg:w-fit">
              Other
            </span>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              C
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              C++
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaGithub size="40px" />
              git/GitHub
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              Analytics
            </li>
            <li className="text-xl font-bold flex justify-center items-center flex-col">
              <FaAws size="40px" />
              AWS
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
