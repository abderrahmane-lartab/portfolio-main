import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Sparkles,
  ArrowUp,
  Loader2,
  RotateCcw,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";

/**
 * Clean inline formatter for bold (**text**), markdown links ([label](url)),
 * and line breaks inside responses.
 */
function FormattedMessage({ text }) {
  const lines = text.split("\n");

  const renderInline = (line) => {
    const tokenRegex =
      /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\)|https?:\/\/[^\s)]+)/g;
    const parts = line.split(tokenRegex);

    return parts.map((part, idx) => {
      if (!part) return null;

      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }

      const mdLinkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
      if (mdLinkMatch) {
        return (
          <a
            key={idx}
            href={mdLinkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-[#0c5a84]/50 underline-offset-3 text-[#0c5a84] dark:text-sky-400 hover:opacity-80"
          >
            {mdLinkMatch[1]}
          </a>
        );
      }

      if (/^https?:\/\//.test(part)) {
        return (
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-[#0c5a84]/50 underline-offset-3 text-[#0c5a84] dark:text-sky-400 hover:opacity-80 break-all"
          >
            {part}
          </a>
        );
      }

      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="space-y-2.5 leading-[1.65]">
      {lines.map((line, i) => {
        if (!line.trim()) {
          return <div key={i} className="h-1" />;
        }
        return (
          <p key={i} className="text-[15.5px] sm:text-[16.5px]">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}

export const AIChatAssistant = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isLight = theme === "light";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const scrollRef = useRef(null);
  const heroInputRef = useRef(null);
  const modalInputRef = useRef(null);

  const quickPrompts = [
    {
      id: "projects",
      label: t("Recent projects"),
      question: "What projects have you built recently?",
      prompt: t(
        "ai_prompt_projects",
        "Tell me about Abderrahmane's recent projects."
      ),
      featured: true,
    },
    {
      id: "stack",
      label: t("Tech stack"),
      question: "What stack and AI tools do you work with?",
      prompt: t(
        "ai_prompt_stack",
        "What is Abderrahmane's AI and Full Stack tech stack?"
      ),
    },
    {
      id: "availability",
      label: t("Availability"),
      question: "Are you open to internships or developer roles?",
      prompt: t(
        "ai_prompt_availability",
        "Is Abderrahmane available for work or internships, and what are his career goals?"
      ),
    },
    {
      id: "contact",
      label: t("Contact info"),
      question: "How can I get in touch with you directly?",
      prompt: t("ai_prompt_contact", "How can I contact Abderrahmane Lartab?"),
    },
  ];

  // Auto-scroll conversation to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isModalOpen]);

  // Focus modal input when popup opens & lock body scroll
  useEffect(() => {
    if (!isModalOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => {
      modalInputRef.current?.focus();
    }, 60);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const openPopup = () => {
    heroInputRef.current?.blur();
    setIsModalOpen(true);
  };

  const closePopup = () => {
    setIsModalOpen(false);
    setIsFullscreen(false);
  };

  const sendMessage = async (textToSend) => {
    const trimmed = (textToSend ?? input).trim();
    if (!trimmed || isLoading) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsModalOpen(true);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          language: i18n.language,
          history: messages.slice(-8).map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to reach the assistant.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content:
            data?.reply ||
            "I'm here to help with any questions about Abderrahmane Lartab.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content:
            "Sorry, I couldn't connect right now. Feel free to email Abderrahmane directly at **lartab.abderrahmane@gmail.com**.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => modalInputRef.current?.focus(), 40);
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleReset = () => {
    setMessages([]);
    modalInputRef.current?.focus();
  };

  const modalContent = (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          key="ask-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={closePopup}
          className={`fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md ${
            isFullscreen ? "p-0" : "p-3 sm:p-6"
          } ${isLight ? "bg-slate-900/40" : "bg-black/70"}`}
        >
          {/* Clean, Human-Crafted Dialog Window with Previous Ambient Background */}
          <motion.div
            key="ask-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Ask Abderrahmane"
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative flex flex-col overflow-hidden transition-[width,height,border-radius] duration-250 ${
              isFullscreen
                ? "w-screen h-screen rounded-none"
                : "w-full max-w-[720px] h-[78vh] max-h-[650px] min-h-[450px] rounded-2xl border"
            } ${
              isLight
                ? "bg-white/95 border-white/80 text-slate-900 shadow-[0_28px_80px_rgba(15,23,42,0.25)]"
                : "bg-[#161722]/95 border-white/12 text-slate-100 shadow-[0_28px_90px_rgba(0,0,0,0.75)]"
            }`}
          >
            {/* Soft Ambient Background Color Washes from Previous Popup */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div
                className={`absolute -top-24 -left-20 h-64 w-64 rounded-full blur-3xl ${
                  isLight ? "bg-cyan-300/30" : "bg-cyan-500/18"
                }`}
              />
              <div
                className={`absolute -top-20 right-10 h-64 w-64 rounded-full blur-3xl ${
                  isLight ? "bg-violet-300/28" : "bg-violet-500/18"
                }`}
              />
              <div
                className={`absolute -bottom-24 left-1/3 h-60 w-72 rounded-full blur-3xl ${
                  isLight ? "bg-amber-200/30" : "bg-rose-500/12"
                }`}
              />
            </div>

            {/* Top Bar — Personal header on left, Fullscreen & Close on right */}
            <div
              className={`relative z-10 flex items-center justify-between px-5 py-3.5 shrink-0 border-b backdrop-blur-md ${
                isLight
                  ? "bg-white/60 border-slate-200/75"
                  : "bg-white/[0.03] border-white/[0.08]"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0" aria-hidden="true">
                  <div
                    className="size-9 rounded-full overflow-hidden shadow-xs ring-1 ring-black/5 dark:ring-white/15"
                    style={{
                      background:
                        "radial-gradient(circle at 28% 25%, #fde68a 0%, transparent 48%), radial-gradient(circle at 78% 28%, #38bdf8 0%, transparent 55%), radial-gradient(circle at 30% 82%, #fb7185 0%, transparent 55%), linear-gradient(135deg, #0c5a84 0%, #4f46e5 100%)",
                    }}
                  />
                  <span
                    className={`absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ${
                      isLight ? "ring-white" : "ring-[#161722]"
                    }`}
                  />
                </div>

                <div className="min-w-0 text-left">
                  <h2 className="font-bold text-base sm:text-[17px] leading-tight tracking-tight truncate">
                    Abderrahmane Assistant
                  </h2>
                  <p
                    className={`text-[13px] truncate ${
                      isLight ? "text-neutral-500" : "text-neutral-400"
                    }`}
                  >
                    Casablanca · Answers from my work & CV
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    title={t("Clear conversation")}
                    aria-label={t("Clear conversation")}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer mr-1 ${
                      isLight
                        ? "hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900"
                        : "hover:bg-white/[0.08] text-neutral-400 hover:text-neutral-100"
                    }`}
                  >
                    <RotateCcw className="size-3.5" />
                    <span className="max-sm:hidden">New chat</span>
                  </button>
                )}

                {/* Full Screen Toggle Icon */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen((prev) => !prev)}
                  title={isFullscreen ? "Exit full screen" : "Full screen"}
                  aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    isLight
                      ? "hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900"
                      : "hover:bg-white/[0.08] text-neutral-400 hover:text-neutral-100"
                  }`}
                >
                  {isFullscreen ? (
                    <Minimize2 className="size-4" />
                  ) : (
                    <Maximize2 className="size-4" />
                  )}
                </button>

                {/* Close Popup Icon */}
                <button
                  type="button"
                  onClick={closePopup}
                  title="Close"
                  aria-label="Close"
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    isLight
                      ? "hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900"
                      : "hover:bg-white/[0.08] text-neutral-400 hover:text-neutral-100"
                  }`}
                >
                  <X className="size-4.5" />
                </button>
              </div>
            </div>

            {/* Body — Natural Welcome Note or Clean Message Thread */}
            <div
              ref={scrollRef}
              className="relative z-10 flex-1 overflow-y-auto px-5 sm:px-7 py-6"
            >
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center select-none">
                  <h3
                    className={`text-3xl sm:text-4xl font-bold tracking-[0.14em] uppercase ${
                      isLight ? "text-slate-800/85" : "text-slate-100/85"
                    }`}
                  >
                    ASK ABDERRAHMANE
                  </h3>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto w-full space-y-5 text-left">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <div className="max-w-[82%] rounded-2xl rounded-br-sm px-4.5 py-3 text-[15.5px] sm:text-[16.5px] leading-relaxed bg-[#0c5a84] text-white">
                          {msg.content}
                        </div>
                      ) : (
                        <div className="flex items-start gap-3 max-w-[92%]">
                          <img
                            src="/photos/abc.png"
                            alt="Abderrahmane"
                            className={`mt-1 size-8 rounded-full object-cover shrink-0 border ${
                              isLight ? "border-neutral-200" : "border-white/15"
                            }`}
                          />
                          <div
                            className={`rounded-2xl rounded-tl-sm px-4.5 py-3.5 border backdrop-blur-sm ${
                              isLight
                                ? "bg-white/90 border-slate-200/85 text-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
                                : "bg-white/[0.06] border-white/10 text-slate-100"
                            }`}
                          >
                            <FormattedMessage text={msg.content} />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3"
                    >
                      <img
                        src="/photos/abc.png"
                        alt="Abderrahmane"
                        className={`size-7 rounded-full object-cover shrink-0 border ${
                          isLight ? "border-neutral-200" : "border-white/15"
                        }`}
                      />
                      <div
                        className={`rounded-2xl rounded-tl-sm px-4 py-3 border flex items-center gap-1.5 ${
                          isLight
                            ? "bg-white border-neutral-200/85"
                            : "bg-[#242428] border-white/[0.08]"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full animate-bounce [animation-delay:-0.2s] ${
                            isLight ? "bg-neutral-400" : "bg-neutral-500"
                          }`}
                        />
                        <span
                          className={`size-1.5 rounded-full animate-bounce [animation-delay:-0.1s] ${
                            isLight ? "bg-neutral-400" : "bg-neutral-500"
                          }`}
                        />
                        <span
                          className={`size-1.5 rounded-full animate-bounce ${
                            isLight ? "bg-neutral-400" : "bg-neutral-500"
                          }`}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Input Bar — Clean, Tactile, Translucent over Popup Background */}
            <div
              className={`relative z-10 px-4 sm:px-6 py-3.5 shrink-0 border-t backdrop-blur-md ${
                isLight
                  ? "bg-white/60 border-slate-200/75"
                  : "bg-white/[0.03] border-white/[0.08]"
              }`}
            >
              <form
                onSubmit={handleModalSubmit}
                className="max-w-2xl mx-auto w-full flex items-center gap-2.5"
              >
                <div
                  className={`flex-1 flex items-center rounded-xl px-3.5 py-2 border transition-all duration-150 ${
                    isLight
                      ? "bg-white/90 border-slate-200/90 focus-within:bg-white focus-within:border-[#0c5a84]/60 focus-within:ring-3 focus-within:ring-[#0c5a84]/10"
                      : "bg-[#1c1d2b]/90 border-white/12 focus-within:bg-[#212233] focus-within:border-sky-400/50 focus-within:ring-3 focus-within:ring-sky-400/10"
                  }`}
                >
                  <input
                    ref={modalInputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Abderrahmane..."
                    disabled={isLoading}
                    className={`w-full bg-transparent outline-none text-[15.5px] sm:text-base py-1 ${
                      isLight
                        ? "text-neutral-900 placeholder:text-neutral-400"
                        : "text-neutral-100 placeholder:text-neutral-500"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label={t("Send message")}
                  className="size-10 shrink-0 rounded-xl flex items-center justify-center bg-[#0c5a84] hover:bg-[#0a4c70] text-white transition-all duration-150 active:scale-95 disabled:opacity-40 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ArrowUp className="size-4.5 stroke-[2.25]" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full max-w-[620px] mx-auto px-3.5 sm:px-0 relative z-30">
      {/* Modern frosted-glass suggestion pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2.5">
        {quickPrompts.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
            onClick={() => sendMessage(item.prompt)}
            className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-[13px] backdrop-blur-md transition-all duration-200 cursor-pointer click-sound disabled:opacity-60 ${
              item.featured ? "font-semibold" : "font-medium"
            } ${
              isLight
                ? "bg-white/50 hover:bg-white/85 text-slate-700 border border-white/80 ring-1 ring-slate-900/[0.05] shadow-[0_2px_10px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.85)] hover:ring-[#0c5a84]/25"
                : "bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 border border-white/[0.12] shadow-[0_2px_10px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-sky-400/35"
            }`}
          >
            {item.featured && (
              <Sparkles className="size-3.5 text-[#0c5a84] dark:text-sky-400 shrink-0" />
            )}
            <span>{item.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Modern translucent glassmorphic floating input dock */}
      <motion.div
        onClick={openPopup}
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2 }}
        className={`group flex items-center gap-2.5 sm:gap-3 w-full rounded-full pl-2.5 sm:pl-3 pr-1.5 sm:pr-2 py-1.5 sm:py-2 backdrop-blur-xl transition-all duration-300 cursor-text ${
          isLight
            ? "bg-white/55 hover:bg-white/80 border border-white/85 ring-1 ring-slate-900/[0.07] shadow-[0_10px_34px_rgba(12,90,132,0.09),inset_0_1px_0_rgba(255,255,255,0.95)] hover:ring-[#0c5a84]/30 hover:shadow-[0_14px_40px_rgba(12,90,132,0.15),inset_0_1px_0_rgba(255,255,255,1)]"
            : "bg-white/[0.07] hover:bg-white/[0.11] border border-white/[0.14] shadow-[0_10px_36px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-sky-400/40 hover:shadow-[0_14px_40px_rgba(56,189,248,0.12)]"
        }`}
      >
        <span
          aria-hidden="true"
          className={`size-8 sm:size-9 shrink-0 rounded-full flex items-center justify-center transition-colors ${
            isLight
              ? "bg-[#0c5a84]/10 text-[#0c5a84] group-hover:bg-[#0c5a84]/15"
              : "bg-sky-400/15 text-sky-300 group-hover:bg-sky-400/20"
          }`}
        >
          <Sparkles className="size-4" />
        </span>

        <input
          ref={heroInputRef}
          type="text"
          readOnly
          onFocus={openPopup}
          value={input}
          placeholder="Ask Abderrahmane..."
          aria-label="Ask Abderrahmane"
          className={`min-w-0 flex-1 bg-transparent outline-none cursor-text text-sm sm:text-[15.5px] ${
            isLight
              ? "text-slate-800 placeholder:text-slate-500/85"
              : "text-neutral-100 placeholder:text-neutral-400"
          }`}
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openPopup();
          }}
          aria-label="Open Ask Abderrahmane chat"
          className={`size-9 sm:size-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-105 active:scale-95 cursor-pointer click-sound ${
            isLight
              ? "bg-[#0c5a84] hover:bg-[#094a6d] text-white shadow-[0_4px_14px_rgba(12,90,132,0.3)]"
              : "bg-sky-400/90 hover:bg-sky-300 text-slate-950 shadow-[0_4px_14px_rgba(56,189,248,0.28)]"
          }`}
        >
          <ArrowUp className="size-4.5 sm:size-5 stroke-[2.3]" />
        </button>
      </motion.div>

      {/* Render centered popup at document.body root */}
      {typeof document !== "undefined"
        ? createPortal(modalContent, document.body)
        : null}
    </div>
  );
};
