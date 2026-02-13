import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, MessageCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: Date;
}

interface ReviewsProps {
  bookId: number;
  bookTitle: string;
}

// Données exemple (à remplacer par les vraies données via tRPC)
const EXAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    userId: 1,
    userName: "Sarah L.",
    rating: 5,
    comment: "Un livre magnifique qui m'a profondément touchée. Les enseignements de Rabbi Nahman sont présentés de manière claire et accessible. Je le recommande vivement à toutes les femmes en quête de spiritualité.",
    verified: true,
    helpful: 12,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    userId: 2,
    userName: "Rachel M.",
    rating: 5,
    comment: "Esther Ifrah a fait un travail remarquable de traduction et d'adaptation. Ce livre est devenu mon compagnon quotidien de prière et de méditation.",
    verified: true,
    helpful: 8,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: 3,
    userId: 3,
    userName: "Léa K.",
    rating: 4,
    comment: "Très bon livre, riche en enseignements. La qualité de l'impression est excellente. Seul petit bémol : j'aurais aimé plus d'exemples concrets.",
    verified: false,
    helpful: 5,
    createdAt: new Date("2024-02-01"),
  },
];

export default function Reviews({ bookId, bookTitle }: ReviewsProps) {
  const { isAuthenticated, user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Remplacer par les vraies données
  const reviews = EXAMPLE_REVIEWS;
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((r) => r.rating === star).length
  );

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Veuillez écrire un commentaire");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Appel tRPC pour créer l'avis
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Votre avis a été publié avec succès !");
      setShowReviewForm(false);
      setComment("");
      setRating(5);
    } catch (error) {
      toast.error("Erreur lors de la publication de l'avis");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpful = async (reviewId: number) => {
    // TODO: Appel tRPC pour marquer comme utile
    toast.success("Merci pour votre retour !");
  };

  return (
    <div className="space-y-6">
      {/* Résumé des notes */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Note moyenne */}
          <div className="text-center">
            <div className="text-5xl font-bold text-breslev-gold mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? "fill-breslev-gold text-breslev-gold"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Basé sur {reviews.length} avis
            </p>
          </div>

          {/* Distribution des notes */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const count = ratingCounts[index];
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;

              return (
                <div key={star} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{star}</span>
                    <Star className="h-3 w-3 fill-breslev-gold text-breslev-gold" />
                  </div>
                  <div className="flex-1 h-2 bg-breslev-cream rounded-full overflow-hidden">
                    <div
                      className="h-full bg-breslev-gold transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Bouton pour écrire un avis */}
      {isAuthenticated ? (
        !showReviewForm && (
          <Button
            onClick={() => setShowReviewForm(true)}
            className="w-full md:w-auto"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Écrire un avis
          </Button>
        )
      ) : (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Connectez-vous pour laisser un avis
          </p>
          <Button asChild>
            <a href="/connexion">Se connecter</a>
          </Button>
        </Card>
      )}

      {/* Formulaire d'avis */}
      {showReviewForm && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Votre avis sur {bookTitle}</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Sélection de la note */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Votre note *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? "fill-breslev-gold text-breslev-gold"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Commentaire */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Votre commentaire *
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez votre expérience avec ce livre..."
                rows={5}
                required
              />
            </div>

            {/* Boutons */}
            <div className="flex gap-3">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Publication..." : "Publier l'avis"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowReviewForm(false);
                  setComment("");
                  setRating(5);
                }}
              >
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Liste des avis */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Avis des lecteurs</h3>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{review.userName}</span>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Achat vérifié
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-breslev-gold text-breslev-gold"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {review.comment}
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-breslev-gold transition-colors"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Utile ({review.helpful})</span>
                </button>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-bold mb-2">Aucun avis pour le moment</h3>
            <p className="text-muted-foreground">
              Soyez le premier à partager votre expérience avec ce livre
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
