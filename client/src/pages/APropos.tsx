import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Book, Heart, Sparkles, Users } from "lucide-react";
import { Link } from "wouter";

export default function APropos() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1128] via-breslev-blue to-black text-white py-20 md:py-32">
          {/* Subtle Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-breslev-gold/10 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="container text-center relative z-10"
          >
            <Badge className="mb-6 bg-breslev-gold/20 text-breslev-gold border border-breslev-gold/50 px-4 py-1.5 text-sm uppercase tracking-widest backdrop-blur-sm">
              <Heart className="h-4 w-4 mr-2" />
              Notre Mission
            </Badge>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-breslev-cream to-breslev-gold">
              Transmettre la sagesse
              <br />
              de Rabbi Nachman
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
              Depuis plus de 50 ans, je me consacre à rendre accessibles les
              enseignements de Breslev aux lecteurs francophones.
            </p>
          </motion.div>
        </section>

        {/* Esther Ifrah Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              {/* Original Photo */}
              <div className="order-1 md:order-1">
                <div className="aspect-square rounded-lg shadow-breslev-lg overflow-hidden relative group border border-breslev-gold/30">
                  <img
                    src="/images/breslev_profile.png"
                    alt="Photo d'Esther Ifrah"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="order-2 md:order-2">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-breslev-blue">
                  Esther Ifrah
                </h2>
                <div className="space-y-6 text-xl text-muted-foreground leading-relaxed font-light">
                  <p>
                    Mon parcours spirituel a commencé à l'âge de 13 ans, lorsque
                    j'ai découvert pour la première fois les enseignements de
                    Rabbi Nachman de Breslev. Cette rencontre a transformé ma
                    vie et a éveillé en moi une passion profonde pour la
                    transmission de cette sagesse.
                  </p>
                  <p>
                    Depuis plus de 50 ans, je me consacre à la traduction et à
                    l'adaptation des textes sacrés de Breslev en français.
                    Chaque livre est le fruit d'un travail minutieux, d'une
                    étude approfondie et d'une méditation constante sur les
                    enseignements du Tsaddik.
                  </p>
                  <p>
                    Mon objectif n'est pas simplement de traduire des mots, mais
                    de préserver l'essence spirituelle et la profondeur de
                    chaque enseignement, tout en les rendant accessibles et
                    compréhensibles pour les lecteurs francophones
                    d'aujourd'hui.
                  </p>
                  <div className="pt-6 border-t border-breslev-gold/20">
                    <p className="font-serif italic text-2xl text-breslev-blue leading-relaxed border-l-4 border-breslev-gold pl-6 py-2">
                      "Chaque livre est une porte vers la joie et la lumière que
                      Rabbi Nachman nous a transmises."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-gradient-to-b from-breslev-cream to-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-breslev-blue">
                Notre Mission
              </h2>
              <p className="text-2xl text-muted-foreground leading-relaxed font-light">
                Rendre les enseignements de Rabbi Nachman accessibles à tous,
                dans leur authenticité et leur profondeur spirituelle.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Value 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-10 shadow-breslev hover:-translate-y-2 transition-transform duration-300 text-center border border-breslev-gold/10"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-breslev-cream to-zinc-100 shadow-inner mb-6">
                  <Book className="h-10 w-10 text-breslev-blue" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-breslev-blue">
                  Authenticité
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Des traductions fidèles qui préservent l'intégrité et la
                  profondeur des enseignements originaux de Rabbi Nachman.
                </p>
              </motion.div>

              {/* Value 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-10 shadow-breslev hover:-translate-y-2 transition-transform duration-300 text-center border border-breslev-gold/10"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-breslev-cream to-zinc-100 shadow-inner mb-6">
                  <Heart className="h-10 w-10 text-breslev-gold" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-breslev-blue">
                  Accessibilité
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Rendre ces textes sacrés compréhensibles et applicables à la
                  vie quotidienne des lecteurs francophones.
                </p>
              </motion.div>

              {/* Value 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-10 shadow-breslev hover:-translate-y-2 transition-transform duration-300 text-center border border-breslev-gold/10"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-breslev-cream to-zinc-100 shadow-inner mb-6">
                  <Sparkles className="h-10 w-10 text-breslev-gold" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-breslev-blue">
                  Transmission
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Partager la joie, la lumière et l'espoir qui émanent des
                  enseignements de Breslev avec les générations futures.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-breslev-blue">
                L'Impact de Breslev
              </h2>

              <div className="space-y-8">
                <div className="bg-card rounded-xl p-8 shadow-breslev border border-border">
                  <h3 className="text-2xl font-bold mb-4 text-breslev-blue">
                    Les Enseignements de Rabbi Nachman
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Rabbi Nachman de Breslev (1772-1810) était un maître
                    hassidique dont les enseignements continuent d'inspirer et
                    de transformer des vies à travers le monde. Sa sagesse
                    unique combine profondeur mystique et application pratique,
                    offrant un chemin de joie, d'espoir et de connexion
                    spirituelle.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Ses enseignements abordent des thèmes universels : la
                    prière, la joie, la foi, le dépassement des obstacles
                    spirituels, et la recherche constante de la proximité avec
                    le Créateur.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-8 shadow-breslev border border-border">
                  <h3 className="text-2xl font-bold mb-4 text-breslev-blue">
                    Pourquoi Breslev ?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Des enseignements accessibles à tous, quel que soit le niveau spirituel",
                      "Une emphase sur la joie et l'optimisme dans le service divin",
                      "Des outils pratiques pour la vie quotidienne et la croissance personnelle",
                      "Une communauté mondiale unie par l'amour des enseignements du Tsaddik",
                      "Un chemin de transformation intérieure et de connexion authentique",
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-breslev-gold flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 bg-breslev-cream">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6 shadow-breslev">
                <Users className="h-8 w-8 text-breslev-blue" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-breslev-blue">
                Rejoignez Notre Communauté
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Des milliers de lecteurs à travers le monde ont déjà découvert
                la joie et la sagesse des enseignements de Rabbi Nachman.
                Rejoignez-nous dans ce voyage spirituel transformateur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/boutique">Explorer les livres</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                >
                  <Link href="/abonnement">S'abonner</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-breslev-blue">
                Restons en Contact
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Vous avez des questions sur nos livres ou souhaitez en savoir
                plus sur les enseignements de Breslev ? N'hésitez pas à nous
                contacter.
              </p>
              <div className="bg-card rounded-xl p-8 shadow-breslev border border-border">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a
                      href="mailto:contact@breslev.fr"
                      className="text-lg font-medium text-breslev-gold hover:underline"
                    >
                      contact@breslev.fr
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Téléphone
                    </p>
                    <a
                      href="tel:+972585148500"
                      className="text-lg font-medium text-breslev-gold hover:underline"
                    >
                      +972 58-514-8500
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
