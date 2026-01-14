import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import Loader from '../components/Loader'
import Menu from '../components/Menu'
import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
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
      const sections = ['intro', 'projects', 'about', 'contact']
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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
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
    </>
  )
}
