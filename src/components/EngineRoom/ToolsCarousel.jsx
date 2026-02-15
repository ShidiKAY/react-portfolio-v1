import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import CodexPanel from "./CodexPanel";
import ProofCypressPanel from "./ProofCypressPanel";
import LabsPanel from "./LabsPanel";

const GAP_PX = 24;
const SECTION_WIDTH_PX = 696;
const SECTION_MIN_HEIGHT_PX = 320 + 64;

const TOTAL_SECTIONS = 3;

const PANELS = [
  { id: "codex", Panel: CodexPanel },
  { id: "tests", Panel: ProofCypressPanel },
  { id: "labs", Panel: LabsPanel },
];

const PANEL_KEYS = ["codex", "tests", "labs"];

const SCROLL_END_DELAY_MS = 120;

const DRAG_THRESHOLD_PX = 8;

const ToolsCarousel = ({ onActivePanelChange }) => {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const scrollEndTimerRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, startScrollLeft: 0, decided: false, prevClientX: null, prevScrollLeft: null });
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(800);
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const step = SECTION_WIDTH_PX + GAP_PX;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.unobserve(el);
  }, []);

  const getCenteredIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 0;
    const viewportCenter = el.scrollLeft + el.offsetWidth / 2;
    const sectionCenter = viewportCenter - SECTION_WIDTH_PX / 2;
    return Math.max(0, Math.min(TOTAL_SECTIONS - 1, Math.round(sectionCenter / step)));
  }, [step]);

  const getScrollLeftForIndex = useCallback(
    (i) => {
      if (i <= 0) return 0;
      const cw = containerWidth || 800;
      return Math.max(0, i * step + SECTION_WIDTH_PX / 2 - cw / 2);
    },
    [step, containerWidth]
  );

  const scrollToSection = useCallback(
    (index) => {
      const el = scrollRef.current;
      if (!el) return;
      const i = Math.max(0, Math.min(TOTAL_SECTIONS - 1, index));
      setActiveTabIndex(i);
      onActivePanelChange?.(PANEL_KEYS[i]);
      const targetLeft = i === 0 ? 0 : getScrollLeftForIndex(i);
      const maxScroll = el.scrollWidth - el.offsetWidth;
      el.scrollTo({ left: Math.min(targetLeft, Math.max(0, maxScroll)), behavior: "smooth" });
    },
    [getScrollLeftForIndex, onActivePanelChange]
  );

  const snapToNearestPanel = useCallback(
    (force = false) => {
      if (!force && dragRef.current.active && dragRef.current.decided) return;
      const el = scrollRef.current;
      if (!el) return;
      const targetIndex = getCenteredIndex();
      const targetLeft = targetIndex === 0 ? 0 : getScrollLeftForIndex(targetIndex);
      const maxScroll = el.scrollWidth - el.offsetWidth;
      const left = Math.min(targetLeft, Math.max(0, maxScroll));
      if (Math.abs(el.scrollLeft - left) > 2) {
        el.scrollTo({ left, behavior: "smooth" });
      }
      setActiveTabIndex(targetIndex);
      onActivePanelChange?.(PANEL_KEYS[targetIndex]);
    },
    [getCenteredIndex, getScrollLeftForIndex, onActivePanelChange]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const idx = getCenteredIndex();
        setActiveTabIndex(idx);
        onActivePanelChange?.(PANEL_KEYS[idx]);
      });
    };
    const handleScrollEnd = () => {
      if (dragRef.current.active && dragRef.current.decided) return;
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = setTimeout(() => {
        if (dragRef.current.active && dragRef.current.decided) return;
        snapToNearestPanel();
      }, SCROLL_END_DELAY_MS);
    };
    const handleScrollEndNative = () => {
      if (dragRef.current.active && dragRef.current.decided) return;
      snapToNearestPanel();
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    el.addEventListener("scroll", handleScrollEnd, { passive: true });
    if ("onscrollend" in window) {
      el.addEventListener("scrollend", handleScrollEndNative, { passive: true });
    }
    return () => {
      el.removeEventListener("scroll", handleScroll);
      el.removeEventListener("scroll", handleScrollEnd);
      if ("onscrollend" in window) {
        el.removeEventListener("scrollend", handleScrollEndNative);
      }
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [getCenteredIndex, onActivePanelChange, snapToNearestPanel]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || containerWidth <= 0) return;
    onActivePanelChange?.("tests");
    const raf = requestAnimationFrame(() => {
      el.scrollLeft = getScrollLeftForIndex(1);
    });
    return () => cancelAnimationFrame(raf);
  }, [containerWidth, getScrollLeftForIndex, onActivePanelChange]);

  const rightPadding = Math.max(0, (containerWidth || 800) / 2 - SECTION_WIDTH_PX / 2);

  const goPrev = () => scrollToSection((getCenteredIndex() - 1 + TOTAL_SECTIONS) % TOTAL_SECTIONS);
  const goNext = () => scrollToSection((getCenteredIndex() + 1) % TOTAL_SECTIONS);

  const handlePointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startScrollLeft: el.scrollLeft,
      decided: false,
      prevClientX: null,
      prevScrollLeft: null,
    };
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      const el = scrollRef.current;
      const d = dragRef.current;
      if (!el || !d.active) return;
      if (!d.decided) {
        const dx = Math.abs(e.clientX - d.startX);
        const dy = Math.abs(e.clientY - d.startY);
        if (dx > DRAG_THRESHOLD_PX || dy > DRAG_THRESHOLD_PX) {
          d.decided = true;
          if (dx >= dy) {
            d.startScrollLeft = el.scrollLeft;
            d.startX = e.clientX;
            d.prevClientX = e.clientX;
            d.prevScrollLeft = el.scrollLeft;
            el.setPointerCapture(e.pointerId);
            setIsDragging(true);
          } else {
            d.active = false;
          }
        }
        return;
      }
      e.preventDefault();
      const maxScroll = el.scrollWidth - el.offsetWidth;
      const left =
        d.prevClientX !== null && d.prevScrollLeft !== null
          ? d.prevScrollLeft + (d.prevClientX - e.clientX)
          : d.startScrollLeft + d.startX - e.clientX;
      const clamped = Math.max(0, Math.min(maxScroll, left));
      el.scrollLeft = clamped;
      d.prevClientX = e.clientX;
      d.prevScrollLeft = clamped;
    },
    []
  );

  const handlePointerUp = useCallback(
    (e) => {
      const d = dragRef.current;
      if (d.active && d.decided) {
        const el = scrollRef.current;
        if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
        setIsDragging(false);
        dragRef.current = { active: false, startX: 0, startY: 0, startScrollLeft: 0, decided: false, prevClientX: null, prevScrollLeft: null };
        snapToNearestPanel(true);
      } else {
        dragRef.current = { active: false, startX: 0, startY: 0, startScrollLeft: 0, decided: false, prevClientX: null, prevScrollLeft: null };
      }
    },
    [snapToNearestPanel]
  );

  const handlePointerCancel = useCallback(
    (e) => {
      const el = scrollRef.current;
      if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      setIsDragging(false);
      dragRef.current = { active: false, startX: 0, startY: 0, startScrollLeft: 0, decided: false, prevClientX: null, prevScrollLeft: null };
    },
    []
  );

  return (
    <div className="relative w-full flex justify-center">
      <div className="flex items-stretch gap-0 self-start">
        <div
          role="button"
          tabIndex={isDragging ? -1 : 0}
          onClick={goPrev}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goPrev();
            }
          }}
          aria-label={t("common.project_nav_prev")}
          className={`relative flex-shrink-0 w-20 sm:w-28 min-w-[5rem] sm:min-w-[7rem] flex items-center justify-center cursor-pointer transition-colors duration-200 bg-slate-100/90 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200/95 dark:hover:bg-slate-900/70 hover:text-slate-900 dark:hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset group self-stretch ${isDragging ? "pointer-events-none" : ""}`}
        >
          <svg className="w-7 h-7 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-800 dark:bg-slate-700 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none">
            {t("common.project_nav_prev")}
          </span>
        </div>

        <div className="w-full max-w-5xl flex-shrink-0 self-start">
          <div className="w-full flex flex-col">
            <div
              ref={scrollRef}
              className={`min-h-0 overflow-x-auto overflow-y-hidden scrollbar-hide focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset box-border ${isDragging ? "cursor-grabbing relative z-10" : "cursor-grab"}`}
              tabIndex={0}
              role="region"
              aria-label={t("common.engine_section_title")}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  goPrev();
                } else if (e.key === "ArrowRight") {
                  e.preventDefault();
                  goNext();
                }
              }}
            >
              <div
                className="flex"
                style={{
                  gap: GAP_PX,
                  paddingLeft: 0,
                  paddingRight: rightPadding,
                  minHeight: SECTION_MIN_HEIGHT_PX,
                }}
              >
                {PANELS.map(({ id, Panel }, index) => {
                  const isActive = activeTabIndex === index;
                  return (
                    <section
                      key={id}
                      className={`flex-shrink-0 overflow-visible p-6 sm:p-8 transition-shadow duration-300 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex flex-col ${isActive ? "shadow-lg" : "shadow-sm"}`}
                      style={{ width: SECTION_WIDTH_PX, minHeight: SECTION_MIN_HEIGHT_PX }}
                      aria-labelledby={`panel-heading-${id}`}
                    >
                      <div className="min-h-[320px] flex-1 overflow-y-auto overflow-x-auto scrollbar-hide">
                        <Panel />
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          role="button"
          tabIndex={isDragging ? -1 : 0}
          onClick={goNext}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goNext();
            }
          }}
          aria-label={t("common.project_nav_next")}
          className={`relative flex-shrink-0 w-20 sm:w-28 min-w-[5rem] sm:min-w-[7rem] flex items-center justify-center cursor-pointer transition-colors duration-200 bg-slate-100/90 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200/95 dark:hover:bg-slate-900/70 hover:text-slate-900 dark:hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset group self-stretch ${isDragging ? "pointer-events-none" : ""}`}
        >
          <svg className="w-7 h-7 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-slate-800 dark:bg-slate-700 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none">
            {t("common.project_nav_next")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToolsCarousel;
