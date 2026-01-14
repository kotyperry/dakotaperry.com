import { motion } from 'framer-motion'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import './Sidebar.css'

interface SidebarProps {
  activeSection: string
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const homeSections = [
  { id: 'intro', label: 'Home' },
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const workSections = [
  { id: 'hero', label: 'Hero' },
  { id: 'overview', label: 'Overview' },
  { id: 'tech', label: 'Tech' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'gallery', label: 'Gallery' },
]

export default function Sidebar({ activeSection, theme, toggleTheme }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [availableSections, setAvailableSections] = useState(homeSections)

  const isWorkPage = location.pathname.startsWith('/work/')

  // Filter sections based on what exists in the DOM
  useEffect(() => {
    if (isWorkPage) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const existingSections = workSections.filter(section => 
          document.getElementById(section.id) !== null
        )
        setAvailableSections(existingSections)
      }, 100)
    } else {
      setAvailableSections(homeSections)
    }
  }, [isWorkPage, location.pathname])

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (location.pathname === '/') {
      // If already on homepage, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Navigate to homepage
      navigate({ to: '/' })
    }
  }

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <motion.aside 
      className="sidebar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <a href="/" onClick={handleLogoClick} className="sidebar-logo">DP</a>
      
      <nav className="sidebar-nav">
        {availableSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleSectionClick(e, section.id)}
            className={`sidebar-link ${activeSection === section.id ? 'active' : ''}`}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>
    </motion.aside>
  )
}
