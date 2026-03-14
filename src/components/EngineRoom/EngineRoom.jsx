import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import ToolsCarousel from "./ToolsCarousel";
import CurrentStatus from "./CurrentStatus";

const DEFAULT_PANEL_KEY = "tests";

const EngineRoom = () => {
  const { t } = useTranslation();
  const [activePanelKey, setActivePanelKey] = useState(DEFAULT_PANEL_KEY);

  const titleKey = `common.engine_panel_title_${activePanelKey}`;
  const subtitleKey = `common.engine_panel_subtitle_${activePanelKey}`;

  return (
    <section
      id="toengine"
      className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-slate-50/60 dark:bg-slate-900/20"
      aria-labelledby="engine-room-heading"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.header
          className="text-center mb-12 sm:mb-14 min-h-[5.5rem] sm:min-h-[6rem] flex flex-col justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <h2
            id="engine-room-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-wide font-montserrat"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activePanelKey}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="inline-block"
              >
                {t(titleKey)}
              </motion.span>
            </AnimatePresence>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-[0.9375rem] max-w-xl mx-auto leading-relaxed mt-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activePanelKey}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="inline-block"
              >
                {t(subtitleKey)}
              </motion.span>
            </AnimatePresence>
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto mt-2 italic">
            {t("common.engine_process_phrase")}
          </p>
        </motion.header>
      </div>

      <div className="w-full">
        <ToolsCarousel onActivePanelChange={setActivePanelKey} />
      </div>

      <div className="max-w-5xl mx-auto w-full mt-12 sm:mt-14">
        <CurrentStatus />
      </div>
    </section>
  );
};

export default EngineRoom;
