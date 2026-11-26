import React from "react";
import {
  BrainCircuit,
  Code2,
  CloudCog,
  GraduationCap,
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";
import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";
import FadeContent from "./flowBits/FadeContent";
import AnimatedContent from "./flowBits/AnimatedContent";

export const About = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pillars = [
    {
      icon: BrainCircuit,
      title: t("about_pillar_ai_title", "AI & Machine Learning"),
      desc: t(
        "about_pillar_ai_desc",
        "Python, Scikit-learn, TensorFlow, PyTorch, YOLOv8, Computer Vision & LLM integrations."
      ),
    },
    {
      icon: Code2,
      title: t("about_pillar_fs_title", "Full Stack Development"),
      desc: t(
        "about_pillar_fs_desc",
        "React.js, Next.js, TypeScript, PHP, Laravel, Node.js, FastAPI & REST APIs."
      ),
    },
    {
      icon: CloudCog,
      title: t("about_pillar_data_title", "Data Engineering & Cloud"),
      desc: t(
        "about_pillar_data_desc",
        "Azure Data Factory, ADLS Gen2, Azure ML, PySpark, Apache Airflow, MLflow & Docker."
      ),
    },
  ];

  const highlights = [
    {
      icon: GraduationCap,
      label: "YouCode",
      detail: t("about_highlight_youcode", "AI Developer Program · 2026–2027"),
    },
    {
      icon: GraduationCap,
      label: "OFPPT – ISAG",
      detail: t("about_highlight_ofppt", "Full Stack Web Dev · 2024–2026"),
    },
    {
      icon: BriefcaseBusiness,
      label: "BRT Solutions",
      detail: t("about_highlight_brt", "Full Stack SaaS Intern · 2026"),
    },
  ];

  return (
    <section
      id="about"
      className="w-[82%] max-xl:w-[88%] max-sm:w-[92%] mx-auto my-12 max-[900px]:my-16"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border px-7 sm:px-10 py-9 sm:py-11 shadow-[var(--custom-shadow)] backdrop-blur-md ${
          isLight
            ? "bg-white/85 border-slate-200/85"
            : "bg-[#222226]/90 border-white/10"
        }`}
      >
        {/* Subtle ambient corner wash */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl ${
            isLight ? "bg-sky-200/45" : "bg-sky-500/10"
          }`}
        />

        {/* Top Header Row */}
        <AnimatedContent
          distance={16}
          direction="vertical"
          reverse={false}
          duration={0.7}
          ease="easeOut"
          initialOpacity={0}
          animateOpacity
          threshold={0.15}
        >
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/[0.07] dark:border-white/[0.08]">
            <div className="flex items-center gap-4">
              {/* Updated Rotating Ring Emblem ("FULL STACK • AI • DATA •") */}
              <div
                className={`relative size-16 sm:size-18 shrink-0 rounded-full flex items-center justify-center border shadow-xs ${
                  isLight
                    ? "bg-slate-50 border-slate-200/90"
                    : "bg-white/[0.05] border-white/10"
                }`}
              >
                <img
                  src={
                    isLight
                      ? "/photos/MM_black_text.png"
                      : "/photos/MM_white_text.png"
                  }
                  className="size-6"
                  alt="AL"
                />
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 size-full animate-[rotate_14s_linear_infinite]"
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="about-ring-path"
                      d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    />
                  </defs>
                  <text
                    fill={isLight ? "#334155" : "#cbd5e1"}
                    fontSize="8.3"
                    fontWeight="700"
                    letterSpacing="2.05"
                  >
                    <textPath href="#about-ring-path">
                      FULL STACK • AI &amp; ML • DATA •
                    </textPath>
                  </text>
                </svg>
              </div>

              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isLight ? "text-[#0c5a84]" : "text-sky-400"
                  }`}
                >
                  {t("About Me")}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-dark)] mt-0.5">
                  {t("Full Stack & AI Developer", "Full Stack & AI Developer")}
                </h2>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium border ${
                isLight
                  ? "bg-slate-100/90 text-slate-700 border-slate-200/80"
                  : "bg-white/[0.05] text-slate-300 border-white/10"
              }`}
            >
              <MapPin className="size-3.5 text-[#0c5a84] dark:text-sky-400 shrink-0" />
              <span>Casablanca, Morocco</span>
            </div>
          </div>
        </AnimatedContent>

        {/* Main Asymmetric Grid: Bio on Left + 3 Core Domain Cards on Right */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.28fr_1fr] gap-8 lg:gap-10 mt-7 items-start">
          {/* Left: Updated Personal Narrative + Quick Milestones */}
          <FadeContent
            blur={true}
            duration={900}
            easing="ease-out"
            delay={150}
            initialOpacity={0}
          >
            <div className="space-y-4 text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[var(--text-dark)]/90">
              <p className="text-left sm:text-justify">
                {t("about_paragraph_1")}
              </p>
              <p className="text-left sm:text-justify">
                {t("about_paragraph_2")}
              </p>
            </div>

            {/* Verified Milestones Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-6">
              {highlights.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 rounded-r-lg rounded-l-[3px] border border-l-[3px] border-l-[#0c5a84] dark:border-l-sky-400 px-3.5 py-3 ${
                      isLight
                        ? "bg-slate-50/90 border-slate-200/80"
                        : "bg-white/[0.04] border-white/[0.08]"
                    }`}
                  >
                    <IconComp className="size-4 mt-0.5 shrink-0 text-[#0c5a84] dark:text-sky-400" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[var(--text-dark)] truncate">
                        {item.label}
                      </p>
                      <p
                        className={`text-[11.5px] leading-snug mt-0.5 ${
                          isLight ? "text-slate-600" : "text-slate-400"
                        }`}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeContent>

          {/* Right: 3 Core Specialty Cards */}
          <div className="flex flex-col gap-3">
            {pillars.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <AnimatedContent
                  key={index}
                  distance={18}
                  direction="vertical"
                  reverse={false}
                  duration={0.65}
                  ease="easeOut"
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.15}
                  delay={0.08 * (index + 1)}
                >
                  <div
                    className={`flex items-start gap-3.5 rounded-xl p-4 border ${
                      isLight
                        ? "bg-slate-50/85 border-slate-200/85"
                        : "bg-white/[0.04] border-white/[0.08]"
                    }`}
                  >
                    <span
                      className={`size-10 shrink-0 rounded-lg flex items-center justify-center ${
                        isLight
                          ? "bg-[#0c5a84]/10 text-[#0c5a84]"
                          : "bg-sky-400/15 text-sky-300"
                      }`}
                    >
                      <IconComp className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-[15px] text-[var(--text-dark)]">
                        {pillar.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed mt-1 ${
                          isLight ? "text-slate-600" : "text-slate-400"
                        }`}
                      >
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedContent>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
