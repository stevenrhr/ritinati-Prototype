"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AudioPlayer() {
  const t = useTranslations("Music");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Free/Creative Commons traditional gamelan audio from internet archives
  const audioUrl = "https://archive.org/download/lp_javanese-court-gamelan-from-the-pura-paku_krt-wasitodipuro/disc1/01.%20Ketawang%20PuspaWarna%20-%20K.R.T.%20Wasitodipuro.mp3";

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio play blocked by browser autoplay policy:", err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-24 left-6 z-50 flex items-center gap-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-accent-gold/40 shadow-lg transition-transform hover:scale-105">
      <audio ref={audioRef} src={audioUrl} loop />
      <button
        onClick={togglePlay}
        className="flex items-center justify-center p-2 rounded-full bg-accent-blue text-white hover:bg-accent-blue/95 transition-all shadow-md cursor-pointer"
        aria-label={isPlaying ? t("pause") : t("play")}
      >
        {isPlaying ? (
          <Volume2 className="h-4 w-4 text-accent-gold" />
        ) : (
          <VolumeX className="h-4 w-4 text-gray-300" />
        )}
      </button>
      <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 pr-1.5 select-none">
        <Music className={`h-3.5 w-3.5 ${isPlaying ? "animate-bounce text-accent-gold" : "text-gray-400"}`} />
        <span className="max-w-[150px] truncate">
          {isPlaying ? t("nowPlaying") : t("play")}
        </span>
      </div>
    </div>
  );
}
