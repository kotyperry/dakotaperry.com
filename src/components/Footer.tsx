import './Footer.css'

import { useCallback, useEffect, useRef } from 'react'

import { Link, useLocation } from '@tanstack/react-router'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'


// Lazy analytics tracking - only track if openpanel is loaded
const track = (event: string, data: Record<string, string>) => {
  import('../openpanel').then(({ op }) => op.track(event, data)).catch(() => {})
}

const MotionLink = motion.create(Link)

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Footer() {
  const year = new Date().getFullYear()
  const mainRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const skewValue = useMotionValue(0)
  const smoothSkew = useSpring(skewValue, {
    stiffness: 320,
    damping: 26,
    mass: 0.45,
  })
  const smoothX = useTransform(smoothSkew, (v) => -v)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainRef.current) return
    const rect = mainRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const progress = Math.max(-1, Math.min(1, (x / rect.width - 0.5) * 2))
    skewValue.set(progress * 8)
  }, [skewValue])

  const handleMouseLeave = useCallback(() => {
    skewValue.set(0)
  }, [skewValue])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    // Only prevent default and scroll if we're on the home page
    if (isHomePage) {
      e.preventDefault()
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
    // If not on home page, let the Link component handle navigation
  }, [isHomePage])

  useEffect(() => {
    if (!mainRef.current || !textRef.current) return

    const mainElement = mainRef.current
    const textElement = textRef.current

    // Cache the natural width at 100px so we only measure once
    let naturalWidthAt100px: number | null = null

    const measureAndResize = () => {
      const mainStyles = getComputedStyle(mainElement)
      const paddingLeft = parseFloat(mainStyles.paddingLeft)
      const paddingRight = parseFloat(mainStyles.paddingRight)
      const containerWidth = mainElement.offsetWidth - paddingLeft - paddingRight

      // Measure natural width only once
      if (naturalWidthAt100px === null) {
        textElement.style.fontSize = '100px'
        naturalWidthAt100px = textElement.scrollWidth
      }

      // Calculate scale from cached measurement
      const scale = containerWidth / naturalWidthAt100px
      textElement.style.fontSize = `${100 * scale}px`
    }

    // Initial measurement
    requestAnimationFrame(measureAndResize)

    // Use ResizeObserver instead of resize event for better performance
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(measureAndResize)
    })

    resizeObserver.observe(mainElement)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div 
          className="footer-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="footer-col">
            <span className="col-title">Dakota Perry</span>
            <span className="col-text">Tulsa, Oklahoma</span>
            <span className="col-year">© {year}. All Rights Reserved.</span>
          </div>
          
          <div className="footer-col">
            <span className="col-title">Navigate</span>
            {['Home', 'About', 'Work', 'Contact'].map((item, i) => {
              const sectionId = item === 'Home' ? 'intro' : item === 'Work' ? 'projects' : item.toLowerCase()
              return (
                <MotionLink
                  key={item}
                  to="/"
                  hash={sectionId}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, sectionId)}
                  className="footer-link"
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {item}
                </MotionLink>
              )
            })}
          </div>
          
          <div className="footer-col footer-col-end">
            <span className="col-title">Connect</span>
            <div className="footer-icons">
              <motion.a
                href="https://github.com/kotyperry"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link footer-icon-link"
                custom={0}
                variants={linkVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                aria-label="GitHub"
                onClick={() => track('Social Click', { platform: 'GitHub', location: 'Footer' })}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/koty-perry/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link footer-icon-link"
                custom={1}
                variants={linkVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                aria-label="LinkedIn"
                onClick={() => track('Social Click', { platform: 'LinkedIn', location: 'Footer' })}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={mainRef}
          className="footer-main"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.h2 
            ref={textRef}
            className="footer-headline"
            style={{ skewX: smoothSkew, x: smoothX }}
          >
            LETS WORK
          </motion.h2>
        </motion.div>
      </div>
    </footer>
  )
}
