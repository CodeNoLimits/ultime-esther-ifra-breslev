import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize,
  Shield,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Barre de contrôle */}
      <Card className="p-4 glass-card-v2 border-breslev-gold/30">
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
            <span className="text-sm font-medium w-16 text-center">
              {zoom}%
            </span>
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
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="hover:bg-breslev-gold/20 text-white transition-colors border-white/20"
            >
              <Maximize className="h-4 w-4 mr-2" />
              Plein écran
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="opacity-50 border-white/20 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mt-5">
          <div className="w-full bg-breslev-cream/50 overflow-hidden rounded-full h-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-gradient-to-r from-[#d4a843] to-[#b58c30] h-[shadow-sm] h-full rounded-full shadow-[0_0_10px_rgba(212,168,67,0.5)]"
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center uppercase tracking-widest font-semibold">
            Progression: {progressPercent.toFixed(0)}%
          </p>
        </div>
      </Card>

      {/* Visionneuse PDF */}
      <Card
        ref={containerRef}
        className="relative overflow-hidden bg-[#0A0F18] border border-white/5 shadow-inner"
        style={{ minHeight: "650px" }}
      >
        {/* Zone de visualisation du PDF */}
        <div className="flex items-center justify-center p-8 relative min-h-full">
          {/* Watermark en arrière-plan */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 select-none">
            <div
              className="text-breslev-gold font-bold text-5xl md:text-7xl transform -rotate-45"
              style={{
                textShadow: "4px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              {watermarkText}
            </div>
          </div>

          {/* Contenu PDF (simulation) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0b111a] shadow-[0_0_50px_rgba(212,168,67,0.15)] relative rounded-sm border border-[#d4a843]/20"
              style={{
                width: `${zoom}%`,
                maxWidth: "850px",
                aspectRatio: "210/297", // Format A4
              }}
            >
              {/* Watermark visible sur chaque page */}
              <div className="absolute top-6 right-6 text-xs text-[#d4a843]/40 tracking-wider select-none font-serif">
                {watermarkText}
              </div>

              {/* Contenu de la page : Iframe affichant le vrai PDF */}
              <div className="h-full w-full relative z-10 p-2">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-0 rounded-sm"
                  title={`Lecteur PDF - ${bookTitle}`}
                  style={{ pointerEvents: "auto" }}
                />
              </div>

              {/* Watermark en bas de page */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-[#d4a843]/40 tracking-widest select-none font-sans uppercase">
                © Esther Ifrah — {watermarkText}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overlay pour désactiver le clic droit */}
        <div
          className="absolute inset-0 pointer-events-none"
          onContextMenu={e => e.preventDefault()}
          style={{ userSelect: "none" }}
        />
      </Card>

      {/* Informations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-5 glass-card-v2 border-breslev-gold/20">
          <div className="flex gap-4">
            <Shield className="h-6 w-6 text-[#d4a843] flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(212,168,67,0.5)]" />
            <div className="text-sm text-breslev-blue/80">
              <p className="font-semibold mb-1 text-breslev-blue">
                Sceau de Qualité et Protection
              </p>
              <p className="leading-relaxed">
                Ce texte est protégé par notre système propriétaire de
                watermarking. Votre empreinte digitale ({watermarkText}) scelle
                ce document pour prévenir toute distribution non autorisée,
                garantissant la pérennité de l'œuvre authentique d'Esther Ifrah.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
