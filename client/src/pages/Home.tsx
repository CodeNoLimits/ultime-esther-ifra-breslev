import BookCard from "@/components/BookCard";
import CoursAudioDuJour from "@/components/CoursAudioDuJour";
import LectureDuJour from "@/components/LectureDuJour";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Facebook, Headphones, Instagram, Quote, Star, Youtube } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

function FeaturedBooks() {
  const { data: books, isLoading } = trpc.books.getFeatured.useQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white rounded-xl p-4 animate-pulse shadow-sm">
            <div className="aspect-[3/4] bg-breslev-cream rounded-lg mb-4" />
            <div className="h-5 bg-breslev-cream rounded mb-2" />
            <div className="h-4 bg-breslev-cream rounded mb-3 w-2/3" />
            <div className="h-8 bg-breslev-cream rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun livre disponible pour le moment</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book, index) => (
        <BookCard key={book.id} book={book} index={index} />
      ))}
    </div>
  );
}

const AUDIO_CATEGORIES = [
  { name: "Likoutey Moharane Audio", count: 8, icon: "🎧" },
  { name: "Cours Quotidiens", count: 6, icon: "📖" },
  { name: "Histoires de Rabbi Nachman", count: 5, icon: "✨" },
  { name: "Prières & Tikounim", count: 5, icon: "🙏" },
];

