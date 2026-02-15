import { useTranslation } from "react-i18next";
import { FaVideo } from "react-icons/fa";
import TerminalMockup from "../ProofOfQuality/TerminalMockup";

const hasCypressAsset = false;

const ProofCypressPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="toproof" className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {t("common.proof_cypress_title")}
      </h3>
      <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
        {t("common.proof_cypress_desc")}
      </p>
      <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
        {t("common.proof_cypress_how")}
      </p>
      <TerminalMockup>
        {hasCypressAsset ? (
          <>
            <img
              src="/images/cypress-demo.gif"
              alt="Cypress E2E test suite in action"
              className="max-w-full h-auto rounded"
              loading="lazy"
              decoding="async"
            />
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
              {t("common.proof_cypress_demo_content")}
            </p>
          </>
        ) : (
          <div className="w-full py-8 px-4 text-center border border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100/50 dark:bg-slate-800/50">
            <FaVideo className="w-8 h-8 mx-auto text-slate-400 dark:text-slate-500 mb-2" aria-hidden="true" />
            <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
              {t("common.proof_cypress_coming_soon")}
            </p>
            <p className="mt-1 text-slate-600 dark:text-slate-300 text-sm font-medium">
              {t("common.proof_cypress_demo_content")}
            </p>
            <p className="mt-1 text-slate-500 dark:text-slate-400 text-xs">
              {t("common.proof_cypress_placeholder")}
            </p>
          </div>
        )}
      </TerminalMockup>
      <div className="p-3 rounded-sm bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700">
        <p className="text-emerald-800 dark:text-emerald-200 font-semibold text-sm mb-2">
          {t("common.proof_cypress_benefits_title")}
        </p>
        <ul className="list-none space-y-1 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-emerald-500 dark:text-emerald-400 mt-0.5" aria-hidden="true">✓</span>
              <span>{t(`common.proof_cypress_benefit_${i}`)}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-emerald-800 dark:text-emerald-200 font-medium text-sm flex items-center gap-2">
        <span className="text-emerald-500 dark:text-emerald-400" aria-hidden="true">🛡</span>
        {t("common.proof_guarantee")}
      </p>
    </div>
  );
};

export default ProofCypressPanel;
