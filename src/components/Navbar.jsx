import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiMalt } from "react-icons/si";
import { Link } from "react-router-dom";
import { Link as ScrollLink, Events } from "react-scroll";
import { useTranslation } from "react-i18next";
import { loadLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const [activeLink, setActiveLink] = useState("tohome");
  const location = useLocation();
  const sections = ["tohome", "toabout", "toprojects", "toskills", "toapproche", "toengine", "tostatus", "toproof", "torecommendations"];
  const engineZoneIds = ["toapproche", "toengine", "tostatus", "toproof"];
  const isInEngineZone = (link) => engineZoneIds.includes(link);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onReady = () => requestAnimationFrame(() => setIsPageReady(true));
    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady);
      return () => window.removeEventListener("load", onReady);
    }
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      updateActiveLink();
    };
    const updateActiveLink = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            scrollPosition >= rect.top + window.scrollY &&
            scrollPosition < rect.bottom + window.scrollY
          ) {
            setActiveLink(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    updateActiveLink();
    let rafIdDeferred = null;
    rafIdDeferred = requestAnimationFrame(() => {
      rafIdDeferred = requestAnimationFrame(updateActiveLink);
    });

    Events.scrollEvent.register("begin", (to) => {
      setActiveLink(to);
    });

    Events.scrollEvent.register("end", (to) => {
      setActiveLink(to);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdDeferred != null) cancelAnimationFrame(rafIdDeferred);
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, [isHome, location.pathname, location.state]);

  const handleMobileNav = () => {
    setIsOpen(!isOpen);
  };

  const handleActiveLink = (link) => {
    const isActive = link === "toengine" ? isInEngineZone(activeLink) : activeLink === link;
    return isActive
      ? "text-blue-500 dark:text-blue-400"
      : "cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 text-slate-900 dark:text-slate-100";
  };

  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const changeLanguage = async (lng) => {
    await loadLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="contents">
      <nav
        className={`fixed top-0 left-0 right-0 z-20 w-full transition-all duration-500 ease-out ${
          !isPageReady
            ? "invisible opacity-0 -translate-y-full pointer-events-none"
            : "visible opacity-100 translate-y-0"
        } ${
          isScrolled
            ? "backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50"
            : "bg-transparent"
        }`}
      >
        <div>
          <div className="w-full">
          <div className="flex items-center h-14 sm:h-16 w-full">
            <div className="flex items-center sm:mx-10 md:mx-10 justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0 ">
                <h1 className=" font-bold text-xl cursor-pointer">
                  <ScrollLink
                    to="tohome"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-2xl pl-8 sm:pl-0"
                    onSetActive={() => setActiveLink("tohome")}
                  >
                    Kamal<span className="text-blue-500 dark:text-blue-400">Ait Yous</span>
                  </ScrollLink>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-8">
                  <h1 className={handleActiveLink("toabout")}>
                    <ScrollLink
                      to="toabout"
                      smooth={true}
                      duration={500}
                      className="cursor-pointer text-sm font-medium tracking-wide"
                      onSetActive={() => setActiveLink("toabout")}
                    >
                      {t("common.nav_expertise")}
                    </ScrollLink>
                  </h1>
                  <h1 className={handleActiveLink("toprojects")}>
                    <ScrollLink
                      to="toprojects"
                      smooth={true}
                      duration={500}
                      className="cursor-pointer text-sm font-medium tracking-wide"
                      onSetActive={() => setActiveLink("toprojects")}
                    >
                      {t("common.nav_projets")}
                    </ScrollLink>
                  </h1>
                  <h1 className={handleActiveLink("toengine")}>
                    <ScrollLink
                      to="toapproche"
                      smooth={true}
                      duration={500}
                      className="cursor-pointer text-sm font-medium tracking-wide"
                      onSetActive={() => setActiveLink("toapproche")}
                    >
                      {t("common.nav_engine")}
                    </ScrollLink>
                  </h1>
                  <h1 className={handleActiveLink("torecommendations")}>
                    <ScrollLink
                      to="torecommendations"
                      smooth={true}
                      duration={500}
                      className="cursor-pointer text-sm font-medium tracking-wide"
                      onSetActive={() => setActiveLink("torecommendations")}
                    >
                      {t("common.nav_recommendations")}
                    </ScrollLink>
                  </h1>
                  <h1>
                    <Link
                      to="/labs"
                      className="text-slate-900 dark:text-slate-100 hover:text-blue-500 dark:hover:text-blue-400 text-sm font-medium tracking-wide transition-colors"
                    >
                      {t("common.nav_labs")}
                    </Link>
                  </h1>
                </div>
              </div>

              <div className="flex justify-center items-center flex-shrink-0 md:block">
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
                  >
                    {theme === "dark" ? (
                      <HiSun className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <HiMoon className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>
                  <div className="language-switcher mt-1.5">
                    <ul className="flex space-x-2">
                      <li
                        className="inline-flex items-center cursor-pointer"
                        onClick={() => changeLanguage("fr")}
                      >
                        <span
                          className="i-flagpack-fr w-8 mb-1 mt-1"
                          title="French"
                        ></span>
                        <span className="hidden lg:block">French</span>
                      </li>
                      <li
                        className="inline-flex items-center cursor-pointer"
                        onClick={() => changeLanguage("en")}
                      >
                        <span
                          className="i-flagpack-gb-ukm w-8 mt-px"
                          title="English"
                        ></span>{" "}
                        <span className="hidden lg:block">English</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <a
                      href="https://github.com/ShidiKAY"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsGithub className="hidden md:block size-8 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" size="2rem" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/kamal-ait-yous-90a6a3178/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsLinkedin className="hidden md:block size-8 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" size="2rem" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.malt.fr/profile/kamalaityous"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiMalt className="hidden md:block size-8 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" size="2rem" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={handleMobileNav} className="mr-14 md:hidden text-slate-900 dark:text-slate-100">
              <AiOutlineMenu size="2rem" />
            </div>
          </div>
        </div>
        </div>
        <div className="md:hidden" aria-hidden={!isOpen}>
          <div
            role="presentation"
            className={`fixed inset-0 z-30 h-screen w-full bg-black/70 transition-opacity duration-300 ease-out ${
              isOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={handleMobileNav}
            onKeyDown={(e) => e.key === "Escape" && handleMobileNav()}
          />
          <div
            className={`fixed left-0 top-0 z-40 h-screen w-full max-w-xs transform bg-white dark:bg-slate-900 p-6 shadow-xl transition-transform duration-300 ease-out overflow-y-auto ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex w-full items-center justify-between">
              <div
                onClick={handleMobileNav}
                className="rounded shadow-lg shadow-gray-400 dark:shadow-slate-800 p-3 cursor-pointer text-slate-900 dark:text-slate-100"
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="flex flex-col space-y-4 pt-4">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex items-center gap-2 p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 mb-2"
                    aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
                  >
                    {theme === "dark" ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
                    <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
                  </button>
                  <h1 className={handleActiveLink("toabout")}>
                    <ScrollLink to="toabout" smooth duration={500} className="cursor-pointer" onClick={handleMobileNav} onSetActive={() => setActiveLink("toabout")}>
                      {t("common.nav_expertise")}
                    </ScrollLink>
                  </h1>
                  <h1 className={handleActiveLink("toprojects")}>
                    <ScrollLink to="toprojects" smooth duration={500} className="cursor-pointer" onClick={handleMobileNav} onSetActive={() => setActiveLink("toprojects")}>
                      {t("common.nav_projets")}
                    </ScrollLink>
                  </h1>
                  <h1 className={handleActiveLink("toengine")}>
                    <ScrollLink to="toapproche" smooth duration={500} className="cursor-pointer" onClick={handleMobileNav} onSetActive={() => setActiveLink("toapproche")}>
                      {t("common.nav_engine")}
                    </ScrollLink>
                  </h1>
                  <h1 className={handleActiveLink("torecommendations")}>
                    <ScrollLink to="torecommendations" smooth duration={500} className="cursor-pointer" onClick={handleMobileNav} onSetActive={() => setActiveLink("torecommendations")}>
                      {t("common.nav_recommendations")}
                    </ScrollLink>
                  </h1>
                  <h1>
                    <Link to="/labs" className="cursor-pointer text-slate-900 dark:text-slate-100 hover:text-blue-500 dark:hover:text-blue-400" onClick={handleMobileNav}>
                      {t("common.nav_labs")}
                    </Link>
                  </h1>
                  <div className="language-switcher mt-1.5">
                    <ul className="flex space-x-2">
                      <li
                        className="inline-flex items-center cursor-pointer"
                        onClick={() => changeLanguage("fr")}
                      >
                        <span
                          className="i-flagpack-fr w-8 mb-1 mt-1"
                          title="French"
                        ></span>
                        <span className="hidden lg:block">French</span>
                      </li>
                      <li
                        className="inline-flex items-center cursor-pointer"
                        onClick={() => changeLanguage("en")}
                      >
                        <span
                          className="i-flagpack-gb-ukm w-8 mt-px"
                          title="English"
                        ></span>{" "}
                        <span className="hidden lg:block">English</span>
                      </li>
                    </ul>
                  </div>
                <div className="flex space-x-4 pt-20">
                  <div>
                    <a
                      href="https://github.com/ShidiKAY"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsGithub size="2rem" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/kamal-ait-yous-90a6a3178/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsLinkedin size="2rem" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.malt.fr/profile/kamalaityous"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiMalt size="2rem" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </nav>
    </div>
  );
};


export default Navbar;
