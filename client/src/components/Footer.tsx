import { APP_TITLE } from "@/const";
import { Link } from "wouter";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-breslev-blue text-white mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-breslev-gold">
              {APP_TITLE}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Découvrez les enseignements de Rabbi Nachman à travers nos
              traductions et adaptations soigneusement préparées par Esther
              Ifrah.
            </p>
          </div>

          {/* Navigation */}
          <div>
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
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=100089800498498"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-breslev-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/estherifrah_breslev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-breslev-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>
            © {currentYear} {APP_TITLE}. Tous droits réservés.
          </p>
          <p className="mt-2 text-xs">
            Traductions et adaptations par Esther Ifrah
          </p>
        </div>
      </div>
    </footer>
  );
}
