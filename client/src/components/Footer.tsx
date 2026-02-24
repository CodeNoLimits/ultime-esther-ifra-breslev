import { APP_TITLE } from "@/const";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-breslev-blue text-white mt-auto border-t-4 border-[#d4a843] overflow-hidden">
      {/* Texture Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('/assets/patterns/breslev-pattern.svg')",
          backgroundSize: "300px",
        }}
      />
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4a843]/10 blur-[150px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="container py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Newsletter (Magazine Style) - Takes up more space */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-cinzel font-bold text-4xl mb-4 text-[#d4a843] tracking-wider uppercase">
                {APP_TITLE}
              </h3>
              <p className="text-lg text-white/80 leading-relaxed font-cormorant border-l-2 border-[#d4a843]/50 pl-4 mb-8">
                L'essence de la sagesse de Rabbi Nachman de Breslev, traduite et
                adaptée avec rigueur et amour par Esther Ifrah.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 mt-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4a843]/20 blur-[50px] rounded-full"></div>
              <h4 className="font-cinzel font-bold text-[#d4a843] text-xl mb-2 flex items-center gap-2">
                <Mail className="h-5 w-5" /> La Lettre d'Inspiration
              </h4>
              <p className="text-white/70 text-sm mb-4 font-cormorant text-lg">
                Recevez chaque semaine une étincelle de sagesse de Breslev
                directement dans votre boîte mail.
              </p>
              <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  aria-label="Votre adresse email pour la newsletter"
                  placeholder="Votre adresse email..."
                  className="w-full bg-[#0b111a]/50 border border-white/20 rounded-md px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-[#d4a843] transition-colors focus-visible:ring-2 focus-visible:ring-[#d4a843]"
                />
                <button
                  type="submit"
                  aria-label="S'inscrire à la newsletter"
                  className="bg-gradient-to-r from-[#d4a843] to-[#b58c30] text-[#1a2332] font-bold px-6 py-2 rounded-md hover:brightness-110 transition-all font-cinzel focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  S'inscrire
                </button>
              </form>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 lg:col-span-2 lg:col-start-7">
            <h3 className="font-bold text-lg mb-4 text-breslev-gold">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-white/80 hover:text-breslev-gold transition-colors">
                    Accueil
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/boutique">
                  <a className="text-white/80 hover:text-breslev-gold transition-colors">
                    Boutique
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/abonnement">
                  <a className="text-white/80 hover:text-breslev-gold transition-colors">
                    Abonnement
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/a-propos">
                  <a className="text-white/80 hover:text-breslev-gold transition-colors">
                    À Propos
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-breslev-gold">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mentions-legales">
                  <a className="text-white/80 hover:text-breslev-gold transition-colors">
                    Mentions Légales
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cgv">
                  <a className="text-white/80 hover:text-breslev-gold transition-colors">
                    CGV
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite">
                  <a className="text-white/80 hover:text-breslev-gold transition-colors">
                    Politique de Confidentialité
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-breslev-gold">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-breslev-gold" />
                <a
                  href="mailto:contact@breslev.fr"
                  className="text-white/80 hover:text-breslev-gold transition-colors"
                >
                  contact@breslev.fr
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-breslev-gold" />
                <a
                  href="tel:+972585148500"
                  className="text-white/80 hover:text-breslev-gold transition-colors"
                >
                  +972 58-514-8500
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-8">
              <a
                href="https://www.facebook.com/profile.php?id=100089800498498"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-breslev-gold/30 text-white hover:bg-breslev-gold hover:text-breslev-blue hover:-translate-y-1 transition-all duration-300 shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/estherifrah_breslev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-breslev-gold/30 text-white hover:bg-breslev-gold hover:text-breslev-blue hover:-translate-y-1 transition-all duration-300 shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Fancy Magazine Divider */}
        <div className="mt-16 pt-8 border-t border-white/10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-breslev-blue px-4">
            <img
              src="/assets/dividers/divider-magen-david.svg"
              alt="divider"
              className="h-6 opacity-60"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/50 font-cormorant text-lg mt-6">
            <p>
              © {currentYear} {APP_TITLE}. Collection Kadosh Refined.
            </p>
            <p className="mt-2 md:mt-0 italic">
              "Il est interdit d'être vieux." - Rabbi Nachman
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
