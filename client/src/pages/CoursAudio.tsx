import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { trpc } from "@/lib/trpc";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Headphones, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";

const RUBRIQUES = [
  { id: "ALL", label: "Tous les cours" },
  { id: "LM", label: "Likoutey Moharane" },
  { id: "HK", label: "Halakha & Cacheroute" },
  { id: "MI", label: "Midot" },
  { id: "VB", label: "La Vie d'un Breslever" },
];

export default function CoursAudio() {
  const { isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState("ALL");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const saveProgressMutation = trpc.audioLessons.saveProgress.useMutation();
  const { data: userProgress } = trpc.audioLessons.getProgress.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: lessons, isLoading } = trpc.audioLessons.getByRubrique.useQuery({
    rubrique: selectedTab !== "ALL" ? (selectedTab as any) : undefined,
  });

  const playingLesson = lessons?.find((l) => l.id === playingId);

  // Returns true if lesson was completed by this user
  const isCompleted = useCallback((lessonId: number) => {
    return userProgress?.some(p => p.lessonId === lessonId && p.completed) ?? false;
  }, [userProgress]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      if (playingId && isAuthenticated) {
        saveProgressMutation.mutate({ lessonId: playingId, positionSec: 0, completed: true });
      }
      setPlayingId(null);
    };

    // Save position every 15 seconds while playing
    const saveInterval = setInterval(() => {
      if (audio && !audio.paused && playingId && isAuthenticated && audio.currentTime > 5) {
        const completed = audio.duration > 0 && (audio.currentTime / audio.duration) > 0.9;
        saveProgressMutation.mutate({
          lessonId: playingId,
          positionSec: Math.floor(audio.currentTime),
          completed,
        });
      }
    }, 15000);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      clearInterval(saveInterval);
    };
  }, [playingLesson, playingId, isAuthenticated]);

  const togglePlay = (lessonId: number, url: string) => {
    if (playingId === lessonId) {
      if (audioRef.current) {
        // Save position on pause
        if (isAuthenticated) {
          saveProgressMutation.mutate({
            lessonId,
            positionSec: Math.floor(audioRef.current.currentTime),
            completed: false,
          });
        }
        audioRef.current.pause();
        setPlayingId(null);
      }
    } else {
      setPlayingId(lessonId);
      setProgress(0);
      // audio will auto-play since it's re-rendered with new src and autoPlay
    }
  };

  const formatDuration = (seconds?: number | null) => {
    if (!seconds) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-breslev-cream">
      <Helmet>
        <title>Cours Audio — Enseignements d'Esther Ifrah | breslev.fr</title>
        <meta name="description" content="Écoutez les cours audio d'Esther Ifrah : Likoutey Moharane, Halakha & Cacheroute, Midot, La vie d'un Breslever. 40+ enseignements authentiques de Rabbi Nachman." />
        <meta property="og:title" content="Cours Audio Breslev — Esther Ifrah" />
        <meta property="og:description" content="40+ cours audio gratuits sur les enseignements de Rabbi Nachman : Likoutey Moharane, Midot, Halakha et plus." />
        <meta property="og:url" content="https://breslev.fr/cours-audio" />
      </Helmet>
      <Header />
      
      <main className="flex-1 pb-24">
        {/* Compact Hero */}
        <section className="bg-breslev-blue py-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-breslev-gold/10 rounded-full blur-[80px]" />
          <div className="container relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-cinzel">
              Cours Audio <span className="text-breslev-gold">d'Esther Ifrah</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-cormorant">
              Écoutez, méditez et élevez-vous chaque jour avec les enseignements authentiques de Rabbi Nachman.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="container py-8">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {RUBRIQUES.map((tab) => (
              <Button
                key={tab.id}
                variant={selectedTab === tab.id ? "default" : "outline"}
                className={
                  selectedTab === tab.id
                    ? "bg-breslev-gold text-breslev-blue hover:bg-breslev-gold/90"
                    : "border-breslev-gold/30 text-breslev-blue hover:bg-breslev-gold/10"
                }
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl h-48 animate-pulse shadow-sm" />
              ))}
            </div>
          ) : lessons?.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-breslev-gold/10">
              <Headphones className="w-12 h-12 text-breslev-gold/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-breslev-blue mb-2">Aucun cours disponible</h3>
              <p className="text-muted-foreground">Revenez bientôt pour de nouveaux enseignements.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons?.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-breslev-gold/20 hover:shadow-md transition-shadow flex flex-col relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold px-2 py-1 bg-breslev-gold/10 text-breslev-gold rounded uppercase">
                      {RUBRIQUES.find(r => r.id === lesson.rubrique)?.label || lesson.rubrique}
                    </span>
                    {isCompleted(lesson.id) && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" aria-label="Cours écouté" />
                    )}
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(lesson.publishDate || "").toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-breslev-blue mb-2 line-clamp-2">
                    {lesson.titleFr}
                  </h3>
                  
                  {lesson.descriptionFr && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                      {lesson.descriptionFr}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-sm font-semibold text-breslev-blue flex items-center gap-1">
                      <Headphones className="w-4 h-4 text-breslev-gold" />
                      {formatDuration(lesson.duration)}
                    </span>
                    
                    <button
                      onClick={() => togglePlay(lesson.id, lesson.audioUrl)}
                      className="w-10 h-10 rounded-full bg-breslev-blue text-white flex items-center justify-center hover:bg-breslev-gold hover:text-breslev-blue transition-colors shadow-sm cursor-pointer z-10"
                    >
                      {playingId === lesson.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Sticky Player */}
        {playingLesson && (
          <div className="fixed bottom-0 md:bottom-2 left-0 right-0 z-50 px-0 md:px-4 pointer-events-none">
            <div className="container pointer-events-auto">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#1a2332] text-white rounded-t-xl md:rounded-xl shadow-2xl border-t md:border border-breslev-gold/30 p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-breslev-gold rounded-full flex items-center justify-center flex-shrink-0 text-breslev-blue">
                  <Headphones className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm md:text-base truncate">{playingLesson.titleFr}</h4>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 relative overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      if (!audioRef.current || !audioRef.current.duration) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = (e.clientX - rect.left) / rect.width;
                      audioRef.current.currentTime = pct * audioRef.current.duration;
                    }}
                  >
                    <div className="h-full bg-breslev-gold absolute left-0 top-0 transition-all duration-100" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => togglePlay(playingLesson.id, playingLesson.audioUrl)}
                    className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {playingId === playingLesson.id && audioRef.current && !audioRef.current.paused ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </button>
                </div>
                
                <audio 
                  ref={audioRef} 
                  src={playingLesson.audioUrl} 
                  autoPlay 
                  onPlay={() => {}} 
                  onPause={() => {}}
                />
              </motion.div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
