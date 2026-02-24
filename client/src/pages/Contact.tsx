import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    // TODO: Connect to backend API
    alert(
      "Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais."
    );
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f6f3]">
      <Header />

      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-[#1a2332] mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-[#2c3e50] font-cormorant max-w-2xl mx-auto">
              Une question sur nos ouvrages, un problème avec votre commande ou
              simplement besoin d'un conseil spirituel ? Nous sommes à votre
              écoute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div className="space-y-8">
              <Card className="p-8 border-[#d4a843]/30 shadow-md bg-white">
                <h2 className="text-2xl font-cinzel text-[#1a2332] mb-6 font-semibold border-b border-[#d4a843]/20 pb-4">
                  Nos Coordonnées
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1a2332] p-3 rounded-full text-[#d4a843]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a2332]">
                        Téléphone
                      </h3>
                      <p className="text-stone-600 mt-1">
                        +972 54 84 84 484
                        <br />
                        <span className="text-sm italic text-stone-500">
                          (WhatsApp privilégié)
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#1a2332] p-3 rounded-full text-[#d4a843]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a2332]">Email</h3>
                      <p className="text-stone-600 mt-1">
                        contact@esther-breslev.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#1a2332] p-3 rounded-full text-[#d4a843]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a2332]">Adresse</h3>
                      <p className="text-stone-600 mt-1">
                        Jérusalem, Israël
                        <br />
                        <span className="text-sm italic text-stone-500">
                          (Sur rendez-vous uniquement)
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-[#d4a843]/30 shadow-md bg-[#1a2332] text-white">
                <blockquote className="font-cormorant text-xl italic leading-relaxed text-[#d4a843] text-center">
                  "Le principal de tout est la prière. L'homme doit constamment
                  supplier le Maître du monde pour trouver le chemin de la
                  vérité."
                </blockquote>
                <p className="text-center mt-4 font-cinzel text-sm tracking-widest">
                  — Rabbi Nachman de Breslev
                </p>
              </Card>
            </div>

            {/* Formulaire de contact */}
            <Card className="p-8 border-[#d4a843]/30 shadow-md bg-white">
              <h2 className="text-2xl font-cinzel text-[#1a2332] mb-6 font-semibold">
                Envoyer un message
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1a2332]">
                          Nom complet
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Votre nom"
                            className="border-stone-300 focus-visible:ring-[#d4a843]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1a2332]">
                          Adresse email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="votre@email.com"
                            type="email"
                            className="border-stone-300 focus-visible:ring-[#d4a843]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1a2332]">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Comment pouvons-nous vous aider ?"
                            className="min-h-[150px] border-stone-300 focus-visible:ring-[#d4a843] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#d4a843] hover:bg-[#c49a3c] text-white font-bold tracking-wide transition-all"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
