import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./ProjectGallery.css";
import type { ProjectMedia } from "../../data/projects";

interface ProjectGalleryProps {
  media: ProjectMedia[];
  title: string;
}

const overlayTransition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };

export default function ProjectGallery({ media, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;
  const active = isOpen ? media[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (direction: number) => {
      setActiveIndex((current) => {
        if (current === null) return current;
        return (current + direction + media.length) % media.length;
      });
    },
    [media.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, step]);

  return (
    <>
      <div className="media-gallery">
        {media.map((item, index) => (
          <div
            key={item.src}
            className={`media-item ${item.aspectRatio || "landscape"}`}
          >
            <motion.button
              type="button"
              className="media-trigger"
              onClick={() => setActiveIndex(index)}
              aria-label={`Expand: ${item.alt || `${title} media ${index + 1}`}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {item.type === "image" ? (
                <div className="media-image-wrapper">
                  <img
                    src={item.src}
                    alt={item.alt || `${title} - Image ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="media-video-wrapper">
                  <video
                    src={item.src}
                    aria-label={item.alt || `${title} - Video ${index + 1}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              )}
              <span className="media-expand-hint" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                Expand
              </span>
            </motion.button>
            {item.caption && <p className="media-caption">{item.caption}</p>}
          </div>
        ))}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && active && (
          <motion.div
            className="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
            onClick={close}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={close}
              aria-label="Close viewer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {media.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-nav prev"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous item"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="lightbox-nav next"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next item"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </>
            )}

            <motion.figure
              key={active.src}
              className={`lightbox-content ${active.aspectRatio || "landscape"}`}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={overlayTransition}
              onClick={(event) => event.stopPropagation()}
            >
              {active.type === "image" ? (
                <img
                  src={active.src}
                  alt={active.alt || `${title} - expanded view`}
                />
              ) : (
                <video
                  src={active.src}
                  aria-label={active.alt || `${title} - expanded video`}
                  autoPlay
                  loop
                  playsInline
                  controls
                />
              )}
              <figcaption>
                <span className="lightbox-counter">
                  {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(media.length).padStart(2, "0")}
                </span>
                {active.caption && <span>{active.caption}</span>}
              </figcaption>
            </motion.figure>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
