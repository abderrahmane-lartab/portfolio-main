import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import Socials from "./ui/Socials";
import WeatherDisplay from "@/api/WeatherDisplay ";
import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const Contact = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [now, setNow] = useState(() => new Date());
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const getFormattedDate = () => {
    try {
      return now.toLocaleDateString(i18n.language, {
        timeZone: "Africa/Casablanca",
        day: "numeric",
        weekday: "long",
      });
    } catch {
      return now.toLocaleDateString(i18n.language, {
        day: "numeric",
        weekday: "long",
      });
    }
  };

  const getCasablancaAngles = () => {
    try {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Casablanca",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).formatToParts(now);
      const hour = Number(parts.find((p) => p.type === "hour")?.value || 0);
      const minute = Number(parts.find((p) => p.type === "minute")?.value || 0);
      return {
        hourDeg: ((hour % 12) + minute / 60) * 30,
        minuteDeg: minute * 6,
      };
    } catch {
      return {
        hourDeg: ((now.getHours() % 12) + now.getMinutes() / 60) * 30,
        minuteDeg: now.getMinutes() * 6,
      };
    }
  };

  const { hourDeg, minuteDeg } = getCasablancaAngles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    setIsSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || "Could not send message.");
      }

      toast.success("Message sent to Abderrahmane! He will get back to you soon.");
      form.reset();
    } catch (err) {
      toast.error(err?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="w-full max-w-[940px] mx-auto">
      {/* Compact, Balanced Header */}
      <div className="flex flex-col items-center text-center pt-1">
        <div
          className={`inline-flex items-center gap-2.5 h-8 font-semibold text-xs sm:text-[13px] rounded-full px-4 shadow-xs border ${
            isLight
              ? "bg-emerald-50 text-emerald-800 border-emerald-200/80"
              : "bg-emerald-500/15 text-emerald-300 border-emerald-400/25"
          }`}
        >
          <span className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping [animation-duration:1.8s]" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>{t("Available for work")}</span>
        </div>

        <h1 className="mt-3 font-bold text-2xl sm:text-3xl tracking-tight text-[var(--text-dark)]">
          {t("Let's start a project together")} 🤝
        </h1>
      </div>

      {/* Adjusted 2-Column Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1.08fr_0.92fr] gap-7 lg:gap-10 mt-6 items-start">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-xs sm:text-sm font-semibold">
                {t("Name")}
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="bg-[var(--bg-projects)]! h-11 rounded-xl focus:border-[#0c5a84]"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-xs sm:text-sm font-semibold">
                {t("Email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="bg-[var(--bg-projects)]! h-11 rounded-xl focus:border-[#0c5a84]"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="message" className="text-xs sm:text-sm font-semibold">
              {t("Message")}
            </Label>
            <Textarea
              id="message"
              name="message"
              className="bg-[var(--bg-projects)]! h-28 sm:h-30 resize-none rounded-xl focus:border-[#0c5a84]"
              placeholder={t("Text Message...")}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full h-11 mt-0.5 rounded-xl bg-[#0c5a84] hover:bg-[#094a6d] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99] disabled:opacity-60 cursor-pointer click-sound"
          >
            {isSending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
            <span>{isSending ? "Sending..." : t("Send Message")}</span>
          </button>
        </form>

        {/* Location Map Card + Socials */}
        <div className="flex flex-col items-center w-full">
          <div className="group/map relative h-52 sm:h-56 w-full overflow-hidden shadow-[var(--custom-shadow)] rounded-2xl border border-black/5 dark:border-white/10">
            <img
              src="/photos/elements/cloud.png"
              className="cloud absolute h-[130px] w-[130px] opacity-80 pointer-events-none z-10"
              alt=""
            />
            <img
              src="/photos/elements/my-location.png"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover/map:scale-105"
              alt="Casablanca, Morocco 3D Coastline Map"
            />

            {/* Top-left Coordinates Badge */}
            <div className="absolute top-2.5 left-3 z-10 inline-flex items-center gap-1.5 backdrop-blur-md bg-slate-950/50 border border-white/20 rounded-full px-2.5 py-1 text-[11px] font-mono text-white/95 shadow-xs select-none">
              <span className="size-1.5 rounded-full bg-sky-400" />
              <span>33.57° N · 7.59° W</span>
            </div>

            {/* Live Pulsing Radar Beacon on Casablanca */}
            <div
              aria-hidden="true"
              className="absolute top-[37%] left-[57%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none flex items-center justify-center"
            >
              <span className="absolute size-9 rounded-full bg-sky-400/35 animate-ping [animation-duration:2.2s]" />
              <span className="absolute size-5 rounded-full bg-[#0c5a84]/45" />
              <span className="relative size-3 rounded-full bg-sky-400 ring-2 ring-white shadow-md" />
            </div>

            {/* Frosted Location & Weather Bar */}
            <div className="flex items-center justify-between absolute bottom-2.5 left-1/2 z-10 -translate-x-1/2 backdrop-blur-md bg-slate-900/55 border border-white/20 w-[94%] shadow-md rounded-2xl px-3.5 py-2.5 text-white">
              <div className="flex items-center gap-3">
                {/* Centered Live Casablanca Analog Clock */}
                <div className="relative size-10 shrink-0 rounded-full border-2 border-white/90 bg-black/20">
                  <span className="absolute inset-0 m-auto size-1.5 rounded-full bg-white z-10" />
                  <span
                    className="absolute bottom-1/2 left-1/2 w-0.5 h-2.5 bg-rose-400 origin-bottom rounded-full"
                    style={{
                      transform: `translateX(-50%) rotate(${hourDeg}deg)`,
                    }}
                  />
                  <span
                    className="absolute bottom-1/2 left-1/2 w-0.5 h-3.5 bg-white origin-bottom rounded-full"
                    style={{
                      transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
                    }}
                  />
                </div>

                <div className="leading-tight">
                  <h2 className="text-base sm:text-lg font-bold leading-none">
                    Casablanca
                  </h2>
                  <p className="text-xs text-white/85 mt-1 capitalize">
                    {getFormattedDate()}
                  </p>
                </div>
              </div>

              <div className="text-right font-semibold">
                <WeatherDisplay />
              </div>
            </div>
          </div>

          <div className="flexy mt-3">
            <Socials />
          </div>
        </div>
      </div>

      {/* Compact Footer */}
      <div className="mt-5 pt-3.5 border-t border-black/8 dark:border-white/10 text-center text-xs sm:text-sm text-[var(--icons-color)]">
        &copy; {new Date().getFullYear()} ·{" "}
        <a
          href="https://www.linkedin.com/in/alartab/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-2 hover:text-[#0c5a84] dark:hover:text-sky-400"
        >
          Abderrahmane Lartab
        </a>
      </div>
    </section>
  );
};
