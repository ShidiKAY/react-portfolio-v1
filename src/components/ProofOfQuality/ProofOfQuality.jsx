import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaCube, FaShieldAlt } from "react-icons/fa";
import TerminalMockup from "./TerminalMockup";

const ProofOfQuality = () => {
  const { t } = useTranslation();
  const hasCypressAsset = false; // Set to true when you add /images/cypress-demo.gif or .mp4

  return (
    <section
      id="toproof"
      className="w-full py-12 sm:py-16 px-4 sm:px-6"
      aria-labelledby="proof-heading"
    >
      <div className="max-w-3xl mx-auto w-full">
        <motion.header
          className="text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <h2
            id="proof-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-wide"
          >
            {t("common.proof_title")}
          </h2>
<p className="text-slate-600 dark:text-slate-300 text-base font-medium">
          {t("common.proof_subtitle")}
          </p>
        </motion.header>

        <div className="space-y-6">
          <motion.div
            className="bg-slate-50 dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-600 p-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <FaCube className="w-6 h-6 text-slate-600 dark:text-slate-400" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {t("common.proof_codex_title")}
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {t("common.proof_codex_desc")}
            </p>
          </motion.div>

          <motion.div
            className="bg-slate-50 dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-600 p-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
              {t("common.proof_cypress_title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-4">
              {t("common.proof_cypress_desc")}
            </p>
            <TerminalMockup>
              {hasCypressAsset ? (
                <img
                  src="/images/cypress-demo.gif"
                  alt="Cypress E2E test suite in action"
                  className="max-w-full h-auto rounded"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="w-full py-12 px-6 text-center border border-dashed border-slate-600 rounded-lg">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {t("common.proof_cypress_placeholder")}
                  </p>
                </div>
              )}
            </TerminalMockup>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 p-4 rounded-sm bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
          >
            <FaShieldAlt
              className="w-6 h-6 text-emerald-600 flex-shrink-0"
              aria-hidden="true"
            />
            <p className="text-emerald-800 dark:text-emerald-200 font-medium text-base">
              {t("common.proof_guarantee")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProofOfQuality;
