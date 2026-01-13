import { motion } from 'framer-motion'
import './Hero.css'

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Hero() {
  const line1 = "Growing businesses."
  const line2 = "Powered by AI."

  return (
    <section id="intro" className="hero">
      <div className="hero-layout">
        {/* Left column - Main content */}
        <div className="hero-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-label">
              <span className="label-dot" />
              Dakota Perry — Tulsa, OK
            </span>
          </motion.div>

          <motion.h1 className="hero-headline">
            <span className="headline-line">
              {line1.split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="headline-char"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
            <span className="headline-line">
              {line2.split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i + line1.length}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="headline-char"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#projects" className="cta-primary">
              <span>See my work</span>
              <span className="cta-arrow">→</span>
            </a>
            <a href="#contact" className="cta-secondary">
              <span>Let's talk</span>
            </a>
          </motion.div>
        </div>

        {/* Right column - Hero image */}
        <motion.div 
          className="hero-right"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="hero-image-wrapper"
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <div className="hero-image-placeholder">
              <span className="placeholder-text">Image</span>
            </div>
            <div className="hero-image-glow" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div 
        className="hero-decoration"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="decoration-line" />
      </motion.div>
    </section>
  )
}
