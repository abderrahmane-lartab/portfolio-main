import React, { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Certificates } from "./components/Certificates";
import { Available } from "./components/Available";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { AIAmbientBackground } from "./components/AIAmbientBackground";
import { Preloader } from "./components/Preloader";

export const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = (i18n.language || "en").split("-")[0];
    document.documentElement.lang = lang;
  }, [i18n.language]);

  useEffect(() => {
    const clickSound = new Audio("/sounds/click.mp3");
    const handleClick = (e) => {
      if (e.target.closest(".click-sound")) {
        clickSound.currentTime = 0;
        clickSound.play().catch((err) => {
          console.log("Sound play prevented:", err);
        });
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <ThemeProvider
      defaultTheme="light"
      storageKey="abderrahmane-portfolio-theme"
    >
      <Preloader />
      <Suspense fallback={null}>
        <div className="relative min-h-screen overflow-x-clip">
          <AIAmbientBackground />
          <div className="relative z-10">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certificates />
            <Available />
            <Footer />
          </div>
        </div>
      </Suspense>
      <Toaster position="top-right" />
    </ThemeProvider>
  );
};

export default App;
