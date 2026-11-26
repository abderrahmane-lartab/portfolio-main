import { Award, BriefcaseBusiness, GraduationCap } from "lucide-react";
import React, { useState, useRef, useLayoutEffect } from "react";
import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";
import SplitText from "./flowBits/SplitText";
import FadeContent from "./flowBits/FadeContent";

export const Experience = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("education");
  const { theme } = useTheme();

  const tabsRef = useRef([]);
  const [underlineStyle, setUnderlineStyle] = useState({});

  useLayoutEffect(() => {
    const updateUnderline = () => {
      const activeIndex = activeTab === "education" ? 0 : 1;
      const currentTab = tabsRef.current[activeIndex];
      if (currentTab) {
        setUnderlineStyle({
          left: currentTab.offsetLeft,
          width: currentTab.offsetWidth,
        });
      }
    };

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeTab, t]);

  const education = t("education.items", { returnObjects: true });
  const experience = t("experience.items", { returnObjects: true });

  const educationWithPosition = education.map((item, index) => ({
    ...item,
    id: index + 1,
    position: index % 2 === 0 ? "right" : "left",
  }));

  const experienceWithPosition = experience.map((item, index) => ({
    ...item,
    id: index + 1,
    position: index % 2 === 0 ? "right" : "left",
    type: item.title.toLowerCase().includes("hackathon") ? "award" : "work",
  }));

  const renderExperienceIcon = (type) => {
    switch (type) {
      case "award":
        return <Award className="stroke-gray-500 w-5 h-5" />;
      case "work":
      default:
        return <BriefcaseBusiness className="stroke-gray-500 w-5 h-5" />;
    }
  };

  const getEducationBadges = (item) => {
    const inst = `${item.institution || ""} ${item.title || ""}`.toLowerCase();

    // Partnership: YouCode × UM6P
    if (inst.includes("youcode")) {
      return [
        {
          src: "/photos/schools/youcode.svg",
          alt: "YouCode",
          wrapperClass:
            "bg-[#25282c] border border-white/10 px-2.5 py-1 rounded-[7px] shadow-2xs",
          imgClass: "h-6 w-auto object-contain",
        },
        {
          src: "/photos/schools/um6p.svg",
          alt: "UM6P – Mohammed VI Polytechnic University",
          wrapperClass:
            "bg-white border border-slate-200/90 px-2 py-1 rounded-[7px] shadow-2xs",
          imgClass: "h-6 w-auto object-contain",
        },
      ];
    }

    // OFPPT – ISAG Lalla Aicha
    if (inst.includes("ofppt") || inst.includes("isag")) {
      return [
        {
          src: "/photos/schools/ofppt.png",
          alt: "OFPPT – ISAG Lalla Aicha",
          wrapperClass:
            "bg-white border border-slate-200/90 px-2.5 py-1 rounded-[8px] shadow-2xs",
          imgClass: "h-9 w-auto object-contain",
        },
      ];
    }

    // High School Baccalaureate (Moroccan Ministry of National Education)
    return [
      {
        src: "/photos/schools/men-maroc.svg",
        alt: item.institution || "Baccalauréat",
        wrapperClass:
          "bg-white border border-slate-200/90 p-1 rounded-[9px] shadow-2xs",
        imgClass: "size-8 object-contain",
      },
    ];
  };

  const renderEducationLogoRow = (item) => {
    if (activeTab !== "education") return null;
    const badges = getEducationBadges(item);
    if (!badges.length) return null;

    return (
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {badges.map((badge, idx) => (
          <React.Fragment key={badge.alt}>
            {idx > 0 && (
              <span
                aria-hidden="true"
                className={`text-xs font-bold select-none ${theme === "light" ? "text-slate-400" : "text-slate-500"
                  }`}
              >
                ×
              </span>
            )}
            <span className={`inline-flex items-center justify-center ${badge.wrapperClass}`}>
              <img
                src={badge.src}
                alt={badge.alt}
                loading="lazy"
                className={badge.imgClass}
              />
            </span>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const TimelineItem = ({ item }) => (
    <div
      className={`flex flex-col sm:flex-row w-full mb-8 relative ${item.position === "right"
        ? "sm:justify-end max-md:justify-start!"
        : "max-md:justify-start!"
        }`}
    >
      {/* Center Icon */}
      <div className="absolute sm:left-1/2 left-0 sm:-translate-x-1/2 max-md:left-0! max-sm:-left-[15px]! max-md:justify-start! top-0 sm:top-auto z-10 flex justify-center items-center w-full sm:w-auto mb-2 sm:mb-0">
        <span className="flex shrink-0 justify-center items-center w-8 h-8 border shadow-sm bg-[var(--soft-gray)] border-[var(--soft-gray)] text-sm font-semibold uppercase rounded-full">
          {activeTab === "education" ? (
            <GraduationCap className="stroke-[var(--icons-color-2)] w-5 h-5" />
          ) : (
            renderExperienceIcon(item.type)
          )}
        </span>
      </div>

      {/* Card */}
      <div
        className={`w-full sm:w-1/2 max-md:w-full! max-sm:hidden ${item.position === "right"
          ? "sm:pl-8 sm:pr-0 max-sm:pl-8"
          : "sm:pr-8 sm:pl-0 max-md:pl-8! max-md:pr-0!"
          } mt-6 sm:mt-0 text-start max-sm:mt-0 sm:text-${item.position === "right" ? "left" : "right"
          }`}
      >
        <FadeContent
          blur={true}
          duration={1100}
          easing="ease-out"
          delay={300}
          initialOpacity={0}
        >
          <div
            className={`p-4 sm:p-5 rounded-r-[14px] rounded-l-[3px] border border-l-[4px] border-l-[#0c5a84] dark:border-l-sky-400 shadow-xs flex flex-col gap-1 ${theme === "light"
              ? "bg-white/88 border-slate-200/85"
              : "bg-[#222226]/92 border-white/10"
              }`}
          >
            {renderEducationLogoRow(item)}
            <h3
              className={`font-bold ${theme === "light" ? "text-slate-900" : "text-slate-100"
                }`}
            >
              {item.title}
            </h3>
            <p
              className={`text-sm font-semibold ${theme === "light" ? "text-[#0c5a84]" : "text-sky-300"
                }`}
            >
              {item.institution}
            </p>
            {item.location && (
              <p
                className={`text-xs sm:text-sm ${theme === "light" ? "text-slate-500" : "text-slate-400"
                  }`}
              >
                {item.location}
              </p>
            )}
            <p
              className={`text-xs font-medium ${theme === "light" ? "text-slate-500" : "text-slate-400"
                }`}
            >
              {item.period}
            </p>
            {item.description && (
              <div
                className={`text-sm mt-1.5 text-wrap break-words text-left leading-relaxed ${theme === "light" ? "text-slate-600" : "text-slate-300"
                  }`}
              >
                {item.description.split("\\n").map((line, index) => (
                  <p key={index} className={index > 0 ? "mt-1" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        </FadeContent>
      </div>
      <div
        className={`w-full sm:w-1/2 max-md:w-full! min-sm:hidden ${item.position === "right"
          ? "sm:pl-8 sm:pr-0 max-sm:pl-8"
          : "sm:pr-8 sm:pl-0 max-md:pl-8! max-md:pr-0!"
          } mt-6 sm:mt-0 text-start max-sm:mt-0 sm:text-${item.position === "right" ? "left" : "right"
          }`}
      >
        <div
          className={`p-4 rounded-r-[14px] rounded-l-[3px] border border-l-[4px] border-l-[#0c5a84] dark:border-l-sky-400 shadow-xs flex flex-col gap-1 ${theme === "light"
            ? "bg-white/88 border-slate-200/85"
            : "bg-[#222226]/92 border-white/10"
            }`}
        >
          {renderEducationLogoRow(item)}
          <h3
            className={`font-bold ${theme === "light" ? "text-slate-900" : "text-slate-100"
              }`}
          >
            {item.title}
          </h3>
          <p
            className={`text-sm font-semibold ${theme === "light" ? "text-[#0c5a84]" : "text-sky-300"
              }`}
          >
            {item.institution}
          </p>
          {item.location && (
            <p
              className={`text-xs sm:text-sm ${theme === "light" ? "text-slate-500" : "text-slate-400"
                }`}
            >
              {item.location}
            </p>
          )}
          <p
            className={`text-xs font-medium ${theme === "light" ? "text-slate-500" : "text-slate-400"
              }`}
          >
            {item.period}
          </p>
          {item.description && (
            <div
              className={`text-sm mt-1.5 text-wrap break-words text-left leading-relaxed ${theme === "light" ? "text-slate-600" : "text-slate-300"
                }`}
            >
              {item.description.split("\\n").map((line, index) => (
                <p key={index} className={index > 0 ? "mt-1" : ""}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="experience" className="mt-20 px-4 sm:px-0">
      <SplitText
        key={i18n.language}
        text={t("Education & Experience")}
        tag="h1"
        className="flexy font-bold text-2xl gap-2"
        delay={20}
        duration={0.2}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
      />

      {/* Tabs */}
      <div className="mt-10 relative flex flex-col w-[80%] max-lg:w-[90%] max-md:w-[80%] max-sm:w-[90%] m-auto">
        <div className="flexy gap-16 relative overflow-x-auto scrollbar-hidden">
          {["education", "experience"].map((key, index) => {
            const isActive = activeTab === key;
            const label =
              key === "education" ? t("Education") : t("Experience");

            return (
              <button
                key={key}
                ref={(el) => (tabsRef.current[index] = el)}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-3 pb-2 transition-all duration-300 cursor-pointer ${isActive
                  ? "text-[#0c5a84] dark:text-sky-400 font-semibold"
                  : "text-[var(--icons-color)] hover:text-[var(--text-dark)]"
                  }`}
              >
                {key === "education" ? (
                  <GraduationCap />
                ) : (
                  <BriefcaseBusiness />
                )}
                <p className="font-bold">{label}</p>
              </button>
            );
          })}

          {/* Dynamic underline */}
          <span
            className="absolute bottom-0 h-[3px] bg-gradient-to-r from-[#0c5a84] via-sky-500 to-indigo-500 rounded-full transition-all duration-500 ease-in-out"
            style={underlineStyle}
          />
        </div>

        {/* Timeline content */}
        <div className="mt-8 relative flex flex-col items-center">
          {/* Vertical line */}
          <div className="absolute sm:left-1/2 left-2 top-0 bottom-0 w-[2px] max-md:left-0! bg-gray-300"></div>

          {(activeTab === "education"
            ? educationWithPosition
            : experienceWithPosition
          ).map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
