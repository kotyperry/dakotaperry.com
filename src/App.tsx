import './App.css'

import { AnimatePresence, motion } from 'framer-motion'
import ProjectDetail, { Project } from './components/ProjectDetail'
import { useEffect, useState } from 'react'

import About from './components/About'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Menu from './components/Menu'
import Navigation from './components/Navigation'
import Projects from './components/Projects'
import Sidebar from './components/Sidebar'
import Stats from './components/Stats'
import TechStack from './components/TechStack'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('intro')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
  }

  const handleProjectClose = () => {
    setSelectedProject(null)
  }

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

          {/* Project Detail Overlay */}
          <AnimatePresence>
            {selectedProject && (
              <ProjectDetail 
                project={selectedProject} 
                onClose={handleProjectClose} 
              />
            )}
          </AnimatePresence>
          
          <main className="main-content">
            <Hero />
            
            <div className="section-divider" />
            
            <Clients />
            
            <div className="section-divider" />
            
            <section id="projects" className="projects-standalone">
              <Projects onProjectSelect={handleProjectSelect} />
            </section>
            
            <div className="section-divider" />
            
            <div className="content-grid">
              <section className="grid-section experience-section">
                <Experience />
              </section>
              
              <section className="grid-section stats-section">
                <Stats />
              </section>
            </div>
            
            <div className="section-divider" />
            
            <section id="about" className="about-standalone">
              <div className="about-grid">
                <About />
                <TechStack />
              </div>
            </section>
            
            <div className="section-divider" />
            
            <section id="contact" className="contact-standalone">
              <Contact />
            </section>
            
            <div className="section-divider" />
          </main>
          
          <Footer />
        </motion.div>
      )}
    </>
  )
}

export default App
