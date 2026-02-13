import { useAuth } from "@/_core/hooks/useAuth";
import { APP_LOGO } from "@/const";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/boutique", label: "Boutique" },
    { href: "/abonnement", label: "Abonnement" },
    { href: "/a-propos", label: "À Propos" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={APP_LOGO} alt="Esther Ifrah" className="h-10 w-10" />
              <span className="text-xl font-bold text-breslev-blue hidden sm:inline">
                Esther Ifrah - Littérature Breslev
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`text-sm font-medium transition-colors hover:text-breslev-gold ${
                    isActive(link.href)
                      ? "text-breslev-gold"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            <Link href="/panier">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {/* Badge count - à implémenter avec le panier */}
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-breslev-gold text-breslev-blue text-xs flex items-center justify-center font-bold">
                  0
                </span>
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <Link href="/espace-membre">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="hidden md:inline-flex"
                onClick={() => toast.info("Connexion disponible prochainement")}
              >
                Connexion
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-breslev-cream text-breslev-gold"
                        : "text-foreground hover:bg-breslev-cream"
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
              {!isAuthenticated && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toast.info("Connexion disponible prochainement");
                  }}
                  className="block w-full px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 text-center"
                >
                  Connexion
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
