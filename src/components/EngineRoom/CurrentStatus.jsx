import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CLIENT_TIMEZONE,
  MY_TIMEZONE,
  DEFAULT_AVAILABLE,
} from "../../config/availability";
import { FaSlack, FaVideo } from "react-icons/fa";
import { SiGitlab, SiLinear } from "react-icons/si";
import { HiOutlineClock } from "react-icons/hi";

const formatTime = (timeZone) => {
  return new Date().toLocaleTimeString(undefined, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

/** Paris hour (0–23) for time-window messaging. */
const getParisHour = () => {
  const hourStr = new Date().toLocaleString("en-CA", {
    timeZone: CLIENT_TIMEZONE,
    hour: "numeric",
    hour12: false,
  });
  return parseInt(hourStr, 10) || 0;
};

/** "collaboration" = 14h–19h Paris, "flex" = 19h–00h Paris, else null (default). */
const getTimeWindowKey = (parisHour) => {
  if (parisHour >= 14 && parisHour < 19) return "collaboration";
  if (parisHour >= 19 || parisHour < 1) return "flex";
  return null;
};

const tools = [
  {
    key: "loom",
    Icon: FaVideo,
    labelKey: "common.status_tool_loom",
  },
  {
    key: "slack",
    Icon: FaSlack,
    labelKey: "common.status_tool_slack",
  },
  {
    key: "linear",
    Icon: SiLinear,
    labelKey: "common.status_tool_linear",
  },
  {
    key: "gitlab",
    Icon: SiGitlab,
    labelKey: "common.status_tool_gitlab",
  },
];

const CurrentStatus = () => {
  const { t } = useTranslation();
  const [parisTime, setParisTime] = useState("");
  const [myTime, setMyTime] = useState("");
  const [parisHour, setParisHour] = useState(null);
  const [availability] = useState(DEFAULT_AVAILABLE);

  useEffect(() => {
    const tick = () => {
      setParisTime(formatTime(CLIENT_TIMEZONE));
      setMyTime(formatTime(MY_TIMEZONE));
      setParisHour(getParisHour());
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeWindowKey = parisHour !== null ? getTimeWindowKey(parisHour) : null;

  return (
    <div
      id="tostatus"
      className="w-full rounded-sm bg-slate-200/95 dark:bg-slate-800/95 border border-slate-300 dark:border-slate-600/50 overflow-hidden"
      aria-labelledby="status-dashboard-heading"
    >
      <div className="p-6 sm:p-8">
        <motion.h3
          id="status-dashboard-heading"
          className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-6 flex items-center gap-2"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-cyan-600 dark:text-cyan-400/90 font-mono text-sm uppercase tracking-wider">
            Remote-Ready Dashboard
          </span>
        </motion.h3>

        {/* Timezone Synchronization - horloge double */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
            {t("common.status_sync_title")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-600/40 px-5 py-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                {t("common.status_paris_label")}
              </p>
              <p className="font-mono text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                {parisTime || "–"}
              </p>
            </div>
            <div className="rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-cyan-400/50 dark:border-cyan-500/30 px-5 py-4">
              <p className="text-xs text-cyan-600 dark:text-cyan-400/80 mb-1">
                {t("common.status_my_time_label")} ({MY_TIMEZONE.split("/")[1]})
              </p>
              <p className="font-mono text-2xl sm:text-3xl font-semibold text-cyan-700 dark:text-cyan-100 tabular-nums">
                {myTime || "–"}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <HiOutlineClock className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0" aria-hidden="true" />
            <span>{t("common.status_timezone_connected")}</span>
            {timeWindowKey === "collaboration" && (
              <span className="text-cyan-600 dark:text-cyan-400/90">· {t("common.status_window_collaboration")}</span>
            )}
            {timeWindowKey === "flex" && (
              <span className="text-amber-600 dark:text-amber-400/90">· {t("common.status_window_flex")}</span>
            )}
          </div>
        </motion.div>

        {/* Statut de disponibilité - pastille + Disponibilité adaptative */}
        <motion.div
          className="mb-6 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <div className="flex items-center gap-3">
            <span
              className="relative flex h-3 w-3"
              aria-hidden="true"
            >
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  availability
                    ? "animate-ping bg-emerald-400"
                    : "bg-amber-400"
                }`}
              />
              <span
                className={`relative inline-flex h-3 w-3 rounded-full ${
                  availability ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
            </span>
            <HiOutlineClock className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {t("common.status_adaptive_availability")}. {t("common.status_available_async")}
            </span>
          </div>
        </motion.div>

        {/* Mode Asynchrone + Continuité 24h - les deux piliers */}
        <motion.div
          className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.06 }}
        >
          <div className="rounded-lg bg-slate-100 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600/40 px-4 py-3">
            <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400/90 uppercase tracking-wider mb-1">
              {t("common.status_mode_async_label")}
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-snug">
              {t("common.status_mode_async")}
            </p>
          </div>
          <div className="rounded-lg bg-slate-100 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600/40 px-4 py-3">
            <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400/90 uppercase tracking-wider mb-1">
              {t("common.status_continuite_24h_label")}
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-snug">
              {t("common.status_continuite_24h")}
            </p>
          </div>
        </motion.div>

        {/* Message "Force Tranquille" */}
        <motion.blockquote
          className="mb-8 pl-4 border-l-2 border-cyan-500/50 text-slate-600 dark:text-slate-300 text-base leading-relaxed italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {t("common.status_message_force")}
        </motion.blockquote>

        {/* Asynchronous Workflow - Stack */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.12 }}
        >
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            {t("common.status_workflow_title")}
          </p>
          <div className="flex flex-wrap gap-3">
            {tools.map(({ key, Icon, labelKey }) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600/50 text-slate-700 dark:text-slate-200 text-sm font-medium hover:border-slate-400 dark:hover:border-slate-500/60 hover:bg-slate-200 dark:hover:bg-slate-700/70 transition-colors"
              >
                <Icon
                  className="w-5 h-5 text-slate-500 dark:text-slate-400"
                  aria-hidden="true"
                />
                {t(labelKey)}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CurrentStatus;
