import { motion } from "framer-motion";
import { BookOpen, RefreshCw } from "lucide-react";
import { useMemo } from "react";

/**
 * Extraits du Likouté Moharan — enseignements de Rabbi Nachman de Breslev.
 * Chaque jour, un extrait different est affiche, base sur le jour de l'annee.
 */
const EXTRAITS_LIKOUTEY_MOHARAN = [
  {
    torah: "Torah 1",
    texte:
      "Le fondement et la racine de toute la saintete, de toute la Torah et de tout le service divin, c'est de savoir et de croire que le monde entier est rempli de Sa gloire.",
    theme: "La Foi",
  },
  {
    torah: "Torah 2",
    texte:
      "La priere est la porte par laquelle on entre aupres du Saint beni soit-Il. Chaque mot de la priere est un joyau precieux.",
    theme: "La Priere",
  },
  {
    torah: "Torah 4",
    texte:
      "Par la charite, on merite le repentir. Car la charite est une forme de repentir, car on soumet son mauvais penchant.",
    theme: "La Tsedaka",
  },
  {
    torah: "Torah 5",
    texte:
      "Par la joie, on acquiert la capacite de faire le tri dans les pensees etrangeres et de les elever vers leur source.",
    theme: "La Joie",
  },
  {
    torah: "Torah 6",
    texte:
      "Le Tsadik doit descendre au niveau des gens simples pour les elever. C'est le secret de l'humilite du Tsadik.",
    theme: "L'Humilite",
  },
  {
    torah: "Torah 7",
    texte:
      "Quand un homme juge son prochain favorablement, en trouvant en lui un point de bien, il l'eleve reellement du plateau de la culpabilite au plateau du merite.",
    theme: "Azamra",
  },
  {
    torah: "Torah 10",
    texte:
      "Le chant est la forme la plus elevee de la priere. A travers le chant sacre, on peut atteindre les niveaux les plus sublimes de la devekout.",
    theme: "Le Chant",
  },
  {
    torah: "Torah 15",
    texte:
      "Le silence est une forme de sagesse superieure. Par le silence, on merite la parole veritable.",
    theme: "Le Silence",
  },
  {
    torah: "Torah 21",
    texte:
      "Toute la Torah et les prieres visent a enseigner a l'homme qu'il doit toujours crier vers Hachem, en tout temps et en tout lieu.",
    theme: "Le Cri",
  },
  {
    torah: "Torah 24",
    texte:
      "Sache que chaque berger a une melodie propre, selon les herbes et le lieu ou il fait paitre son troupeau.",
    theme: "La Melodie",
  },
  {
    torah: "Torah 25",
    texte:
      "Le Tikoun (reparation) d'une faute consiste a reconnaitre la providence divine, meme dans la chute elle-meme.",
    theme: "Le Tikoun",
  },
  {
    torah: "Torah 27",
    texte:
      "Le desir de l'homme vers la saintete est lui-meme un accomplissement. Le fait meme de desirer est deja tres precieux en Haut.",
    theme: "Le Desir",
  },
  {
    torah: "Torah 33",
    texte:
      "L'orgueil est la racine de toutes les fautes. Quand l'homme est humble, il peut recevoir la lumiere divine sans aucun obstacle.",
    theme: "L'Orgueil",
  },
  {
    torah: "Torah 38",
    texte:
      "La Terre d'Israel est la source de toute saintete. Meme la pensee et le desir de s'y rendre apportent un eclairage spirituel immense.",
    theme: "Erets Israel",
  },
  {
    torah: "Torah 48",
    texte:
      "Quand on mange avec intention sacree, on extrait les etincelles de saintete cachees dans la nourriture.",
    theme: "La Nourriture",
  },
  {
    torah: "Torah 49",
    texte:
      "Le fait de parler avec son ami de crainte du Ciel, cela eveille le coeur et purifie l'esprit.",
    theme: "L'Amitie",
  },
  {
    torah: "Torah 52",
    texte:
      "La paix est le receptacle de toutes les benedictions. Sans la paix, les benedictions n'ont pas d'endroit ou resider.",
    theme: "La Paix",
  },
  {
    torah: "Torah 54",
    texte:
      "A travers la hitbodedout (meditation solitaire), l'homme merite une intelligence nouvelle et une comprehension renouvelee de la Torah.",
    theme: "Hitbodedout",
  },
  {
    torah: "Torah 56",
    texte:
      "C'est une grande mitsva d'etre toujours joyeux. Il faut se forcer de toutes ses forces a etre joyeux en permanence.",
    theme: "La Grande Mitsva",
  },
  {
    torah: "Torah 64",
    texte:
      "Chaque parole de Torah qu'un homme prononce avec verite cree un ange protecteur.",
    theme: "La Parole",
  },
  {
    torah: "Torah 65",
    texte:
      "La Torah est comparee a l'eau. De meme que l'eau descend des hauteurs vers les profondeurs, la Torah descend vers l'homme humble.",
    theme: "La Torah",
  },
  {
    torah: "Torah 72",
    texte:
      "La patience est le pilier de la foi. L'homme patient merite de voir l'aide divine se manifester dans sa vie.",
    theme: "La Patience",
  },
  {
    torah: "Torah 77",
    texte:
      "Il n'y a pas de desespoir dans le monde. Meme si un homme est tombe au plus bas, il peut toujours revenir.",
    theme: "L'Espoir",
  },
  {
    torah: "Torah 112",
    texte:
      "Par les contes et les histoires des Tsadikim, on eveille les ames endormies et on leur donne la force de revenir vers le bien.",
    theme: "Les Contes",
  },
  {
    torah: "Torah 119",
    texte:
      "La foi simple est superieure a tout. Un homme qui croit simplement est plus proche de la verite que le plus grand des philosophes.",
    theme: "La Foi Simple",
  },
  {
    torah: "Torah 172",
    texte:
      "Chaque juif possede un point de bien indestructible, une etincelle divine qui ne peut jamais etre eteinte.",
    theme: "L'Etincelle",
  },
  {
    torah: "Torah 188",
    texte:
      "L'etude de la Torah la nuit a un pouvoir special. C'est a ce moment que l'ame est la plus receptive a la lumiere divine.",
    theme: "L'Etude Nocturne",
  },
  {
    torah: "Torah 205",
    texte:
      "Tout ce que tu vois dans ce monde, tout ce qui existe, tout est pour toi. Tout a ete cree pour toi, afin que tu puisses servir Hachem.",
    theme: "La Finalite",
  },
  {
    torah: "Torah 282",
    texte:
      "Sache que l'homme doit traverser un pont tres etroit, et l'essentiel est de ne pas avoir peur du tout.",
    theme: "Le Pont Etroit",
  },
  {
    torah: "Tinyana 7",
    texte:
      "Le Tikoun Haklali (Remede General) comprend les dix types de melodies (les dix psaumes) qui sont le remede de l'ame.",
    theme: "Tikoun Haklali",
  },
  {
    torah: "Tinyana 12",
    texte:
      "Par le don de la tsedaka, on brise la cruaute et on fait venir la misericorde divine dans le monde.",
    theme: "La Misericorde",
  },
];

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export default function LectureDuJour() {
  const extrait = useMemo(() => {
    const dayIndex = getDayOfYear() % EXTRAITS_LIKOUTEY_MOHARAN.length;
    return EXTRAITS_LIKOUTEY_MOHARAN[dayIndex];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card-v2 p-6 md:p-8 relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#d4a843]/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#d4a843]/20 border border-[#d4a843]/30">
          <BookOpen className="h-5 w-5 text-[#d4a843]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-cinzel">
            Lecture du Jour
          </h3>
          <p className="text-xs text-white/50 uppercase tracking-wider">
            Likoutey Moharan
          </p>
        </div>
        <span className="ml-auto text-xs text-[#d4a843]/80 bg-[#d4a843]/10 border border-[#d4a843]/20 px-3 py-1 rounded-full font-medium">
          {extrait.theme}
        </span>
      </div>

      {/* Citation */}
      <blockquote className="relative pl-4 md:pl-6 border-l-2 border-[#d4a843]/50 mb-4">
        <p className="text-white/85 font-cormorant text-lg md:text-xl leading-relaxed italic">
          &laquo; {extrait.texte} &raquo;
        </p>
      </blockquote>

      {/* Source */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#d4a843] font-cinzel">
          {extrait.torah}
        </p>
        <div className="flex items-center gap-1.5 text-white/30 text-xs">
          <RefreshCw className="h-3 w-3" />
          Nouvel extrait chaque jour
        </div>
      </div>
    </motion.div>
  );
}
