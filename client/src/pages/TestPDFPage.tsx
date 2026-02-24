import { useAuth } from "@/_core/hooks/useAuth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PDFReader from "@/components/PDFReader";

export default function TestPDFPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#0b111a]">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-cinzel font-bold text-white mb-4 text-glow-gold">
              Preview: Lecteur PDF V2
            </h1>
            <p className="text-[#d4a843]/80 font-cormorant text-xl">
              Voici à quoi ressemblera l'expérience de lecture "Gan Eden
              Premium" pour vos abonnés.
            </p>
          </div>

          {/* L'invité verra un watermark par défaut, un utilisateur connecté verra son nom */}
          <PDFReader
            pdfUrl="/pdfs/LikouteyMoharane1.pdf"
            bookTitle="Likoutey Moharane - Tome 1"
            bookId={1}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
