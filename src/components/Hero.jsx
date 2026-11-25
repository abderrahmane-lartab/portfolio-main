import React from "react";
import { Contact } from "./Contact";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import { useTheme } from "./theme-provider";
import FadeContent from "./flowBits/FadeContent";
import SplitText from "./flowBits/SplitText";
import TextType from "./flowBits/TextType";
import AnimatedContent from "./flowBits/AnimatedContent";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { AIChatAssistant } from "./AIChatAssistant";

export const Hero = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  const translatedRoles = t("hero_roles", { returnObjects: true });
  const roleList =
    Array.isArray(translatedRoles) && translatedRoles.length > 0
      ? translatedRoles
      : [
          t("AI & Full Stack Developer"),
          "Machine Learning & LLM Builder",
          "Python & React Engineer",
        ];

  return (
    <div
      id="home"
      className="flexy justify-between! max-[900px]:justify-start! max-[900px]:mt-8 flex-col min-h-[calc(100vh-64px)] max-[900px]:min-h-0 pt-10 max-[900px]:pt-4 pb-6 gap-8 max-[900px]:gap-8"
    >
      <div className="w-[80%] max-lg:w-[85%] my-auto grid grid-cols-[1.5fr_1fr] max-[900px]:grid-cols-1 items-center gap-16 max-[900px]:gap-6">
        <div className="text-[var(--text-dark)] max-[900px]:order-2 max-[900px]:text-center">
          <SplitText
            text="Abderrahmane Lartab"
            tag="h1"
            className="text-[42px] max-sm:text-3xl max-[370px]:text-2xl! max-lg:text-3xl font-bold leading-14 max-lg:leading-10 max-[900px]:leading-8 text-[var(--text-dark)]! max-[900px]:hidden"
            delay={50}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: -40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
          />
          <br />
          <TextType
            key={`desktop-${i18n.language}`}
            text={roleList}
            className="text-2xl max-sm:text-xl max-[370px]:text-lg! max-lg:text-2xl font-semibold max-[900px]:hidden block"
            cursorClassName="text-[#0c5a84] dark:text-sky-400"
            typingSpeed={75}
            deletingSpeed={45}
            pauseDuration={2600}
            showCursor={true}
            loop={true}
            cursorCharacter="|"
          />
          <FadeContent
            blur={true}
            duration={1100}
            easing="ease-out"
            initialOpacity={0}
          >
            <p className="mt-3 max-sm:text-sm">{t("bio")}</p>
          </FadeContent>
          <FadeContent
            blur={true}
            duration={1100}
            easing="ease-out"
            delay={300}
            initialOpacity={0}
          >
            <div className="flexy justify-start! max-[900px]:justify-center! gap-3 mt-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-5.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g id="style=fill">
                    {" "}
                    <g id="email">
                      {" "}
                      <path
                        id="Subtract"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7 2.75C5.38503 2.75 3.92465 3.15363 2.86466 4.1379C1.79462 5.13152 1.25 6.60705 1.25 8.5V15.5C1.25 17.393 1.79462 18.8685 2.86466 19.8621C3.92465 20.8464 5.38503 21.25 7 21.25H17C18.615 21.25 20.0754 20.8464 21.1353 19.8621C22.2054 18.8685 22.75 17.393 22.75 15.5V8.5C22.75 6.60705 22.2054 5.13152 21.1353 4.1379C20.0754 3.15363 18.615 2.75 17 2.75H7ZM19.2285 8.3623C19.5562 8.10904 19.6166 7.63802 19.3633 7.31026C19.1101 6.98249 18.6391 6.9221 18.3113 7.17537L12.7642 11.4616C12.3141 11.8095 11.6858 11.8095 11.2356 11.4616L5.6886 7.17537C5.36083 6.9221 4.88982 6.98249 4.63655 7.31026C4.38328 7.63802 4.44367 8.10904 4.77144 8.3623L10.3185 12.6486C11.3089 13.4138 12.691 13.4138 13.6814 12.6486L19.2285 8.3623Z"
                        fill="var(--icons-color)"
                      ></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              <a
                href="mailto:lartab.abderrahmane@gmail.com"
                className="max-sm:text-sm hover:underline"
              >
                lartab.abderrahmane@gmail.com
              </a>
            </div>
          </FadeContent>
          <div className="flexy justify-start! max-[900px]:justify-center! max-sm:flex-col gap-3 mt-4">
            <div className="flexy gap-4">
              <AnimatedContent
                distance={30}
                direction="vertical"
                reverse={false}
                duration={0.8}
                ease="easeOut"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.2}
                delay={0.2}
              >
                <Sheet>
                  <SheetTrigger
                    className={`flexy gap-2 cursor-pointer py-2 px-4 rounded-full shadow-md ButtonHover click-sound ${
                      theme === "light" ? "bg-[#d9e2e9]" : "bg-[#434141]"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="var(--text-dark)"
                      className="size-4.5 cursor-pointer"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="font-bold text-sm mt-0.5">{t("Contact")}</p>
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
              </AnimatedContent>
            </div>
            <div className="flexy gap-3 ml-2">
              <div className="ButtonHover">
                <FadeContent
                  blur={true}
                  className={`flexy p-2.5 shadow-[var(--custom-shadow)] rounded-full ${
                    theme === "light" ? "bg-[#d9e2e9]" : "bg-[#434141]"
                  }`}
                  duration={1000}
                  easing="ease-out"
                  delay={250}
                  initialOpacity={0}
                >
                  <a href="https://linkedin.com/in/alartab">
                    <svg
                      viewBox="0 0 20 20"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      className="size-4.5"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <title>linkedin [#919191161]</title>{" "}
                        <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                        <g
                          id="Page-1"
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          {" "}
                          <g
                            id="Dribbble-Light-Preview"
                            transform="translate(-180.000000, -7479.000000)"
                            fill="var(--icons-color)"
                          >
                            {" "}
                            <g
                              id="icons"
                              transform="translate(56.000000, 160.000000)"
                            >
                              {" "}
                              <path
                                d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z"
                                id="linkedin-[#919191161]"
                              >
                                {" "}
                              </path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </a>
                </FadeContent>
              </div>
              <div className="ButtonHover">
                <FadeContent
                  blur={true}
                  duration={1000}
                  className={`flexy p-2 shadow-[var(--custom-shadow)] rounded-full ${
                    theme === "light" ? "bg-[#d9e2e9]" : "bg-[#434141]"
                  }`}
                  easing="ease-out"
                  delay={250}
                  initialOpacity={0}
                >
                  <a
                    href="https://github.com/abderrahmane-lartab"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      fill="var(--icons-color)"
                      viewBox="-2.5 0 19 19"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5.5"
                      stroke=""
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z"></path>
                      </g>
                    </svg>
                  </a>
                </FadeContent>
              </div>
            </div>
          </div>
        </div>
        <span className="min-[900px]:hidden! flexy flex-col">
          <SplitText
            text="Abderrahmane Lartab"
            tag="h1"
            className="text-[40px] max-sm:text-3xl max-[370px]:text-2xl! max-lg:text-3xl font-bold leading-14 max-lg:leading-10 max-[900px]:leading-8 text-[var(--text-dark)]!"
            delay={50}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: -40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
          />
          <TextType
            key={`mobile-${i18n.language}`}
            text={roleList}
            className="text-2xl max-sm:text-xl max-[370px]:text-lg! max-lg:text-2xl font-semibold"
            cursorClassName="text-[#0c5a84] dark:text-sky-400"
            typingSpeed={75}
            deletingSpeed={45}
            pauseDuration={2600}
            showCursor={true}
            loop={true}
            cursorCharacter="|"
          />
        </span>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Subtle AI-inspired floating particles */}
            <motion.div
              className="absolute -top-4 max-sm:top-2 -right-4 max-sm:right-2 w-3 h-3 rounded-full bg-gradient-to-br from-sky-400/55 to-indigo-400/40 backdrop-blur-sm"
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -top-8 max-sm:-top-6 right-8 max-sm:right-8 w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400/50 to-sky-300/30 backdrop-blur-sm"
              animate={{
                y: [0, -8, 0],
                x: [0, -3, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute -bottom-6 max-sm:bottom-10 -left-4 max-sm:left-4 w-3 h-3 rounded-full bg-gradient-to-br from-indigo-400/45 to-sky-300/35 backdrop-blur-sm"
              animate={{
                y: [0, 12, 0],
                x: [0, -4, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
            <motion.div
              className="absolute -bottom-10 max-sm:bottom-0 left-4 max-sm:left-8 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-sky-400/40 to-cyan-300/25 backdrop-blur-sm"
              animate={{
                y: [0, 8, 0],
                x: [0, 2, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />
            <motion.div
              className="absolute bottom-1/4 max-sm:bottom-10 -right-0 max-sm:right-8 w-2 h-2 rounded-full bg-gradient-to-br from-sky-500/45 to-indigo-400/30 backdrop-blur-sm"
              animate={{
                y: [0, -6, 0, 6, 0],
                x: [0, 4, 0, -4, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.div
              className="absolute top-1/3 max-sm:top-10 -left-0 max-sm:left-8 w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400/40 to-indigo-300/30 backdrop-blur-sm"
              animate={{
                y: [0, 8, 0, -8, 0],
                x: [0, -3, 0, 3, 0],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7,
              }}
            />
          </div>

          {/* Subtle AI ambient aura behind portrait */}
          <div className="absolute -inset-4 bg-gradient-to-br from-sky-400/20 via-cyan-300/10 to-indigo-500/20 rounded-3xl blur-2xl animate-pulse-slow" />
          <div className="absolute -inset-2 bg-gradient-to-tl from-[#0c5a84]/15 via-sky-300/10 to-transparent rounded-3xl blur-xl animate-pulse-slow" />

          {/* Main full-frame square portrait container (shows entire image without side clipping) */}
          <div className="relative z-20 rounded-3xl p-1.5 backdrop-blur-md bg-white/65 dark:bg-white/10 border border-white/80 dark:border-white/15 shadow-[0_14px_40px_rgba(12,90,132,0.14)]">
            <div className="relative w-78 max-lg:w-70 max-[900px]:w-64 max-[450px]:w-56! aspect-square rounded-[20px] overflow-hidden shadow-[var(--custom-shadow)]">
              <img
                src="/photos/abc.png"
                alt="Abderrahmane Lartab"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Subtle corner ambient orbs */}
          <div className="absolute -top-6 right-4 w-12 h-12 bg-sky-300/30 dark:bg-sky-400/20 rounded-full blur-lg animate-pulse-slow" />
          <div className="absolute -bottom-6 left-4 w-12 h-12 bg-indigo-300/30 dark:bg-indigo-400/20 rounded-full blur-lg animate-pulse-slow" />
        </motion.div>
      </div>

      {/* Preserved ChatGPT-style centered AI assistant input */}
      <div className="w-full flex flex-col items-center gap-3 pb-2">
        <AIChatAssistant />
        <Link
          to="about"
          smooth={true}
          duration={600}
          offset={-120}
          className="group cursor-pointer opacity-75 hover:opacity-100 transition-opacity mt-1"
          aria-label={t("Scroll Down")}
        >
          <span className="flexy flex-col gap-1">
            <span className="w-5 h-8 rounded-full border-[1.5px] border-[var(--icons-color)]/70 group-hover:border-[#0c5a84] dark:group-hover:border-sky-400 flex justify-center pt-1.5 transition-colors">
              <motion.span
                animate={{ y: [0, 8, 0], opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1.5 rounded-full bg-[var(--icons-color)] group-hover:bg-[#0c5a84] dark:group-hover:bg-sky-400"
              />
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};
