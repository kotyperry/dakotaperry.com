import './Hero.css'
import { op } from '../openpanel'

export default function Hero() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string, buttonName: string) => {
    e.preventDefault()
    op.track('Hero CTA Click', { button: buttonName, destination: sectionId })
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section id="intro" className="hero">
      <div className="hero-layout">
        {/* Left column - Main content */}
        <div className="hero-left">
          <div>
            <span className="hero-label">
              <span className="label-dot" />
              Dakota Perry — Tulsa, OK
            </span>
          </div>

          <h1 className="hero-headline">
            <span className="headline-line">
              Growing businesses.
            </span>
            <span className="headline-line">
              Powered by AI.
            </span>
          </h1>

          <div className="hero-cta">
            <a href="#projects" onClick={(e) => handleClick(e, 'projects', 'See My Work')} className="cta-primary">
              <span>See my work</span>
              <span className="cta-arrow">→</span>
            </a>
            <a href="#contact" onClick={(e) => handleClick(e, 'contact', 'Lets Talk')} className="cta-secondary">
              <span>Let's talk</span>
            </a>
          </div>
        </div>

        {/* Right column - Hero image */}
        <div className="hero-right">
          <div className="hero-image-wrapper">
            <div className="hero-image-placeholder">
              <span className="placeholder-text">Image</span>
            </div>
            <div className="hero-image-glow" />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hero-decoration">
        <div className="decoration-line" />
      </div>
    </section>
  )
}
