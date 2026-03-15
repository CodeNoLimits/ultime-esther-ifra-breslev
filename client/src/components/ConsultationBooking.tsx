import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock, MessageCircle, Phone, Star } from "lucide-react";

const WHATSAPP_NUMBER = "972585148500";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour Esther,\n\nJe souhaite reserver une consultation personnelle concernant les enseignements de Breslev.\n\nPouvez-vous me proposer un creneau ?\n\nMerci beaucoup."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const CONSULTATION_TYPES = [
  {
    icon: Star,
    title: "Guidance Spirituelle",
    desc: "Conseils personnalises sur votre chemin spirituel selon les enseignements de Rabbi Nachman.",
    duration: "45 min",
  },
  {
    icon: Calendar,
    title: "Etude Personnalisee",
    desc: "Accompagnement individuel dans l'etude du Likoutey Moharan ou d'autres textes.",
    duration: "60 min",
  },
  {
    icon: Phone,
    title: "Consultation Telephonique",
    desc: "Echange par telephone ou video pour repondre a vos questions sur la Hassidout Breslev.",
    duration: "30 min",
  },
];

export default function ConsultationBooking() {
  return (
    <section className="py-24 border-b border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[#d4a843]/5 rounded-full blur-[130px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#d4a843] uppercase mb-4 font-cinzel">
            Accompagnement Personnel
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white font-cinzel mb-4">
            Consultations avec Esther
          </h3>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Depuis plus de 50 ans, Esther Ifrah accompagne des milliers de
            personnes dans leur cheminement spirituel. Reservez une
            consultation personnelle pour approfondir votre etude.
          </p>
        </div>

        {/* Consultation Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CONSULTATION_TYPES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="glass-card-v2 p-8 text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#d4a843]/20 to-transparent border border-[#d4a843]/30 mb-5 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="h-7 w-7 text-[#d4a843]" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-white font-cinzel">
                {item.title}
              </h4>
              <p className="text-white/60 leading-relaxed font-cormorant text-lg mb-4">
                {item.desc}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-[#d4a843]/80">
                <Clock className="h-4 w-4" />
                {item.duration}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card-v2 p-8 md:p-10 text-center relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-60 h-60 bg-[#d4a843]/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <h4 className="text-2xl font-bold text-white font-cinzel mb-3">
                Prenez rendez-vous
              </h4>
              <p className="text-white/60 mb-8 font-cormorant text-lg">
                Contactez Esther directement par WhatsApp pour reserver votre
                consultation. Elle vous repondra dans les meilleurs delais.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="btn-premium-cta text-lg px-8 py-6 h-auto font-cinzel tracking-wider gap-3"
                >
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Reserver via WhatsApp
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#d4a843]/40 text-[#d4a843] bg-transparent hover:bg-[#d4a843]/10 text-lg px-8 py-6 h-auto font-cinzel tracking-wider backdrop-blur-sm transition-all hover:border-[#d4a843] gap-3"
                >
                  <a href="tel:+972585148500">
                    <Phone className="h-5 w-5" />
                    Appeler directement
                  </a>
                </Button>
              </div>

              <p className="mt-6 text-xs text-white/30">
                Disponible du dimanche au jeudi, de 9h a 18h (heure d'Israel)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
