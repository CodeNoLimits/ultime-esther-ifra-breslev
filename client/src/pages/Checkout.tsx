import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import {
  CreditCard,
  MapPin,
  Package,
  Lock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Zones de livraison
const SHIPPING_ZONES = {
  IL: { name: "Israël", min: 500, max: 1500, currency: "₪" },
  FR: { name: "France", min: 2000, max: 4500, currency: "₪" },
  CA: { name: "Canada", min: 3000, max: 6000, currency: "₪" },
} as const;

type ShippingZone = keyof typeof SHIPPING_ZONES;
type PaymentMethod = "stripe" | "paypal";

export default function Checkout() {
  const { isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();
  
  // États du formulaire
  const [shippingZone, setShippingZone] = useState<ShippingZone>("IL");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
    country: "IL",
    phone: "",
  });
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Récupérer le panier
  const { data: cartItems, isLoading } = trpc.cart.get.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // Calculs
  const calculateSubtotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((sum, item) => {
      const price = item.cartItem.type === "physical" 
        ? (item.book.pricePhysical || 0)
        : (item.book.priceDigital || 0);
      return sum + (price * item.cartItem.quantity);
    }, 0);
  };

  const calculateTotalWeight = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((sum, item) => {
      if (item.cartItem.type === "physical" && item.book.weight) {
        return sum + (item.book.weight * item.cartItem.quantity);
      }
      return sum;
    }, 0);
  };

  const calculateShipping = () => {
    const hasPhysical = cartItems?.some(item => item.cartItem.type === "physical");
    if (!hasPhysical) return 0;

    const totalWeight = calculateTotalWeight();
    const zone = SHIPPING_ZONES[shippingZone];
    
    const baseShipping = zone.min;
    const weightFactor = Math.floor(totalWeight / 500);
    const shipping = Math.min(
      baseShipping + (weightFactor * 500),
      zone.max
    );
    
    return shipping;
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping();
  const total = subtotal + shipping;

  const hasPhysicalItems = cartItems?.some(item => item.cartItem.type === "physical");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (hasPhysicalItems) {
      if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city) {
        toast.error("Veuillez remplir tous les champs d'adresse");
        return;
      }
    }

    setIsProcessing(true);

    try {
      toast.info("Redirection vers le paiement securise...");

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: (cartItems ?? []).map((item: any) => ({
            bookId: item.bookId ?? item.id,
            quantity: item.quantity ?? 1,
            type: item.type ?? "physical",
          })),
          shippingAddress: hasPhysicalItems ? shippingAddress : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur de paiement");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de paiement non disponible");
      }
    } catch (error: any) {
      toast.error(error.message || "Erreur lors du traitement du paiement");
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <Card className="p-12 text-center">
            <Lock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">Connectez-vous pour continuer</h2>
            <Button size="lg" onClick={() => toast.info("Connexion disponible prochainement")}>
              Se connecter
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
            <div className="h-64 bg-breslev-cream rounded" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isEmpty = !cartItems || cartItems.length === 0;

  if (isEmpty) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
            <Button asChild size="lg">
              <Link href="/boutique">Découvrir la boutique</Link>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-breslev-cream/20">
      <Header />

      <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-breslev-blue mb-2">
            Finaliser la commande
          </h1>
          <p className="text-muted-foreground">
            Dernière étape avant de recevoir vos livres
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2 space-y-6">
              {/* Adresse de livraison */}
              {hasPhysicalItems && (
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-breslev-gold" />
                    Adresse de livraison
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName">Nom complet *</Label>
                      <Input
                        id="fullName"
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Pays *</Label>
                      <Select
                        value={shippingAddress.country}
                        onValueChange={(value) => {
                          setShippingAddress({...shippingAddress, country: value});
                          setShippingZone(value as ShippingZone);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IL">Israël</SelectItem>
                          <SelectItem value="FR">France</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* Méthode de paiement */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-breslev-gold" />
                  Méthode de paiement
                </h2>

                <div className="space-y-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "stripe"
                        ? "border-breslev-gold bg-breslev-gold/5"
                        : "border-border hover:border-breslev-gold/50"
                    }`}
                    onClick={() => setPaymentMethod("stripe")}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "stripe" ? "border-breslev-gold" : "border-border"
                      }`}>
                        {paymentMethod === "stripe" && (
                          <div className="w-3 h-3 rounded-full bg-breslev-gold" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Carte bancaire (Stripe)</div>
                        <div className="text-sm text-muted-foreground">
                          Paiement sécurisé par carte bancaire
                        </div>
                      </div>
                      <Badge variant="secondary">Recommandé</Badge>
                    </div>
                  </div>

                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "paypal"
                        ? "border-breslev-gold bg-breslev-gold/5"
                        : "border-border hover:border-breslev-gold/50"
                    }`}
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "paypal" ? "border-breslev-gold" : "border-border"
                      }`}>
                        {paymentMethod === "paypal" && (
                          <div className="w-3 h-3 rounded-full bg-breslev-gold" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">PayPal</div>
                        <div className="text-sm text-muted-foreground">
                          Paiement via votre compte PayPal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>Configuration en attente :</strong> Les clés API Stripe et PayPal doivent être configurées dans Settings → Payment pour activer les paiements.
                  </div>
                </div>
              </Card>

              {/* Notes */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Notes de commande (optionnel)</h2>
                <Textarea
                  placeholder="Instructions spéciales, préférences de livraison..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </Card>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-6">Récapitulatif</h2>

                {/* Articles */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.cartItem.id} className="flex gap-3 text-sm">
                      <div className="w-12 h-16 flex-shrink-0 rounded overflow-hidden bg-breslev-cream">
                        {item.book.coverImageUrl && (
                          <img
                            src={item.book.coverImageUrl}
                            alt={item.book.titleFr}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium line-clamp-2">{item.book.titleFr}</div>
                        <div className="text-muted-foreground">
                          {item.cartItem.type === "physical" ? "Physique" : "Digital"} × {item.cartItem.quantity}
                        </div>
                      </div>
                      <div className="font-semibold">
                        {((item.cartItem.type === "physical" ? item.book.pricePhysical : item.book.priceDigital) || 0) * item.cartItem.quantity / 100}₪
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totaux */}
                <div className="space-y-3 mb-6 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-medium">{(subtotal / 100).toFixed(2)}₪</span>
                  </div>

                  {shipping > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frais de port</span>
                      <span className="font-medium">{(shipping / 100).toFixed(2)}₪</span>
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
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>Traitement...</>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Payer {(total / 100).toFixed(2)}₪
                    </>
                  )}
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Paiement 100% sécurisé</span>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
