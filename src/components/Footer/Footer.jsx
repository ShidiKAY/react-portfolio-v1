import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiMalt } from "react-icons/si";

const SOCIAL_LINKS = [
  { href: "https://github.com/ShidiKAY", Icon: BsGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/kamal-ait-yous-90a6a3178/", Icon: BsLinkedin, label: "LinkedIn" },
  { href: "https://www.malt.fr/profile/kamalaityous", Icon: SiMalt, label: "Malt" },
];

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
        <span>{t("common.footer_copyright", { year })}</span>
        <div className="flex items-center gap-6">
          <a
            href="mailto:kamal.aityous@gmail.com"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            {t("common.footer_contact")}
          </a>
          <Link
            to="/"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            {t("common.home")}
          </Link>
          {SOCIAL_LINKS.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
