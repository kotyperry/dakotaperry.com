import './Navigation.css'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'

import { motion } from 'framer-motion'

interface NavigationProps {
  onMenuClick: () => void
}

export default function Navigation({ onMenuClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  const isWorkPage = location.pathname.startsWith('/work/')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClose = () => {
    navigate({ to: '/' })
  }

  const handleAvailableClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (isWorkPage) {
      // If on a work page, navigate to home first then scroll
      navigate({ to: '/' })
      setTimeout(() => {
        const element = document.getElementById('contact')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    } else {
      // If on home page, just scroll to contact
      const element = document.getElementById('contact')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('intro')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <motion.header
      className={`navigation ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="nav-left">
        <a href="#intro" onClick={handleLogoClick} className="nav-logo">DP</a>
      </div>

      <div className="nav-center">
        <a href="#contact" onClick={handleAvailableClick} className="nav-status">
          <span className="status-dot" />
          AVAILABLE FOR PROJECTS
        </a>
      </div>

      <div className="nav-right">
        {isWorkPage ? (
          <motion.button 
            className="close-btn" 
            onClick={handleClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  )
}
