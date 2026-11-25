import React from "react";
import { Link } from "react-scroll";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Switch from "./ui/Switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Contact } from "./Contact";
import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";
import AnimatedContent from "./flowBits/AnimatedContent";

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
    localStorage.setItem("i18nextLng", lng);
  };

  const [open, setOpen] = React.useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const languages = [
    { id: 1, name: "Français", code: "fr", photo: "/photos/fr.svg" },
    { id: 2, name: "English", code: "en", photo: "/photos/gb.svg" },
    { id: 3, name: "Spanish", code: "es", photo: "/photos/es.svg" },
    { id: 4, name: "German", code: "de", photo: "/photos/de.svg" },
  ];

  const navItems = [
    { to: "home", label: t("Home"), offset: -100 },
    { to: "about", label: t("About"), offset: -120 },
    { to: "skills", label: t("Skills"), offset: -80 },
    { to: "projects", label: t("Projects"), offset: 70 },
    { to: "experience", label: t("Experience"), offset: -100 },
  ];

  const desktopLinkClass = `px-3 max-lg:px-2.5 max-md:px-2 py-1.5 rounded-full text-sm max-md:text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap select-none ${
    isLight
      ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/[0.06]"
      : "text-slate-100 hover:text-white hover:bg-white/12"
  }`;

  const activeDesktopLinkClass = isLight
    ? "bg-[#0c5a84]/12 text-[#0c5a84]! font-bold shadow-2xs"
    : "bg-sky-400/20 text-sky-300! ring-1 ring-sky-400/35 font-bold shadow-2xs";

  return (
    <div className="sticky top-1 max-sm:top-0 z-50">
      <AnimatedContent
        distance={100}
        direction="vertical"
        className=""
        reverse={true}
        duration={0.8}
        ease="easeOut"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.1}
      >
        <nav
          className={`flexy justify-between! gap-4 max-md:gap-2 w-fit min-w-[55%] max-w-[94%] max-lg:w-[86%] max-md:w-[94%] max-sm:w-full max-sm:max-w-full backdrop-blur-xl border m-auto mt-4 max-sm:mt-0 px-6 max-md:px-4 max-sm:px-6 py-2 rounded-full max-sm:rounded-none! max-sm:border-x-0 max-sm:border-t-0 transition-colors duration-200 ${
            isLight
              ? "bg-white/82 border-slate-200/85 shadow-[0_4px_20px_rgba(15,23,42,0.08)]"
              : "bg-[#1c1c21]/90 border-white/14 shadow-[0_8px_28px_rgba(0,0,0,0.5)]"
          }`}
        >
          <Link
            to="home"
            smooth={true}
            duration={600}
            offset={-100}
            className="flexy justify-start! shrink-0"
          >
            <img
              src={
                isLight
                  ? "/photos/MM_black_text.png"
                  : "/photos/MM_white_text.png"
              }
              alt="MM"
              className="h-8 w-8 cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation Text Links */}
          <div className="flexy gap-1.5 max-lg:gap-1 max-[550px]:hidden!">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                duration={600}
                offset={item.offset}
                activeClass={activeDesktopLinkClass}
                className={desktopLinkClass}
              >
                {item.label}
              </Link>
            ))}

            <Sheet>
              <SheetTrigger className={desktopLinkClass}>
                {t("Contact")}
              </SheetTrigger>
              <SheetContent
                side="bottom"
                title={t("Contact")}
                closeClassName="absolute! right-5 top-5 left-auto! p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 opacity-90"
                className="w-full max-w-[1020px] mx-auto max-h-[92vh] h-auto rounded-t-3xl border-x border-t border-black/10 dark:border-white/10 shadow-2xl px-6 sm:px-10 py-6 sm:py-7"
              >
                <Contact />
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Nav Menu */}
          <div className="flexy justify-end! gap-3 ">
            <Sheet>
              <SheetTrigger className="font-menu cursor-pointer min-[550px]:hidden">
                <Tooltip>
                  <TooltipTrigger className="cursor-pointer" asChild>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="var(--icons-color)"
                      className="size-5.5 cursor-pointer mt-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("Contact Me")}</p>
                  </TooltipContent>
                </Tooltip>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                title={t("Contact")}
                closeClassName="absolute! right-4 top-4 left-auto! p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 opacity-90"
                className="w-full max-w-[1020px] mx-auto max-h-[92vh] h-auto rounded-t-3xl border-x border-t border-black/10 dark:border-white/10 shadow-2xl px-5 sm:px-10 py-6 sm:py-7"
              >
                <Contact />
              </SheetContent>
            </Sheet>
            <Switch />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <img
                  src={
                    languages.find((lang) => lang.code === i18n.language)
                      ?.photo || "/photos/Globe.png"
                  }
                  className="rounded-full h-6 w-6 cursor-pointer ring-1 ring-black/10 dark:ring-white/20"
                  alt="language"
                />
              </PopoverTrigger>
              <PopoverContent className="w-fit p-0">
                <Command>
                  <CommandList>
                    <CommandEmpty>No Language found.</CommandEmpty>
                    <CommandGroup>
                      {languages
                        .filter((language) => language.code !== i18n.language)
                        .map((language, index) => (
                          <CommandItem
                            key={index}
                            value={language.name}
                            onSelect={() => changeLanguage(language.code)}
                          >
                            <img
                              src={language.photo}
                              className="rounded-full h-5 w-5"
                              alt={language.code}
                            />
                            {language.name}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </nav>
      </AnimatedContent>
    </div>
  );
};
