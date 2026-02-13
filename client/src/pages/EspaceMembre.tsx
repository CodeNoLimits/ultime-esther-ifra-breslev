import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  BookOpen,
  Heart,
  Clock,
  Package,
  CreditCard,
  User,
  LogOut,
  Crown,
  Download,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

export default function EspaceMembre() {
  const { isAuthenticated, user } = useAuth();

  // Queries
  const { data: favorites, isLoading: loadingFavorites } = trpc.favorites.getMy.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: readingProgress, isLoading: loadingProgress } = trpc.reading.getProgress.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      toast.success("Déconnexion réussie");
      window.location.href = "/";
    },
  });

  const handleLogout = () => {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logoutMutation.mutate();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <Card className="p-12 text-center">
            <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">Connectez-vous pour accéder à votre espace</h2>
            <Button asChild size="lg">
              <a href={getLoginUrl()}>Se connecter</a>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-breslev-cream/20">
      <Header />

      <main className="flex-1 container py-12">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-serif font-bold text-breslev-blue mb-2">
                Mon Espace
              </h1>
              <p className="text-muted-foreground">
                Bienvenue, {user?.name || user?.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Badge className="bg-breslev-gold text-breslev-blue">
                  <Crown className="h-3 w-3 mr-1" />
                  Administrateur
                </Badge>
              )}
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-breslev-gold/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-breslev-gold" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {readingProgress?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Livres en cours</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-950/20 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {favorites?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Favoris</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-950/20 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Commandes</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-950/20 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">-</div>
                <div className="text-sm text-muted-foreground">Abonnement</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Onglets */}
        <Tabs defaultValue="library" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="library">
              <BookOpen className="h-4 w-4 mr-2" />
              Ma Bibliothèque
            </TabsTrigger>
            <TabsTrigger value="reading">
              <Clock className="h-4 w-4 mr-2" />
              En cours
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="h-4 w-4 mr-2" />
              Favoris
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              Commandes
            </TabsTrigger>
          </TabsList>

          {/* Ma Bibliothèque */}
          <TabsContent value="library" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Mes Livres Digitaux</h2>
              <p className="text-muted-foreground mb-6">
                Accédez à tous vos livres digitaux achetés et inclus dans votre abonnement
              </p>

              {/* Liste des livres (exemple) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder - À remplacer par les vrais livres de l'utilisateur */}
                <Card className="overflow-hidden group hover:shadow-breslev-lg transition-all">
                  <div className="aspect-[3/4] bg-breslev-cream relative overflow-hidden">
                    <img
                      src="/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg"
                      alt="Likoutey Moharane 1"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2">Likoutey Moharane - Tome 1</h3>
                    <p className="text-sm text-muted-foreground mb-4">Rabbi Nahman de Breslev</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => toast.info("Le lecteur en ligne sera disponible prochainement")}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Lire
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast.info("Le téléchargement PDF sera disponible prochainement")}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Message si aucun livre */}
                <Card className="p-12 text-center col-span-full">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-bold mb-2">Votre bibliothèque est vide</h3>
                  <p className="text-muted-foreground mb-4">
                    Commencez à construire votre collection de livres spirituels
                  </p>
                  <Button asChild>
                    <Link href="/boutique">
                      <Package className="h-4 w-4 mr-2" />
                      Découvrir la boutique
                    </Link>
                  </Button>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Livres en cours */}
          <TabsContent value="reading" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Lectures en cours</h2>
              <p className="text-muted-foreground mb-6">
                Reprenez votre lecture là où vous l'avez laissée
              </p>

              {loadingProgress ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex gap-4">
                      <div className="w-20 h-28 bg-breslev-cream rounded" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-breslev-cream rounded w-3/4" />
                        <div className="h-3 bg-breslev-cream rounded w-1/2" />
                        <div className="h-2 bg-breslev-cream rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : readingProgress && readingProgress.length > 0 ? (
                <div className="space-y-4">
                  {readingProgress.map((progress: any) => (
                    <Card key={progress.id} className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-28 flex-shrink-0 rounded overflow-hidden bg-breslev-cream">
                          {progress.book?.coverImageUrl && (
                            <img
                              src={progress.book.coverImageUrl}
                              alt={progress.book.titleFr}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{progress.book?.titleFr}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {progress.book?.author}
                          </p>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progression</span>
                              <span className="font-semibold">{progress.progressPercent}%</span>
                            </div>
                            <div className="w-full bg-breslev-cream rounded-full h-2">
                              <div
                                className="bg-breslev-gold h-2 rounded-full transition-all"
                                style={{ width: `${progress.progressPercent}%` }}
                              />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Page {progress.currentPage} sur {progress.totalPages}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => toast.info("Le lecteur en ligne sera disponible prochainement")}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Continuer
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-bold mb-2">Aucune lecture en cours</h3>
                  <p className="text-muted-foreground">
                    Commencez à lire un livre pour le voir apparaître ici
                  </p>
                </Card>
              )}
            </Card>
          </TabsContent>

          {/* Favoris */}
          <TabsContent value="favorites" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Mes Favoris</h2>
              <p className="text-muted-foreground mb-6">
                Retrouvez tous les livres que vous avez ajoutés à vos favoris
              </p>

              {loadingFavorites ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[3/4] bg-breslev-cream rounded mb-4" />
                      <div className="h-4 bg-breslev-cream rounded mb-2" />
                      <div className="h-3 bg-breslev-cream rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : favorites && favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((book: any) => (
                    <Link key={book.id} href={`/livre/${book.slug}`}>
                      <Card className="overflow-hidden group hover:shadow-breslev-lg transition-all cursor-pointer">
                        <div className="aspect-[3/4] bg-breslev-cream relative overflow-hidden">
                          {book.coverImageUrl && (
                            <img
                              src={book.coverImageUrl}
                              alt={book.titleFr}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold mb-2 line-clamp-2">{book.titleFr}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-bold mb-2">Aucun favori</h3>
                  <p className="text-muted-foreground mb-4">
                    Ajoutez des livres à vos favoris pour les retrouver facilement
                  </p>
                  <Button asChild>
                    <Link href="/boutique">Parcourir la boutique</Link>
                  </Button>
                </Card>
              )}
            </Card>
          </TabsContent>

          {/* Commandes */}
          <TabsContent value="orders" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Mes Commandes</h2>
              <p className="text-muted-foreground mb-6">
                Consultez l'historique de vos commandes
              </p>

              <Card className="p-12 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-bold mb-2">Aucune commande</h3>
                <p className="text-muted-foreground">
                  Vos commandes apparaîtront ici après votre premier achat
                </p>
              </Card>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
