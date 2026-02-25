import "./Sidebar.css";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

type SidebarSection = {
  id: string;
  label: string;
};

const homeSections: SidebarSection[] = [
  { id: "intro", label: "Home" },
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const workSections: SidebarSection[] = [
  { id: "hero", label: "Hero" },
  { id: "overview", label: "Overview" },
  { id: "tech", label: "Tech" },
  { id: "highlights", label: "Highlights" },
  { id: "gallery", label: "Gallery" },
];

const isWorkPage = () =>
  typeof window !== "undefined" && window.location.pathname.startsWith("/work/");

function throttle<T extends (...args: never[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= ms) {
      lastCall = now;
      fn(...args);
    }
  };
}

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("intro");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [availableSections, setAvailableSections] =
    useState<SidebarSection[]>(homeSections);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const nextTheme: ThemeMode = event.matches ? "dark" : "light";
        setTheme(nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
      }
    };

    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  useEffect(() => {
    const workRoute = isWorkPage();
    const sections = workRoute ? workSections : homeSections;

    if (workRoute) {
      window.setTimeout(() => {
        setAvailableSections(
          sections.filter((section) => document.getElementById(section.id) !== null)
        );
      }, 100);
      setActiveSection("hero");
      return;
    }

    setAvailableSections(sections);
    setActiveSection("intro");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of availableSections) {
        const element = document.getElementById(section.id);
        if (!element) {
          continue;
        }

        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    const throttledScroll = throttle(handleScroll, 100);

    handleScroll();
    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", throttledScroll);

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", throttledScroll);
    };
  }, [availableSections]);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.href = "/";
  };

  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <motion.aside
      className="sidebar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <a href="/" onClick={handleLogoClick} className="sidebar-logo">
        DP
      </a>

      <nav className="sidebar-nav">
        {availableSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(event) => handleSectionClick(event, section.id)}
            className={`sidebar-link ${activeSection === section.id ? "active" : ""}`}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </motion.aside>
  );
}
