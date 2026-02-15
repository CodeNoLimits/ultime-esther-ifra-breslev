import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CGV() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-breslev-blue to-blue-900 text-white py-12 md:py-16">
          <div className="container text-center">
            <Badge className="mb-4 bg-breslev-gold text-breslev-blue">
              <FileText className="h-3 w-3 mr-1" />
              Document juridique
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Conditions Générales de Vente
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Applicables à compter du 1er janvier 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Back link */}
              <Link href="/">
                <a className="inline-flex items-center gap-2 text-breslev-gold hover:text-breslev-blue transition-colors mb-8">
                  <ArrowLeft className="h-4 w-4" />
                  Retour à l'accueil
                </a>
              </Link>

              <div className="bg-card rounded-xl p-8 md:p-12 shadow-breslev border border-border space-y-10">
                {/* Article 1 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 1 - Identité du vendeur
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      Le présent site est édité par <strong>Esther Ifrah</strong>,
                      entreprise individuelle spécialisée dans l'édition et la
                      vente de livres et contenus numériques consacrés aux
                      enseignements de Rabbi Nachman de Breslev.
                    </p>
                    <ul className="list-none space-y-1 mt-4 bg-breslev-cream/50 rounded-lg p-4">
                      <li><strong>Raison sociale :</strong> Esther Ifrah - Littérature Breslev</li>
                      <li><strong>Siège social :</strong> Israël</li>
                      <li><strong>Email :</strong>{" "}
                        <a href="mailto:contact@breslev.fr" className="text-breslev-gold hover:underline">
                          contact@breslev.fr
                        </a>
                      </li>
                      <li><strong>Téléphone :</strong>{" "}
                        <a href="tel:+972585148500" className="text-breslev-gold hover:underline">
                          +972 58-514-8500
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 2 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 2 - Objet et champ d'application
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Les présentes Conditions Générales de Vente (CGV)
                      s'appliquent à toutes les ventes de produits effectuées via
                      le site internet <strong>Esther Ifrah - Littérature Breslev</strong>,
                      à destination de clients particuliers (consommateurs) et
                      professionnels.
                    </p>
                    <p>
                      Toute commande implique l'acceptation sans réserve par
                      l'acheteur des présentes CGV. Elles prévalent sur toute
                      autre condition générale ou particulière non expressément
                      agréée par le vendeur.
                    </p>
                    <p>
                      Le vendeur se réserve le droit de modifier les présentes
                      CGV à tout moment. Les CGV applicables sont celles en
                      vigueur à la date de la commande.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 3 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 3 - Produits
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Le site propose à la vente les produits suivants :
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Livres physiques :</strong> ouvrages imprimés sur
                        les enseignements de Rabbi Nachman de Breslev, traduits et
                        adaptés en français par Esther Ifrah. Les livres sont
                        expédiés par voie postale.
                      </li>
                      <li>
                        <strong>Livres numériques (e-books) :</strong> versions
                        numériques au format PDF ou EPUB, accessibles en
                        téléchargement immédiat après paiement. Les livres
                        numériques sont protégés par des mesures de gestion des
                        droits numériques (DRM).
                      </li>
                      <li>
                        <strong>Abonnements :</strong> accès à un catalogue de
                        contenus numériques selon les formules proposées sur le
                        site.
                      </li>
                    </ul>
                    <p>
                      Les photographies et descriptions des produits sur le site
                      sont aussi fidèles que possible. Toutefois, de légères
                      variations peuvent exister entre la présentation en ligne
                      et le produit réel, notamment en ce qui concerne les
                      couvertures.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 4 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 4 - Prix
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Les prix des produits sont indiqués en <strong>shekels
                      israéliens (ILS / &#8362;)</strong>. Les prix incluent toutes
                      les taxes applicables.
                    </p>
                    <p>
                      Les frais de livraison ne sont pas inclus dans le prix
                      des produits et sont calculés en fonction de la
                      destination, du poids du colis et du mode d'expédition
                      choisi. Le montant des frais de livraison est indiqué
                      avant la validation définitive de la commande.
                    </p>
                    <p>
                      Le vendeur se réserve le droit de modifier les prix à
                      tout moment. Les produits sont facturés au prix en
                      vigueur au moment de la validation de la commande.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 5 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 5 - Commande
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Le processus de commande se déroule comme suit :
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Sélection des produits et ajout au panier</li>
                      <li>Vérification du contenu du panier</li>
                      <li>Saisie des informations de livraison</li>
                      <li>Choix du mode de livraison et paiement</li>
                      <li>Vérification récapitulative de la commande</li>
                      <li>Validation et paiement</li>
                      <li>Confirmation de commande par email</li>
                    </ol>
                    <p>
                      La vente est réputée conclue dès la validation du
                      paiement par l'acheteur. Un email de confirmation est
                      envoyé à l'adresse communiquée lors de la commande.
                    </p>
                    <p>
                      Le vendeur se réserve le droit de refuser toute commande
                      en cas de motif légitime, notamment en cas de problème
                      d'approvisionnement, d'erreur manifeste de prix, ou de
                      commande anormale.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 6 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 6 - Paiement
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Le règlement des commandes s'effectue par les moyens
                      suivants :
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Carte bancaire</strong> via la plateforme sécurisée
                        <strong> Stripe</strong> (Visa, Mastercard, American Express)
                      </li>
                      <li>
                        <strong>PayPal</strong> pour un paiement rapide et sécurisé
                      </li>
                    </ul>
                    <p>
                      Le paiement est exigible immédiatement à la commande. Les
                      transactions sont sécurisées par un chiffrement SSL et les
                      données bancaires ne sont jamais stockées sur nos serveurs.
                    </p>
                    <p>
                      En cas de refus de paiement par l'organisme bancaire, la
                      commande est automatiquement annulée et l'acheteur en est
                      informé par email.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 7 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 7 - Livraison
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Les livraisons sont effectuées aux adresses indiquées par
                      l'acheteur lors de la commande. Le vendeur livre dans les
                      zones géographiques suivantes :
                    </p>

                    <div className="bg-breslev-cream/50 rounded-lg p-6 space-y-4">
                      <h3 className="font-bold text-breslev-blue text-lg">
                        Zones de livraison et délais indicatifs
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 pr-4 font-bold text-breslev-blue">Destination</th>
                              <th className="text-left py-2 pr-4 font-bold text-breslev-blue">Délai indicatif</th>
                              <th className="text-left py-2 font-bold text-breslev-blue">Tarification</th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            <tr className="border-b border-border/50">
                              <td className="py-2 pr-4">Israël</td>
                              <td className="py-2 pr-4">3 à 7 jours ouvrables</td>
                              <td className="py-2">Selon poids du colis</td>
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-2 pr-4">France métropolitaine</td>
                              <td className="py-2 pr-4">7 à 15 jours ouvrables</td>
                              <td className="py-2">Selon poids du colis</td>
                            </tr>
                            <tr>
                              <td className="py-2 pr-4">Canada</td>
                              <td className="py-2 pr-4">10 à 21 jours ouvrables</td>
                              <td className="py-2">Selon poids du colis</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <p>
                      Les délais de livraison sont donnés à titre indicatif et
                      ne constituent pas un engagement contractuel. Le vendeur ne
                      saurait être tenu responsable des retards de livraison dus
                      aux services postaux ou aux douanes.
                    </p>
                    <p>
                      <strong>Produits numériques :</strong> les livres numériques
                      et abonnements sont accessibles immédiatement après
                      validation du paiement, via téléchargement ou accès en
                      ligne dans l'espace membre.
                    </p>
                    <p>
                      En cas de colis endommagé ou de non-réception, l'acheteur
                      doit contacter le vendeur dans un délai de 14 jours
                      suivant la date de livraison prévue.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 8 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 8 - Droit de rétractation
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <div className="bg-breslev-cream/50 rounded-lg p-6 space-y-4">
                      <h3 className="font-bold text-breslev-blue">
                        Livres physiques
                      </h3>
                      <p>
                        Conformément aux articles L.221-18 et suivants du Code de
                        la consommation français, l'acheteur dispose d'un délai
                        de <strong>quatorze (14) jours calendaires</strong> à
                        compter de la réception du produit pour exercer son droit
                        de rétractation, sans avoir à justifier de motifs ni à
                        payer de pénalités.
                      </p>
                      <p>
                        Le produit doit être retourné dans son emballage
                        d'origine, en parfait état, non utilisé et accompagné de
                        tous les accessoires éventuels. Les frais de retour sont
                        à la charge de l'acheteur.
                      </p>
                      <p>
                        Le remboursement sera effectué dans un délai maximum de
                        14 jours après réception du produit retourné, via le
                        même moyen de paiement que celui utilisé lors de la
                        commande.
                      </p>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-6 space-y-4 border border-red-200 dark:border-red-900">
                      <h3 className="font-bold text-red-700 dark:text-red-400">
                        Produits numériques - Exclusion du droit de rétractation
                      </h3>
                      <p>
                        Conformément à l'article L.221-28 du Code de la
                        consommation, le droit de rétractation ne s'applique pas
                        aux contenus numériques fournis sur un support
                        immatériel dont l'exécution a commencé avec l'accord
                        du consommateur.
                      </p>
                      <p>
                        En validant sa commande de livre numérique ou
                        d'abonnement, l'acheteur reconnaît expressément
                        renoncer à son droit de rétractation dès le
                        téléchargement ou l'accès au contenu numérique.
                      </p>
                    </div>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 9 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 9 - Garanties légales
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Tous les produits vendus bénéficient des garanties légales
                      prévues par le Code de la consommation français :
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Garantie légale de conformité</strong> (articles
                        L.217-4 à L.217-14 du Code de la consommation) : le
                        vendeur répond des défauts de conformité existant lors de
                        la délivrance du produit et qui se manifestent dans un
                        délai de deux (2) ans à compter de celle-ci.
                      </li>
                      <li>
                        <strong>Garantie contre les vices cachés</strong> (articles
                        1641 à 1649 du Code civil) : le vendeur est tenu de la
                        garantie à raison des défauts cachés de la chose vendue
                        qui la rendent impropre à l'usage auquel on la destine.
                      </li>
                    </ul>
                    <p>
                      Pour faire valoir ses droits, l'acheteur doit informer le
                      vendeur par écrit (email ou courrier) de la non-conformité
                      ou du vice caché du produit dans les meilleurs délais.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 10 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 10 - Propriété intellectuelle
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      L'ensemble des contenus du site (textes, traductions,
                      images, illustrations, mises en page) ainsi que les
                      ouvrages vendus sont protégés par le droit d'auteur et les
                      droits de propriété intellectuelle.
                    </p>
                    <p>
                      L'achat d'un livre physique ou numérique confère à
                      l'acheteur un droit d'usage personnel et non cessible. Toute
                      reproduction, distribution, modification ou utilisation
                      commerciale des contenus sans autorisation écrite préalable
                      du vendeur est strictement interdite.
                    </p>
                    <p>
                      Les livres numériques sont protégés par un système de
                      gestion des droits numériques (DRM). Toute tentative de
                      contournement de ces protections est illégale et passible
                      de poursuites.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 11 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 11 - Données personnelles
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Les informations personnelles collectées lors de la
                      commande sont nécessaires au traitement de celle-ci et
                      sont traitées conformément au Règlement Général sur la
                      Protection des Données (RGPD) et à la loi Informatique et
                      Libertés.
                    </p>
                    <p>
                      Pour en savoir plus sur le traitement de vos données
                      personnelles, veuillez consulter notre{" "}
                      <Link href="/politique-confidentialite">
                        <a className="text-breslev-gold hover:underline font-medium">
                          Politique de Confidentialité
                        </a>
                      </Link>.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 12 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 12 - Responsabilité
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Le vendeur ne saurait être tenu responsable de
                      l'inexécution du contrat en cas de force majeure, de
                      perturbation ou grève totale ou partielle des services
                      postaux et moyens de transport et/ou communications.
                    </p>
                    <p>
                      Le vendeur ne pourra être tenu pour responsable des
                      dommages de toute nature, tant matériels qu'immatériels,
                      qui pourraient résulter d'un mauvais fonctionnement ou de
                      la mauvaise utilisation des produits commercialisés.
                    </p>
                    <p>
                      La responsabilité du vendeur est en tout état de cause
                      limitée au montant de la commande et ne saurait être
                      engagée pour de simples erreurs ou omissions qui auraient
                      pu subsister malgré toutes les précautions prises.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 13 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 13 - Règlement des litiges
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Les présentes CGV sont soumises au droit français. En cas
                      de litige, une solution amiable sera recherchée avant
                      toute action judiciaire.
                    </p>
                    <p>
                      Conformément aux dispositions du Code de la consommation
                      relatives au règlement amiable des litiges, l'acheteur
                      peut recourir gratuitement au service de médiation proposé
                      par le vendeur. Le médiateur tentera, en toute
                      indépendance et impartialité, de rapprocher les parties en
                      vue d'aboutir à une solution amiable.
                    </p>
                    <p>
                      L'acheteur peut également présenter ses réclamations sur
                      la plateforme de résolution en ligne des litiges de la
                      Commission européenne accessible à l'adresse :{" "}
                      <a
                        href="https://ec.europa.eu/consumers/odr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-breslev-gold hover:underline"
                      >
                        https://ec.europa.eu/consumers/odr
                      </a>
                    </p>
                    <p>
                      À défaut de résolution amiable, le litige sera porté
                      devant les tribunaux compétents conformément aux règles de
                      droit commun.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Article 14 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Article 14 - Service client
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Pour toute question, réclamation ou demande
                      d'information relative à une commande, le service client
                      est joignable :
                    </p>
                    <ul className="list-none space-y-1 bg-breslev-cream/50 rounded-lg p-4">
                      <li><strong>Par email :</strong>{" "}
                        <a href="mailto:contact@breslev.fr" className="text-breslev-gold hover:underline">
                          contact@breslev.fr
                        </a>
                      </li>
                      <li><strong>Par téléphone :</strong>{" "}
                        <a href="tel:+972585148500" className="text-breslev-gold hover:underline">
                          +972 58-514-8500
                        </a>
                      </li>
                    </ul>
                    <p>
                      Les demandes sont traitées du dimanche au jeudi, de 9h à
                      17h (heure d'Israël, GMT+2/+3).
                    </p>
                  </div>
                </section>

                {/* Last updated */}
                <div className="text-center pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Dernière mise à jour : 1er janvier 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
