import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Headphones, Pause, Play, SkipBack, SkipForward } from "lucide-react";

type Rubrique = "LM" | "Halakha" | "Midot" | "Vie Breslever";

interface CoursAudio {
  title: string;
  rubrique: Rubrique;
  duration: string;
  audioUrl: string;
}

const RUBRIQUE_COLORS: Record<Rubrique, string> = {
  LM: "bg-breslev-gold/20 text-breslev-gold border-breslev-gold/30",
  Halakha: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Midot: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Vie Breslever": "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

// Placeholder — will be replaced by a real API call
const DAILY_COURS: CoursAudio = {
  title: "Likoutey Moharane Torah 282 - La joie véritable",
  rubrique: "LM",
  duration: "12:34",
  audioUrl: "",
};

export default function CoursAudioDuJour() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const cours = DAILY_COURS;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * duration;
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className="p-6 glass-card-v2 border-breslev-gold/30 overflow-hidden relative">
      {/* Hidden audio element */}
      {cours.audioUrl && (
        <audio ref={audioRef} src={cours.audioUrl} preload="metadata" />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-breslev-gold/20 border border-breslev-gold/30">
          <Headphones className="h-5 w-5 text-breslev-gold" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-cinzel">
            Cours du Jour
          </h3>
          <p className="text-xs text-white/50 uppercase tracking-wider">
            Audio quotidien
          </p>
        </div>
        <Badge
          variant="outline"
          className={`ml-auto ${RUBRIQUE_COLORS[cours.rubrique]}`}
        >
          {cours.rubrique}
        </Badge>
      </div>

      {/* Title */}
      <p className="text-white/80 font-cormorant text-lg mb-5 leading-relaxed">
        {cours.title}
      </p>

      {/* Progress bar */}
      <div
        className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer mb-3 group"
        onClick={seek}
      >
        <div
          className="h-full bg-gradient-to-r from-breslev-gold to-breslev-gold/70 rounded-full transition-all relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-breslev-gold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Time + Controls */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40 tabular-nums">
          {formatTime(currentTime)}
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white h-8 w-8 p-0"
            onClick={() => skip(-15)}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            className="bg-breslev-gold hover:bg-breslev-gold/80 text-breslev-blue h-10 w-10 rounded-full p-0"
            onClick={togglePlay}
            disabled={!cours.audioUrl}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white h-8 w-8 p-0"
            onClick={() => skip(15)}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <span className="text-xs text-white/40 tabular-nums">
          {duration > 0 ? formatTime(duration) : cours.duration}
        </span>
      </div>

      {!cours.audioUrl && (
        <p className="text-center text-xs text-white/30 mt-3">
          Audio bientot disponible
        </p>
      )}
    </Card>
  );
}
