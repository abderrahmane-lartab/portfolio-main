import React, { useState } from "react";
import { Check } from "lucide-react";
import { useTheme } from "../theme-provider";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const DEFAULT_EMAIL = "lartab.abderrahmane@gmail.com";

export const CopyEmailPill = ({
  email = DEFAULT_EMAIL,
  compact = false,
  className = "",
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const tempInput = document.createElement("textarea");
        tempInput.value = email;
        tempInput.setAttribute("readonly", "");
        tempInput.style.position = "fixed";
        tempInput.style.left = "-9999px";
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      setCopied(true);
      toast.success(`${t("Copied!", "Copied!")} ${email}`);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Could not copy email automatically.");
    }
  };

  return (
    <div
      className={`inline-flex items-center justify-between max-w-full rounded-full border backdrop-blur-md transition-colors ${
        compact ? "pl-4 pr-1.5 py-1.5 gap-2.5" : "pl-5 max-sm:pl-4 pr-2 py-2 gap-3.5 max-sm:gap-2"
      } ${
        isLight
          ? "bg-white/85 border-slate-300/80 shadow-xs"
          : "bg-[#222226]/92 border-white/14 shadow-sm"
      } ${className}`}
    >
      <span
        onClick={handleCopy}
        title="Click to copy email"
        className={`font-mono font-medium tracking-tight truncate cursor-pointer select-all ${
          compact
            ? "text-xs sm:text-[13px]"
            : "text-xs sm:text-[15px]"
        } ${isLight ? "text-slate-800" : "text-slate-100"}`}
      >
        {email}
      </span>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${email}`}
        className={`shrink-0 inline-flex items-center justify-center gap-1 rounded-full font-bold transition-all duration-200 cursor-pointer select-none click-sound ${
          compact
            ? "px-3 py-1 text-[11px]"
            : "px-4 max-sm:px-3.5 py-1.5 text-xs"
        } ${
          copied
            ? "bg-emerald-500 text-slate-950"
            : isLight
            ? "bg-[#14b8a6] hover:bg-[#0d9488] text-slate-950"
            : "bg-[#2dd4bf] hover:bg-[#5eead4] text-slate-950"
        }`}
      >
        {copied ? (
          <>
            <Check className="size-3.5 stroke-[2.6]" />
            <span>{t("Copied!", "Copied")}</span>
          </>
        ) : (
          <span>{t("Copy", "Copy")}</span>
        )}
      </button>
    </div>
  );
};

export default CopyEmailPill;
