import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Book, Heart, Sparkles, Users } from "lucide-react";

export default function APropos() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-breslev-blue to-blue-900 text-white py-16 md:py-24">
          <div className="container text-center">
            <Badge className="mb-4 bg-breslev-gold text-breslev-blue">
              <Heart className="h-3 w-3 mr-1" />
              Notre Mission
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transmettre la sagesse de Rabbi Nachman
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Depuis plus de 50 ans, je me consacre à rendre accessibles les
              enseignements de Breslev aux lecteurs francophones
            </p>
          </div>
        </section>

        {/* Esther Ifrah Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-breslev-blue">
                  Esther Ifrah
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Mon parcours spirituel a commencé à l'âge de 13 ans, lorsque
                    j'ai découvert pour la première fois les enseignements de
                    Rabbi Nachman de Breslev. Cette rencontre a transformé ma
                    vie et a éveillé en moi une passion profonde pour la
                    transmission de cette sagesse.
                  </p>
                  <p>
                    Depuis plus de 50 ans, je me consacre à la traduction et à
                    l'adaptation des textes sacrés de Breslev en français. Chaque
                    livre est le fruit d'un travail minutieux, d'une étude
                    approfondie et d'une méditation constante sur les
                    enseignements du Tsaddik.
                  </p>
                  <p>
                    Mon objectif n'est pas simplement de traduire des mots, mais
                    de préserver l'essence spirituelle et la profondeur de chaque
                    enseignement, tout en les rendant accessibles et
                    compréhensibles pour les lecteurs francophones d'aujourd'hui.
                  </p>
                  <p className="font-bold text-breslev-blue">
                    "Chaque livre est une porte vers la joie et la lumière que
                    Rabbi Nachman nous a transmises."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-breslev-cream">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-breslev-blue">
                Notre Mission
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Rendre les enseignements de Rabbi Nachman accessibles à tous,
                dans leur authenticité et leur profondeur spirituelle
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Value 1 */}
              <div className="bg-white rounded-xl p-8 shadow-breslev text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-breslev-cream mb-4">
                  <Book className="h-8 w-8 text-breslev-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-breslev-blue">
                  Authenticité
                </h3>
                <p className="text-muted-foreground">
                  Des traductions fidèles qui préservent l'intégrité et la
                  profondeur des enseignements originaux de Rabbi Nachman
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white rounded-xl p-8 shadow-breslev text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-breslev-cream mb-4">
                  <Heart className="h-8 w-8 text-breslev-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-breslev-blue">
                  Accessibilité
                </h3>
                <p className="text-muted-foreground">
                  Rendre ces textes sacrés compréhensibles et applicables à la
                  vie quotidienne des lecteurs francophones
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white rounded-xl p-8 shadow-breslev text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-breslev-cream mb-4">
                  <Sparkles className="h-8 w-8 text-breslev-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-breslev-blue">
                  Transmission
                </h3>
                <p className="text-muted-foreground">
                  Partager la joie, la lumière et l'espoir qui émanent des
                  enseignements de Breslev avec les générations futures
                </p>
              </div>
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