const TESTIMONIALS = [
  {
    name: "Sarah L.",
    location: "Paris, France",
    text: "Un livre magnifique qui m'a profondément touchée. Les enseignements de Rabbi Nahman sont présentés de manière claire et accessible. Je le recommande vivement.",
    rating: 5,
  },
  {
    name: "Rachel M.",
    location: "Jérusalem, Israël",
    text: "Esther Ifrah a fait un travail remarquable de traduction et d'adaptation. Ce livre est devenu mon compagnon quotidien de prière et de méditation.",
    rating: 5,
  },
  {
    name: "Léa K.",
    location: "Montréal, Canada",
    text: "Très bon livre, riche en enseignements. La qualité de l'impression est excellente. Une lecture essentielle pour toute personne en quête de spiritualité.",
    rating: 4,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-breslev-cream">
      <Helmet>
        <title>Esther Ifrah — Livres de Rabbi Nachman de Breslev | breslev.fr</title>
        <meta name="description" content="Découvrez la boutique Breslev d'Esther Ifrah : livres, cours audio et enseignements authentiques de Rabbi Nachman de Breslev. Livraison France, Belgique, Canada, Israël." />
        <meta property="og:title" content="Esther Ifrah — Livres de Rabbi Nachman de Breslev" />
        <meta property="og:description" content="Boutique en ligne de livres Breslev, cours audio et enseignements de Rabbi Nachman. Azamra, Likoutey Moharane, Sipourey Maasiot." />
        <meta property="og:url" content="https://breslev.fr/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Header />

      <main className="flex-1">
        {/* HERO — Video background matching reference (breslev-esther-ifrah) */}
        <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/breslev_profile.png"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/55 via-[#1E3A8A]/40 to-[#0F172A]/75 z-[1]" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto bg-white/95 backdrop-blur-[10px] rounded-2xl border-2 border-breslev-gold p-10 md:p-14 shadow-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-breslev-blue mb-6 leading-tight">
                Breslev Esther Ifrah
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
                Traductions authentiques des enseignements de Rabbi Nachman
              </p>
              <Button
                asChild
                size="lg"
                className="bg-breslev-gold hover:bg-breslev-gold/90 text-white text-lg px-10 py-6 h-auto rounded-xl shadow-md"
              >
                <Link href="/boutique">Explorer les Livres</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* 3 FEATURES — Matching reference */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { emoji: "📚", title: "Traductions authentiques", desc: "Traductions fidèles en français des textes sacrés de Breslev" },
                { emoji: "🌟", title: "Sagesse millénaire", desc: "Sagesse spirituelle intemporelle de Rabbi Nachman de Breslev" },
                { emoji: "🙏", title: "Étude quotidienne", desc: "Cours audio et lectures quotidiennes pour grandir chaque jour" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="text-4xl mb-4">{feature.emoji}</div>
                  <h3 className="text-lg font-bold text-breslev-blue mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED BOOKS — From Turso DB via tRPC */}
        <section className="py-16 bg-breslev-cream">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-breslev-blue mb-3">
                Nos Livres
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Découvrez notre collection de traductions des enseignements de Rabbi Nachman
              </p>
            </div>
            <FeaturedBooks />
            <div className="text-center mt-10">
              <Button asChild variant="outline" size="lg" className="border-breslev-blue text-breslev-blue hover:bg-breslev-blue hover:text-white">
                <Link href="/boutique">Voir tous les livres</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* COURS AUDIO DU JOUR */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <CoursAudioDuJour />
            </div>
          </div>
        </section>

        {/* VIDÉOS D'ESTHER IFRAH */}
        <section className="py-16 bg-breslev-blue">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
                Vidéos d'Esther Ifrah
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Regardez et écoutez les enseignements de Rabbi Nachman en vidéo
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { src: "/videos/esther_01_presentation.mp4", title: "Présentation", subtitle: "Qui est Esther Ifrah ?" },
                { src: "/videos/esther_02_likoutei.mp4", title: "Likoutei Moharan", subtitle: "Thora Alef — Introduction" },
                { src: "/videos/esther_03_clip.mp4", title: "Enseignement du jour", subtitle: "La musique et la Torah" },
              ].map((vid, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="rounded-xl overflow-hidden border border-breslev-gold/30 bg-black/30 shadow-lg"
                >
                  <video
                    className="w-full aspect-video object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source src={vid.src} type="video/mp4" />
                  </video>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-base">{vid.title}</h3>
                    <p className="text-white/60 text-sm mt-1">{vid.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AUDIO LIBRARY — 4 Categories matching reference */}
        <section className="py-16 bg-breslev-cream">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-breslev-blue mb-3 tracking-tight uppercase">
                Bibliothèque Audio
              </h2>
              <p className="text-muted-foreground text-lg">
                Écoutez les enseignements de Rabbi Nachman par Esther Ifrah
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {AUDIO_CATEGORIES.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href="/cours-audio">
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-breslev-gold/10 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                      <div className="text-3xl mb-3">{cat.icon}</div>
                      <h3 className="font-bold text-breslev-blue mb-1 text-sm">{cat.name}</h3>
                      <div className="flex items-center justify-center gap-1 text-breslev-gold text-sm">
                        <Headphones className="w-3.5 h-3.5" />
                        <span>{cat.count} cours</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LECTURE DU JOUR */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <LectureDuJour />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 bg-breslev-cream">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-breslev-blue mb-3">
                Témoignages
              </h2>
              <p className="text-muted-foreground text-lg">
                Ce que disent nos lecteurs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-breslev-gold/10 relative"
                >
                  <Quote className="absolute top-4 right-4 h-6 w-6 text-breslev-gold/15" />
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= t.rating ? "fill-breslev-gold text-breslev-gold" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    « {t.text} »
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-breslev-gold/15 flex items-center justify-center text-breslev-gold font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-breslev-blue text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* VOYAGES — Section Prochains Voyages */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-breslev-gold bg-breslev-gold/10 px-4 py-1.5 rounded-full mb-4">
                Nouveauté
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-breslev-blue mb-3 tracking-tight">
                Voyages & Retraites Breslev
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Rejoignez Esther Ifrah pour des voyages spirituels sur les chemins de Rabbi Nachman
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden border-2 border-breslev-gold/30 bg-gradient-to-br from-breslev-blue to-[#1a2d4a] p-8 text-center shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-breslev-gold/5 to-transparent pointer-events-none" />
                <div className="text-5xl mb-4">✈️</div>
                <h3 className="text-2xl font-bold text-white mb-3 font-cinzel">Prochain Voyage — Bientôt</h3>
                <p className="text-white/70 font-cormorant text-lg mb-6 leading-relaxed">
                  Esther Ifrah prépare un prochain voyage spirituel.<br />
                  Inscrivez-vous pour être parmi les premiers informés.
                </p>
                <a
                  href="mailto:contact@breslev.fr?subject=Voyage%20Breslev%20-%20Je%20suis%20intéressé(e)"
                  className="inline-flex items-center gap-2 bg-breslev-gold hover:bg-breslev-gold/90 text-breslev-blue font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Être informé(e) en premier
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SUBSCRIPTION CTA */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-breslev-blue mb-4">
                Accédez à toute la collection
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Avec notre abonnement, profitez d'un accès illimité à plus de 30 livres et brochures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-breslev-gold hover:bg-breslev-gold/90 text-white text-lg px-8">
                  <Link href="/abonnement">Voir les abonnements</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-breslev-blue text-breslev-blue text-lg px-8">
                  <Link href="/boutique">Acheter à l'unité</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SUIVEZ ESTHER — Social Media */}
        <section className="py-16 bg-breslev-cream/50">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-breslev-blue">
                Suivez Esther Ifrah
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Retrouvez les enseignements et cours sur les réseaux sociaux
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <a
                  href="https://www.facebook.com/profile.php?id=100089800498498"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white rounded-xl px-8 py-4 shadow-sm border border-breslev-gold/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <Facebook className="h-8 w-8 text-[#1877F2]" />
                  <span className="font-semibold text-breslev-blue">Facebook</span>
                </a>
                <a
                  href="https://www.youtube.com/@BreslevEsther"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white rounded-xl px-8 py-4 shadow-sm border border-breslev-gold/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <Youtube className="h-8 w-8 text-[#FF0000]" />
                  <span className="font-semibold text-breslev-blue">YouTube</span>
                </a>
                <a
                  href="https://www.instagram.com/estherifrah_breslev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white rounded-xl px-8 py-4 shadow-sm border border-breslev-gold/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <Instagram className="h-8 w-8 text-[#E4405F]" />
                  <span className="font-semibold text-breslev-blue">Instagram</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
