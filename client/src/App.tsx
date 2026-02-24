import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import APropos from "./pages/APropos";
import Abonnement from "./pages/Abonnement";
import Boutique from "./pages/Boutique";
import CGV from "./pages/CGV";
import Checkout from "./pages/Checkout";
import CommandeConfirmee from "./pages/CommandeConfirmee";
import Connexion from "./pages/Connexion";
import Contact from "./pages/Contact";
import EspaceMembre from "./pages/EspaceMembre";
import Home from "./pages/Home";
import MentionsLegales from "./pages/MentionsLegales";
import Panier from "./pages/Panier";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Produit from "./pages/Produit";
import TestPDFPage from "./pages/TestPDFPage";

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
      <Route
        path={"/politique-confidentialite"}
        component={PolitiqueConfidentialite}
      />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/test-pdf"} component={TestPDFPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
