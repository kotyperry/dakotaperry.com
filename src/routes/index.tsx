import { createFileRoute, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'

import About from '../components/About'
import Clients from '../components/Clients'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Stats from '../components/Stats'
import TechStack from '../components/TechStack'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  const location = useLocation()

  // Scroll to hash section when navigating to this page with a hash
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        const element = document.getElementById(location.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }, [location.hash])

  return (
    <>
      <main className="main-content">
        <Hero />
        
        <div className="section-divider">
          <div className="section-divider-inner" />
        </div>
        
        <Clients />
        
        <div className="section-divider">
          <div className="section-divider-inner" />
        </div>
        
        <section id="projects" className="projects-standalone">
          <Projects />
        </section>
        
        <div className="section-divider">
          <div className="section-divider-inner" />
        </div>
        
        <section id="about" className="about-standalone">
          <div className="about-grid">
            <About />
            <TechStack />
          </div>
        </section>
        
        <div className="section-divider">
          <div className="section-divider-inner" />
        </div>
        
        <div className="content-grid">
          <section className="grid-section experience-section">
            <Experience />
          </section>
          
          <section className="grid-section stats-section">
            <Stats />
          </section>
        </div>
        
        <div className="section-divider">
          <div className="section-divider-inner" />
        </div>
        
        <section id="contact" className="contact-standalone">
          <Contact />
        </section>
        
        <div className="section-divider">
          <div className="section-divider-inner" />
        </div>
      </main>
      
      <Footer />
    </>
  )
}
