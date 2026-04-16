import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { MessageCircle, Mail } from "lucide-react";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24 min-h-[80vh] flex flex-col">
      <Helmet>
        <title>{t("contact.title")} | Jair Mendoza</title>
      </Helmet>

      <div className="container mx-auto px-6 max-w-4xl flex-grow">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-secondary-foreground text-lg">
            {t("cta.available")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* WhatsApp CTA */}
          <div className="glass p-12 rounded-3xl border border-border flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors">
            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-4 tracking-tighter">
              ¿Prefieres un mensaje rápido?
            </h2>
            <p className="text-secondary-foreground mb-8">
              Escríbeme por WhatsApp y hablemos sobre tu próximo proyecto.
            </p>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              {t("contact.whatsapp")}
            </a>
          </div>

          {/* Email CTA */}
          <div className="glass p-12 rounded-3xl border border-border flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-4 tracking-tighter">
              Envíame un correo
            </h2>
            <p className="text-secondary-foreground mb-8">
              Si tienes una propuesta formal o una consulta detallada.
            </p>
            <a
              href="mailto:jairtactec@gmail.com"
              className="w-full py-4 bg-surface hover:bg-surface-hover border border-border text-foreground font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              jairtactec@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
