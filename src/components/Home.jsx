import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// import Bubbles from "./Bubbles";

// const languages = ["JS", "PHP", "Python", "Java", "C++", "CSS", "HTML"];
// const colors = [
//   "#f0db4f",
//   "#778899",
//   "#3572A5",
//   "#29ABCA",
//   "#FF9F43",
//   "#E94F37",
//   "#0073B7",
// ];

// const bubbles = languages.map((language, i) => ({
//   language,
//   color: colors[i % colors.length],
//   position: {
//     x: Math.random() * 500, // Position aléatoire sur l'axe X
//     y: Math.random() * 500, // Position aléatoire sur l'axe Y
//   },
// }));

const Home = () => {
  // Vous pouvez utiliser useState et useEffect ici pour gérer l'état et la logique de l'animation (optionnel)
  const [isVisible, setIsVisible] = useState(false);
  const refHome = useRef(null);
  const { t, i18n } = useTranslation();

  // Show/Hide text section of About when it's displayed
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    observer.observe(refHome.current);
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <motion.div
      ref={refHome}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        hidden: {
          scale: 0.8,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.4,
          },
        },
      }}
    >
      <div
        id="tohome"
        className="container mx-auto flex flex-col justify-center items-center h-[600px]"
      >
        <div className="text-center h-[200px]">
          <h1 className="text-4xl text-black font-extrabold md:text-4xl">
            {t("common.main1")}
          </h1>
          <h1 className="text-4xl text-blue-500 font-extrabold md:text-4xl">
            {t("common.main2")}
          </h1>
          <p className="text-xl mt-4 sm:leading-relaxed md:text-xl text-black">
            {t("common.sub1")}
            <br></br>
            {t("common.sub2")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8 grid-cols-2">
            <Link
              // to="/contact"
              onClick={() =>
                (window.location.href = "mailto:kamal.aityous@gmail.com")
              }
              className="px-12 py-3 text-sm font-medium text-culturedWhite bg-mnBlue rounded shadow active:bg-blue-500 hover:bg-carolinaBlue focus:outline-none focus:ring"
            >
              {t("common.contactme")}
            </Link>
            <Link
              to={"/" + t("common.getresumefile")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-3 text-sm font-medium text-culturedWhite bg-mnBlue rounded shadow active:bg-blue-500 hover:bg-carolinaBlue focus:outline-none focus:ring"
            >
              {t("common.getresume")}
            </Link>
          </div>
        </div>
        {/* Affichage de bulles dynamiques basées sur les tableaux languages et colors */}
        {/* <Bubbles bubbles={bubbles} /> */}
      </div>
    </motion.div>
  );
};

export default Home;
