import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Book, Heart, Shield, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { trpc } from "@/lib/trpc";

function FeaturedBooks() {
  const { data: books, isLoading } = trpc.books.getFeatured.useQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg shadow-breslev p-6 animate-pulse">
            <div className="aspect-[3/4] bg-breslev-cream rounded-lg mb-4" />
            <div className="h-6 bg-breslev-cream rounded mb-2" />
            <div className="h-4 bg-breslev-cream rounded mb-4" />
            <div className="h-10 bg-breslev-cream rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun livre phare disponible pour le moment</p>
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
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-breslev-blue via-breslev-blue to-blue-900 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="container relative py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <Badge className="mb-6 bg-breslev-gold text-breslev-blue hover:bg-breslev-gold/90">
                <Sparkles className="h-3 w-3 mr-1" />
                Traductions d'Esther Ifrah
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Découvrez les Enseignements de{" "}
                <span className="text-breslev-gold">Rabbi Nachman</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                Traductions et adaptations authentiques pour approfondir votre
                chemin spirituel
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-breslev-gold text-breslev-blue hover:bg-breslev-gold/90 glow-gold text-lg px-8"
                >
                  <Link href="/boutique">Explorer la Bibliothèque</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-breslev-blue text-lg px-8"
                >
                  <Link href="/abonnement">S'abonner</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-breslev-cream mb-4">
                  <Book className="h-8 w-8 text-breslev-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-breslev-blue">
                  Bibliothèque Complète
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Plus de 30 livres et brochures sur les enseignements de Rabbi
                  Nachman, traduits avec soin par Esther Ifrah.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-breslev-cream mb-4">
                  <Shield className="h-8 w-8 text-breslev-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-breslev-blue">
                  Lecture Protégée
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Accédez à vos livres numériques en ligne avec une protection
                  avancée et un watermarking personnalisé.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-breslev-cream mb-4">
                  <Heart className="h-8 w-8 text-breslev-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-breslev-blue">
                  Transmission Authentique
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Des traductions fidèles qui préservent l'essence spirituelle
                  des enseignements de Breslev.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="py-16 bg-breslev-cream">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-breslev-blue">
                Livres Phares
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez notre sélection de livres essentiels pour débuter ou
                approfondir votre étude des enseignements de Rabbi Nachman.
              </p>
            </div>

            {/* Featured books from database */}
            <FeaturedBooks />

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href="/boutique">Voir tous les livres</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-2 md:order-1">
                <div className="aspect-square rounded-lg bg-breslev-cream shadow-breslev-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <span>Photo Esther Ifrah</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 md:order-2">
                <Badge className="mb-4 bg-breslev-gold text-breslev-blue">
                  Notre Mission
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-breslev-blue">
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

        {/* Subscription CTA Section */}
        <section className="py-16 bg-gradient-to-br from-breslev-gold/10 to-breslev-cream">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-breslev-blue">
                Accédez à toute la sagesse de Breslev
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Avec notre abonnement, profitez d'un accès illimité à plus de
                30 livres et brochures. Lisez où vous voulez, quand vous voulez.
              </p>

              {/* Plans Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card rounded-lg p-6 shadow-breslev">
                  <h3 className="font-bold text-lg mb-2">Mensuel</h3>
                  <p className="text-3xl font-bold text-breslev-gold mb-2">
                    49₪
                    <span className="text-sm text-muted-foreground">/mois</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Flexible et sans engagement
                  </p>
                </div>

                <div className="bg-breslev-blue text-white rounded-lg p-6 shadow-breslev-lg relative overflow-hidden">
                  <Badge className="absolute top-2 right-2 bg-breslev-gold text-breslev-blue">
                    Populaire
                  </Badge>
                  <h3 className="font-bold text-lg mb-2">Annuel</h3>
                  <p className="text-3xl font-bold text-breslev-gold mb-2">
                    490₪
                    <span className="text-sm text-white/80">/an</span>
                  </p>
                  <p className="text-sm text-white/80">
                    Économisez 2 mois gratuits
                  </p>
                </div>

                <div className="bg-card rounded-lg p-6 shadow-breslev">
                  <h3 className="font-bold text-lg mb-2">Familial</h3>
                  <p className="text-3xl font-bold text-breslev-gold mb-2">
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
