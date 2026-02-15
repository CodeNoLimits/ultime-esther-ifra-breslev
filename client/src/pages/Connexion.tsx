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
import { BookOpen, Mail, Lock, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Connexion() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-breslev-blue" />
        </main>
        <Footer />
      </div>
    );
  }

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation("/espace-membre");
    return null;
  }

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Entrez votre adresse email pour reinitialiser votre mot de passe");
      return;
    }
    setIsResettingPassword(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/connexion`,
      });
      if (error) throw error;
      toast.success("Email de reinitialisation envoye !", {
        description: "Verifiez votre boite de reception pour reinitialiser votre mot de passe.",
      });
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de l'envoi de l'email de reinitialisation");
    } finally {
      setIsResettingPassword(false);
    }
  };

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
          "Compte créé ! Vérifiez votre email pour confirmer votre inscription."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Connexion réussie !");
        setLocation("/espace-membre");
      }
    } catch (error: any) {
      const msg = error.message || "Erreur lors de la connexion";
      if (msg.includes("Invalid login")) {
        toast.error("Email ou mot de passe incorrect");
      } else if (msg.includes("already registered")) {
        toast.error("Cet email est déjà enregistré. Connectez-vous.");
      } else if (msg.includes("Password should be")) {
        toast.error("Le mot de passe doit contenir au moins 6 caractères");
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
              {isRegister ? "Créer un compte" : "Se connecter"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isRegister
                ? "Rejoignez la communauté Breslev"
                : "Accédez à votre espace membre"}
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
                  placeholder="Minimum 6 caractères"
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {!isRegister && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={isResettingPassword}
                  className="text-sm text-breslev-gold hover:underline disabled:opacity-50"
                >
                  {isResettingPassword ? "Envoi en cours..." : "Mot de passe oublie ?"}
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading
                ? "Chargement..."
                : isRegister
                  ? "Créer mon compte"
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
                ? "Déjà un compte ? Se connecter"
                : "Pas encore de compte ? Créer un compte"}
            </button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
