import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet as Head } from "react-helmet-async";
import { SEO_BASE_URL } from "../../config/seo";

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("common.privacy_title")}</title>
        <meta name="description" content={t("common.privacy_meta")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SEO_BASE_URL}/privacy`} />
      </Head>
      <div className="min-h-[50vh] max-w-3xl mx-auto px-4 py-12 sm:py-16 text-slate-800 dark:text-slate-200">
        <h1 className="text-2xl sm:text-3xl font-bold font-montserrat mb-6">{t("common.privacy_title")}</h1>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {t("common.privacy_body")}
        </div>
        <Link
          to="/"
          className="inline-block mt-10 text-cyan-600 dark:text-cyan-400 hover:underline font-medium cursor-pointer"
        >
          {t("common.privacy_back")}
        </Link>
      </div>
    </>
  );
};

export default Privacy;
