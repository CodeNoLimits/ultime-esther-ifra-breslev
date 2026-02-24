import { useAuth } from "@/_core/hooks/useAuth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import {
  ArrowRight,
  CreditCard,
  MapPin,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";

// Zones de livraison avec frais
const SHIPPING_ZONES = {
  IL: { name: "Israël", min: 500, max: 1500, currency: "₪" },
  FR: { name: "France", min: 2000, max: 4500, currency: "₪" },
  CA: { name: "Canada", min: 3000, max: 6000, currency: "₪" },
} as const;

type ShippingZone = keyof typeof SHIPPING_ZONES;

export default function Panier() {
  const { isAuthenticated, user } = useAuth();
  const {
    items: cartItems,
    isLoading,
    removeItem,
    clearCart: clearCartFn,
  } = useCart();
  const [, setLocation] = useLocation();
  const [shippingZone, setShippingZone] = useState<ShippingZone>("IL");
  const [isRemoving, setIsRemoving] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleRemoveItem = (cartItemId: number) => {
    setIsRemoving(true);
    removeItem(cartItemId);
    toast.success("Article retiré du panier");
    setIsRemoving(false);
  };

  const handleClearCart = () => {
    if (confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
      setIsClearing(true);
      clearCartFn();
      toast.success("Panier vidé");
      setIsClearing(false);
    }
  };

  // Calculs
  const calculateSubtotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((sum, item) => {
      const price =
        item.cartItem.type === "physical"
          ? item.book.pricePhysical || 0
          : item.book.priceDigital || 0;
      return sum + price * item.cartItem.quantity;
    }, 0);
  };

  const calculateTotalWeight = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((sum, item) => {
      if (item.cartItem.type === "physical" && item.book.weight) {
        return sum + item.book.weight * item.cartItem.quantity;
      }
      return sum;
    }, 0);
  };

  const calculateShipping = () => {
    const hasPhysical = cartItems?.some(
      item => item.cartItem.type === "physical"
    );
    if (!hasPhysical) return 0;

    const totalWeight = calculateTotalWeight();
    const zone = SHIPPING_ZONES[shippingZone];

    // Calcul basé sur le poids (formule simplifiée)
    const baseShipping = zone.min;
    const weightFactor = Math.floor(totalWeight / 500); // +frais tous les 500g
    const shipping = Math.min(baseShipping + weightFactor * 500, zone.max);

    return shipping;
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping();
  const total = subtotal + shipping;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <Card className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">
              Connectez-vous pour voir votre panier
            </h2>
            <p className="text-muted-foreground mb-6">
              Vous devez être connecté pour accéder à votre panier
            </p>
            <Button size="lg" asChild>
              <Link href="/connexion">Se connecter</Link>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-breslev-cream rounded w-1/4" />
            <div className="h-32 bg-breslev-cream rounded" />
            <div className="h-32 bg-breslev-cream rounded" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isEmpty = !cartItems || cartItems.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-breslev-cream/20">
      <Header />

      <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-breslev-blue mb-2">
            Mon Panier
          </h1>
          <p className="text-muted-foreground">
            {isEmpty
              ? "Votre panier est vide"
              : `${cartItems.length} article(s)`}
          </p>
        </div>

        {isEmpty ? (
          <Card className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-6">
              Découvrez notre collection de livres spirituels
            </p>
            <Button asChild size="lg">
              <Link href="/boutique">
                <Package className="h-5 w-5 mr-2" />
                Découvrir la boutique
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => {
                const price =
                  item.cartItem.type === "physical"
                    ? item.book.pricePhysical
                    : item.book.priceDigital;
                const priceInShekels = price
                  ? (price / 100).toFixed(2)
                  : "0.00";
                const itemTotal = price
                  ? ((price * item.cartItem.quantity) / 100).toFixed(2)
                  : "0.00";

                return (
                  <Card
                    key={item.cartItem.id}
                    className="p-6 glass-card-light border-breslev-gold/10 hover:-translate-y-1 hover:shadow-breslev-gold"
                  >
                    <div className="flex gap-6">
                      {/* Image */}
                      <Link href={`/livre/${item.book.slug}`}>
                        <div className="w-24 h-32 flex-shrink-0 rounded overflow-hidden bg-breslev-cream cursor-pointer hover:opacity-80 transition-opacity">
                          {item.book.coverImageUrl ? (
                            <img
                              src={item.book.coverImageUrl}
                              alt={item.book.titleFr}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Détails */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link href={`/livre/${item.book.slug}`}>
                              <h3 className="font-bold text-lg hover:text-breslev-gold transition-colors cursor-pointer">
                                {item.book.titleFr}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              {item.book.author}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.cartItem.id)}
                            disabled={isRemoving}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <Badge
                            variant={
                              item.cartItem.type === "physical"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {item.cartItem.type === "physical"
                              ? "Physique"
                              : "Digital"}
                          </Badge>
                          {item.cartItem.type === "physical" &&
                            item.book.weight && (
                              <span className="text-xs text-muted-foreground">
                                {item.book.weight}g
                              </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">
                              Quantité:
                            </span>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" disabled>
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-semibold w-8 text-center">
                                {item.cartItem.quantity}
                              </span>
                              <Button variant="outline" size="sm" disabled>
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              {priceInShekels}₪ × {item.cartItem.quantity}
                            </div>
                            <div className="text-xl font-bold text-breslev-gold">
                              {itemTotal}₪
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}

              <Button
                variant="outline"
                onClick={handleClearCart}
                disabled={isClearing}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Vider le panier
              </Button>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 glass-card-light border-breslev-gold/20 shadow-breslev-lg z-10">
                <h2 className="text-xl font-bold mb-6">Récapitulatif</h2>

                {/* Zone de livraison */}
                {cartItems.some(item => item.cartItem.type === "physical") && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Zone de livraison
                    </label>
                    <Select
                      value={shippingZone}
                      onValueChange={value =>
                        setShippingZone(value as ShippingZone)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(SHIPPING_ZONES).map(([code, zone]) => (
                          <SelectItem key={code} value={code}>
                            {zone.name} ({(zone.min / 100).toFixed(0)}-
                            {(zone.max / 100).toFixed(0)}
                            {zone.currency})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-2">
                      Poids total: {calculateTotalWeight()}g
                    </p>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-medium">
                      {(subtotal / 100).toFixed(2)}₪
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Frais de port
                      </span>
                      <span className="font-medium">
                        {(shipping / 100).toFixed(2)}₪
                      </span>
                    </div>
                  )}

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-breslev-gold">
                        {(total / 100).toFixed(2)}₪
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full mb-3"
                  onClick={() => setLocation("/checkout")}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Passer la commande
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>

                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/boutique">Continuer mes achats</Link>
                </Button>

                {/* Informations de livraison */}
                <div className="mt-6 p-4 bg-breslev-cream/30 rounded-lg">
                  <h3 className="font-semibold mb-2 text-sm">
                    Informations de livraison
                  </h3>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Livraison sous 5-10 jours ouvrés</li>
                    <li>• Livres digitaux disponibles immédiatement</li>
                    <li>• Paiement sécurisé par Stripe ou PayPal</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
