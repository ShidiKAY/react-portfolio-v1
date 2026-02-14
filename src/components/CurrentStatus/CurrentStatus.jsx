import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TIMEZONE, DEFAULT_AVAILABLE } from "../../config/availability";
import { FaSlack, FaVideo } from "react-icons/fa";
import { SiGitlab, SiLinear } from "react-icons/si";

const tools = [
  { key: "loom", Icon: FaVideo, labelKey: "common.status_tool_loom" },
  { key: "slack", Icon: FaSlack, labelKey: "common.status_tool_slack" },
  { key: "gitlab", Icon: SiGitlab, labelKey: "common.status_tool_gitlab" },
  { key: "linear", Icon: SiLinear, labelKey: "common.status_tool_linear" },
];

const CurrentStatus = () => {
  const { t } = useTranslation();
  const [localTime, setLocalTime] = useState("");
  const [availability] = useState(DEFAULT_AVAILABLE);

  useEffect(() => {
    const formatTime = () => {
      const date = new Date();
      setLocalTime(
        date.toLocaleTimeString(undefined, {
          timeZone: TIMEZONE,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    formatTime();
    const interval = setInterval(formatTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="tostatus"
      className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-slate-50/80 border-t border-slate-200"
      aria-labelledby="status-heading"
    >
      <div className="max-w-3xl mx-auto w-full">
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <h2
            id="status-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2"
          >
            {t("common.status_title")}
          </h2>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">
              {t("common.status_time_label")}
            </p>
            <p className="text-2xl font-mono font-semibold text-slate-900 tabular-nums">
              {localTime || "–"}
            </p>
            <p className="text-xs text-slate-400 mt-1">{TIMEZONE}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">
              {t("common.status_availability_label")}
            </p>
            <p className="text-lg font-semibold text-emerald-600">
              {availability
                ? t("common.status_availability")
                : t("common.status_availability_focus")}
            </p>
          </div>
        </motion.div>

        <motion.p
          className="text-slate-600 text-base leading-relaxed mb-8 italic max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {t("common.status_timezone_advantage")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            {t("common.status_tools_title")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {tools.map(({ key, Icon, labelKey }) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium shadow-sm"
              >
                <Icon className="w-5 h-5 text-slate-500" aria-hidden="true" />
                {t(labelKey)}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentStatus;
