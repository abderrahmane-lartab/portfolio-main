import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";
import { abderrahmaneProfile } from "@/data/abderrahmaneProfile";

// Natural audio waveform silhouette heights (22 bars)
const WAVEFORM_BARS = [
  0.28, 0.45, 0.65, 0.42, 0.82, 0.96, 0.62, 0.5, 0.88, 1.0, 0.72,
  0.54, 0.92, 0.78, 0.48, 0.85, 0.68, 0.44, 0.74, 0.56, 0.38, 0.26,
];

const ESTIMATED_SPEECH_DURATION_SEC = 23;

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function pickBestEnglishVoice(voices) {
  if (!voices || voices.length === 0) return null;
  const english = voices.filter((v) => v.lang?.toLowerCase().startsWith("en"));
  if (english.length === 0) return null;

  const preferredKeywords = [
    "natural",
    "neural",
    "google us english",
    "google uk english male",
    "daniel",
    "alex",
    "samantha",
    "guy",
    "aria",
  ];

  for (const kw of preferredKeywords) {
    const match = english.find((v) => v.name?.toLowerCase().includes(kw));
    if (match) return match;
  }

  return english.find((v) => v.lang === "en-US") || english[0];
}

export const VoiceIntro = ({ audioSrc = null }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isLight = theme === "light";

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(ESTIMATED_SPEECH_DURATION_SEC);
  const [showTranscript, setShowTranscript] = useState(false);
  const [hasAudioFile, setHasAudioFile] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const audioRef = useRef(null);
  const utteranceRef = useRef(null);
  const timerRef = useRef(null);
  const elapsedRef = useRef(0);

  const script = abderrahmaneProfile.voiceIntroScript;

  // Optional custom audio recording support (pass audioSrc="/sounds/voice-intro.mp3")
  useEffect(() => {
    let active = true;
    if (audioSrc) {
      fetch(audioSrc, { method: "HEAD" })
        .then((res) => {
          if (active && res.ok && res.headers.get("content-type")?.includes("audio")) {
            setHasAudioFile(true);
          }
        })
        .catch(() => {});
    }

    if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
      setSpeechSupported(false);
    }

    return () => {
      active = false;
    };
  }, [audioSrc]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopAllPlayback = useCallback(() => {
    stopTimer();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    elapsedRef.current = 0;
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
    setProgress(0);
  }, [stopTimer]);

  useEffect(() => {
    return () => {
      stopAllPlayback();
    };
  }, [stopAllPlayback]);

  const startSpeechTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      elapsedRef.current += 0.1;
      const nextTime = Math.min(elapsedRef.current, ESTIMATED_SPEECH_DURATION_SEC);
      setCurrentTime(nextTime);
      setProgress(Math.min(nextTime / ESTIMATED_SPEECH_DURATION_SEC, 0.98));
    }, 100);
  }, [stopTimer]);

  const startSpeechSynthesis = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setShowTranscript(true);
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = "en-US";
    utterance.rate = 0.98;
    utterance.pitch = 1.0;

    const voices = synth.getVoices();
    const chosenVoice = pickBestEnglishVoice(voices);
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      startSpeechTimer();
    };

    utterance.onboundary = (event) => {
      if (typeof event.charIndex === "number" && script.length > 0) {
        const ratio = Math.min(event.charIndex / script.length, 0.99);
        elapsedRef.current = ratio * ESTIMATED_SPEECH_DURATION_SEC;
        setCurrentTime(elapsedRef.current);
        setProgress(ratio);
      }
    };

    utterance.onend = () => {
      stopTimer();
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(1);
      setCurrentTime(ESTIMATED_SPEECH_DURATION_SEC);
      setTimeout(() => {
        elapsedRef.current = 0;
        setProgress(0);
        setCurrentTime(0);
      }, 900);
    };

    utterance.onerror = () => {
      stopTimer();
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    setDuration(ESTIMATED_SPEECH_DURATION_SEC);
    synth.speak(utterance);
  }, [script, startSpeechTimer, stopTimer]);

  const handleTogglePlay = () => {
    // Mode 1: Custom MP3 audio recording if present
    if (hasAudioFile && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsPaused(true);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
        setIsPaused(false);
      }
      return;
    }

    // Mode 2: Web Speech API natural English introduction
    if (!speechSupported) {
      setShowTranscript((prev) => !prev);
      return;
    }

    const synth = window.speechSynthesis;

    if (isPlaying) {
      if (synth.speaking && !synth.paused) {
        synth.pause();
      }
      stopTimer();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    if (isPaused && synth.paused) {
      synth.resume();
      setIsPlaying(true);
      setIsPaused(false);
      startSpeechTimer();
      return;
    }

    elapsedRef.current = 0;
    setCurrentTime(0);
    setProgress(0);
    startSpeechSynthesis();
  };

  const handleReplay = () => {
    stopAllPlayback();
    setTimeout(() => {
      if (hasAudioFile && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        startSpeechSynthesis();
      }
    }, 60);
  };

  return (
    <div className="mt-5 w-full max-w-[430px] max-[900px]:mx-auto">
      {hasAudioFile && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onLoadedMetadata={(e) => {
            if (e.currentTarget.duration) {
              setDuration(e.currentTarget.duration);
            }
          }}
          onTimeUpdate={(e) => {
            const cur = e.currentTarget.currentTime;
            const dur = e.currentTarget.duration || ESTIMATED_SPEECH_DURATION_SEC;
            setCurrentTime(cur);
            setProgress(dur ? cur / dur : 0);
          }}
          onEnded={() => {
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(0);
            setCurrentTime(0);
          }}
        />
      )}

      <div
        className={`relative rounded-2xl px-3.5 py-2.5 border backdrop-blur-md transition-all duration-300 ${
          isLight
            ? isPlaying
              ? "bg-white/95 border-[#0c5a84]/35 shadow-[0_8px_24px_rgba(12,90,132,0.12)]"
              : "bg-white/85 border-slate-200/90 shadow-[0_4px_14px_rgba(15,23,42,0.05)] hover:border-slate-300"
            : isPlaying
            ? "bg-[#252830]/95 border-sky-400/40 shadow-[0_8px_24px_rgba(56,189,248,0.14)]"
            : "bg-[#242427]/85 border-white/10 shadow-sm hover:border-white/20"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Play / Pause Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleTogglePlay}
            aria-label={isPlaying ? t("Pause voice introduction") : t("Play voice introduction")}
            className="relative size-10 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-[#0d6795] to-[#084c6e] text-white shadow-[0_4px_12px_rgba(10,92,132,0.3)] cursor-pointer click-sound"
          >
            {isPlaying && (
              <span className="absolute inset-0 rounded-full bg-sky-400/35 animate-ping [animation-duration:2s]" />
            )}
            <span className="relative z-10">
              {isPlaying ? (
                <Pause className="size-4 fill-white" />
              ) : (
                <Play className="size-4 fill-white ml-0.5" />
              )}
            </span>
          </motion.button>

          {/* Waveform & Label */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <Volume2 className="size-3.5 shrink-0 text-[#0c5a84] dark:text-sky-400" />
                <span className="text-xs font-semibold truncate text-[var(--text-dark)]">
                  {t("Voice Introduction")}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                    isLight
                      ? "bg-sky-50 text-[#0c5a84] border border-sky-200/70"
                      : "bg-sky-500/15 text-sky-300 border border-sky-400/20"
                  }`}
                >
                  EN
                </span>
              </div>
              <span
                className={`text-[11px] font-mono tabular-nums shrink-0 ${
                  isLight ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Animated Waveform Bars */}
            <div
              className="flex items-center gap-[3px] h-6"
              aria-hidden="true"
            >
              {WAVEFORM_BARS.map((heightRatio, index) => {
                const barProgress = index / WAVEFORM_BARS.length;
                const isActiveBar = barProgress <= progress;
                const baseHeight = Math.round(heightRatio * 20) + 4;

                return (
                  <motion.span
                    key={index}
                    className={`flex-1 rounded-full transition-colors duration-200 ${
                      isActiveBar || isPlaying
                        ? isActiveBar
                          ? "bg-gradient-to-t from-[#0c5a84] to-sky-400"
                          : isLight
                          ? "bg-sky-300/70"
                          : "bg-sky-400/45"
                        : isLight
                        ? "bg-slate-300/90"
                        : "bg-white/20"
                    }`}
                    animate={
                      isPlaying
                        ? {
                            height: [
                              Math.max(4, baseHeight * 0.45),
                              Math.min(24, baseHeight * 1.15),
                              Math.max(5, baseHeight * 0.65),
                              baseHeight,
                            ],
                          }
                        : { height: Math.max(4, Math.round(baseHeight * 0.68)) }
                    }
                    transition={
                      isPlaying
                        ? {
                            duration: 0.65 + (index % 5) * 0.14,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                            delay: (index % 4) * 0.08,
                          }
                        : { duration: 0.25 }
                    }
                  />
                );
              })}
            </div>
          </div>

          {/* Utility Buttons (Replay + Transcript) */}
          <div className="flex items-center gap-1 shrink-0">
            {(isPlaying || isPaused || progress > 0) && (
              <button
                type="button"
                onClick={handleReplay}
                title={t("Replay")}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  isLight
                    ? "hover:bg-slate-100 text-slate-500"
                    : "hover:bg-white/10 text-slate-400"
                }`}
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowTranscript((prev) => !prev)}
              title={t("Toggle transcript")}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                showTranscript
                  ? isLight
                    ? "bg-sky-100 text-[#0c5a84]"
                    : "bg-sky-500/20 text-sky-300"
                  : isLight
                  ? "hover:bg-slate-100 text-slate-500"
                  : "hover:bg-white/10 text-slate-400"
              }`}
            >
              <FileText className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Collapsible English Transcript */}
        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p
                className={`mt-2.5 pt-2.5 border-t text-xs leading-relaxed text-left ${
                  isLight
                    ? "border-slate-200/80 text-slate-600"
                    : "border-white/10 text-slate-300"
                }`}
              >
                "{script}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
