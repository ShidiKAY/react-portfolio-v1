import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiMalt } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink, Events } from "react-scroll"; // Import ScrollLink and animateScroll
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation(); // Destructure pathname from useLocation
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home"); // State to track active link
  const sections = ["tohome", "toabout", "toprojects", "toskills"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      updateActiveLink();
    };
    const updateActiveLink = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Adjust as needed
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

    Events.scrollEvent.register("begin", (to) => {
      setActiveLink(to);
    });

    Events.scrollEvent.register("end", (to) => {
      setActiveLink(to);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const handleMobileNav = () => {
    setIsOpen(!isOpen);
  };

  const handleActiveLink = (link) => {
    return activeLink === link
      ? "text-blue-500"
      : "cursor-pointer hover:text-blue-500";
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <nav
        className={`fixed z-20 bg-white w-full transition duration-300 ease-in-out ${
          isScrolled ? "bg-opacity-75" : "bg-opacity-0"
        }`}
      >
        <div className="w-full">
          <div className="flex items-center h-20 w-full ">
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
                    Kamal<span className="text-blue-500">Ait Yous</span>
                  </ScrollLink>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-10">
                  <h1 className={handleActiveLink("tohome")}>
                    <ScrollLink
                      to="tohome"
                      smooth={true}
                      duration={500}
                      className="cursor-pointer"
                      onSetActive={() => setActiveLink("tohome")}
                    >
                      {t("common.home")}
                    </ScrollLink>
                  </h1>
                  <h1 className={handleActiveLink("toabout")}>
                    <ScrollLink
                      to="toabout"
                      smooth={true}
                      duration={500}
                      className="cursor-pointer"
                      onSetActive={() => setActiveLink("toabout")}
                    >
                      {t("common.about")}
                    </ScrollLink>
                  </h1>
                  <h1 className={handleActiveLink("toskills")}>
                    <ScrollLink
                      to="toskills"
                      smooth={true}
                      duration={500}
                      className="cursor-pointer"
                      onSetActive={() => setActiveLink("toskills")}
                    >
                      {t("common.skills")}
                    </ScrollLink>
                  </h1>
                  <h1 className={handleActiveLink("toprojects")}>
                    <ScrollLink
                      to="toprojects"
                      smooth={true}
                      duration={500}
                      className="cursor-pointer"
                      onSetActive={() => setActiveLink("toprojects")}
                    >
                      {t("common.projects")}
                    </ScrollLink>
                  </h1>
                </div>
              </div>

              <div className="flex justify-center items-center flex-shrink-0 md:block">
                <div className="flex space-x-4">
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
                      <BsGithub className="hidden md:block" size="2rem" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/kamal-ait-yous-90a6a3178/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsLinkedin className="hidden md:block" size="2rem" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.malt.fr/profile/kamalaityous"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiMalt className="hidden md:block" size="2rem" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={handleMobileNav} className="mr-14 md:hidden">
              <AiOutlineMenu size="2rem" />
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div
            className={
              isOpen ? "fixed left-0 top-0 w-full h-screen bg-black/70" : ""
            }
          >
            <div
              className={
                isOpen
                  ? "fixed left-0 top-0 w-full sm:w[40%] md:w-[30%] h-screen bg-culturedWhite p-10 ease-in duration-300"
                  : "fixed left-[-100%] top-0 p-10 ease-in duration-300"
              }
            >
              <div>
                <div className="flex w-full items-center justify-between">
                  <div
                    onClick={handleMobileNav}
                    className="rounded shadow-lg shadow-gray-400 p-3 cursor-pointer"
                  >
                    <AiOutlineClose />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col space-y-4 pt-4">
                  <h1
                    className={
                      pathname == "/"
                        ? "text-blue-500"
                        : "cursor-pointer hover:text-blue-500"
                    }
                  >
                    <Link id="home" to="/" onClick={handleMobileNav}>
                      Home
                    </Link>
                  </h1>
                  <h1
                    className={
                      pathname == "/about"
                        ? "text-blue-500"
                        : "cursor-pointer hover:text-blue-500"
                    }
                  >
                    <Link id="about" to="/about" onClick={handleMobileNav}>
                      About
                    </Link>
                  </h1>
                  <h1
                    className={
                      pathname == "/skills"
                        ? "text-blue-500"
                        : "cursor-pointer hover:text-blue-500"
                    }
                  >
                    <Link id="skills" to="/skills" onClick={handleMobileNav}>
                      Skills
                    </Link>
                  </h1>
                  <h1
                    className={
                      pathname == "/projects"
                        ? "text-blue-500"
                        : "cursor-pointer hover:text-blue-500"
                    }
                  >
                    <Link
                      id="projects"
                      to="/projects"
                      onClick={handleMobileNav}
                    >
                      Projects
                    </Link>
                  </h1>
                  <h1
                    className={
                      pathname == "/blog"
                        ? "text-blue-500"
                        : "cursor-pointer hover:text-blue-500"
                    }
                  >
                    <Link id="blog" to="/blog" onClick={handleMobileNav}>
                      Blog
                    </Link>
                  </h1>

                  <ul className="flex space-x-2">
                    <li
                      className="inline-flex items-center cursor-pointer"
                      onClick={() => changeLanguage("fr")}
                    >
                      <span
                        className="i-flagpack-fr w-6 mb-1 mt-1 mr-1"
                        title="French"
                      ></span>
                      French
                    </li>
                    <li
                      className="inline-flex items-center cursor-pointer"
                      onClick={() => changeLanguage("en")}
                    >
                      <span
                        className="i-flagpack-gb-ukm w-6 mt-px mr-1"
                        title="English"
                      ></span>{" "}
                      English
                    </li>
                  </ul>
                </div>
                <div className="space-x-4 pt-20">
                  <div className="flex space-x-4">
                    <div className="rounded shadow-lg shadow-gray-400 p-3 cursor-pointer">
                      <a
                        href="https://github.com/prasad-chavan1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsGithub size="2rem" />
                      </a>
                    </div>
                    <div className="rounded shadow-lg shadow-gray-400 p-3 cursor-pointer">
                      <a
                        href="https://www.linkedin.com/in/prasad-chavan2003/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsLinkedin size="2rem" />
                      </a>
                    </div>
                  </div>
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
