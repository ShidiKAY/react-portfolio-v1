import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Projects from "./Projects";
import Skills from "./Skills";
const About = () => {
  // You can use useState and useEffect here to manage animation state and logic (optional)
  const [isVisible, setIsVisible] = useState(false);
  const refAbout = useRef(null);

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

  return (
    <div className="h-screen lg:pl-0 lg:pr-0">
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
                  src="https://kamalaityous.fr/img/profile.png"
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
                  Hello, I&#39;m <span className="text-blue-500">Kamal</span>
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
                <p className="text-left font-normal mb-4 flex-wrap">
                  👨‍💻 Avec plusieurs années d'expérience dans le développement
                  web, je suis spécialisé dans le Back-End, les applications de
                  gestion et le développement de logiciels sur mesure.
                  {/* <a
                  href="https://github.com/ShidiKAY"
                  className="underline text-blue-500"
                >
                  here
                </a> */}
                </p>
                {/* <p className="text-left font-normal mb-5 flex-wrap"></p> */}
                <p className="text-left font-normal mb-4 flex-wrap">
                  ✅ Que vous ayez besoin de développer une application web
                  complexe, de mettre en place un système de gestion efficace ou
                  d'améliorer les performances de votre site existant, je suis
                  là pour vous accompagner à chaque étape du processus, de la
                  conception à la livraison, en passant par le déploiement et la
                  maintenance.
                </p>
                {/* <p className="text-left font-normal mb-5 flex-wrap"></p> */}
                <p className="text-left font-normal mb-4 flex-wrap">
                  💬 Contactez-moi dès maintenant pour discuter de votre projet
                  et commençons à travailler ensemble pour réaliser vos
                  objectifs !
                </p>
              </motion.div>
            </motion.div>
          </div>
          <div className="flex flex-col md:ml-px mt-10">
            <Projects />
          </div>
          <div className="md:mx-px text-bold text-3xl mt-10 lg:px-52 md:px-1">
            <Skills />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
