import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";

export const Preloader = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [isVisible, setIsVisible] = useState(true);
  const [rawProgress, setRawProgress] = useState(0);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let rafId = null;
    let finishTimeout = null;
    let assetsReady = document.readyState === "complete";

    // Preload hero portrait so Hero reveals crisply right behind the curtain
    const heroImg = new Image();
    heroImg.src = "/photos/abc.png";

    const markReady = () => {
      assetsReady = true;
    };

    if (!assetsReady) {
      window.addEventListener("load", markReady, { once: true });
    }
    const safetyTimer = setTimeout(markReady, 1800);

    const startTime = performance.now();
    const minDuration = 1450; // Smooth ~1.45s editorial pace
    let current = 0;

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / minDuration);
      // Cubic ease-in-out curve for organic acceleration & soft landing
      const eased =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const target = assetsReady ? eased * 100 : Math.min(92, eased * 94);
      current += (target - current) * 0.22;

      if (assetsReady && t >= 1 && current > 99.3) {
        setRawProgress(100);
        finishTimeout = setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = prevOverflow;
        }, 180);
        return;
      }

      setRawProgress(current);
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (finishTimeout) clearTimeout(finishTimeout);
      clearTimeout(safetyTimer);
      window.removeEventListener("load", markReady);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const displayCount = String(Math.min(100, Math.round(rawProgress))).padStart(
    3,
    "0"
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="portfolio-preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.78,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6 select-none ${
            isLight ? "bg-[#f4f3ef]" : "bg-[#161619]"
          }`}
        >
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -22,
              transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] },
            }}
            className="flex flex-col items-center text-center max-w-full"
          >
            {/* Editorial Two-Tone Name Reveal */}
            <div className="flex flex-wrap items-baseline justify-center gap-x-[0.28em] gap-y-1 font-extrabold tracking-[-0.035em] text-[clamp(1.85rem,5.6vw,4.65rem)] leading-[1.08]">
              <span className="overflow-hidden inline-block py-1">
                <motion.span
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.68,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block ${
                    isLight ? "text-[#1e2328]" : "text-[#f1f5f9]"
                  }`}
                >
                  Abderrahmane
                </motion.span>
              </span>

              <span className="overflow-hidden inline-block py-1">
                <motion.span
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.68,
                    delay: 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block ${
                    isLight ? "text-[#a6acb3]" : "text-[#64748b]"
                  }`}
                >
                  Lartab
                </motion.span>
              </span>
            </div>

            {/* Minimal Counter + Hairline Progress Bar + Status Label */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4 sm:mt-5 flex items-center justify-center gap-3.5"
            >
              <span
                className={`font-mono text-[11px] sm:text-xs tabular-nums tracking-wider ${
                  isLight ? "text-[#8b9198]" : "text-[#7c8594]"
                }`}
              >
                {displayCount}
              </span>

              <div
                className={`relative w-24 sm:w-28 h-[1.5px] rounded-full overflow-hidden ${
                  isLight ? "bg-black/[0.09]" : "bg-white/[0.12]"
                }`}
              >
                <div
                  className={`h-full w-full origin-left rounded-full will-change-transform ${
                    isLight ? "bg-[#14b8a6]" : "bg-[#2dd4bf]"
                  }`}
                  style={{
                    transform: `scaleX(${Math.min(1, rawProgress / 100)})`,
                  }}
                />
              </div>

              <span
                className={`font-mono text-[11px] sm:text-xs tracking-wide ${
                  isLight ? "text-[#8b9198]" : "text-[#7c8594]"
                }`}
              >
                loading the work
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
