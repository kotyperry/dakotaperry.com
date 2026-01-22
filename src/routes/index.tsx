import { createFileRoute, useLocation } from '@tanstack/react-router'
import { Suspense, lazy, useEffect } from 'react'

// Critical above-fold components loaded immediately
import Hero from '../components/Hero'
import Projects from '../components/Projects'

// Below-fold components lazy loaded for faster initial paint
const Clients = lazy(() => import('../components/Clients'))
const About = lazy(() => import('../components/About'))
const TechStack = lazy(() => import('../components/TechStack'))
const Experience = lazy(() => import('../components/Experience'))
const Stats = lazy(() => import('../components/Stats'))
const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))

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

        <Suspense fallback={null}>
          <Clients />
        </Suspense>

        <div className="section-divider">
          <div className="section-divider-inner" />
        </div>

        <section id="projects" className="projects-standalone">
          <Projects />
        </section>

        <div className="section-divider">
          <div className="section-divider-inner" />
        </div>

        <Suspense fallback={null}>
          <section id="about" className="about-standalone">
            <div className="about-grid">
              <About />
              <TechStack />
            </div>
          </section>
        </Suspense>

        <div className="section-divider">
          <div className="section-divider-inner" />
        </div>

        <Suspense fallback={null}>
          <div className="content-grid">
            <section className="grid-section experience-section">
              <Experience />
            </section>

            <section className="grid-section stats-section">
              <Stats />
            </section>
          </div>
        </Suspense>

        <div className="section-divider">
          <div className="section-divider-inner" />
        </div>

        <Suspense fallback={null}>
          <section id="contact" className="contact-standalone">
            <Contact />
          </section>
        </Suspense>

        <div className="section-divider">
          <div className="section-divider-inner" />
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
