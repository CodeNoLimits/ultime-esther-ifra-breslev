import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Users, Zap } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Abonnement() {
  const [, navigate] = useLocation();

  const handleSubscribe = (planName: string) => {
    toast.info(`Abonnement ${planName} - Disponible prochainement !`, {
      description: "Les abonnements seront activés très bientôt. En attendant, découvrez nos livres à l'unité.",
      action: {
        label: "Voir la boutique",
        onClick: () => navigate("/boutique"),
      },
    });
  };

  const plans = [
    {
      id: "monthly",
      name: "Mensuel",
      price: 49,
      period: "mois",
      badge: "Flexible",
      icon: Zap,
      features: [
        "Accès immédiat à 30+ titres",
        "Lecture multi-devices",
        "Résiliable à tout moment",
        "Nouveautés incluses",
        "Support prioritaire",
      ],
      popular: false,
    },
    {
      id: "yearly",
      name: "Annuel",
      price: 490,
      period: "an",
      badge: "Meilleur rapport",
      icon: Sparkles,
      features: [
        "Tout du plan Mensuel",
        "Économisez 2 mois gratuits (118₪)",
        "Accès prioritaire aux nouveautés",
        "Badge membre premium",
        "Support VIP 24/7",
      ],
      popular: true,
      savings: "Économisez 118₪/an",
    },
    {
      id: "family",
      name: "Familial",
      price: 690,
      period: "an",
      badge: "Famille",
      icon: Users,
      features: [
        "Tout du plan Annuel",
        "3 comptes simultanés",
        "Partage familial sécurisé",
        "Gestion des profils enfants",
        "Support famille dédié",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Comment fonctionne l'abonnement ?",
      answer:
        "L'abonnement vous donne un accès illimité à toute notre bibliothèque de livres et brochures. Vous pouvez lire autant que vous voulez, sur tous vos appareils, tant que votre abonnement est actif.",
    },
    {
      question: "Puis-je annuler à tout moment ?",
      answer:
        "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace membre. L'annulation prendra effet à la fin de votre période de facturation en cours.",
    },
    {
      question: "Sur combien d'appareils puis-je lire ?",
      answer:
        "Les plans Mensuel et Annuel permettent la lecture sur un appareil à la fois. Le plan Familial permet jusqu'à 3 appareils simultanés.",
    },
    {
      question: "Les nouveaux livres sont-ils inclus ?",
      answer:
        "Oui, tous les nouveaux livres ajoutés à notre catalogue sont automatiquement inclus dans votre abonnement sans frais supplémentaires.",
    },
    {
      question: "Puis-je télécharger les livres ?",
      answer:
        "Non, pour protéger les droits d'auteur, les livres sont uniquement accessibles en lecture en ligne via notre lecteur sécurisé. Vous pouvez cependant les lire hors ligne sur l'application mobile.",
    },
    {
      question: "Que se passe-t-il si je ne renouvelle pas ?",
      answer:
        "Si vous ne renouvelez pas votre abonnement, vous perdrez l'accès à la bibliothèque complète. Vos livres achetés individuellement resteront accessibles.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-breslev-blue to-blue-900 text-white py-16 md:py-24">
          <div className="container text-center">
            <Badge className="mb-4 bg-breslev-gold text-breslev-blue">
              <Sparkles className="h-3 w-3 mr-1" />
              Accès Illimité
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Accédez à toute la sagesse de Breslev
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Plus de 30 livres et brochures en lecture illimitée. Lisez où vous
              voulez, quand vous voulez.
            </p>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-xl p-8 ${
                      plan.popular
                        ? "bg-breslev-blue text-white shadow-breslev-lg scale-105 border-4 border-breslev-gold"
                        : "bg-card shadow-breslev border border-border"
                    }`}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-breslev-gold text-breslev-blue">
                        {plan.badge}
                      </Badge>
                    )}

                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                        plan.popular
                          ? "bg-breslev-gold/20"
                          : "bg-breslev-cream"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          plan.popular ? "text-breslev-gold" : "text-breslev-blue"
                        }`}
                      />
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

                    {/* Badge */}
                    {!plan.popular && (
                      <Badge
                        variant="outline"
                        className="mb-4 border-breslev-blue text-breslev-blue"
                      >
                        {plan.badge}
                      </Badge>
                    )}

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-breslev-gold">
                          {plan.price}₪
                        </span>
                        <span
                          className={
                            plan.popular ? "text-white/80" : "text-muted-foreground"
                          }
                        >
                          /{plan.period}
                        </span>
                      </div>
                      {plan.savings && (
                        <p className="text-sm text-breslev-gold mt-1 font-medium">
                          {plan.savings}
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check
                            className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                              plan.popular
                                ? "text-breslev-gold"
                                : "text-breslev-blue"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              plan.popular ? "text-white/90" : "text-foreground"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-breslev-gold text-breslev-blue hover:bg-breslev-gold/90"
                          : ""
                      }`}
                      size="lg"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleSubscribe(plan.name)}
                    >
                      {plan.popular ? "Choisir Annuel" : `Choisir ${plan.name}`}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-breslev-cream">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 text-breslev-blue">
              Pourquoi s'abonner ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 shadow-breslev">
                  <Sparkles className="h-8 w-8 text-breslev-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-breslev-blue">
                  Bibliothèque toujours à jour
                </h3>
                <p className="text-muted-foreground">
                  Accédez aux nouveautés dès leur sortie sans frais
                  supplémentaires
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 shadow-breslev">
                  <Zap className="h-8 w-8 text-breslev-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-breslev-blue">
                  Multi-devices
                </h3>
                <p className="text-muted-foreground">
                  Lisez sur téléphone, tablette ou ordinateur, synchronisation
                  automatique
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 shadow-breslev">
                  <Check className="h-8 w-8 text-breslev-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-breslev-blue">
                  Sans engagement
                </h3>
                <p className="text-muted-foreground">
                  Annulez en un clic depuis votre espace membre, sans frais
                  cachés
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-breslev-blue">
              Questions Fréquentes
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-lg border border-border px-6"
                >
                  <AccordionTrigger className="text-left font-bold hover:text-breslev-gold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-breslev-gold/10 to-breslev-cream">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-breslev-blue">
              Commencez votre voyage spirituel aujourd'hui
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoignez des centaines de lecteurs qui approfondissent leur
              chemin spirituel avec les enseignements de Rabbi Nachman
            </p>
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Choisir mon abonnement
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
