import { Book } from "../../../drizzle/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Heart, ShoppingCart } from "lucide-react";

interface BookCardProps {
  book: Book;
  onAddToCart?: (bookId: number, type: "physical" | "digital") => void;
  onToggleFavorite?: (bookId: number) => void;
  isFavorite?: boolean;
}

export default function BookCard({
  book,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: BookCardProps) {
  const formatPrice = (priceInCents: number | null) => {
    if (!priceInCents) return "N/A";
    return `${(priceInCents / 100).toFixed(0)}₪`;
  };

  const hasPhysical = book.pricePhysical && book.pricePhysical > 0;
  const hasDigital = book.pdfUrl && book.priceDigital && book.priceDigital > 0;

  return (
    <div className="group relative bg-card rounded-lg shadow-breslev hover:shadow-breslev-lg transition-all duration-300 overflow-hidden border border-border hover:-translate-y-2">
      {/* Image Container */}
      <Link href={`/livre/${book.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-breslev-cream cursor-pointer">
          {book.coverImageUrl ? (
            <img
              src={book.coverImageUrl}
              alt={book.titleFr}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-sm">Pas d'image</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {book.featured && (
              <Badge className="bg-breslev-gold text-breslev-blue">
                Phare
              </Badge>
            )}
            {book.type === "brochure" && (
              <Badge variant="secondary">Brochure</Badge>
            )}
          </div>

          {/* Favorite Button */}
          {onToggleFavorite && (
            <button
              onClick={(e) => {
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
      <div className="p-4">
        {/* Title */}
        <Link href={`/livre/${book.slug}`}>
          <h3 className="font-bold text-lg mb-1 line-clamp-2 cursor-pointer hover:text-breslev-gold transition-colors min-h-[3.5rem]">
            {book.titleFr}
          </h3>
        </Link>

        {/* Author */}
        <p className="text-sm text-breslev-gold mb-3">{book.author}</p>

        {/* Format Badges */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {hasPhysical && (
            <Badge variant="outline" className="text-xs border-breslev-blue text-breslev-blue">
              Physique
            </Badge>
          )}
          {hasDigital && (
            <Badge variant="outline" className="text-xs border-breslev-gold text-breslev-gold">
              Digital
            </Badge>
          )}
          {book.includedInSubscription && (
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
            <Button size="sm" variant="default" className="gap-2">
              Voir
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
