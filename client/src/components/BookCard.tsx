import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "wouter";
import { Book } from "../../../drizzle/schema";

interface BookCardProps {
  book: Book;
  index?: number;
  onAddToCart?: (bookId: number, type: "physical" | "digital") => void;
  onToggleFavorite?: (bookId: number) => void;
  isFavorite?: boolean;
}

export default function BookCard({
  book,
  index = 1,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: BookCardProps) {
  const formatPrice = (priceInCents: number | null) => {
    if (!priceInCents) return "N/A";
    return `${(priceInCents / 100).toFixed(0)}₪`;
  };

  const hasPhysical = !!book.pricePhysical && book.pricePhysical > 0;
  const hasDigital =
    !!book.pdfUrl && !!book.priceDigital && book.priceDigital > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min((index || 0) * 0.05, 0.3) }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-xl shadow-breslev transition-all duration-300 overflow-hidden border border-breslev-gold/20 hover:shadow-breslev-gold hover:border-breslev-gold/50"
    >
      {/* Image Container */}
      <Link href={`/livre/${book.slug}`}>
        <div
          className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#111] to-[#050505] cursor-pointer flex items-center justify-center p-4 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"
          style={{ perspective: "1000px" }}
        >
          {book.coverImageUrl ? (
            <motion.img
              src={book.coverImageUrl}
              alt={book.titleFr}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover rounded-sm shadow-2xl border-r border-[#ffffff20] border-t border-[#ffffff10]"
              initial={{ rotateY: 0, rotateX: 0, z: 0 }}
              whileHover={{
                rotateY: -15,
                rotateX: 5,
                z: 20,
                scale: 1.05,
                boxShadow:
                  "-15px 15px 25px rgba(0,0,0,0.8), 0 0 30px rgba(212, 175, 55, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50 border border-white/10 rounded-sm">
              <span className="text-sm font-cinzel">Aucune Image</span>
            </div>
          )}

          {/* Badges */}
          {!!book.featured && (
            <div className="badge-bestseller-v2">Meilleure Vente</div>
          )}
          {book.type === "brochure" && (
            <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-2 py-1 rounded">
              Brochure
            </div>
          )}

          {/* Favorite Button */}
          {onToggleFavorite && (
            <button
              onClick={e => {
                e.preventDefault();
                onToggleFavorite(book.id);
              }}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
              aria-label="Ajouter aux favoris"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite
                    ? "fill-breslev-gold text-breslev-gold"
                    : "text-gray-600"
                }`}
              />
            </button>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Title */}
        <Link href={`/livre/${book.slug}`}>
          <h3 className="font-serif font-bold text-xl mb-1 line-clamp-2 cursor-pointer hover:text-breslev-gold transition-colors min-h-[3.5rem] leading-tight">
            {book.titleFr}
          </h3>
        </Link>

        {/* Author */}
        <p className="text-sm text-breslev-gold mb-3">{book.author}</p>

        {/* Format Badges */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {hasPhysical && (
            <Badge
              variant="outline"
              className="text-xs border-breslev-blue text-breslev-blue"
            >
              Physique
            </Badge>
          )}
          {hasDigital && (
            <Badge
              variant="outline"
              className="text-xs border-breslev-gold text-breslev-gold"
            >
              Digital
            </Badge>
          )}
          {!!book.includedInSubscription && (
            <Badge variant="outline" className="text-xs">
              Abonnement
            </Badge>
          )}
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {hasPhysical && (
              <span className="text-lg font-bold text-breslev-gold">
                {formatPrice(book.pricePhysical)}
              </span>
            )}
            {hasDigital && (
              <span className="text-sm text-muted-foreground">
                Digital: {formatPrice(book.priceDigital)}
              </span>
            )}
          </div>

          <Link href={`/livre/${book.slug}`}>
            <Button
              size="sm"
              variant="default"
              className="gap-2 bg-breslev-blue hover:bg-breslev-gold hover:text-breslev-blue text-white transition-all shadow-md"
            >
              Voir
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
