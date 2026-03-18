import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp, Quote } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const ETUDES = [
  {
    id: 1,
    titre: "Azamra — Trouver le bon point en soi",
    reference: "Likoutey Moharane I, 282",
    resume:
      "L'enseignement fondamental de Rabbi Nachman : même dans les profondeurs de la chute, il existe toujours un point de lumière en chaque être humain.",
    texte: `Rabbi Nachman enseigne qu'il faut toujours chercher le bon point en soi, même dans les moments de plus grande difficulté spirituelle.

"Il faut toujours chercher et trouver quelque chose de bon en soi. Car si l'on se retrouve à se juger trop sévèrement, on peut, à D.ieu ne plaise, tomber dans le désespoir."

La méthode d'Azamra (du mot hébreu "Je chanterai") consiste à identifier chaque jour ne serait-ce qu'un seul acte positif accompli, une seule bonne pensée. À partir de ce point, on peut construire une joie intérieure authentique.

Cette pratique est la clef de la Téchouva (retour vers D.ieu) selon Breslov : non pas la culpabilité écrasante, mais la recherche active du bien qui subsiste en nous, pour l'amplifier et en faire le fondement d'une vie nouvelle.

Rabbi Nachman ajoute : "Mérite-toi à toi-même. Cherche le point de bien en toi. De ce point, tu pourras prier, chanter et t'élever vers D.ieu."`,
    lienLivre: "/livre/likoutey-moharane-1",
    couleur: "from-breslev-gold/10 to-breslev-gold/5",
  },
  {
    id: 2,
    titre: "L'Hitbodédout — La prière personnelle quotidienne",
    reference: "Likoutey Moharane II, 25",
    resume:
      "Rabbi Nachman prescrit une heure de solitude et de prière personnelle chaque jour, dans sa propre langue, comme conversation directe avec le Créateur.",
    texte: `L'Hitbodédout (de l'hébreu : isolement, introspection) est la pratique centrale de la dévotion Breslev. Rabbi Nachman en a fait un pilier absolu de la vie spirituelle.

"Il est très bon de s'épancher devant D.ieu dans sa propre langue — en français, en arabe, en anglais ou dans n'importe quelle autre langue que l'on parle couramment."

La pratique concrète : chaque jour, idéalement la nuit ou à l'aube, trouver un endroit solitaire et parler à D.ieu comme on parlerait à son meilleur ami. Sans formules préétablies. Sans rituel codifié. Juste une voix sincère qui dit ce qu'elle ressent.

Rabbi Nachman insiste : même si l'on ne sait pas quoi dire, même si l'on reste en silence — cette présence devant D.ieu est déjà une prière. Même dire "Je ne sais pas quoi Te dire, Maître du monde" est une prière authentique.

Cette pratique quotidienne est le fondement de toute progression spirituelle selon l'enseignement de Breslov.`,
    lienLivre: "/livre/likoutey-moharane-2",
    couleur: "from-blue-50 to-indigo-50",
  },
  {
    id: 3,
    titre: "La Simha — La Joie comme commandement",
    reference: "Likoutey Moharane II, 24",
    resume:
      "\"C'est une grande mitzva d'être toujours dans la joie.\" L'enseignement de Rabbi Nachman sur la joie comme voie spirituelle active.",
    texte: `L'un des enseignements les plus connus et les plus profonds de Rabbi Nachman porte sur la joie — non comme sentiment passif, mais comme effort actif et commandement (mitzva).

"C'est une grande mitzva d'être toujours dans la joie (b'simha tamid). Et il faut s'efforcer d'écarter la tristesse et l'abattement par tous les moyens."

Rabbi Nachman distingue la fausse joie (superficielle, mondaine) de la vraie Simha, qui naît de la gratitude envers D.ieu et de la conscience que tout ce qui arrive — même les difficultés — vient de Lui avec amour.

La méthode pratique :
• Chanter un nigoun (mélodie hassidique) même quand on n'en a pas envie
• Se forcer à sourire jusqu'à ce que le sourire devienne réel
• Méditer sur les bienfaits reçus, si petits soient-ils

"Le visage extérieur illumine le visage intérieur" — la joie physique nourrit la joie spirituelle. C'est le paradoxe breslovien : commencer par l'extérieur pour atteindre l'intérieur.`,
    lienLivre: "/boutique",
    couleur: "from-amber-50 to-yellow-50",
  },
  {
    id: 4,
    titre: "Le Tsaddik — S'attacher au guide spirituel",
    reference: "Likoutey Moharane I, 2",
    resume:
      "L'importance de s'attacher à un maître spirituel authentique, et comment la relation au Tsaddik transcende le temps et l'espace.",
    texte: `Rabbi Nachman enseigne l'importance capitale de s'attacher à un Tsaddik (juste, saint) — un guide spirituel authentique dont la vie entière est tournée vers D.ieu.

"À travers le Tsaddik, tous les âmes d'Israël peuvent s'élever. Car le Tsaddik est comme la racine de l'arbre dont toutes les âmes sont les branches et les feuilles."

Pour les disciples de Rabbi Nachman, lui-même est ce Tsaddik par excellence, même après sa disparition physique en 1810. C'est pourquoi le pèlerinage à Ouman (Ukraine), sur son tombeau, attire chaque année des dizaines de milliers de visiteurs pour Roch Hachana.

"Ma flamme brûlera jusqu'à la venue du Machia'h" — dit Rabbi Nachman avant sa mort, exprimant que son influence spirituelle ne s'éteindrait pas avec son corps.

S'attacher au Tsaddik signifie : étudier ses écrits, suivre ses enseignements, et s'inspirer de sa vie pour guider la sienne propre. C'est un lien d'âme à âme, qui transcende le temps.`,
    lienLivre: "/boutique",
    couleur: "from-emerald-50 to-teal-50",
  },
];

