import { useTranslation } from "react-i18next";

const TerminalMockup = ({ statusBarText, children }) => {
  const { t } = useTranslation();
  const status = statusBarText ?? t("common.proof_terminal_status");

  return (
    <div
      className="rounded-sm overflow-hidden border border-slate-300 dark:border-slate-600 bg-slate-900 dark:bg-slate-950"
      aria-label="Terminal mockup"
    >
      {/* Title bar - macOS / VS Code style */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-slate-800/90 border-b border-slate-700">
        <span className="w-3 h-3 rounded-full bg-red-500/90" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-amber-500/90" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/90" aria-hidden="true" />
        <span className="ml-2 text-slate-400 text-xs font-mono truncate">
          cypress/e2e
        </span>
      </div>

      {/* Content area - video/GIF or placeholder */}
      <div className="min-h-[200px] bg-slate-900 dark:bg-slate-950 flex items-center justify-center p-4">
        {children}
      </div>

      {/* Status bar - dynamic */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 dark:bg-slate-800/90 border-t border-slate-700 text-xs font-mono text-slate-300 dark:text-slate-400">
        <span>{status}</span>
        <span className="text-emerald-400 dark:text-emerald-400">●</span>
      </div>
    </div>
  );
};

export default TerminalMockup;
