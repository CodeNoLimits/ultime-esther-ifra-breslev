import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowLeft, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-breslev-blue to-blue-900 text-white py-12 md:py-16">
          <div className="container text-center">
            <Badge className="mb-4 bg-breslev-gold text-breslev-blue">
              <Scale className="h-3 w-3 mr-1" />
              Obligations légales
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Mentions Légales
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Informations légales conformes à la législation française
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
                {/* Section 1 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    1. Éditeur du site
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      Le présent site internet est édité par :
                    </p>
                    <ul className="list-none space-y-1 bg-breslev-cream/50 rounded-lg p-4 mt-3">
                      <li><strong>Nom :</strong> Esther Ifrah</li>
                      <li><strong>Statut :</strong> Entrepreneur individuel</li>
                      <li><strong>Activité :</strong> Édition et vente de livres et contenus numériques consacrés aux enseignements de Rabbi Nachman de Breslev</li>
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
                    <p className="mt-3">
                      Directrice de la publication : <strong>Esther Ifrah</strong>
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 2 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    2. Hébergement
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      Le site est hébergé par :
                    </p>
                    <ul className="list-none space-y-1 bg-breslev-cream/50 rounded-lg p-4 mt-3">
                      <li><strong>Raison sociale :</strong> Vercel Inc.</li>
                      <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
                      <li><strong>Site web :</strong>{" "}
                        <a
                          href="https://vercel.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-breslev-gold hover:underline"
                        >
                          https://vercel.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 3 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    3. Propriété intellectuelle
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      L'ensemble du contenu du présent site internet, incluant
                      de façon non limitative les textes, traductions,
                      graphismes, images, photographies, sons, vidéos, logos,
                      icônes, mise en page et logiciels, est la propriété
                      exclusive d'Esther Ifrah ou de ses partenaires et est
                      protégé par les lois françaises et internationales
                      relatives à la propriété intellectuelle.
                    </p>
                    <p>
                      Toute reproduction, représentation, modification,
                      publication, adaptation, totale ou partielle, de l'un
                      quelconque de ces éléments, quel que soit le moyen ou le
                      procédé utilisé, est interdite sans l'autorisation écrite
                      préalable d'Esther Ifrah.
                    </p>
                    <p>
                      Toute exploitation non autorisée du site ou de son
                      contenu, des informations qui y sont divulguées,
                      engagerait la responsabilité de l'utilisateur et
                      constituerait une contrefaçon sanctionnée par les articles
                      L.335-2 et suivants du Code de la Propriété
                      Intellectuelle.
                    </p>
                    <p>
                      Les traductions et adaptations des textes de Rabbi Nachman
                      de Breslev réalisées par Esther Ifrah sont des oeuvres
                      originales protégées par le droit d'auteur. L'achat d'un
                      livre ne confère aucun droit de reproduction ou de
                      diffusion.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 4 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    4. Limitation de responsabilité
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      L'éditeur du site met tout en oeuvre pour offrir aux
                      utilisateurs des informations et des outils disponibles et
                      vérifiés. Cependant, il ne saurait être tenu responsable
                      des erreurs, d'une absence de disponibilité des
                      informations et/ou de la présence de virus sur le site.
                    </p>
                    <p>
                      Les informations fournies sur le site le sont à titre
                      indicatif et ne sauraient dispenser l'utilisateur d'une
                      analyse complémentaire et personnalisée. L'éditeur ne
                      saurait garantir l'exactitude, la complétude et
                      l'actualité des informations diffusées sur le site.
                    </p>
                    <p>
                      L'utilisateur est seul responsable de l'utilisation qu'il
                      fait du contenu du site. L'éditeur décline toute
                      responsabilité en cas de mauvaise utilisation, de
                      dommages directs ou indirects liés à l'utilisation du
                      site.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 5 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    5. Liens hypertextes
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Le site peut contenir des liens hypertextes vers d'autres
                      sites internet. Ces liens sont fournis à titre
                      d'information. L'éditeur n'exerce aucun contrôle sur le
                      contenu de ces sites tiers et décline toute responsabilité
                      quant à leur contenu ou aux pratiques de confidentialité
                      de ces sites.
                    </p>
                    <p>
                      La mise en place de liens hypertextes vers le présent site
                      est autorisée sans accord préalable, à condition que ces
                      liens ne portent pas atteinte à l'image du site ou de
                      son éditeur.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 6 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    6. Données personnelles
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Le traitement des données personnelles collectées sur ce
                      site est réalisé dans le respect du Règlement Général sur
                      la Protection des Données (RGPD - Règlement UE 2016/679)
                      et de la loi n° 78-17 du 6 janvier 1978 relative à
                      l'informatique, aux fichiers et aux libertés (loi
                      Informatique et Libertés).
                    </p>
                    <p>
                      Pour plus d'informations sur le traitement de vos données
                      personnelles, veuillez consulter notre{" "}
                      <Link href="/politique-confidentialite">
                        <a className="text-breslev-gold hover:underline font-medium">
                          Politique de Confidentialité
                        </a>
                      </Link>.
                    </p>
                    <p>
                      Responsable du traitement des données : <strong>Esther Ifrah</strong>
                      <br />
                      Contact :{" "}
                      <a href="mailto:contact@breslev.fr" className="text-breslev-gold hover:underline">
                        contact@breslev.fr
                      </a>
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 7 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    7. Cookies
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Le site utilise des cookies pour assurer son bon
                      fonctionnement, améliorer l'expérience utilisateur et
                      réaliser des statistiques de fréquentation. En navigant
                      sur le site, l'utilisateur accepte l'utilisation de
                      cookies conformément à notre{" "}
                      <Link href="/politique-confidentialite">
                        <a className="text-breslev-gold hover:underline font-medium">
                          Politique de Confidentialité
                        </a>
                      </Link>.
                    </p>
                    <p>
                      L'utilisateur peut à tout moment désactiver les cookies
                      dans les paramètres de son navigateur. La désactivation
                      des cookies peut affecter certaines fonctionnalités du
                      site.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 8 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    8. Droit applicable et juridiction compétente
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Les présentes mentions légales sont régies par le droit
                      français. Tout litige relatif à l'utilisation du site sera
                      soumis à la compétence des juridictions françaises, sauf
                      disposition contraire d'ordre public.
                    </p>
                    <p>
                      Pour les consommateurs résidant au sein de l'Union
                      européenne, ils bénéficient de la protection accordée par
                      les dispositions impératives de la loi de leur pays de
                      résidence.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 9 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    9. Contact
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Pour toute question relative aux présentes mentions
                      légales, vous pouvez nous contacter :
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
