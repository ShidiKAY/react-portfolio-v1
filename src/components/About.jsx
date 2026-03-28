import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Projects from "./Projects";
// import Skills from "./Skills";
import SkillsModern from "./SkillsModern";
import { useTranslation } from "react-i18next";
import {
  ABOUT_DELAY_CHILDREN,
  ABOUT_STAGGER,
  MOTION_DURATION,
  MOTION_EASE,
} from "../config/motion";

const About = () => {
  const [revealed, setRevealed] = useState(false);
  const refAbout = useRef(null);
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setRevealed(true);
      return;
    }
    const el = refAbout.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) setRevealed(true);
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const containerVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: reduceMotion
          ? { duration: 0 }
          : {
              staggerChildren: ABOUT_STAGGER,
              delayChildren: ABOUT_DELAY_CHILDREN,
            },
      },
    }),
    [reduceMotion]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: {
        opacity: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 16,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: reduceMotion
          ? { duration: 0 }
          : { duration: MOTION_DURATION, ease: MOTION_EASE },
      },
    }),
    [reduceMotion]
  );

  // Extract lines from about_rich
  const aboutRich = t("common.about_rich");
  const aboutLines = aboutRich
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.trim().startsWith("Hello"));
  const supportIdx = aboutLines.findIndex((line) =>
    line.trim().startsWith("✅")
  );
  const experienceIdx = aboutLines.findIndex((line) =>
    line.trim().startsWith("💻")
  );
  const contactIdx = aboutLines.findIndex((line) =>
    line.trim().startsWith("💬")
  );
  // Intro: first line (no emoji) + ✅ paragraph
  const introFirstLine =
    aboutLines.length > 0 && !/^[\p{Emoji_Presentation}\p{Emoji}\uFE0F?]/u.test(aboutLines[0].trim())
      ? aboutLines[0]
      : null;
  const introParagraph = supportIdx !== -1 ? aboutLines[supportIdx] : null;
  // Points: all emoji lines from 💻 to 🌐 (no duplicate with intro)
  const pointsLines =
    experienceIdx !== -1 && contactIdx !== -1
      ? aboutLines.slice(experienceIdx, contactIdx)
      : [];
  // Parse points as icon/text
  const detailedPoints = pointsLines
    .map((line) => {
      const match = line.match(
        /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*(.*)$/u
      );
      if (match) {
        return { icon: match[1], text: match[2] };
      }
      return null;
    })
    .filter(Boolean);
  // Last paragraph (contact)
  const contactLine = contactIdx !== -1 ? aboutLines[contactIdx] : "";

  return (
    <div
      id="toabout"
      className="py-16 sm:py-20 max-w-screen-lg mx-auto w-full overflow-x-hidden text-slate-900 dark:text-slate-100"
      style={{ overflowX: "hidden" }}
    >
      <div className="flex flex-col md:mx-0 md:pt-20 pt-10 w-full min-w-0">
        <div className="flex flex-col mt-6 w-full min-w-0">
          <motion.div
            ref={refAbout}
            className="flex flex-col items-center md:flex-row md:items-start w-full min-w-0 overflow-hidden px-2 md:px-0 lg:px-12"
            initial="hidden"
            animate={revealed ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div
              className="md:w-1/4 lg:w-1/4 min-w-0"
              variants={itemVariants}
            >
              <img
                className="radius rounded-full lg:vw-100 vh-50"
                src="/images/profile.png"
                alt="Kamal AIT YOUS"
                width="200"
                height="200"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <motion.div
              className="w-full md:w-3/4 max-w-full overflow-hidden min-w-0 lg:px-2"
              style={{ overflow: "hidden" }}
              variants={itemVariants}
            >
              <h1 className="text-3xl font-bold sm:text-4xl mb-8 break-words tracking-wide">
                {t("common.abouthelloim")}{" "}
                <span className="text-blue-500 dark:text-blue-400">Kamal</span>
              </h1>
              {/* Intro: first line then ✅ */}
              {introFirstLine && (
                <p className="text-left font-normal mb-4 flex-wrap break-words text-slate-700 dark:text-slate-300">
                  {introFirstLine}
                </p>
              )}
              {introParagraph && (
                <p className="text-left font-normal mb-4 flex-wrap break-words text-slate-700 dark:text-slate-300">
                  {introParagraph}
                </p>
              )}
              <div className="relative" style={{ minHeight: 80 }}>
                <div id="about-rich-details">
                  <ul className="list-none pl-6 pr-4 space-y-3 break-words">
                    {detailedPoints.map((point, idx) =>
                      point.text ? (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-base text-slate-700 dark:text-slate-300"
                        >
                          <span className="text-xl mt-1">{point.icon}</span>
                          <span className="break-words">{point.text}</span>
                        </li>
                      ) : null
                    )}
                  </ul>
                  {contactLine && (
                    <p className="text-left font-normal mt-4 flex-wrap break-words text-slate-700 dark:text-slate-300">
                      {contactLine}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
          {/* SkillsModern juste avant les projets */}
          <div id="toskills">
            <SkillsModern />
          </div>
          <div id="toprojects" className="flex flex-col md:ml-px mt-16 sm:mt-20">
            <Projects />
          </div>
          {/* Affiche SkillsModern juste après les projets, avant Skills */}
          {/**
          <div
            id="toskills"
            className="md:mx-px text-bold text-3xl mt-10 lg:px-52 md:px-1"
          >
            <Skills />
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default About;
