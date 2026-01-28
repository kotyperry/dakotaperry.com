import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

// Throttle utility for scroll performance
function throttle<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= ms) {
      lastCall = now
      fn(...args)
    }
  }
}

import Loader from '../components/Loader'
import Menu from '../components/Menu'
import Navigation from '../components/Navigation'
import NotFound from '../components/NotFound'
import Sidebar from '../components/Sidebar'
import UnderConstruction from '../components/UnderConstruction'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('intro')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  // Check system preference on mount
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const isWorkPage = location.pathname.startsWith('/work/')
      const sections = isWorkPage
        ? ['hero', 'overview', 'tech', 'highlights', 'gallery']
        : ['intro', 'projects', 'about', 'contact']

      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const throttledScroll = throttle(handleScroll, 100)

    // Initial call to set active section
    handleScroll()

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [location.pathname])

  // Reset active section when navigating between pages
  useEffect(() => {
    const isWorkPage = location.pathname.startsWith('/work/')
    setActiveSection(isWorkPage ? 'hero' : 'intro')
  }, [location.pathname])

  return (
    <UnderConstruction>
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          className="app-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Sidebar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
          <Navigation onMenuClick={() => setMenuOpen(true)} />
          
          <AnimatePresence>
            {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
          </AnimatePresence>

          <Outlet />
        </motion.div>
      )}
    </UnderConstruction>
  )
}
