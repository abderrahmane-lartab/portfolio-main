import { Mail, MessageSquare, Github, Linkedin } from "lucide-react";
import React from "react";
import { useTheme } from "./theme-provider";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Contact } from "./Contact";
import { useTranslation } from "react-i18next";
import AnimatedContent from "./flowBits/AnimatedContent";
import FadeContent from "./flowBits/FadeContent";
import { CopyEmailPill } from "./ui/CopyEmailPill";

export const Available = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pillLinkClass = `inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold border transition-colors cursor-pointer select-none ${
    isLight
      ? "bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 border-slate-200/90 shadow-2xs"
      : "bg-[#222226]/90 hover:bg-[#2a2a30] text-slate-200 hover:text-white border-white/12"
  }`;

  return (
    <section className="pt-22 max-sm:pt-14 pb-22 max-sm:pb-16 px-4 flex flex-col items-center text-center">
      {/* Availability Eyebrow */}
      <AnimatedContent
        distance={18}
        direction="vertical"
        reverse={false}
        duration={0.7}
        ease="easeOut"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.05}
      >
        <div
          className={`inline-flex items-center gap-2.5 h-9 font-bold text-xs sm:text-sm rounded-full px-4 border shadow-2xs ${
            isLight
              ? "bg-emerald-50/90 text-emerald-800 border-emerald-200/80"
              : "bg-emerald-500/15 text-emerald-300 border-emerald-400/25"
          }`}
        >
          <span className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping [animation-duration:1.8s]" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>{t("Available for work")}</span>
        </div>
      </AnimatedContent>

      {/* Bold + Outlined Editorial Heading */}
      <FadeContent
        blur={true}
        duration={900}
        easing="ease-out"
        initialOpacity={0}
      >
        <h2 className="mt-5 font-extrabold tracking-tight leading-[1.06] text-4xl sm:text-6xl max-[380px]:text-3xl select-none">
          <span className="block text-[var(--text-dark)]">
            {t("Let's build something")}
          </span>
          <span
            className="block mt-1"
            style={{
              WebkitTextStroke: isLight
                ? "1.5px #1e293b"
                : "1.5px rgba(226, 232, 240, 0.78)",
              color: "transparent",
            }}
          >
            {t("incredible together!")}
          </span>
        </h2>

        <p
          className={`mt-4 max-w-md mx-auto text-xs sm:text-sm leading-relaxed ${
            isLight ? "text-slate-600" : "text-slate-400"
          }`}
        >
          {t(
            "contact_cta_subtitle",
            "Internship, full-time role, or an AI & Full Stack idea you want to ship — my inbox is open."
          )}
        </p>
      </FadeContent>

      {/* Direct 1-Click Recruiter Copy Email Pill */}
      <div className="mt-7 max-w-full">
        <CopyEmailPill email="lartab.abderrahmane@gmail.com" />
      </div>

      {/* Quick Recruiter Action Pills Row */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 max-w-xl">
        <a
          href="https://github.com/abderrahmane-lartab"
          target="_blank"
          rel="noopener noreferrer"
          className={pillLinkClass}
        >
          <Github className="size-3.5 shrink-0" />
          <span>GitHub</span>
        </a>

        <a
          href="https://linkedin.com/in/alartab"
          target="_blank"
          rel="noopener noreferrer"
          className={pillLinkClass}
        >
          <Linkedin className="size-3.5 text-[#0a66c2] dark:text-sky-400 shrink-0" />
          <span>LinkedIn</span>
        </a>

        <a
          href="mailto:lartab.abderrahmane@gmail.com"
          className={pillLinkClass}
        >
          <Mail className="size-3.5 text-rose-500 shrink-0" />
          <span>{t("Email", "Email")}</span>
        </a>

        <Sheet>
          <SheetTrigger className={pillLinkClass}>
            <MessageSquare className="size-3.5 text-[#0c5a84] dark:text-sky-400 shrink-0" />
            <span>{t("Send Message", "Send Message")}</span>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            title={t("Contact")}
            closeClassName="absolute! right-5 top-5 left-auto! p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 opacity-90"
            className="w-full max-w-[1020px] mx-auto max-h-[92vh] h-auto rounded-t-3xl border-x border-t border-black/10 dark:border-white/10 shadow-2xl px-5 sm:px-10 py-6 sm:py-7"
          >
            <Contact />
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};
