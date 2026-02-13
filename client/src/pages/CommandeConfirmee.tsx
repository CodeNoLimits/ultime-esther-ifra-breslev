import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CommandeConfirmee() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 flex items-center justify-center">
        <Card className="p-12 text-center max-w-lg">
          <CheckCircle className="h-20 w-20 mx-auto mb-6 text-green-600" />
          <h1 className="text-3xl font-bold mb-4">Merci pour votre commande !</h1>
          <p className="text-muted-foreground mb-2">
            Votre paiement a ete traite avec succes.
          </p>
          {sessionId && (
            <p className="text-sm text-muted-foreground mb-6">
              Reference: {sessionId.slice(0, 20)}...
            </p>
          )}
          <p className="text-muted-foreground mb-8">
            Vous recevrez un email de confirmation prochainement.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Accueil
              </Link>
            </Button>
            <Button asChild>
              <Link href="/boutique">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Continuer les achats
              </Link>
            </Button>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
