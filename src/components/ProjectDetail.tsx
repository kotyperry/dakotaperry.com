import { motion } from 'framer-motion'
import { useEffect } from 'react'
import './ProjectDetail.css'

export interface ProjectMedia {
  type: 'image' | 'video'
  src: string
  alt?: string
  caption?: string
  aspectRatio?: string
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  fullDescription: string
  tech: string[]
  year: string
  color: string
  role: string
  duration: string
  client?: string
  liveUrl?: string
  media: ProjectMedia[]
  highlights: string[]
}

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
  }
}

const contentVariants = {
  hidden: { 
    opacity: 0,
    y: 60,
    scale: 0.98
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: 40,
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      className="project-detail-overlay"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="project-detail-container"
        variants={contentVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          className="project-detail-close"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </motion.button>

        {/* Scroll Container */}
        <div className="project-detail-scroll">
          {/* Hero Section */}
          <motion.div 
            className="project-detail-hero"
            style={{ background: project.color }}
          >
            <motion.div 
              className="hero-content"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="hero-category" variants={fadeInUp}>
                {project.category}
              </motion.span>
              <motion.h1 className="hero-title" variants={fadeInUp}>
                {project.title}
              </motion.h1>
              <motion.p className="hero-description" variants={fadeInUp}>
                {project.description}
              </motion.p>
            </motion.div>
            <div className="hero-gradient" />
          </motion.div>

          {/* Project Info Bar */}
          <motion.div 
            className="project-info-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="info-item">
              <span className="info-label">Role</span>
              <span className="info-value">{project.role}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Duration</span>
              <span className="info-value">{project.duration}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Year</span>
              <span className="info-value">{project.year}</span>
            </div>
            {project.client && (
              <div className="info-item">
                <span className="info-label">Client</span>
                <span className="info-value">{project.client}</span>
              </div>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="info-link"
              >
                <span>View Live</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
          </motion.div>

          {/* Main Content */}
          <div className="project-detail-content">
            {/* Full Description */}
            <motion.section 
              className="content-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Overview</h2>
              <p className="section-text">{project.fullDescription}</p>
            </motion.section>

            {/* Tech Stack */}
            <motion.section 
              className="content-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Technology Stack</h2>
              <div className="tech-grid">
                {project.tech.map((tech, index) => (
                  <motion.span 
                    key={tech}
                    className="tech-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* Highlights */}
            {project.highlights.length > 0 && (
              <motion.section 
                className="content-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title">Key Highlights</h2>
                <ul className="highlights-list">
                  {project.highlights.map((highlight, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="highlight-marker">→</span>
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Media Gallery */}
            {project.media.length > 0 && (
              <motion.section 
                className="content-section media-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title">Project Gallery</h2>
                <div className="media-gallery">
                  {project.media.map((item, index) => (
                    <motion.div 
                      key={index}
                      className={`media-item ${item.aspectRatio || 'landscape'}`}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      {item.type === 'image' ? (
                        <div className="media-image-wrapper">
                          <img 
                            src={item.src} 
                            alt={item.alt || `${project.title} - Image ${index + 1}`}
                            loading="lazy"
                          />
                          <div className="media-overlay" />
                        </div>
                      ) : (
                        <div className="media-video-wrapper">
                          <video 
                            src={item.src}
                            controls
                            playsInline
                            preload="metadata"
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                      {item.caption && (
                        <p className="media-caption">{item.caption}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Footer Navigation */}
          <motion.div 
            className="project-detail-footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button className="footer-close" onClick={onClose}>
              <span>Close Project</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
