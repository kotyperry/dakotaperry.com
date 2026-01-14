import '../../components/ProjectDetail.css'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

import Footer from '../../components/Footer'
import type { Project } from '../../components/ProjectDetail'
import { motion } from 'framer-motion'
import { projects } from '../../components/Projects'
import { useEffect } from 'react'

export const Route = createFileRoute('/work/$projectId')({
  component: WorkDetailComponent,
})

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

function WorkDetailComponent() {
  const { projectId } = Route.useParams()
  const navigate = useNavigate()
  
  const project = projects.find((p: Project) => p.id === projectId)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectId])

  if (!project) {
    return (
      <main className="main-content">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '60vh',
          gap: '2rem'
        }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Project Not Found</h1>
          <button 
            onClick={() => navigate({ to: '/' })}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              padding: '1rem 2rem',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            Back to Home
          </button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <>
      <main className="main-content project-detail-page">
        {/* Hero Section */}
        <motion.div 
          className="project-detail-hero"
          style={{ background: project.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
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
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

      </main>
      
      <Footer />
    </>
  )
}
