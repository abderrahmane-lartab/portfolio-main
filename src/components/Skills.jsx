import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";
import SplitText from "./flowBits/SplitText";

export const Skills = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeTab, setActiveTab] = useState("AI");

  const categories = [
    {
      key: "AI",
      label: t("AI & ML", "AI & ML"),
      items: [
        { logo: "Python.png", title: "Python", tag: "Core AI" },
        { logo: "NumPy.svg", title: "NumPy", tag: "Numerical" },
        { logo: "Pandas.svg", title: "Pandas", tag: "Data Analysis" },
        { logo: "ScikitLearn.svg", title: "Scikit-learn", tag: "Machine Learning" },
        { logo: "TensorFlow.svg", title: "TensorFlow", tag: "Deep Learning" },
        { logo: "Keras.svg", title: "Keras", tag: "Neural Nets" },
        { logo: "PyTorch.svg", title: "PyTorch", tag: "Deep Learning" },
        { logo: "YOLOv8.svg", title: "YOLOv8", tag: "Computer Vision" },
      ],
    },
    {
      key: "DataCloud",
      label: t("Data & Cloud", "Data & Cloud"),
      items: [
        { logo: "Azure.svg", title: "Microsoft Azure", tag: "ADF · ADLS · Azure ML" },
        { logo: "PySpark.svg", title: "PySpark", tag: "Big Data" },
        { logo: "Airflow.svg", title: "Apache Airflow", tag: "ETL Orchestration" },
        { logo: "MLflow.svg", title: "MLflow", tag: "MLOps Tracking" },
        { logo: "Docker.png", title: "Docker", tag: "Containers" },
        { logo: "Streamlit.svg", title: "Streamlit", tag: "AI Apps" },
      ],
    },
    {
      key: "Frontend",
      label: t("Frontend", "Frontend"),
      items: [
        { logo: "Html.png", title: "HTML5", tag: "Markup" },
        { logo: "Css.png", title: "CSS3", tag: "Styling" },
        { logo: "Javascript.png", title: "JavaScript", tag: "ES6+" },
        { logo: "TypeScript.svg", title: "TypeScript", tag: "Typed JS" },
        { logo: "React.png", title: "React.js", tag: "UI Library" },
        { logo: "NextJs.png", title: "Next.js", tag: "React Framework" },
        { logo: "TailwindCss.png", title: "Tailwind CSS", tag: "Utility CSS" },
        { logo: "Redux.png", title: "Redux Toolkit", tag: "State" },
        { logo: "Bootstrap.png", title: "Bootstrap", tag: "UI Kit" },
        { logo: "ShadCn.png", title: "ShadCn UI", tag: "Components" },
      ],
    },
    {
      key: "Backend",
      label: t("Backend", "Backend"),
      items: [
        { logo: "Python.png", title: "Python", tag: "Backend & AI" },
        { logo: "FastAPI.svg", title: "FastAPI", tag: "Async APIs" },
        { logo: "Php.png", title: "PHP", tag: "Server-side" },
        { logo: "Laravel.png", title: "Laravel", tag: "MVC & REST" },
        { logo: "NodeJs.png", title: "Node.js", tag: "Runtime" },
      ],
    },
    {
      key: "Databases",
      label: t("Databases", "Databases"),
      items: [
        { logo: "MySQL.png", title: "MySQL", tag: "Relational SQL" },
        { logo: "PostgreSQL.svg", title: "PostgreSQL", tag: "Relational SQL" },
        { logo: "MongoDB.png", title: "MongoDB", tag: "NoSQL Document" },
      ],
    },
    {
      key: "Tools",
      label: t("Tools & Linux", "Tools & Linux"),
      items: [
        { logo: "Git.png", title: "Git", tag: "Version Control" },
        { logo: "Github.png", title: "GitHub", tag: "Collaboration" },
        { logo: "Linux.svg", title: "Linux", tag: "OS & Servers" },
        { logo: "Fedora.svg", title: "Fedora", tag: "Workstation" },
        { logo: "Bash.svg", title: "Bash", tag: "Shell Scripting" },
        { logo: "Jupyter.svg", title: "Jupyter", tag: "Notebooks" },
        { logo: "VSCode.svg", title: "VS Code", tag: "Editor" },
        { logo: "Jira.png", title: "Jira", tag: "Agile" },
        { logo: "PostMan.png", title: "Postman", tag: "API Testing" },
      ],
    },
  ];

  const activeCategory =
    categories.find((c) => c.key === activeTab) || categories[0];

  return (
    <section
      id="skills"
      className="pt-14 max-sm:pt-8 w-[82%] max-xl:w-[88%] max-sm:w-[92%] mx-auto"
    >
      {/* Section Heading */}
      <div className="flex flex-col items-center text-center">
        <SplitText
          key={i18n.language}
          text={t("Skills & Technologies")}
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
      </div>

      {/* Modern Segmented Category Bar */}
      <div className="mt-8 flex justify-center">
        <div
          className={`inline-flex items-center gap-1.5 overflow-x-auto max-w-full scrollbar-hidden p-1.5 rounded-2xl border backdrop-blur-md ${
            isLight
              ? "bg-white/80 border-slate-200/85 shadow-xs"
              : "bg-[#222226]/90 border-white/10"
          }`}
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveTab(cat.key)}
                className={`relative px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer select-none ${
                  isActive
                    ? "text-white dark:text-slate-950"
                    : isLight
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skills-active-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-[#0c5a84] dark:bg-sky-400 shadow-xs"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white dark:bg-slate-950/15 dark:text-slate-950"
                        : isLight
                        ? "bg-slate-100 text-slate-500"
                        : "bg-white/[0.07] text-slate-400"
                    }`}
                  >
                    {cat.items.length}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Bento Grid Container */}
      <div
        className={`mt-6 rounded-4xl border px-5 sm:px-8 py-6 sm:py-8 shadow-[var(--custom-shadow)] backdrop-blur-md ${
          isLight
            ? "bg-white/80 border-slate-200/85"
            : "bg-[#222226]/90 border-white/10"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            {activeCategory.items.map((stack, index) => (
              <motion.div
                key={stack.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: index * 0.03 }}
                className={`group flex items-center gap-3.5 rounded-2xl p-3 sm:p-3.5 border transition-all duration-200 hover:-translate-y-0.5 ${
                  isLight
                    ? "bg-slate-50/90 hover:bg-white border-slate-200/80 hover:border-[#0c5a84]/35 hover:shadow-sm"
                    : "bg-white/[0.04] hover:bg-white/[0.07] border-white/[0.08] hover:border-sky-400/30"
                }`}
              >
                {/* Crisp Logo Tile (guarantees contrast for dark & light brand marks) */}
                <div
                  className={`size-11 sm:size-12 shrink-0 rounded-xl flex items-center justify-center p-2 transition-transform duration-200 group-hover:scale-105 ${
                    isLight
                      ? "bg-white border border-slate-200/75 shadow-2xs"
                      : "bg-white/95 shadow-xs"
                  }`}
                >
                  <img
                    src={`/photos/stacks/${stack.logo}`}
                    alt={stack.title}
                    loading="lazy"
                    className="max-h-7 max-w-7 w-auto h-auto object-contain"
                  />
                </div>

                <div className="min-w-0 text-left">
                  <h3 className="font-bold text-xs sm:text-[14px] text-[var(--text-dark)] truncate">
                    {stack.title}
                  </h3>
                  <p
                    className={`text-[11px] sm:text-xs truncate mt-0.5 ${
                      isLight ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {stack.tag}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
