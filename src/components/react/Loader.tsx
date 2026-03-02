import "./Loader.css";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LOADER_COOKIE_NAME = "dakota-perry-loader-seen";
const LOADER_STORAGE_KEY = "dakota-perry-loader-seen";
const LOADER_COOKIE_TTL_SECONDS = 60 * 60 * 24 * 7;

const hasSeenLoader = () => {
  try {
    const cookieString = document.cookie;
    const hasCookie = cookieString
      .split(";")
      .map((cookie) => cookie.trim())
      .some((cookie) => cookie.startsWith(`${LOADER_COOKIE_NAME}=`));
    if (hasCookie) return true;
  } catch {
    // Ignore cookie-read errors.
  }

  try {
    return window.localStorage.getItem(LOADER_STORAGE_KEY) === "true";
  } catch {
    // Ignore localStorage errors.
    return false;
  }
};

const setLoaderCookie = () => {
  const expiry = new Date(
    Date.now() + LOADER_COOKIE_TTL_SECONDS * 1000,
  ).toUTCString();
  document.cookie = `${LOADER_COOKIE_NAME}=true; expires=${expiry}; path=/`;
};

const setLoaderStorage = () => {
  window.localStorage.setItem(LOADER_STORAGE_KEY, "true");
};

const letterVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Loader() {
  const [hasChecked, setHasChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const name = "DAKOTA PERRY";

  useEffect(() => {
    const alreadySeen = hasSeenLoader();
    setHasChecked(true);

    if (alreadySeen) {
      return;
    }

    setVisible(true);

    try {
      setLoaderCookie();
      setLoaderStorage();
    } catch {
      // Ignore storage errors.
    }

    const timer = window.setTimeout(() => setVisible(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!hasChecked || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="loader"
        exit={{
          opacity: 0,
          scale: 1.05,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="loader-content">
          <motion.div
            className="loader-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="loader-name">
              {name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="loader-char"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
            <motion.div
              className="loader-bar"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            <motion.span
              className="loader-subtitle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              AI Engineer
            </motion.span>
          </motion.div>
        </div>

        <motion.div
          className="loader-bg-effect"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
