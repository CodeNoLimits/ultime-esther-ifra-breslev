import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useParams, Link } from "wouter";
import {
  ShoppingCart,
  Heart,
  Book,
  Download,
  Star,
  Package,
  Globe,
  Calendar,
  User,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Reviews from "@/components/Reviews";

export default function Produit() {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated } = useAuth();
  const [selectedFormat, setSelectedFormat] = useState<"physical" | "digital">("physical");
  const [quantity, setQuantity] = useState(1);

  // Récupérer le livre
  const { data: book, isLoading } = trpc.books.getBySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );

  // Mutations
  const addToCartMutation = trpc.cart.add.useMutation({
    onSuccess: () => {
      toast.success("Ajouté au panier !");
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout au panier");
    },
  });

  const addToFavoritesMutation = trpc.favorites.add.useMutation({
    onSuccess: () => {
      toast.success("Ajouté aux favoris !");
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout aux favoris");
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Veuillez vous connecter pour ajouter au panier");
      return;
    }
    if (book) {
      addToCartMutation.mutate({
        bookId: book.id,
        quantity,
        type: selectedFormat,
      });
    }
  };

  const handleAddToFavorites = () => {
    if (!isAuthenticated) {
      toast.error("Veuillez vous connecter pour ajouter aux favoris");
      return;
    }
    if (book) {
      addToFavoritesMutation.mutate({ bookId: book.id });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-breslev-cream rounded w-1/4 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="aspect-[3/4] bg-breslev-cream rounded-lg" />
              <div className="space-y-4">
                <div className="h-12 bg-breslev-cream rounded" />
                <div className="h-6 bg-breslev-cream rounded w-3/4" />
                <div className="h-32 bg-breslev-cream rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Livre non trouvé</h1>
            <Button asChild>
              <Link href="/boutique">Retour à la boutique</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentPrice = selectedFormat === "physical" ? book.pricePhysical : book.priceDigital;
  const priceInShekels = currentPrice ? (currentPrice / 100).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-breslev-cream/20">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-breslev-cream">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-breslev-blue transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <Link href="/boutique" className="hover:text-breslev-blue transition-colors">
                Boutique
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{book.titleFr}</span>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="container py-12">
          <Button
            variant="ghost"
            asChild
            className="mb-6 -ml-4 hover:bg-breslev-cream/50"
          >
            <Link href="/boutique">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la boutique
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image du livre */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-breslev bg-white p-8">
                {book.coverImageUrl ? (
                  <img
                    src={book.coverImageUrl}
                    alt={book.titleFr}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-breslev-cream">
                    <Book className="h-24 w-24 text-breslev-blue/30" />
                  </div>
                )}
                {book.featured && (
                  <Badge className="absolute top-4 left-4 bg-breslev-gold text-white">
                    Phare
                  </Badge>
                )}
              </div>
            </div>

            {/* Informations du livre */}
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-4xl font-bold text-breslev-blue mb-2">
                  {book.titleFr}
                </h1>
                {book.titleHe && (
                  <p className="text-2xl text-breslev-blue/70 font-hebrew mb-4">
                    {book.titleHe}
                  </p>
                )}
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{book.author}</span>
                  </div>
                  {book.pages && (
                    <div className="flex items-center gap-1">
                      <Book className="h-4 w-4" />
                      <span>{book.pages} pages</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description courte */}
              <p className="text-lg leading-relaxed">{book.descriptionFr}</p>

              {/* Sélection du format */}
              <Card className="p-6 bg-breslev-cream/30">
                <h3 className="font-semibold mb-4">Choisissez votre format</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setSelectedFormat("physical")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedFormat === "physical"
                        ? "border-breslev-blue bg-breslev-blue/5"
                        : "border-border hover:border-breslev-blue/50"
                    }`}
                  >
                    <Package className="h-6 w-6 mx-auto mb-2 text-breslev-blue" />
                    <div className="font-medium">Livre Physique</div>
                    <div className="text-2xl font-bold text-breslev-gold mt-2">
                      {book.pricePhysical ? `${(book.pricePhysical / 100).toFixed(2)}₪` : "N/A"}
                    </div>
                  </button>

                  {book.pdfUrl && (
                    <button
                      onClick={() => setSelectedFormat("digital")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedFormat === "digital"
                          ? "border-breslev-blue bg-breslev-blue/5"
                          : "border-border hover:border-breslev-blue/50"
                      }`}
                    >
                      <Download className="h-6 w-6 mx-auto mb-2 text-breslev-blue" />
                      <div className="font-medium">Version Digitale</div>
                      <div className="text-2xl font-bold text-breslev-gold mt-2">
                        {book.priceDigital ? `${(book.priceDigital / 100).toFixed(2)}₪` : "N/A"}
                      </div>
                    </button>
                  )}
                </div>

                {/* Quantité */}
                {selectedFormat === "physical" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Quantité</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </Button>
                      <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )}

                {/* Prix total */}
                <div className="flex items-center justify-between p-4 bg-white rounded-lg mb-4">
                  <span className="text-lg font-medium">Prix total</span>
                  <span className="text-3xl font-bold text-breslev-gold">
                    {(parseFloat(priceInShekels) * quantity).toFixed(2)}₪
                  </span>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1"
                    disabled={addToCartMutation.isPending}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Ajouter au panier
                  </Button>
                  <Button
                    onClick={handleAddToFavorites}
                    size="lg"
                    variant="outline"
                    disabled={addToFavoritesMutation.isPending}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </Card>

              {/* Badges informatifs */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-1">
                  <Globe className="h-3 w-3" />
                  {book.language === "fr" ? "Français" : book.language === "he" ? "Hébreu" : "Anglais"}
                </Badge>
                {book.includedInSubscription && (
                  <Badge variant="outline" className="gap-1 bg-breslev-gold/10 text-breslev-gold border-breslev-gold">
                    <Star className="h-3 w-3" />
                    Inclus dans l'abonnement
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Onglets de détails */}
          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="avis">Avis</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-breslev-blue">
                  À propos de ce livre
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="leading-relaxed whitespace-pre-line">
                    {book.descriptionFr}
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-breslev-blue">
                  Détails du produit
                </h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <dt className="text-sm text-muted-foreground mb-1">Auteur</dt>
                    <dd className="font-medium">{book.author}</dd>
                  </div>
                  {book.pages && (
                    <div className="flex flex-col">
                      <dt className="text-sm text-muted-foreground mb-1">Nombre de pages</dt>
                      <dd className="font-medium">{book.pages} pages</dd>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <dt className="text-sm text-muted-foreground mb-1">Langue</dt>
                    <dd className="font-medium">
                      {book.language === "fr" ? "Français" : book.language === "he" ? "Hébreu" : "Anglais"}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm text-muted-foreground mb-1">Type</dt>
                    <dd className="font-medium">
                      {book.type === "book" ? "Livre" : "Brochure"}
                    </dd>
                  </div>
                  {book.weight && (
                    <div className="flex flex-col">
                      <dt className="text-sm text-muted-foreground mb-1">Poids</dt>
                      <dd className="font-medium">{book.weight}g</dd>
                    </div>
                  )}
                  {book.dimensions && (
                    <div className="flex flex-col">
                      <dt className="text-sm text-muted-foreground mb-1">Dimensions</dt>
                      <dd className="font-medium">{book.dimensions}</dd>
                    </div>
                  )}
                </dl>
              </Card>
            </TabsContent>

            <TabsContent value="avis" className="mt-8">
              <Reviews bookId={book.id} bookTitle={book.titleFr} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
