import React, { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Certificates } from "./components/Certificates";
import { Available } from "./components/Available";
import { Contact } from "./components/Contact";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { AIAmbientBackground } from "./components/AIAmbientBackground";

export const App = () => {
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
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
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
      <Toaster position="top-right" />
    </ThemeProvider>
  );
};

export default App;
