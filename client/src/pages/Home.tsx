import { useAuth } from "@/_core/hooks/useAuth";
import BookCard from "@/components/BookCard";
import CoursAudioDuJour from "@/components/CoursAudioDuJour";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { BookOpen, Compass, Flame, Quote, Sparkles, Star } from "lucide-react";
import { Link } from "wouter";

function FeaturedBooks() {
  const { data: books, isLoading } = trpc.books.getFeatured.useQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="bg-card rounded-lg shadow-breslev p-6 animate-pulse"
          >
            <div className="aspect-[3/4] bg-white/5 rounded-lg mb-4" />
            <div className="h-6 bg-white/5 rounded mb-2" />
            <div className="h-4 bg-white/5 rounded mb-4" />
            <div className="h-10 bg-white/5 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Aucun livre phare disponible pour le moment
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {books.map((book, index) => (
        <BookCard key={book.id} book={book} index={index} />
      ))}
    </div>
  );
}

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* VERSION CLAUDE CODE — HERO SECTION */}
        <section className="hero-v2-bg min-h-[70vh] md:min-h-[90vh] flex items-center justify-center border-b border-white/5">
          <div className="hero-v2-overlay"></div>

          {/* Animated Gold Halo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-[#d4a843]/30 blur-[80px] rounded-[100%] pointer-events-none z-[1]"
          />

          {/* Decorative vertical lines */}
          <div className="absolute left-8 lg:left-16 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-10 hidden md:block" />
          <div className="absolute right-8 lg:right-16 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-10 hidden md:block" />

          <div className="container relative py-20 md:py-32 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl text-left"
              >
                <Badge className="mb-6 bg-transparent border border-[#d4a843] text-[#d4a843] hover:bg-[#d4a843]/10 px-4 py-1">
                  <Sparkles className="h-3 w-3 mr-2" />
                  Collection Kadosh Refined
                </Badge>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] font-cinzel">
                  <span className="text-white">Sagesse &</span>
                  <br />
                  <span className="text-gradient-gold text-glow-gold">
                    Lumière Breslev
                  </span>
                </h1>

                <p className="text-lg md:text-2xl mb-8 md:mb-10 text-white/90 md:text-white/80 leading-relaxed font-cormorant border-l-2 border-[#d4a843]/50 pl-4 md:pl-6">
                  Traductions authentiques des enseignements de Rabbi Nachman de
                  Breslev pour éclairer votre chemin spirituel au quotidien.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    asChild
                    size="lg"
                    className="btn-premium-cta text-lg px-8 py-6 h-auto font-cinzel tracking-wider uppercase"
                  >
                    <Link href="/boutique">Explorer les Livres</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#d4a843]/40 text-[#d4a843] bg-transparent hover:bg-[#d4a843]/10 text-lg px-8 py-6 h-auto font-cinzel tracking-wider uppercase backdrop-blur-sm transition-all hover:border-[#d4a843]"
                  >
                    <Link href="/abonnement">S'abonner</Link>
                  </Button>
                </div>
              </motion.div>

              {/* Right Content - 3D Book */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="relative hidden lg:flex justify-center items-center"
              >
                <div className="absolute w-64 h-64 bg-[#d4a843]/20 rounded-full blur-[100px]"></div>
                <div className="animate-pulse-ring w-[400px] h-[400px]"></div>

                <div className="relative z-10 animate-float-3d">
                  <img
                    src="/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg"
                    alt="Livre vedette Breslev: Likoutey Moharane"
                    loading="eager"
                    fetchPriority="high"
                    className="w-[280px] h-[400px] object-cover rounded-md shadow-2xl border-l-4 border-[#8c6b22] border-r border-[#ffffff20] border-t border-[#ffffff10]"
                    style={{
                      transform: "rotateY(-15deg) rotateX(5deg)",
                      boxShadow:
                        "-20px 20px 30px rgba(0,0,0,0.8), inset 2px 0px 5px rgba(255,255,255,0.3)",
                      filter: "contrast(1.1) brightness(0.95)",
                    }}
                  />
                  <div className="badge-bestseller-v2">Meilleure Vente</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cours Audio du Jour */}
        <section className="py-20 border-b border-white/5 relative overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <CoursAudioDuJour />
              </motion.div>
            </div>
          </div>
        </section>

        {/* "Les 4 Piliers Fondamentaux" */}
        <section className="py-24 border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d4a843]/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#d4a843] uppercase mb-4 font-cinzel">
                L'Essence de Breslev
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white font-cinzel">
                Les 4 Piliers Fondamentaux
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: BookOpen, title: "L'Étude", desc: "L'engagement assidu dans la sagesse de la Torah pour éclairer l'intellect et l'âme." },
                { icon: Flame, title: "La Prière", desc: "La connexion authentique et brûlante avec le divin à travers le cœur." },
                { icon: Star, title: "La Joie", desc: "\"C'est une grande Mitsva d'être toujours joyeux\" - le remède absolu." },
                { icon: Compass, title: "Hitbodedout", desc: "L'isolement méditatif quotidien pour parler à Dieu comme au meilleur des amis." },
              ].map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  className="glass-card-v2 p-8 text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#d4a843]/20 to-transparent border border-[#d4a843]/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <pillar.icon className="h-8 w-8 text-[#d4a843]" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white font-cinzel">
                    {pillar.title}
                  </h4>
                  <p className="text-white/60 leading-relaxed font-cormorant text-lg">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="w-24 h-[1px] bg-[#d4a843] mx-auto opacity-50" />
            </div>
          </div>
        </section>

        {/* Featured Books — Unified Dark */}
        <section className="py-24 border-b border-white/5">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#d4a843] uppercase mb-4 font-cinzel">
                Notre Sélection
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white font-cinzel">
                Livres Phares
              </h3>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Découvrez notre sélection de livres essentiels pour débuter ou
                approfondir votre étude des enseignements de Rabbi Nachman.
              </p>
            </div>

            <FeaturedBooks />

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 hover:border-[#d4a843]/40">
                <Link href="/boutique">Voir tous les livres</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section — Esther Ifrah */}
        <section className="py-24 border-b border-white/5">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="aspect-square rounded-lg shadow-breslev-lg overflow-hidden relative group border border-[#d4a843]/30">
                  <img
                    src="/images/breslev_profile.png"
                    alt="Photo d'Esther Ifrah"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="order-1 md:order-2">
                <Badge className="mb-4 bg-[#d4a843] text-[#0a0a0a]">
                  Notre Mission
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Esther Ifrah
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Depuis plus de 50 ans, je me consacre à la traduction et à
                    l'adaptation des enseignements de Rabbi Nachman de Breslev
                    en français.
                  </p>
                  <p>
                    Mon parcours spirituel a commencé à l'âge de 13 ans, et
                    depuis, je n'ai cessé de partager la sagesse et la joie qui
                    émanent de ces textes sacrés.
                  </p>
                  <p>
                    Chaque livre est le fruit d'un travail minutieux pour
                    préserver l'authenticité et la profondeur des enseignements
                    tout en les rendant accessibles aux lecteurs francophones.
                  </p>
                </div>
                <Button asChild size="lg" className="mt-6">
                  <Link href="/a-propos">En savoir plus sur mon parcours</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Temoignages */}
        <section className="py-24 border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#d4a843]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/3" />
          <div className="container relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#d4a843] uppercase mb-4 font-cinzel">
                Temoignages
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white font-cinzel">
                Ce que disent nos lecteurs
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah L.",
                  rating: 5,
                  text: "Un livre magnifique qui m'a profondement touchee. Les enseignements de Rabbi Nahman sont presentes de maniere claire et accessible. Je le recommande vivement.",
                },
                {
                  name: "Rachel M.",
                  rating: 5,
                  text: "Esther Ifrah a fait un travail remarquable de traduction et d'adaptation. Ce livre est devenu mon compagnon quotidien de priere et de meditation.",
                },
                {
                  name: "Lea K.",
                  rating: 4,
                  text: "Tres bon livre, riche en enseignements. La qualite de l'impression est excellente. Une lecture essentielle pour toute personne en quete de spiritualite.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="glass-card-v2 p-8 relative"
                >
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-[#d4a843]/20" />
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= testimonial.rating
                            ? "fill-[#d4a843] text-[#d4a843]"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-white/70 leading-relaxed font-cormorant text-lg mb-6">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d4a843]/20 border border-[#d4a843]/30 flex items-center justify-center text-[#d4a843] font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-white text-sm">
                      {testimonial.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription CTA Section */}
        <section className="py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Accédez à toute la sagesse de Breslev
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Avec notre abonnement, profitez d'un accès illimité à plus de 30
                livres et brochures. Lisez où vous voulez, quand vous voulez.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card rounded-lg p-6 shadow-breslev border border-white/10">
                  <h3 className="font-bold text-lg mb-2">Mensuel</h3>
                  <p className="text-3xl font-bold text-[#d4a843] mb-2">
                    49₪
                    <span className="text-sm text-muted-foreground">/mois</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Flexible et sans engagement
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#d4a843]/15 to-[#d4a843]/5 text-white rounded-lg p-6 shadow-breslev-lg relative overflow-hidden border-2 border-[#d4a843]/40">
                  <Badge className="absolute top-2 right-2 bg-[#d4a843] text-[#0a0a0a]">
                    Populaire
                  </Badge>
                  <h3 className="font-bold text-lg mb-2">Annuel</h3>
                  <p className="text-3xl font-bold text-[#d4a843] mb-2">
                    490₪
                    <span className="text-sm text-white/80">/an</span>
                  </p>
                  <p className="text-sm text-white/80">
                    Économisez 2 mois gratuits
                  </p>
                </div>

                <div className="bg-card rounded-lg p-6 shadow-breslev border border-white/10">
                  <h3 className="font-bold text-lg mb-2">Familial</h3>
                  <p className="text-3xl font-bold text-[#d4a843] mb-2">
                    690₪
                    <span className="text-sm text-muted-foreground">/an</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    3 comptes simultanés
                  </p>
                </div>
              </div>

              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/abonnement">Découvrir les abonnements</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
