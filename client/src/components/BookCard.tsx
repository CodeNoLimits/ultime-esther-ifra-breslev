import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
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
  const isUnavailable = book.inStock === false || (!book.pdfUrl && !hasPhysical);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min((index || 0) * 0.05, 0.3) }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-xl shadow-breslev transition-all duration-500 overflow-hidden border border-breslev-gold/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.4),0_20px_40px_rgba(0,0,0,0.15)] hover:border-breslev-gold/60"
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
                rotateY: -12,
                rotateX: 4,
                z: 30,
                scale: 1.08,
                boxShadow:
                  "-20px 20px 30px rgba(0,0,0,0.7), 0 0 40px rgba(212, 175, 55, 0.4)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50 border border-white/10 rounded-sm">
              <span className="text-sm font-cinzel">Aucune Image</span>
            </div>
          )}

          {/* Shine/glare sweep effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </div>

          {/* Badges */}
          {isUnavailable && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-20">
              Indisponible
            </div>
          )}
          {!!book.featured && !isUnavailable && (
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

          {/* Quick Add overlay — slides up from bottom on hover */}
          {onAddToCart && hasPhysical && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToCart(book.id, "physical");
                }}
                className="w-full py-3 bg-breslev-gold/95 backdrop-blur-sm text-breslev-blue font-semibold text-sm flex items-center justify-center gap-2 hover:bg-breslev-gold transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                Ajouter au panier — {formatPrice(book.pricePhysical)}
              </button>
            </div>
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
              className="text-xs border-white/30 text-white/80"
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
              className="gap-2 bg-breslev-blue hover:bg-breslev-gold hover:text-breslev-blue text-white transition-all duration-300 shadow-md hover:shadow-breslev-gold hover:scale-105"
            >
              Decouvrir
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
