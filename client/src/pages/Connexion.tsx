import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { BookOpen, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

export default function Connexion() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation("/espace-membre");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (error) throw error;
        toast.success(
          "Compte cree ! Verifiez votre email pour confirmer votre inscription."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Connexion reussie !");
        setLocation("/espace-membre");
      }
    } catch (error: any) {
      const msg = error.message || "Erreur lors de la connexion";
      if (msg.includes("Invalid login")) {
        toast.error("Email ou mot de passe incorrect");
      } else if (msg.includes("already registered")) {
        toast.error("Cet email est deja enregistre. Connectez-vous.");
      } else if (msg.includes("Password should be")) {
        toast.error("Le mot de passe doit contenir au moins 6 caracteres");
      } else {
        toast.error(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-breslev-cream to-white py-12">
        <Card className="w-full max-w-md mx-4 p-8 shadow-breslev-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-breslev-cream mb-4">
              <BookOpen className="h-8 w-8 text-breslev-blue" />
            </div>
            <h1 className="text-2xl font-bold text-breslev-blue">
              {isRegister ? "Creer un compte" : "Se connecter"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isRegister
                ? "Rejoignez la communaute Breslev"
                : "Accedez a votre espace membre"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <Label htmlFor="name">Nom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 caracteres"
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading
                ? "Chargement..."
                : isRegister
                  ? "Creer mon compte"
                  : "Se connecter"}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-breslev-gold hover:underline"
            >
              {isRegister
                ? "Deja un compte ? Se connecter"
                : "Pas encore de compte ? Creer un compte"}
            </button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
