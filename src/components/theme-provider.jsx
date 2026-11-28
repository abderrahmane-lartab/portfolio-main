import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "abderrahmane-portfolio-theme",
  ...props
}) {
  const [theme, setTheme] = useState(() => {
    try {
      localStorage.removeItem("vite-ui-theme");
      const stored = localStorage.getItem(storageKey);
      if (stored === "light" || stored === "dark") {
        return stored;
      }
    } catch {
      // Ignore storage access errors
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const resolved = theme === "dark" ? "dark" : "light";

    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  }, [theme]);

  const value = {
    theme,
    setTheme: (nextTheme) => {
      const resolved = nextTheme === "dark" ? "dark" : "light";
      try {
        localStorage.setItem(storageKey, resolved);
      } catch {
        // Ignore storage access errors
      }
      setTheme(resolved);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
