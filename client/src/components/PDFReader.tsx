import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Maximize,
  Shield,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// pdfjs-dist v5 ESM imports
import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { PageFlip } from "page-flip";

// Set worker path for pdfjs-dist v5
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PDFReaderProps {
  pdfUrl: string;
  bookTitle: string;
  bookId: number;
  onProgressUpdate?: (currentPage: number, totalPages: number) => void;
}

const PAGE_WIDTH = 420;
const PAGE_HEIGHT = 594; // A4 ratio

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const flipBookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const pdfDocRef = useRef<PDFDocumentProxy | null>(null);

  const watermarkText = user?.name || user?.email || "Utilisateur Breslev";

  // Render a single PDF page to a canvas element
  const renderPageToCanvas = useCallback(
    async (pageNum: number, canvas: HTMLCanvasElement) => {
      const pdfDoc = pdfDocRef.current;
      if (!pdfDoc || pageNum < 1 || pageNum > pdfDoc.numPages) return;

      try {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1 });
        const scale = PAGE_WIDTH / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        await page.render({
          canvasContext: ctx,
          viewport: scaledViewport,
        }).promise;

        // Draw watermark
        ctx.save();
        ctx.globalAlpha = 0.06;
        ctx.font = "24px serif";
        ctx.fillStyle = "#d4a843";
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 6);
        ctx.textAlign = "center";
        ctx.fillText(watermarkText, 0, 0);
        ctx.restore();

        // Draw page footer watermark
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.font = "9px sans-serif";
        ctx.fillStyle = "#d4a843";
        ctx.textAlign = "center";
        ctx.fillText(
          `\u00A9 Esther Ifrah \u2014 ${watermarkText}`,
          canvas.width / 2,
          canvas.height - 10,
        );
        ctx.restore();
      } catch {
        // Page render failed silently
      }
    },
    [watermarkText],
  );

  // Load PDF document
  useEffect(() => {
    if (!pdfUrl) {
      setError("Aucune URL de PDF fournie");
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function loadPdf() {
      try {
        setIsLoading(true);
        setError(null);

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdfDoc = await loadingTask.promise;

        if (cancelled) {
          pdfDoc.destroy();
          return;
        }

        pdfDocRef.current = pdfDoc;
        setTotalPages(pdfDoc.numPages);
        setIsLoading(false);
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || "Erreur lors du chargement du PDF");
          setIsLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  // Initialize PageFlip once PDF is loaded
  useEffect(() => {
    if (isLoading || !totalPages || !flipBookRef.current) return;

    const flipBookEl = flipBookRef.current;

    // Create page elements (divs with canvases)
    flipBookEl.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const pageDiv = document.createElement("div");
      pageDiv.className = "pdf-page-flip";
      pageDiv.setAttribute("data-page", String(i));

      const canvas = document.createElement("canvas");
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      pageDiv.appendChild(canvas);

      flipBookEl.appendChild(pageDiv);
    }

    // Initialize page-flip
    const pageFlip = new PageFlip(flipBookEl, {
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      size: "stretch",
      minWidth: 280,
      maxWidth: 600,
      minHeight: 400,
      maxHeight: 900,
      showCover: true,
      maxShadowOpacity: 0.3,
      mobileScrollSupport: true,
      useMouseEvents: true,
      flippingTime: 800,
      usePortrait: true,
      autoSize: true,
    });

    pageFlip.loadFromHTML(flipBookEl.querySelectorAll(".pdf-page-flip"));
    pageFlipRef.current = pageFlip;

    // Render visible pages initially
    const renderVisible = async () => {
      const current = pageFlip.getCurrentPageIndex();
      // Render current spread and a couple ahead
      for (let offset = 0; offset < 4 && current + offset < totalPages; offset++) {
        const pageNum = current + offset + 1;
        const pageEl = flipBookEl.querySelector(
          `[data-page="${pageNum}"]`,
        ) as HTMLElement | null;
        const canvas = pageEl?.querySelector("canvas");
        if (canvas && !canvas.getAttribute("data-rendered")) {
          await renderPageToCanvas(pageNum, canvas);
          canvas.setAttribute("data-rendered", "1");
        }
      }
    };

    renderVisible();

    // On flip, render newly visible pages and update state
    pageFlip.on("flip", (e: any) => {
      const pageIndex = e.data as number;
      setCurrentPage(pageIndex + 1);

      // Pre-render nearby pages
      const nearby = [pageIndex - 1, pageIndex, pageIndex + 1, pageIndex + 2, pageIndex + 3];
      for (const idx of nearby) {
        if (idx >= 0 && idx < totalPages) {
          const pageEl = flipBookEl.querySelector(
            `[data-page="${idx + 1}"]`,
          ) as HTMLElement | null;
          const canvas = pageEl?.querySelector("canvas");
          if (canvas && !canvas.getAttribute("data-rendered")) {
            renderPageToCanvas(idx + 1, canvas);
            canvas.setAttribute("data-rendered", "1");
          }
        }
      }
    });

    return () => {
      pageFlip.destroy();
      pageFlipRef.current = null;
    };
  }, [isLoading, totalPages, renderPageToCanvas]);

  // Notify parent of progress
  useEffect(() => {
    if (onProgressUpdate && totalPages > 0) {
      onProgressUpdate(currentPage, totalPages);
    }
  }, [currentPage, totalPages, onProgressUpdate]);

  const handlePrevPage = () => {
    pageFlipRef.current?.flipPrev();
  };

  const handleNextPage = () => {
    pageFlipRef.current?.flipNext();
  };

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 25);
  };

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 25);
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

  const progressPercent =
    totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className="space-y-6"
    >
      {/* Control bar */}
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
              Page {currentPage} / {totalPages || "..."}
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
              Plein ecran
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="opacity-50 border-white/20 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Telecharger
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="w-full bg-breslev-cream/50 overflow-hidden rounded-full h-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" as const }}
              className="bg-gradient-to-r from-[#d4a843] to-[#b58c30] h-full rounded-full shadow-[0_0_10px_rgba(212,168,67,0.5)]"
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center uppercase tracking-widest font-semibold">
            Progression: {progressPercent.toFixed(0)}%
          </p>
        </div>
      </Card>

      {/* PDF Viewer with PageFlip */}
      <Card
        ref={containerRef}
        className="relative overflow-hidden bg-[#0A0F18] border border-white/5 shadow-inner"
        style={{ minHeight: "650px" }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Background watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 select-none z-0">
          <div
            className="text-breslev-gold font-bold text-5xl md:text-7xl transform -rotate-45"
            style={{ textShadow: "4px 4px 10px rgba(0,0,0,0.1)" }}
          >
            {watermarkText}
          </div>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center">
              <Loader2 className="h-10 w-10 animate-spin text-breslev-gold mx-auto mb-3" />
              <p className="text-white/60 text-sm">Chargement du livre...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center p-8">
              <p className="text-red-400 mb-2">Erreur de chargement</p>
              <p className="text-white/40 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* StPageFlip container */}
        <div
          className="flex items-center justify-center p-4 md:p-8 relative min-h-[600px] z-10"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "center center",
            transition: "transform 0.3s ease",
          }}
        >
          <div
            ref={flipBookRef}
            className="stf__parent"
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          />
        </div>
      </Card>

      {/* Info card */}
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
                Sceau de Qualite et Protection
              </p>
              <p className="leading-relaxed">
                Ce texte est protege par notre systeme proprietaire de
                watermarking. Votre empreinte digitale ({watermarkText}) scelle
                ce document pour prevenir toute distribution non autorisee,
                garantissant la perennite de l'oeuvre authentique d'Esther Ifrah.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
