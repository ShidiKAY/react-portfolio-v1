import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";

// Order matches DOM/scroll order on home: About → Skills → Projects → Approche → Engine (inclut Qualité dans le carousel) → Status → Recommendations
const SECTIONS = [
  { id: "toabout", labelKey: "common.quicknav_expertise" },
  { id: "toskills", labelKey: "common.quicknav_skills" },
  { id: "toprojects", labelKey: "common.quicknav_projets" },
  { id: "toapproche", labelKey: "common.quicknav_approche" },
  { id: "toengine", labelKey: "common.quicknav_engine" },
  { id: "tostatus", labelKey: "common.quicknav_status" },
  { id: "torecommendations", labelKey: "common.quicknav_recommendations" },
];

const HASH_IDS = ["tohome", ...SECTIONS.map((s) => s.id)];

const IDLE_DELAY_MS = 1800;

const QuickNav = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [labelsVisible, setLabelsVisible] = useState(true);
  const idleTimerRef = useRef(null);
  const location = useLocation();
  const { t } = useTranslation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const isTest = globalThis.process?.env?.NODE_ENV === "test";
    let rafId = null;
    const update = () => {
      setLabelsVisible(true);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setLabelsVisible(false), IDLE_DELAY_MS);

      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (total <= 0) {
        setScrollProgress(0);
      } else {
        const progress = Math.min(1, window.scrollY / total);
        setScrollProgress(progress);
      }

      const viewportMid = window.scrollY + window.innerHeight / 2;
      const firstEl = document.getElementById(SECTIONS[0].id);
      let hashId = null;
      if (firstEl && viewportMid < firstEl.offsetTop) {
        setActiveSection(SECTIONS[0].id);
        hashId = "tohome";
      } else {
        for (let i = SECTIONS.length - 1; i >= 0; i--) {
          const el = document.getElementById(SECTIONS[i].id);
          if (el && el.offsetTop <= viewportMid) {
            setActiveSection(SECTIONS[i].id);
            hashId = SECTIONS[i].id;
            break;
          }
        }
        if (hashId === null) {
          setActiveSection(SECTIONS[0].id);
          hashId = firstEl ? SECTIONS[0].id : "tohome";
        }
      }
      if (hashId) {
        const href = `${window.location.pathname}${window.location.search}#${hashId}`;
        if (window.location.hash !== `#${hashId}`) {
          window.history.replaceState(null, "", href);
        }
      }
    };
    const handleScroll = () => {
      if (isTest) {
        update();
        return;
      }
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    const scrollToHash = (hash) => {
      if (!hash || !HASH_IDS.includes(hash)) return;
      if (hash === "tohome") {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    };
    let rafIdInitial = null;
    let hashRetryId = null;
    const runAfterLayout = () => {
      update();
      const hash = location.hash.slice(1);
      scrollToHash(hash);
      if (hash && hash !== "tohome" && !document.getElementById(hash)) {
        hashRetryId = setTimeout(() => scrollToHash(hash), 400);
      }
    };
    if (isTest) {
      runAfterLayout();
    } else {
      update();
      rafIdInitial = requestAnimationFrame(() => {
        rafIdInitial = requestAnimationFrame(runAfterLayout);
      });
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (rafIdInitial != null) cancelAnimationFrame(rafIdInitial);
      if (hashRetryId != null) clearTimeout(hashRetryId);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isHome, location.pathname, location.state, location.hash]);

  if (!isHome) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 h-[1px] bg-slate-200 dark:bg-slate-700 z-[25]"
        aria-hidden="true"
      >
        <div
          className="h-full bg-cyan-500 dark:bg-cyan-400 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <nav
        aria-label="Quick navigation"
        className="fixed right-4 top-1/2 -translate-y-1/2 z-[25] flex flex-col gap-4"
      >
        {SECTIONS.map(({ id, labelKey }) => {
          const isActive = activeSection === id;
          return (
            <Link
              key={id}
              to={id}
              smooth
              duration={400}
              className={`relative flex items-center justify-end gap-2.5 transition-all duration-300 ease-out cursor-pointer group ${
                isActive ? "-translate-x-1" : ""
              }`}
              aria-label={t(labelKey)}
              aria-current={isActive ? "true" : undefined}
              onFocus={() => setLabelsVisible(true)}
              onMouseEnter={() => setLabelsVisible(true)}
            >
              <span
                className={`text-right text-xs sm:text-sm whitespace-nowrap transition-[opacity] duration-300 ease-out ${
                  isActive
                    ? "text-slate-800 dark:text-slate-100 font-semibold"
                    : "text-slate-400 dark:text-slate-500 font-normal hover:opacity-90"
                } ${!labelsVisible ? "pointer-events-none" : ""}`}
                style={{
                  opacity: labelsVisible ? (isActive ? 1 : 0.7) : 0,
                  transitionDelay: labelsVisible
                    ? isActive
                      ? "0ms"
                      : "120ms"
                    : isActive
                      ? "600ms"
                      : "0ms",
                }}
              >
                {t(labelKey)}
              </span>
              <span
                className={`flex-shrink-0 w-2 h-2 rounded-full border transition-all duration-300 ease-out ${
                  isActive
                    ? "bg-cyan-500 dark:bg-cyan-400 border-cyan-500 dark:border-cyan-400 scale-125 -translate-x-0.5 ring-2 ring-cyan-400/25"
                    : "bg-slate-300 dark:bg-slate-600 border-slate-300 dark:border-slate-600 hover:border-cyan-400/70 hover:scale-110"
                }`}
              />
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default QuickNav;
