import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Navigation.css'

interface NavigationProps {
  onMenuClick: () => void
}

export default function Navigation({ onMenuClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`navigation ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="nav-left">
        <a href="#intro" className="nav-logo">DP</a>
      </div>

      <div className="nav-center">
        <span className="nav-status">
          <span className="status-dot" />
          Available for projects
        </span>
      </div>

      <div className="nav-right">
        <button className="menu-btn" onClick={onMenuClick}>
          <span className="menu-lines">
            <span />
            <span />
          </span>
          Menu
        </button>
      </div>
    </motion.header>
  )
}
