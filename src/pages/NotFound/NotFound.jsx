import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-6xl sm:text-8xl font-bold text-slate-200 dark:text-slate-700">
        404
      </h1>
      <p className="mt-4 text-xl text-slate-600 dark:text-slate-300">
        {t("common.notfound_message")}
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 rounded-lg bg-cyan-500 dark:bg-cyan-400 text-white font-medium hover:bg-cyan-600 dark:hover:bg-cyan-500 transition-colors"
      >
        {t("common.notfound_back")}
      </Link>
    </div>
  );
};

export default NotFound;
