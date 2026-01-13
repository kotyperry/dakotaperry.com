import { motion } from 'framer-motion'
import { useEffect, useRef, useCallback } from 'react'
import './Footer.css'

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

  const resizeText = useCallback(() => {
    if (!mainRef.current || !textRef.current) return
    
    const mainStyles = getComputedStyle(mainRef.current)
    const paddingLeft = parseFloat(mainStyles.paddingLeft)
    const paddingRight = parseFloat(mainStyles.paddingRight)
    const containerWidth = mainRef.current.offsetWidth - paddingLeft - paddingRight
    const textElement = textRef.current
    
    // Temporarily set a base size to measure
    textElement.style.fontSize = '100px'
    
    // Force reflow to get accurate measurement
    void textElement.offsetWidth
    const naturalWidth = textElement.scrollWidth
    
    // Calculate the exact scale to fill container
    const scale = containerWidth / naturalWidth
    const newFontSize = 100 * scale
    
    textElement.style.fontSize = `${newFontSize}px`
  }, [])

  useEffect(() => {
    // Initial resize after mount
    requestAnimationFrame(() => {
      resizeText()
    })
    
    window.addEventListener('resize', resizeText)
    return () => window.removeEventListener('resize', resizeText)
  }, [resizeText])

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
            <span className="col-year">© {year}</span>
          </div>
          
          <div className="footer-col">
            <span className="col-title">Navigate</span>
            {['Home', 'About', 'Work', 'Contact'].map((item, i) => (
              <motion.a 
                key={item}
                href={`#${item === 'Home' ? 'intro' : item === 'Work' ? 'projects' : item.toLowerCase()}`} 
                className="footer-link"
                custom={i}
                variants={linkVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          <div className="footer-col footer-col-end">
            <span className="col-title">Connect</span>
            {[
              { name: 'GitHub', url: 'https://github.com/dakotaperry' },
              { name: 'LinkedIn', url: 'https://linkedin.com/in/dakotaperry' },
              { name: 'Twitter', url: 'https://twitter.com/dakotaperry' },
            ].map((social, i) => (
              <motion.a 
                key={social.name}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link"
                custom={i}
                variants={linkVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {social.name}
              </motion.a>
            ))}
            <motion.a 
              href="#intro" 
              className="back-top"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Back to top</span>
              <span className="top-arrow">↑</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          ref={mainRef}
          className="footer-main"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2 
            ref={textRef}
            className="footer-headline"
          >
            YOUR MOVE
          </motion.h2>
        </motion.div>
      </div>
    </footer>
  )
}
