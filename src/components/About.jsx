import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Projects from "./Projects";
// import Skills from "./Skills";
import SkillsModern from "./SkillsModern";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const About = () => {
  // You can use useState and useEffect here to manage animation state and logic (optional)
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const refAbout = useRef(null);
  const { t } = useTranslation();

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
    observer.observe(refAbout.current);
  }, []); // Empty dependency array ensures useEffect runs only once

  // Extract lines from about_rich
  const aboutRich = t("common.about_rich");
  const aboutLines = aboutRich
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.trim().startsWith("Hello"));
  // First paragraph (experience)
  const experienceIdx = aboutLines.findIndex((line) =>
    line.trim().startsWith("💻")
  );
  const supportIdx = aboutLines.findIndex((line) =>
    line.trim().startsWith("✅")
  );
  const contactIdx = aboutLines.findIndex((line) =>
    line.trim().startsWith("💬")
  );
  const firstParagraph = aboutLines[experienceIdx];
  const secondParagraph = aboutLines[supportIdx];
  // Points (💻, 🔌, etc.) are between supportIdx+1 and contactIdx
  const pointsLines = aboutLines.slice(supportIdx + 1, contactIdx);
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

  // For fade/collapse
  const collapsedMaxHeight = 180; // px, adjust for visible preview
  const [contentHeight, setContentHeight] = useState(null);
  const detailsRef = useRef(null);
  const collapsedRef = useRef(null);
  useEffect(() => {
    if (detailsRef.current) {
      setContentHeight(detailsRef.current.scrollHeight);
    }
    if (collapsedRef.current) {
      setContentHeight(collapsedRef.current.scrollHeight);
    }
  }, [detailsRef, collapsedRef, t]);

  // Make the fade higher above the chevron (e.g., 72px instead of 48px)
  const CHEVRON_HEIGHT = 72; // 3 lines when open
  const FADE_OFFSET = 144; // 6 lines when collapsed
  // const overlayStyle = { ... } // SUPPRIMÉ car plus utilisé
  const textUnderOverlayStyle = !expanded
    ? { userSelect: "none", pointerEvents: "none", filter: "blur(0px)" }
    : { userSelect: "auto", pointerEvents: "auto", filter: "none" };

  return (
    <div id="toabout" className="h-screen lg:pl-0 lg:pr-0">
      <div className="flex justify-between md:mx-0 md:pt-32 pt-28 ">
        <div className="flex flex-col md:ml-px mt-10">
          <div
            className="md:mx-0 flex flex-col md:flex-wrsap md:flex-row lg:px-12"
            ref={refAbout}
          >
            <div className="md:w-2/5 lg:w-1/4 lg:min-w-72 sm:min-w-96 md:min-w-80 xl:min-w-60">
              <motion.div
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
                      delay: 0.8,
                    },
                  },
                }}
              >
                {/* <h2 className="font-bold text-3xl text-left mb-5">
                  I&#39;m a
                  <span className="text-blue-500"> FullStack Developer</span>{" "}
                  with a passion for
                  <span className="text-blue-500"> Cloud Computing</span>.
                </h2> */}

                <img
                  className="radius rounded-full lg:vw-100 vh-50 "
                  src="/images/profile.png"
                  alt=""
                ></img>
              </motion.div>
            </div>
            <motion.div
              className="md:w-3/4"
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
                    delay: 1.2,
                  },
                },
              }}
            >
              <motion.div
                className="md:w-54"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={{
                  hidden: {
                    scale: 1.0,
                    opacity: 0,
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: 1.2,
                    },
                  },
                }}
              >
                <h1 className="text-3xl font-bold sm:text-4xl mb-8">
                  {t("common.abouthelloim")}{" "}
                  <span className="text-blue-500">Kamal</span>
                </h1>
              </motion.div>

              <motion.div
                className="lg:px-2"
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
                      delay: 1,
                    },
                  },
                }}
              >
                {/* Always visible: first two paragraphs */}
                {firstParagraph && (
                  <p className="text-left font-normal mb-4 flex-wrap">
                    {firstParagraph}
                  </p>
                )}
                {secondParagraph && (
                  <p className="text-left font-normal mb-4 flex-wrap">
                    {secondParagraph}
                  </p>
                )}
                {/* Collapsible: points as indented list + contact line */}
                <div className="relative" style={{ minHeight: 80 }}>
                  <div
                    ref={detailsRef}
                    id="about-rich-details"
                    style={{
                      maxHeight: expanded ? contentHeight : collapsedMaxHeight,
                      transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
                      overflow: "hidden",
                      position: "relative",
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                      paddingBottom: expanded
                        ? CHEVRON_HEIGHT
                        : CHEVRON_HEIGHT + FADE_OFFSET,
                    }}
                    aria-expanded={expanded}
                    aria-controls="about-rich-details"
                  >
                    <div
                      style={textUnderOverlayStyle}
                      ref={!expanded ? collapsedRef : null}
                    >
                      <ul className="list-none pl-6 pr-4 space-y-3">
                        {detailedPoints.map((point, idx) =>
                          point.text ? (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-base"
                            >
                              <span className="text-xl mt-1">{point.icon}</span>
                              <span>{point.text}</span>
                            </li>
                          ) : null
                        )}
                      </ul>
                      {contactLine && (
                        <p className="text-left font-normal mt-4 flex-wrap">
                          {contactLine}
                        </p>
                      )}
                    </div>
                    {/* Overlay covers the visible content and toggles expand/collapse */}
                    {/* (SUPPRIMÉ: overlayStyle et le div d'overlay) */}
                  </div>
                  {/* Chevron always visible below the text */}
                  <div
                    className="w-full flex justify-center items-center"
                    style={{
                      height: CHEVRON_HEIGHT,
                      marginTop: -CHEVRON_HEIGHT,
                    }}
                  >
                    {!expanded && contentHeight > collapsedMaxHeight && (
                      <button
                        className="bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-expanded={expanded}
                        aria-controls="about-rich-details"
                        onClick={() => setExpanded(true)}
                        tabIndex={0}
                        title={t("common.read_more", "Read more")}
                        style={{ zIndex: 30 }}
                      >
                        <FaChevronDown className="w-6 h-6 animate-bounce" />
                      </button>
                    )}
                    {expanded && contentHeight > collapsedMaxHeight && (
                      <button
                        className="bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-expanded={expanded}
                        aria-controls="about-rich-details"
                        onClick={() => setExpanded(false)}
                        tabIndex={0}
                        title={t("common.show_less", "Show less")}
                        style={{ zIndex: 30 }}
                      >
                        <FaChevronUp className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          {/* SkillsModern juste avant les projets */}
          <div id="toskills">
            <SkillsModern />
          </div>
          <div id="toprojects" className="flex flex-col md:ml-px mt-10">
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
