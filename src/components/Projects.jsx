import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderGit2,
  Layers,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";
import SplitText from "./flowBits/SplitText";

const PROJECTS_PER_PAGE = 3;

export const Projects = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!selectedProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  const projects = [
    {
      id: "brain-tumor-ai",
      name: "Brain Tumor AI",
      categoryKey: "ai",
      badge: t("Deep Learning & CV", "Deep Learning & CV"),
      description: t(
        "braintumor_description",
        "A deep learning and computer vision project for brain tumor classification and detection using MRI images across Glioma, Meningioma, No Tumor, and Pituitary classes — built with TensorFlow, Keras, GoogLeNet, YOLOv8, MLflow, Apache Airflow, FastAPI, and Streamlit."
      ),
      image: "/photos/projects/braintumor/cover.png",
      previewImage: "/photos/projects/braintumor/cover.png",
      githubUrl:
        "https://github.com/abderrahmane-lartab/TumorClassificationAndDetection",
      githubLabel: "TumorClassificationAndDetection",
      secondaryGithubUrl: "https://github.com/abderrahmane-lartab/Brain-IRM-CNN",
      secondaryGithubLabel: "Brain-IRM-CNN",
      tech: [
        { name: "TensorFlow", logo: "TensorFlow.svg" },
        { name: "Keras", logo: "Keras.svg" },
        { name: "YOLOv8", logo: "YOLOv8.svg" },
        { name: "MLflow", logo: "MLflow.svg" },
        { name: "Airflow", logo: "Airflow.svg" },
        { name: "FastAPI", logo: "FastAPI.svg" },
        { name: "Streamlit", logo: "Streamlit.svg" },
      ],
    },
    {
      id: "dataco-recengine",
      name: "DataCo RecEngine – Azure AI",
      categoryKey: "data",
      alsoIn: ["ai"],
      badge: t("Data Engineering & ML", "Data Engineering & ML"),
      description: t(
        "dataco_description",
        "An end-to-end Azure data engineering and machine learning project focused on consumption forecasting using Azure Data Factory, Azure Data Lake Storage Gen2, Azure Compute, and Azure Machine Learning."
      ),
      image: "/photos/projects/dataco/cover.png",
      previewImage: "/photos/projects/dataco/cover.png",
      githubUrl: "https://github.com/abderrahmane-lartab",
      tech: [
        { name: "Azure", logo: "Azure.svg" },
        { name: "Python", logo: "Python.png" },
        { name: "PySpark", logo: "PySpark.svg" },
        { name: "Scikit-learn", logo: "ScikitLearn.svg" },
      ],
    },
    {
      id: "telco-churn",
      name: "Telco Customer Churn Prediction",
      categoryKey: "ai",
      badge: t("Machine Learning", "Machine Learning"),
      description: t(
        "churn_description",
        "A machine learning solution analyzing customer behavior, segmenting customer profiles, and predicting subscription cancellation (churn) using Python, Pandas, NumPy, and Scikit-learn."
      ),
      image: "/photos/projects/churn/cover.png",
      previewImage: "/photos/projects/churn/cover.png",
      githubUrl: "https://github.com/abderrahmane-lartab/Prediction-Churn-Client",
      githubLabel: "Prediction-Churn-Client",
      tech: [
        { name: "Python", logo: "Python.png" },
        { name: "Scikit-learn", logo: "ScikitLearn.svg" },
        { name: "Pandas", logo: "Pandas.svg" },
        { name: "NumPy", logo: "NumPy.svg" },
      ],
    },
    {
      id: "digitech-ecommerce",
      name: "Digitech E-commerce",
      categoryKey: "fullstack",
      badge: "Full Stack · E-Commerce",
      description: t(
        "digitech_description",
        "A full-stack electronics e-commerce platform featuring product catalog browsing, user authentication, shopping cart, and order management — powered by React.js and a Laravel REST API."
      ),
      image: "/photos/projects/digitech/cover.png",
      previewImage: "/photos/projects/digitech/cover.png",
      githubUrl: "https://github.com/abderrahmane-lartab",
      tech: [
        { name: "React.js", logo: "React.png" },
        { name: "Laravel", logo: "Laravel.png" },
        { name: "PHP", logo: "Php.png" },
        { name: "MySQL", logo: "MySQL.png" },
        { name: "Tailwind CSS", logo: "TailwindCss.png" },
      ],
    },
    {
      id: "pipeline-crm",
      name: "Sales Pipeline CRM",
      categoryKey: "fullstack",
      badge: "Full Stack · CRM",
      description: t("pipeline_description"),
      image: "/photos/projects/pipeline/pipeline.png",
      previewImage: "/photos/projects/pipeline/pipeline_laptop.png",
      liveUrl: "https://sales-force-maroc-crm.vercel.app/",
      githubUrl: "https://github.com/abderrahmane-lartab",
      tech: [
        { name: "React.js", logo: "React.png" },
        { name: "JavaScript", logo: "Javascript.png" },
        { name: "Tailwind CSS", logo: "TailwindCss.png" },
      ],
    },
    {
      id: "park-smart",
      name: "Park-Smart",
      categoryKey: "fullstack",
      badge: "Full Stack · Web App",
      description: t("parksmart_description"),
      image: "/photos/projects/parksmart/parksmart.png",
      previewImage: "/photos/projects/parksmart/parksmart_laptop.png",
      liveUrl: "https://park-smart-prototype.vercel.app/",
      githubUrl: "https://github.com/abderrahmane-lartab",
      tech: [
        { name: "React.js", logo: "React.png" },
        { name: "JavaScript", logo: "Javascript.png" },
        { name: "Tailwind CSS", logo: "TailwindCss.png" },
      ],
    },
    {
      id: "tech-news",
      name: "Tech-News",
      categoryKey: "fullstack",
      badge: "Web Platform",
      description: t("technews_description"),
      image: "/photos/projects/technews/technews.png",
      previewImage: "/photos/projects/technews/technews_laptop.png",
      liveUrl: "https://blog-tech-news.vercel.app/",
      githubUrl: "https://github.com/abderrahmane-lartab",
      tech: [
        { name: "React.js", logo: "React.png" },
        { name: "JavaScript", logo: "Javascript.png" },
        { name: "Tailwind CSS", logo: "TailwindCss.png" },
      ],
    },
    {
      id: "somadix",
      name: "Somadix",
      categoryKey: "fullstack",
      badge: "Client Platform",
      description: t("somadix_description"),
      image: "/photos/projects/somadix/somadix.png",
      previewImage: "/photos/projects/somadix/somadix_laptop.png",
      liveUrl: "https://somadix.ma/",
      tech: [
        { name: "React.js", logo: "React.png" },
        { name: "Tailwind CSS", logo: "TailwindCss.png" },
      ],
    },
  ];

  const additionalProjects = [
    {
      name: "Brain-IRM-CNN",
      tag: "CNN Brain MRI Classification · TensorFlow",
      url: "https://github.com/abderrahmane-lartab/Brain-IRM-CNN",
    },
    {
      name: "School Management SaaS",
      tag: t(
        "BRT Solutions Internship · Students, Classes, Payments & SMS",
        "BRT Solutions Internship · Students, Classes, Payments & SMS"
      ),
    },
    {
      name: "AI-Powered Portfolio",
      tag: "React.js · Node.js · Gemini API Assistant",
    },
  ];

  const matchesCategory = (project, cat) => {
    if (cat === "all") return true;
    return (
      project.categoryKey === cat ||
      (Array.isArray(project.alsoIn) && project.alsoIn.includes(cat))
    );
  };

  const categories = [
    { key: "all", label: t("All", "All") },
    { key: "ai", label: t("AI & ML", "AI & ML") },
    { key: "data", label: t("Data & Cloud", "Data & Cloud") },
    { key: "fullstack", label: t("Full Stack Web", "Full Stack Web") },
  ].map((cat) => ({
    ...cat,
    count: projects.filter((p) => matchesCategory(p, cat.key)).length,
  }));

  const filteredProjects = projects.filter((p) =>
    matchesCategory(p, activeCategory)
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE
  );

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    const next = Math.max(1, Math.min(totalPages, page));
    if (next === safePage) return;
    setCurrentPage(next);

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < -40) {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const projectModal = (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          key="project-modal-backdrop"
          data-no-constellation="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            key="project-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.name}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${
              isLight
                ? "bg-white border-slate-200 text-slate-900"
                : "bg-[#1e1e22] border-white/12 text-slate-100"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`sticky top-0 z-10 flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b backdrop-blur-md ${
                isLight
                  ? "bg-white/90 border-slate-200/80"
                  : "bg-[#1e1e22]/90 border-white/10"
              }`}
            >
              <div className="min-w-0 text-left">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider ${
                    isLight ? "text-[#0c5a84]" : "text-sky-400"
                  }`}
                >
                  {selectedProject.badge}
                </span>
                <h3 className="font-bold text-base sm:text-lg truncate mt-0.5">
                  {selectedProject.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className={`p-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
                  isLight
                    ? "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                    : "hover:bg-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Preview Image */}
            <div
              className={`p-4 sm:p-6 border-b ${
                isLight
                  ? "bg-slate-50 border-slate-200/70"
                  : "bg-[#151518] border-white/[0.08]"
              }`}
            >
              <img
                src={selectedProject.previewImage || selectedProject.image}
                alt={selectedProject.name}
                className="w-full max-h-[340px] object-contain rounded-2xl mx-auto"
              />
            </div>

            {/* Description & Stack */}
            <div className="p-5 sm:p-6 text-left space-y-5">
              <p
                className={`text-sm sm:text-[15px] leading-relaxed ${
                  isLight ? "text-slate-700" : "text-slate-300"
                }`}
              >
                {selectedProject.description}
              </p>

              <div>
                <h4
                  className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {t("Technologies Used", "Technologies Used")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((techItem) => (
                    <span
                      key={techItem.name}
                      className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border ${
                        isLight
                          ? "bg-slate-50 text-slate-800 border-slate-200/85"
                          : "bg-white/[0.05] text-slate-200 border-white/10"
                      }`}
                    >
                      <span className="size-4.5 rounded-md bg-white flex items-center justify-center p-0.5 shrink-0">
                        <img
                          src={`/photos/stacks/${techItem.logo}`}
                          alt={techItem.name}
                          className="max-h-3.5 max-w-3.5 object-contain"
                        />
                      </span>
                      <span>{techItem.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0c5a84] hover:bg-[#094a6d] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                  >
                    <span>Show Live Demo</span>
                    <ExternalLink className="size-4" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors ${
                      isLight
                        ? "bg-slate-100 hover:bg-slate-200/80 text-slate-800 border-slate-200"
                        : "bg-white/[0.06] hover:bg-white/10 text-slate-100 border-white/10"
                    }`}
                  >
                    <FolderGit2 className="size-4 shrink-0" />
                    <span>
                      {selectedProject.githubLabel
                        ? `GitHub · ${selectedProject.githubLabel}`
                        : "GitHub"}
                    </span>
                  </a>
                )}
                {selectedProject.secondaryGithubUrl && (
                  <a
                    href={selectedProject.secondaryGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors ${
                      isLight
                        ? "bg-slate-100 hover:bg-slate-200/80 text-slate-800 border-slate-200"
                        : "bg-white/[0.06] hover:bg-white/10 text-slate-100 border-white/10"
                    }`}
                  >
                    <FolderGit2 className="size-4 shrink-0" />
                    <span>
                      {selectedProject.secondaryGithubLabel
                        ? `GitHub · ${selectedProject.secondaryGithubLabel}`
                        : "GitHub Repo 2"}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="pt-20 max-sm:pt-12 pb-10 w-[82%] max-xl:w-[88%] max-sm:w-[92%] mx-auto"
    >
      {/* Section Heading */}
      <div className="flex flex-col items-center text-center">
        <SplitText
          key={i18n.language}
          text={t("Projects")}
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
        <p
          className={`mt-2.5 text-sm sm:text-base font-medium max-w-xl ${
            isLight ? "text-slate-600" : "text-slate-400"
          }`}
        >
          {t("Each project is a unique piece of development")} 🧩
        </p>
      </div>

      {/* Segmented Category Filter Bar */}
      <div className="mt-8 flex justify-center">
        <div
          data-no-constellation="true"
          className={`inline-flex items-center gap-1.5 overflow-x-auto max-w-full scrollbar-hidden p-1.5 rounded-2xl border backdrop-blur-md relative z-30 ${
            isLight
              ? "bg-white/80 border-slate-200/85 shadow-xs"
              : "bg-[#222226]/90 border-white/10"
          }`}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategoryChange(cat.key)}
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
                    layoutId="projects-active-pill"
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
                    {cat.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Paginated 3-Card Bento Grid (data-no-constellation suppresses mouse network overlay) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-page-${safePage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-30"
        >
          {paginatedProjects.map((project, index) => (
            <motion.article
              key={project.id}
              data-no-constellation="true"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: index * 0.05 }}
              onClick={() => setSelectedProject(project)}
              className={`group/project rounded-3xl p-4 border flex flex-col cursor-pointer select-none transition-all duration-250 hover:-translate-y-1 backdrop-blur-md shadow-[var(--custom-shadow)] ${
                isLight
                  ? "bg-white/85 hover:bg-white border-slate-200/85 hover:border-[#0c5a84]/35"
                  : "bg-[#222226]/92 hover:bg-[#27272c] border-white/10 hover:border-sky-400/35"
              }`}
            >
              {/* Image Preview Container */}
              <div
                className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border ${
                  isLight
                    ? "bg-slate-100 border-slate-200/70"
                    : "bg-[#16161a] border-white/[0.08]"
                }`}
              >
                <span
                  className={`z-10 text-[11px] font-bold absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 backdrop-blur-md border shadow-2xs ${
                    isLight
                      ? "bg-white/90 text-[#0c5a84] border-slate-200/80"
                      : "bg-slate-900/85 text-sky-300 border-white/15"
                  }`}
                >
                  {project.badge}
                </span>

                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/project:scale-[1.04]"
                />

                {/* Hover Open Button */}
                <span className="absolute top-2.5 right-2.5 z-10 size-8 rounded-full bg-slate-950/65 text-white flex items-center justify-center opacity-0 group-hover/project:opacity-100 transition-opacity duration-200 backdrop-blur-xs">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>

              {/* Card Body */}
              <div className="mt-4 flex-1 flex flex-col text-left">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-lg leading-snug text-[var(--text-dark)] group-hover/project:text-[#0c5a84] dark:group-hover/project:text-sky-300 transition-colors">
                    {project.name}
                  </h2>
                  <div className="flex items-center gap-1 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title={
                          project.githubLabel
                            ? `GitHub: ${project.githubLabel}`
                            : "GitHub Repository"
                        }
                        className={`p-1.5 rounded-lg transition-colors ${
                          isLight
                            ? "text-slate-500 hover:text-[#0c5a84] hover:bg-slate-100"
                            : "text-slate-400 hover:text-sky-300 hover:bg-white/10"
                        }`}
                      >
                        <FolderGit2 className="size-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Live Demo"
                        className={`p-1.5 rounded-lg transition-colors ${
                          isLight
                            ? "text-slate-500 hover:text-[#0c5a84] hover:bg-slate-100"
                            : "text-slate-400 hover:text-sky-300 hover:bg-white/10"
                        }`}
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p
                  className={`mt-1.5 text-xs sm:text-[13.5px] leading-relaxed line-clamp-3 ${
                    isLight ? "text-slate-600" : "text-slate-300/90"
                  }`}
                >
                  {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 5).map((techItem) => (
                    <span
                      key={techItem.name}
                      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-lg border ${
                        isLight
                          ? "bg-slate-50 text-slate-700 border-slate-200/80"
                          : "bg-white/[0.04] text-slate-200 border-white/[0.08]"
                      }`}
                    >
                      <span className="size-3.5 rounded-xs bg-white flex items-center justify-center p-[1px] shrink-0">
                        <img
                          src={`/photos/stacks/${techItem.logo}`}
                          alt=""
                          className="max-h-2.5 max-w-2.5 object-contain"
                        />
                      </span>
                      <span>{techItem.name}</span>
                    </span>
                  ))}
                  {project.tech.length > 5 && (
                    <span
                      className={`text-[11px] font-semibold px-2 py-1 rounded-lg border ${
                        isLight
                          ? "bg-slate-50 text-slate-500 border-slate-200/80"
                          : "bg-white/[0.04] text-slate-400 border-white/[0.08]"
                      }`}
                    >
                      +{project.tech.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls (rendered automatically whenever > 3 projects) */}
      {totalPages > 1 && (
        <div
          data-no-constellation="true"
          className="mt-7 relative z-30 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <div
            className={`inline-flex items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-md ${
              isLight
                ? "bg-white/85 border-slate-200/85 shadow-xs"
                : "bg-[#222226]/92 border-white/10"
            }`}
          >
            <button
              type="button"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              aria-label={t("Previous", "Previous")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors select-none ${
                safePage === 1
                  ? "opacity-40 cursor-not-allowed text-slate-400"
                  : isLight
                  ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950 cursor-pointer"
                  : "text-slate-300 hover:bg-white/[0.08] hover:text-white cursor-pointer"
              }`}
            >
              <ChevronLeft className="size-4" />
              <span className="max-xs:hidden">{t("Previous", "Prev")}</span>
            </button>

            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: totalPages }, (_, idx) => {
                const pageNum = idx + 1;
                const isPageActive = pageNum === safePage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => goToPage(pageNum)}
                    aria-label={`Page ${pageNum}`}
                    aria-current={isPageActive ? "page" : undefined}
                    className={`relative size-8 sm:size-9 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer select-none flex items-center justify-center ${
                      isPageActive
                        ? "text-white dark:text-slate-950"
                        : isLight
                        ? "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.07]"
                    }`}
                  >
                    {isPageActive && (
                      <motion.span
                        layoutId="projects-pagination-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-xl bg-[#0c5a84] dark:bg-sky-400 shadow-xs"
                      />
                    )}
                    <span className="relative z-10">{pageNum}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              aria-label={t("Next", "Next")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors select-none ${
                safePage === totalPages
                  ? "opacity-40 cursor-not-allowed text-slate-400"
                  : isLight
                  ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950 cursor-pointer"
                  : "text-slate-300 hover:bg-white/[0.08] hover:text-white cursor-pointer"
              }`}
            >
              <span className="max-xs:hidden">{t("Next", "Next")}</span>
              <ChevronRight className="size-4" />
            </button>
          </div>

          <span
            className={`text-xs font-medium tabular-nums ${
              isLight ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {startIndex + 1}–
            {Math.min(startIndex + PROJECTS_PER_PAGE, filteredProjects.length)}{" "}
            / {filteredProjects.length}
          </span>
        </div>
      )}

      {/* Additional Full-Stack Projects Strip */}
      <div
        data-no-constellation="true"
        className={`mt-6 relative z-30 rounded-3xl border px-5 sm:px-6 py-4 backdrop-blur-md shadow-[var(--custom-shadow)] ${
          isLight
            ? "bg-white/80 border-slate-200/85"
            : "bg-[#222226]/90 border-white/10"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--text-dark)]">
            <Layers className="size-4 text-[#0c5a84] dark:text-sky-400 shrink-0" />
            <span>{t("Other Projects", "Other Projects")}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {additionalProjects.map((item) =>
              item.url ? (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex flex-wrap items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border transition-colors ${
                    isLight
                      ? "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/85 hover:border-[#0c5a84]/35"
                      : "bg-white/[0.04] hover:bg-white/[0.09] text-slate-200 border-white/[0.08] hover:border-sky-400/35"
                  }`}
                >
                  <FolderGit2 className="size-3.5 text-[#0c5a84] dark:text-sky-400 shrink-0" />
                  <span className="font-bold">{item.name}</span>
                  <span
                    className={isLight ? "text-slate-500" : "text-slate-400"}
                  >
                    · {item.tag}
                  </span>
                </a>
              ) : (
                <span
                  key={item.name}
                  className={`inline-flex flex-wrap items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border ${
                    isLight
                      ? "bg-slate-50 text-slate-700 border-slate-200/85"
                      : "bg-white/[0.04] text-slate-200 border-white/[0.08]"
                  }`}
                >
                  <span className="font-bold">{item.name}</span>
                  <span
                    className={isLight ? "text-slate-500" : "text-slate-400"}
                  >
                    · {item.tag}
                  </span>
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {typeof document !== "undefined"
        ? createPortal(projectModal, document.body)
        : null}
    </section>
  );
};
