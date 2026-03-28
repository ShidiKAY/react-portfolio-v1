import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet as Head } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SEO_BASE_URL, SEO_DEFAULT_IMAGE } from "../config/seo";
import {
  MOTION_DURATION,
  MOTION_EASE,
  HERO_ENTER_DELAY,
} from "../config/motion";

const Home = () => {
  const [revealed, setRevealed] = useState(false);
  const refHome = useRef(null);
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setRevealed(true);
      return;
    }
    const el = refHome.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) setRevealed(true);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <>
      <Head>
        <title>{t("common.seo_home_title")}</title>
        <meta name="description" content={t("common.seo_home_description")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SEO_BASE_URL + "/"} />
        <meta property="og:title" content={t("common.seo_home_title")} />
        <meta property="og:description" content={t("common.seo_home_description")} />
        <meta property="og:image" content={SEO_DEFAULT_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SEO_BASE_URL + "/"} />
        <meta name="twitter:title" content={t("common.seo_home_title")} />
        <meta name="twitter:description" content={t("common.seo_home_description")} />
        <meta name="twitter:image" content={SEO_DEFAULT_IMAGE} />
      </Head>
    <motion.div
      ref={refHome}
      initial="hidden"
      animate={revealed ? "visible" : "hidden"}
      variants={{
        hidden: {
          opacity: 0,
          y: reduceMotion ? 0 : 20,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: reduceMotion
            ? { duration: 0 }
            : {
                duration: MOTION_DURATION,
                ease: MOTION_EASE,
                delay: HERO_ENTER_DELAY,
              },
        },
      }}
    >
      <div
        id="tohome"
        className="w-full max-w-full overflow-x-hidden px-2 md:px-0 flex flex-col justify-center items-center min-h-[600px] py-16"
      >
        <div className="text-center max-w-4xl mx-auto px-2">
          <h1 className="text-4xl text-black dark:text-white font-extrabold md:text-4xl tracking-wide">
            {t("common.main1")}
            <span className="text-blue-500 dark:text-blue-400 block">
              {t("common.main2")}
            </span>
          </h1>
          <p className="text-xl mt-4 sm:leading-relaxed md:text-xl text-black dark:text-slate-200">
            {t("common.sub1")}
            <br></br>
            {t("common.sub2")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8 grid-cols-2">
            <a
              href="mailto:kamal.aityous@gmail.com"
              className="px-12 py-3 text-sm font-medium text-culturedWhite bg-mnBlue rounded shadow active:bg-blue-500 hover:bg-carolinaBlue focus:outline-none focus:ring"
            >
              {t("common.contactme")}
            </a>
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
      </div>
    </motion.div>
    </>
  );
};

export default Home;
