import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Produit from "./pages/Produit";
import Boutique from "./pages/Boutique";
import Abonnement from "./pages/Abonnement";
import APropos from "./pages/APropos";
import Panier from "./pages/Panier";
import Checkout from "./pages/Checkout";
import EspaceMembre from "./pages/EspaceMembre";
import CommandeConfirmee from "./pages/CommandeConfirmee";
import Connexion from "./pages/Connexion";
import CGV from "./pages/CGV";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/boutique" component={Boutique} />
      <Route path="/livre/:slug" component={Produit} />
      <Route path={"/abonnement"} component={Abonnement} />
      <Route path={"/a-propos"} component={APropos} />
      <Route path={"/connexion"} component={Connexion} />
      <Route path={"/panier"} component={Panier} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/commande-confirmee"} component={CommandeConfirmee} />
      <Route path={"/espace-membre"} component={EspaceMembre} />
      <Route path={"/mentions-legales"} component={MentionsLegales} />
      <Route path={"/cgv"} component={CGV} />
      <Route path={"/politique-confidentialite"} component={PolitiqueConfidentialite} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
