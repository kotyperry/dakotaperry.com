import "./Navigation.css";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// const track = (event: string, data: Record<string, string>) => {
//   import("../../openpanel")
//     .then(({ op }) => op.track(event, data))
//     .catch(() => {});
// };

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

interface NavigationProps {
  onMenuClick: () => void;
}

const isWorkRoute = () =>
  typeof window !== "undefined" && window.location.pathname.startsWith("/work/");

export default function Navigation({ onMenuClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [workPage, setWorkPage] = useState(isWorkRoute());

  useEffect(() => {
    const handleRouteChange = () => setWorkPage(isWorkRoute());
    handleRouteChange();

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("hashchange", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("hashchange", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const throttledScroll = throttle(handleScroll, 100);

    handleScroll();

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  const handleClose = () => {
    window.location.href = "/";
  };

  const handleAvailableClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // track("Available For Work Click", {
    //   from_page: workPage ? "Work Detail" : "Home",
    // });

    if (workPage) {
      window.location.href = "/#contact";
      return;
    }

    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (workPage) {
      window.location.href = "/#intro";
      return;
    }

    const element = document.getElementById("intro");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      className={`navigation ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="nav-left">
        <a href="#intro" onClick={handleLogoClick} className="nav-logo">
          DP
        </a>
      </div>

      <div className="nav-center">
        <a href="#contact" onClick={handleAvailableClick} className="nav-status">
          <span className="status-dot" />
          AVAILABLE FOR PROJECTS
        </a>
      </div>

      <div className="nav-right">
        {workPage ? (
          <motion.button
            className="close-btn"
            onClick={handleClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Close
          </motion.button>
        ) : (
          <button className="menu-btn" onClick={onMenuClick}>
            <span className="menu-lines">
              <span />
              <span />
            </span>
            Menu
          </button>
        )}
      </div>
    </motion.header>
  );
}
