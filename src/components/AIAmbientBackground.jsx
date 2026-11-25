import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

/**
 * Interactive mouse-following neural constellation canvas (Codrops / YouCode style):
 * Reveals a delicate geometric web of nearest-neighbor nodes & connecting lines
 * dynamically around the user's cursor while keeping the rest of the page clean.
 */
const MouseConstellationCanvas = ({ isLight }) => {
  const canvasRef = useRef(null);
  const themeRef = useRef(isLight);
  themeRef.current = isLight;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let points = [];

    const mouse = {
      x: width * 0.72,
      y: height * 0.75,
      smoothX: width * 0.72,
      smoothY: height * 0.75,
      active: false,
      presence: 0,
    };

    const getDistSq = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return dx * dx + dy * dy;
    };

    const buildGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Balanced cell size (~65px-80px) for clean geometric triangles across screen sizes
      const stepX = Math.max(62, Math.min(82, width / 18));
      const stepY = Math.max(62, Math.min(82, height / 12));

      const nextPoints = [];
      for (let x = 0; x < width; x += stepX) {
        for (let y = 0; y < height; y += stepY) {
          const ox = x + Math.random() * stepX;
          const oy = y + Math.random() * stepY;
          nextPoints.push({
            x: ox,
            y: oy,
            originX: ox,
            originY: oy,
            radius: 1.6 + Math.random() * 1.4,
            ampX: 12 + Math.random() * 22,
            ampY: 12 + Math.random() * 22,
            speedX: 0.0006 + Math.random() * 0.0008,
            speedY: 0.0006 + Math.random() * 0.0008,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            closest: [],
          });
        }
      }

      // Precompute 5 nearest neighbors per node
      for (let i = 0; i < nextPoints.length; i++) {
        const p1 = nextPoints[i];
        const neighbors = [];
        for (let j = 0; j < nextPoints.length; j++) {
          if (i === j) continue;
          const p2 = nextPoints[j];
          const d = getDistSq(p1, p2);
          if (neighbors.length < 5) {
            neighbors.push({ point: p2, d });
            neighbors.sort((a, b) => a.d - b.d);
          } else if (d < neighbors[4].d) {
            neighbors[4] = { point: p2, d };
            neighbors.sort((a, b) => a.d - b.d);
          }
        }
        p1.closest = neighbors.map((n) => n.point);
      }

      points = nextPoints;
    };

    const handleMouseMove = (e) => {
      if (
        e.target &&
        typeof e.target.closest === "function" &&
        e.target.closest("[data-no-constellation]")
      ) {
        mouse.active = false;
        return;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor tracking & snappy fade-out when hovering project cards
      mouse.smoothX += (mouse.x - mouse.smoothX) * 0.22;
      mouse.smoothY += (mouse.y - mouse.smoothY) * 0.22;
      const fadeSpeed = mouse.active ? 0.09 : 0.24;
      mouse.presence += ((mouse.active ? 1 : 0) - mouse.presence) * fadeSpeed;

      if (mouse.presence > 0.005) {
        const lightMode = themeRef.current;
        const lineRgb = lightMode ? "12, 90, 132" : "156, 217, 249";
        const dotRgb = lightMode ? "14, 116, 168" : "186, 230, 253";
        const alphaBoost = (lightMode ? 1.15 : 1) * mouse.presence;

        // Update drifting positions first
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          p.x = p.originX + Math.sin(time * p.speedX + p.phaseX) * p.ampX;
          p.y = p.originY + Math.cos(time * p.speedY + p.phaseY) * p.ampY;
        }

        const cursorPoint = { x: mouse.smoothX, y: mouse.smoothY };

        // Draw nearest-neighbor lines & glowing nodes around the cursor
        ctx.lineWidth = 0.85;
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const distSq = getDistSq(cursorPoint, p);

          let lineAlpha = 0;
          let dotAlpha = 0;

          if (distSq < 4500) {
            lineAlpha = 0.32;
            dotAlpha = 0.62;
          } else if (distSq < 20000) {
            lineAlpha = 0.14;
            dotAlpha = 0.34;
          } else if (distSq < 42000) {
            lineAlpha = 0.035;
            dotAlpha = 0.12;
          }

          if (lineAlpha > 0) {
            ctx.strokeStyle = `rgba(${lineRgb}, ${Math.min(1, lineAlpha * alphaBoost)})`;
            for (let k = 0; k < p.closest.length; k++) {
              const neighbor = p.closest[k];
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(neighbor.x, neighbor.y);
              ctx.stroke();
            }
          }

          if (dotAlpha > 0) {
            ctx.fillStyle = `rgba(${dotRgb}, ${Math.min(1, dotAlpha * alphaBoost)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    buildGrid();
    window.addEventListener("resize", buildGrid);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", buildGrid);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 max-sm:hidden select-none"
    />
  );
};

export const AIAmbientBackground = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      >
        {/* Subtle top-left AI sky/cyan ambient wash */}
        <motion.div
          animate={{ x: [0, 24, 0], y: [0, 16, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -top-36 -left-32 h-[420px] w-[420px] rounded-full blur-3xl ${
            isLight
              ? "bg-gradient-to-br from-sky-300/20 via-cyan-200/15 to-transparent"
              : "bg-gradient-to-br from-sky-500/12 via-cyan-500/8 to-transparent"
          }`}
        />

        {/* Subtle top-right indigo/blue neural glow */}
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 22, 0] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className={`absolute top-12 -right-36 h-[460px] w-[460px] rounded-full blur-3xl ${
            isLight
              ? "bg-gradient-to-bl from-indigo-300/15 via-sky-200/15 to-transparent"
              : "bg-gradient-to-bl from-indigo-500/12 via-sky-600/8 to-transparent"
          }`}
        />

        {/* Subtle bottom ambient depth */}
        <div
          className={`absolute -bottom-44 left-1/3 h-[380px] w-[480px] rounded-full blur-3xl ${
            isLight
              ? "bg-gradient-to-t from-sky-200/15 via-indigo-100/10 to-transparent"
              : "bg-gradient-to-t from-sky-900/15 via-indigo-900/10 to-transparent"
          }`}
        />
      </div>

      {/* Interactive mouse-connected neural constellation */}
      <MouseConstellationCanvas isLight={isLight} />
    </>
  );
};
