import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-breslev-blue to-blue-900 text-white py-12 md:py-16">
          <div className="container text-center">
            <Badge className="mb-4 bg-breslev-gold text-breslev-blue">
              <Shield className="h-3 w-3 mr-1" />
              Protection des donnees
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Politique de Confidentialite
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Conforme au RGPD (Reglement UE 2016/679)
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
                  Retour a l'accueil
                </a>
              </Link>

              <div className="bg-card rounded-xl p-8 md:p-12 shadow-breslev border border-border space-y-10">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    Introduction
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      La presente Politique de Confidentialite a pour objectif
                      d'informer les utilisateurs du site <strong>Esther
                      Ifrah - Litterature Breslev</strong> sur la maniere dont
                      leurs donnees personnelles sont collectees, traitees et
                      protegees.
                    </p>
                    <p>
                      Cette politique est etablie conformement au Reglement
                      General sur la Protection des Donnees (RGPD - Reglement
                      UE 2016/679) et a la loi n 78-17 du 6 janvier 1978
                      relative a l'informatique, aux fichiers et aux libertes.
                    </p>
                    <p>
                      En utilisant notre site et en effectuant des achats, vous
                      acceptez les pratiques decrites dans la presente politique.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 1 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    1. Responsable du traitement
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      Le responsable du traitement des donnees personnelles est :
                    </p>
                    <ul className="list-none space-y-1 bg-breslev-cream/50 rounded-lg p-4 mt-3">
                      <li><strong>Nom :</strong> Esther Ifrah</li>
                      <li><strong>Activite :</strong> Edition et vente de livres Breslev</li>
                      <li><strong>Siege :</strong> Israel</li>
                      <li><strong>Email :</strong>{" "}
                        <a href="mailto:contact@breslev.fr" className="text-breslev-gold hover:underline">
                          contact@breslev.fr
                        </a>
                      </li>
                      <li><strong>Telephone :</strong>{" "}
                        <a href="tel:+972585148500" className="text-breslev-gold hover:underline">
                          +972 58-514-8500
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 2 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    2. Donnees personnelles collectees
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Nous collectons les donnees personnelles suivantes, en
                      fonction des interactions de l'utilisateur avec le site :
                    </p>

                    <div className="bg-breslev-cream/50 rounded-lg p-6 space-y-4">
                      <h3 className="font-bold text-breslev-blue">
                        Lors de la creation d'un compte
                      </h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Nom et prenom</li>
                        <li>Adresse email</li>
                        <li>Mot de passe (stocke sous forme chiffree)</li>
                      </ul>
                    </div>

                    <div className="bg-breslev-cream/50 rounded-lg p-6 space-y-4">
                      <h3 className="font-bold text-breslev-blue">
                        Lors d'une commande
                      </h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Nom et prenom</li>
                        <li>Adresse email</li>
                        <li>Adresse de livraison (rue, ville, code postal, pays)</li>
                        <li>Numero de telephone (facultatif)</li>
                        <li>Informations de paiement (traitees directement par Stripe ou PayPal, jamais stockees sur nos serveurs)</li>
                      </ul>
                    </div>

                    <div className="bg-breslev-cream/50 rounded-lg p-6 space-y-4">
                      <h3 className="font-bold text-breslev-blue">
                        Donnees de navigation
                      </h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Adresse IP</li>
                        <li>Type et version du navigateur</li>
                        <li>Pages consultees et duree de consultation</li>
                        <li>Date et heure de connexion</li>
                        <li>Donnees de cookies (voir section dediee)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 3 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    3. Finalites du traitement
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Les donnees personnelles collectees sont utilisees aux
                      fins suivantes :
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 pr-4 font-bold text-breslev-blue">Finalite</th>
                            <th className="text-left py-3 font-bold text-breslev-blue">Base legale</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/50">
                            <td className="py-3 pr-4">Traitement et suivi des commandes</td>
                            <td className="py-3">Execution du contrat</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-3 pr-4">Livraison des produits physiques</td>
                            <td className="py-3">Execution du contrat</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-3 pr-4">Acces aux contenus numeriques et abonnements</td>
                            <td className="py-3">Execution du contrat</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-3 pr-4">Gestion du compte client</td>
                            <td className="py-3">Execution du contrat</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-3 pr-4">Communication relative aux commandes</td>
                            <td className="py-3">Execution du contrat</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-3 pr-4">Envoi de newsletters et offres promotionnelles</td>
                            <td className="py-3">Consentement</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-3 pr-4">Amelioration du site et de l'experience utilisateur</td>
                            <td className="py-3">Interet legitime</td>
                          </tr>
                          <tr>
                            <td className="py-3 pr-4">Respect des obligations legales et fiscales</td>
                            <td className="py-3">Obligation legale</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 4 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    4. Duree de conservation
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Les donnees personnelles sont conservees pendant les
                      durees suivantes :
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Donnees de compte client :</strong> pendant toute
                        la duree de l'inscription, puis supprimees 3 ans apres
                        la derniere activite sur le compte.
                      </li>
                      <li>
                        <strong>Donnees de commande :</strong> 5 ans a compter de
                        la commande, conformement aux obligations comptables et
                        fiscales.
                      </li>
                      <li>
                        <strong>Donnees de prospection :</strong> 3 ans a compter
                        du dernier contact ou de la derniere interaction.
                      </li>
                      <li>
                        <strong>Cookies et donnees de navigation :</strong> 13 mois
                        maximum conformement aux recommandations de la CNIL.
                      </li>
                    </ul>
                    <p>
                      A l'expiration de ces delais, les donnees sont supprimees
                      ou anonymisees de maniere irreversible.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 5 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    5. Destinataires des donnees
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Les donnees personnelles peuvent etre communiquees aux
                      destinataires suivants, dans la stricte mesure necessaire
                      a l'execution des finalites decrites ci-dessus :
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Prestataires de paiement :</strong> Stripe et
                        PayPal, pour le traitement securise des transactions
                        financieres.
                      </li>
                      <li>
                        <strong>Services postaux et transporteurs :</strong> pour
                        la livraison des commandes physiques en Israel, France
                        et Canada.
                      </li>
                      <li>
                        <strong>Hebergeur :</strong> Vercel Inc., pour
                        l'hebergement du site et des donnees.
                      </li>
                      <li>
                        <strong>Outils d'analyse :</strong> services d'analyse
                        web anonymises pour l'amelioration du site.
                      </li>
                    </ul>
                    <p>
                      Nous ne vendons, ne louons ni ne cedons vos donnees
                      personnelles a des tiers a des fins commerciales. Les
                      donnees ne sont jamais transmises en dehors des finalites
                      indiquees ci-dessus.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 6 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    6. Transferts internationaux
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Certaines donnees peuvent etre transferees vers des pays
                      situes hors de l'Union europeenne (notamment Israel et
                      les Etats-Unis pour nos prestataires techniques). Ces
                      transferts sont encadres par :
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Des decisions d'adequation de la Commission europeenne
                        (Israel beneficie d'une decision d'adequation)
                      </li>
                      <li>
                        Des clauses contractuelles types approuvees par la
                        Commission europeenne
                      </li>
                      <li>
                        Le respect du EU-US Data Privacy Framework pour les
                        prestataires americains certifies
                      </li>
                    </ul>
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
                      Le site utilise des cookies et technologies similaires.
                      Un cookie est un petit fichier texte depose sur votre
                      terminal (ordinateur, tablette, smartphone) lors de la
                      visite d'un site web.
                    </p>

                    <div className="bg-breslev-cream/50 rounded-lg p-6 space-y-4">
                      <h3 className="font-bold text-breslev-blue">
                        Types de cookies utilises
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-breslev-blue">Cookies strictement necessaires</p>
                          <p className="text-sm">
                            Indispensables au fonctionnement du site : session
                            utilisateur, panier d'achat, preferences de langue.
                            Ces cookies ne necessitent pas de consentement.
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-breslev-blue">Cookies de performance et d'analyse</p>
                          <p className="text-sm">
                            Permettent de mesurer la frequentation du site, de
                            comprendre comment les visiteurs l'utilisent et
                            d'ameliorer son fonctionnement. Ces cookies sont
                            soumis a votre consentement.
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-breslev-blue">Cookies de preference</p>
                          <p className="text-sm">
                            Permettent de memoriser vos choix (langue, region,
                            mode d'affichage) pour personnaliser votre
                            experience.
                          </p>
                        </div>
                      </div>
                    </div>

                    <p>
                      <strong>Gestion des cookies :</strong> vous pouvez a tout
                      moment modifier vos preferences en matiere de cookies via
                      les parametres de votre navigateur. La desactivation de
                      certains cookies peut affecter votre experience de
                      navigation et limiter certaines fonctionnalites du site.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 8 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    8. Vos droits
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Conformement au RGPD et a la loi Informatique et Libertes,
                      vous disposez des droits suivants concernant vos donnees
                      personnelles :
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-breslev-cream/50 rounded-lg p-4">
                        <h4 className="font-bold text-breslev-blue mb-2">Droit d'acces</h4>
                        <p className="text-sm">
                          Obtenir la confirmation que vos donnees sont traitees
                          et en recevoir une copie.
                        </p>
                      </div>
                      <div className="bg-breslev-cream/50 rounded-lg p-4">
                        <h4 className="font-bold text-breslev-blue mb-2">Droit de rectification</h4>
                        <p className="text-sm">
                          Faire corriger vos donnees personnelles si elles sont
                          inexactes ou incompletes.
                        </p>
                      </div>
                      <div className="bg-breslev-cream/50 rounded-lg p-4">
                        <h4 className="font-bold text-breslev-blue mb-2">Droit a l'effacement</h4>
                        <p className="text-sm">
                          Demander la suppression de vos donnees personnelles,
                          sous reserve des obligations legales de conservation.
                        </p>
                      </div>
                      <div className="bg-breslev-cream/50 rounded-lg p-4">
                        <h4 className="font-bold text-breslev-blue mb-2">Droit a la limitation</h4>
                        <p className="text-sm">
                          Demander la limitation du traitement de vos donnees
                          dans certaines circonstances prevues par le RGPD.
                        </p>
                      </div>
                      <div className="bg-breslev-cream/50 rounded-lg p-4">
                        <h4 className="font-bold text-breslev-blue mb-2">Droit a la portabilite</h4>
                        <p className="text-sm">
                          Recevoir vos donnees dans un format structure et
                          lisible, et les transmettre a un autre responsable.
                        </p>
                      </div>
                      <div className="bg-breslev-cream/50 rounded-lg p-4">
                        <h4 className="font-bold text-breslev-blue mb-2">Droit d'opposition</h4>
                        <p className="text-sm">
                          Vous opposer au traitement de vos donnees pour des
                          motifs legitimes, ou a la prospection commerciale.
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-900 space-y-3">
                      <h4 className="font-bold text-breslev-blue">
                        Comment exercer vos droits
                      </h4>
                      <p>
                        Pour exercer l'un de ces droits, adressez votre demande
                        par email a{" "}
                        <a href="mailto:contact@breslev.fr" className="text-breslev-gold hover:underline font-medium">
                          contact@breslev.fr
                        </a>{" "}
                        en precisant votre identite (nom, prenom, email du
                        compte) et le droit que vous souhaitez exercer.
                      </p>
                      <p>
                        Nous nous engageons a repondre a votre demande dans un
                        delai maximum de <strong>30 jours</strong> a compter de
                        sa reception. Ce delai peut etre prolonge de deux mois
                        supplementaires en cas de demande complexe, auquel cas
                        vous serez informe dans le delai initial.
                      </p>
                    </div>

                    <p>
                      En cas de difficulte dans l'exercice de vos droits, vous
                      pouvez introduire une reclamation aupres de la Commission
                      Nationale de l'Informatique et des Libertes (CNIL) :{" "}
                      <a
                        href="https://www.cnil.fr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-breslev-gold hover:underline"
                      >
                        www.cnil.fr
                      </a>
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 9 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    9. Securite des donnees
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Nous mettons en oeuvre les mesures techniques et
                      organisationnelles appropriees pour proteger vos donnees
                      personnelles contre tout acces non autorise, perte,
                      alteration ou divulgation :
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Chiffrement SSL/TLS :</strong> toutes les
                        communications entre votre navigateur et notre site sont
                        chiffrees.
                      </li>
                      <li>
                        <strong>Paiements securises :</strong> les donnees
                        bancaires sont traitees directement par Stripe et PayPal
                        et ne transitent jamais par nos serveurs.
                      </li>
                      <li>
                        <strong>Mots de passe :</strong> les mots de passe sont
                        stockes sous forme hachee et ne sont jamais accessibles
                        en clair.
                      </li>
                      <li>
                        <strong>Acces restreint :</strong> l'acces aux donnees
                        personnelles est limite aux personnes habilitees qui en
                        ont besoin dans le cadre de leurs fonctions.
                      </li>
                    </ul>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 10 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    10. Mineurs
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Le site n'est pas destine aux mineurs de moins de 16 ans.
                      Nous ne collectons pas intentionnellement de donnees
                      personnelles de mineurs. Si nous decouvrons qu'un mineur
                      nous a fourni des donnees personnelles sans
                      l'autorisation de ses parents ou tuteurs, nous
                      supprimerons ces donnees dans les meilleurs delais.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 11 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    11. Modifications de la politique
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Nous nous reservons le droit de modifier la presente
                      Politique de Confidentialite a tout moment. Toute
                      modification sera publiee sur cette page avec une date de
                      mise a jour actualisee.
                    </p>
                    <p>
                      En cas de modification substantielle, nous vous en
                      informerons par email ou par un avis visible sur le site.
                      Nous vous encourageons a consulter cette page
                      regulierement.
                    </p>
                  </div>
                </section>

                <hr className="border-border" />

                {/* Section 12 */}
                <section>
                  <h2 className="text-2xl font-bold text-breslev-blue mb-4">
                    12. Contact
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>
                      Pour toute question relative a la protection de vos
                      donnees personnelles ou pour exercer vos droits, vous
                      pouvez nous contacter :
                    </p>
                    <ul className="list-none space-y-1 bg-breslev-cream/50 rounded-lg p-4">
                      <li><strong>Par email :</strong>{" "}
                        <a href="mailto:contact@breslev.fr" className="text-breslev-gold hover:underline">
                          contact@breslev.fr
                        </a>
                      </li>
                      <li><strong>Par telephone :</strong>{" "}
                        <a href="tel:+972585148500" className="text-breslev-gold hover:underline">
                          +972 58-514-8500
                        </a>
                      </li>
                      <li><strong>Par courrier :</strong> Esther Ifrah, Israel</li>
                    </ul>
                    <p>
                      Vous pouvez egalement consulter nos{" "}
                      <Link href="/cgv">
                        <a className="text-breslev-gold hover:underline font-medium">
                          Conditions Generales de Vente
                        </a>
                      </Link>{" "}
                      et nos{" "}
                      <Link href="/mentions-legales">
                        <a className="text-breslev-gold hover:underline font-medium">
                          Mentions Legales
                        </a>
                      </Link>{" "}
                      pour plus d'informations.
                    </p>
                  </div>
                </section>

                {/* Last updated */}
                <div className="text-center pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Derniere mise a jour : 1er janvier 2026
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
