import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Download,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

interface PDFReaderProps {
  pdfUrl: string;
  bookTitle: string;
  bookId: number;
  onProgressUpdate?: (currentPage: number, totalPages: number) => void;
}

export default function PDFReader({
  pdfUrl,
  bookTitle,
  bookId,
  onProgressUpdate,
}: PDFReaderProps) {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Watermark avec le nom de l'utilisateur
  const watermarkText = user?.name || user?.email || "Utilisateur Breslev";

  useEffect(() => {
    // Simuler le chargement du PDF (dans une vraie implémentation, utiliser pdf.js)
    setTotalPages(150); // Exemple
  }, [pdfUrl]);

  useEffect(() => {
    // Mettre à jour la progression de lecture
    if (onProgressUpdate && totalPages > 0) {
      onProgressUpdate(currentPage, totalPages);
    }
  }, [currentPage, totalPages, onProgressUpdate]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(zoom + 25);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 50) {
      setZoom(zoom - 25);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const progressPercent = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Barre de contrôle */}
      <Card className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-4">
              Page {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-16 text-center">{zoom}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              <Maximize className="h-4 w-4 mr-2" />
              Plein écran
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mt-4">
          <div className="w-full bg-breslev-cream rounded-full h-2">
            <div
              className="bg-breslev-gold h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-center">
            Progression: {progressPercent.toFixed(0)}%
          </p>
        </div>
      </Card>

      {/* Visionneuse PDF */}
      <Card
        ref={containerRef}
        className="relative overflow-hidden bg-gray-100 dark:bg-gray-900"
        style={{ minHeight: "600px" }}
      >
        {/* Zone de visualisation du PDF */}
        <div className="flex items-center justify-center p-8 relative">
          {/* Watermark en arrière-plan */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 select-none">
            <div
              className="text-breslev-gold font-bold text-4xl transform -rotate-45"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {watermarkText}
            </div>
          </div>

          {/* Contenu PDF (simulation) */}
          <div
            className="bg-white shadow-2xl relative"
            style={{
              width: `${zoom}%`,
              maxWidth: "800px",
              aspectRatio: "210/297", // Format A4
            }}
          >
            {/* Watermark visible sur chaque page */}
            <div className="absolute top-4 right-4 text-xs text-gray-400 opacity-50 select-none">
              {watermarkText}
            </div>

            {/* Contenu de la page */}
            <div className="p-12">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-8 w-8 text-breslev-gold" />
                <h2 className="text-2xl font-serif font-bold text-breslev-blue">
                  {bookTitle}
                </h2>
              </div>

              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Ceci est une simulation du lecteur PDF sécurisé. Dans l'implémentation finale,
                  le contenu réel du PDF sera affiché ici avec la bibliothèque PDF.js.
                </p>

                <p className="leading-relaxed">
                  Le watermarking personnalisé avec le nom de l'utilisateur ({watermarkText})
                  apparaît en filigrane sur chaque page pour protéger le contenu contre
                  la distribution non autorisée.
                </p>

                <div className="mt-8 p-4 bg-breslev-cream/30 rounded-lg">
                  <h3 className="font-bold mb-2 text-breslev-blue">
                    Fonctionnalités de protection :
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Watermarking personnalisé avec nom de l'utilisateur</li>
                    <li>Désactivation du clic droit et de la sélection</li>
                    <li>Téléchargement contrôlé (uniquement pour propriétaires)</li>
                    <li>Suivi de la progression de lecture</li>
                    <li>Lecture en ligne uniquement (pas de copie locale)</li>
                  </ul>
                </div>

                <p className="text-sm text-muted-foreground italic mt-6">
                  Page {currentPage} sur {totalPages}
                </p>
              </div>
            </div>

            {/* Watermark en bas de page */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-50 select-none">
              © Esther Ifrah - {watermarkText}
            </div>
          </div>
        </div>

        {/* Overlay pour désactiver le clic droit */}
        <div
          className="absolute inset-0 pointer-events-none"
          onContextMenu={(e) => e.preventDefault()}
          style={{ userSelect: "none" }}
        />
      </Card>

      {/* Informations */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950/20">
        <div className="flex gap-3">
          <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-1">Lecture protégée</p>
            <p>
              Ce livre est protégé par watermarking personnalisé. Votre nom apparaît sur chaque
              page pour empêcher la distribution non autorisée. La progression de votre lecture
              est automatiquement sauvegardée.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