function EtudeCard({ etude, index }: { etude: (typeof ETUDES)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className={`overflow-hidden border border-breslev-gold/20 shadow-sm bg-gradient-to-br ${etude.couleur}`}>
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <span className="text-xs font-bold text-breslev-gold uppercase tracking-widest mb-2 block">
                {etude.reference}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-breslev-blue font-cinzel leading-tight">
                {etude.titre}
              </h2>
            </div>
            <div className="bg-breslev-blue/10 p-2 rounded-lg flex-shrink-0">
              <BookOpen className="w-5 h-5 text-breslev-blue" />
            </div>
          </div>

          {/* Summary */}
          <p className="text-muted-foreground font-cormorant text-lg italic mb-4 leading-relaxed">
            {etude.resume}
          </p>

          {/* Expandable text */}
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4"
            >
              <div className="border-l-4 border-breslev-gold pl-4 mb-4">
                <Quote className="w-5 h-5 text-breslev-gold mb-2" />
                <div className="text-[#1a2332] font-cormorant text-lg leading-relaxed whitespace-pre-line">
                  {etude.texte}
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(!open)}
              className="text-breslev-blue hover:bg-breslev-blue/10 font-semibold"
            >
              {open ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" /> Réduire
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" /> Lire l'étude complète
                </>
              )}
            </Button>
            <Link href={etude.lienLivre}>
              <Button
                size="sm"
                className="bg-breslev-gold hover:bg-breslev-gold/90 text-breslev-blue font-bold"
              >
                Voir le livre →
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Etudes() {
  return (
    <div className="min-h-screen flex flex-col bg-breslev-cream">
      <Helmet>
        <title>Études Hassidiques — Enseignements de Rabbi Nachman | breslev.fr</title>
        <meta
          name="description"
          content="Plongez dans les textes profonds de la sagesse Breslev : Azamra, Hitbodédout, Simha, Tsaddik. Études hassidiques commentées par Esther Ifrah."
        />
        <meta property="og:title" content="Études Hassidiques Breslev — breslev.fr" />
        <meta property="og:url" content="https://breslev.fr/etudes" />
      </Helmet>

      <Header />

      <main className="flex-1 pb-16">
        {/* Hero */}
        <section className="bg-breslev-blue py-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-breslev-gold/10 rounded-full blur-[80px]" />
          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-breslev-gold/20 text-breslev-gold mb-6 border border-breslev-gold/30">
                <BookOpen className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-cinzel">
                Études <span className="text-breslev-gold">Hassidiques</span>
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto font-cormorant">
                Les enseignements fondamentaux de Rabbi Nachman de Breslev, commentés et
                accessibles pour la vie quotidienne.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Studies grid */}
        <section className="container py-12">
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {ETUDES.map((etude, index) => (
              <EtudeCard key={etude.id} etude={etude} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Card className="p-8 bg-breslev-blue text-white border-0 max-w-2xl mx-auto">
              <Quote className="w-8 h-8 text-breslev-gold mx-auto mb-4" />
              <blockquote className="font-cormorant text-xl italic leading-relaxed text-breslev-gold mb-4">
                "Il n'y a pas de désespoir au monde. Aucun."
              </blockquote>
              <p className="text-white/70 font-cinzel text-sm tracking-widest mb-6">
                — Rabbi Nachman de Breslev
              </p>
              <Link href="/boutique">
                <Button className="bg-breslev-gold hover:bg-breslev-gold/90 text-breslev-blue font-bold px-8">
                  Découvrir tous les livres
                </Button>
              </Link>
            </Card>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
