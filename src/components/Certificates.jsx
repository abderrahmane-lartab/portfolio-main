import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Award,
  ExternalLink,
  Maximize2,
  X,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";
import SplitText from "./flowBits/SplitText";

export const Certificates = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [selectedCert, setSelectedCert] = useState(null);

  const rawCertificates = t("certificates.items", { returnObjects: true });
  const certificates = Array.isArray(rawCertificates) ? rawCertificates : [];

  const rawAdditional = t("certificates.additional", { returnObjects: true });
  const additionalCerts = Array.isArray(rawAdditional) ? rawAdditional : [];

  useEffect(() => {
    if (!selectedCert) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedCert]);

  const totalCount = certificates.length + additionalCerts.length;

  const lightboxModal = (
    <AnimatePresence>
      {selectedCert && (
        <motion.div
          key="cert-lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
        >
          <motion.div
            key="cert-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={selectedCert.name}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-3xl rounded-3xl overflow-hidden border shadow-2xl ${
              isLight
                ? "bg-white border-slate-200 text-slate-900"
                : "bg-[#1e1e22] border-white/12 text-slate-100"
            }`}
          >
            {/* Top Modal Bar */}
            <div
              className={`flex items-center justify-between gap-3 px-5 py-3.5 border-b ${
                isLight ? "border-slate-200/80" : "border-white/10"
              }`}
            >
              <div className="min-w-0 text-left">
                <h3 className="font-bold text-sm sm:text-base truncate">
                  {selectedCert.name}
                </h3>
                <p
                  className={`text-xs truncate ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {selectedCert.platform} · {selectedCert.date}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {selectedCert.link && (
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c5a84] hover:bg-[#094a6d] text-white text-xs font-semibold transition-colors"
                  >
                    <span>{t("Verify", "Verify")}</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close preview"
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isLight
                      ? "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                      : "hover:bg-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <X className="size-4.5" />
                </button>
              </div>
            </div>

            {/* Full Certificate Image */}
            <div
              className={`p-4 sm:p-6 flex items-center justify-center ${
                isLight ? "bg-slate-50" : "bg-[#151518]"
              }`}
            >
              <img
                src={`/photos/certificates/${selectedCert.photo}`}
                alt={selectedCert.name}
                className="max-h-[72vh] w-auto rounded-xl shadow-md object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section
      id="certificates"
      className="pt-20 max-sm:pt-12 w-[82%] max-xl:w-[88%] max-sm:w-[92%] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2.5">
          <SplitText
            key={i18n.language}
            text={t("Certificates")}
            tag="h1"
            className="flexy font-bold text-2xl sm:text-3xl gap-2"
            delay={20}
            duration={0.2}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
          />
          <span
            className={`text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-full border ${
              isLight
                ? "bg-white text-[#0c5a84] border-slate-200/90 shadow-2xs"
                : "bg-sky-400/15 text-sky-300 border-sky-400/25"
            }`}
          >
            {totalCount}
          </span>
        </div>
      </div>

      {/* Main 4-Card Responsive Grid (all visual certificates visible without hidden slides) */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {certificates.map((cert, index) => (
          <motion.div
            key={`${cert.name}-${index}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            onClick={() => setSelectedCert(cert)}
            className={`group relative rounded-3xl p-4 border flex flex-col cursor-pointer select-none transition-all duration-250 hover:-translate-y-1 backdrop-blur-md shadow-[var(--custom-shadow)] ${
              isLight
                ? "bg-white/85 hover:bg-white border-slate-200/85 hover:border-[#0c5a84]/35"
                : "bg-[#222226]/90 hover:bg-[#27272c] border-white/10 hover:border-sky-400/35"
            }`}
          >
            {/* Certificate Thumbnail Frame */}
            <div
              className={`relative aspect-[4/3] w-full rounded-2xl overflow-hidden border ${
                isLight
                  ? "bg-slate-100 border-slate-200/70"
                  : "bg-[#18181b] border-white/[0.08]"
              }`}
            >
              <span
                className={`z-10 text-[11px] font-bold absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 backdrop-blur-md border shadow-2xs ${
                  isLight
                    ? "bg-white/90 text-slate-800 border-slate-200/80"
                    : "bg-slate-900/80 text-white border-white/15"
                }`}
              >
                {cert.owner}
              </span>

              <img
                src={`/photos/certificates/${cert.photo}`}
                alt={cert.name}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Subtle Hover Preview Badge */}
              <div className="absolute inset-0 bg-slate-950/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-semibold shadow-md">
                  <Maximize2 className="size-3.5" />
                  <span>{t("Open", "Preview")}</span>
                </span>
              </div>
            </div>

            {/* Certificate Metadata */}
            <div className="mt-3.5 flex-1 flex flex-col text-left">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold text-[15px] sm:text-base leading-snug text-[var(--text-dark)] line-clamp-2">
                  {cert.name}
                </h2>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title={t("Verify", "Verify")}
                    className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                      isLight
                        ? "text-slate-500 hover:text-[#0c5a84] hover:bg-slate-100"
                        : "text-slate-400 hover:text-sky-300 hover:bg-white/10"
                    }`}
                  >
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </div>

              <p
                className={`text-xs font-medium mt-1 ${
                  isLight ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {cert.platform}
              </p>

              {/* Bottom Tech Pills + Date */}
              <div className="mt-auto pt-3.5 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(cert.technologies) &&
                    cert.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border ${
                          isLight
                            ? "bg-slate-50 text-slate-700 border-slate-200/80"
                            : "bg-white/[0.05] text-slate-200 border-white/10"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                </div>
                <span
                  className={`text-xs font-semibold shrink-0 ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {cert.date}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Verified Credentials Strip from Knowledge Base */}
      {additionalCerts.length > 0 && (
        <div
          className={`mt-5 rounded-3xl border px-5 sm:px-6 py-4 backdrop-blur-md shadow-[var(--custom-shadow)] ${
            isLight
              ? "bg-white/80 border-slate-200/85"
              : "bg-[#222226]/90 border-white/10"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--text-dark)]">
              <Award className="size-4 text-[#0c5a84] dark:text-sky-400 shrink-0" />
              <span>
                {t("Additional Certifications", "Additional Certifications")}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {additionalCerts.map((item, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border ${
                    isLight
                      ? "bg-slate-50 text-slate-700 border-slate-200/85"
                      : "bg-white/[0.04] text-slate-200 border-white/[0.08]"
                  }`}
                >
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                  <span className="font-semibold">{item.name}</span>
                  <span
                    className={isLight ? "text-slate-400" : "text-slate-400"}
                  >
                    · {item.issuer}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {typeof document !== "undefined"
        ? createPortal(lightboxModal, document.body)
        : null}
    </section>
  );
};
