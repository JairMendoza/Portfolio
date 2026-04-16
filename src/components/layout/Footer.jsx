import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-bold tracking-tighter mb-4">
              JM<span className="text-primary">.</span>
            </div>
            <p className="text-secondary-foreground text-sm max-w-xs">
              {t("cta.available")}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">{t("nav.home")}</h4>
            <a
              href="/projects"
              className="text-sm text-secondary-foreground hover:text-primary transition-colors"
            >
              {t("nav.projects")}
            </a>
            <a
              href="/contact"
              className="text-sm text-secondary-foreground hover:text-primary transition-colors"
            >
              {t("nav.contact")}
            </a>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex gap-4">
              <a
                href="https://github.com/JairMendoza"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-surface hover:bg-surface-hover rounded-full transition-colors text-foreground"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
                </svg>
              </a>
              <a
                href="mailto:jairtactec@gmail.com"
                className="p-2 bg-surface hover:bg-surface-hover rounded-full transition-colors text-foreground"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary-foreground">
          <p>© {year} Jair Mendoza. Todos los derechos reservados.</p>
          <p>Built with React, Tailwind & GSAP</p>
        </div>
      </div>
    </footer>
  );
}
