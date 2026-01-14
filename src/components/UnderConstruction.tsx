import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './UnderConstruction.css'

const SITE_PASSWORD = 'preview2026'
const AUTH_KEY = 'portfolio_auth'

interface UnderConstructionProps {
  children: React.ReactNode
}

export default function UnderConstruction({ children }: UnderConstructionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY)
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === SITE_PASSWORD) {
      setIsExiting(true)
      setTimeout(() => {
        localStorage.setItem(AUTH_KEY, 'true')
        setIsAuthenticated(true)
      }, 500)
    } else {
      setError('Incorrect password')
      setPassword('')
      setTimeout(() => setError(''), 3000)
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="construction-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="construction-content">
            <motion.div
              className="construction-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="construction-label">
                <span className="label-dot" />
                Under Construction
              </span>
              <h1 className="construction-title">
                <span className="title-line">Coming</span>
                <span className="title-line">Soon</span>
              </h1>
              <p className="construction-subtitle">
                This site is currently being built. Enter the password to preview.
              </p>
            </motion.div>

            <motion.form
              className="construction-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="form-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={`construction-input ${error ? 'input-error' : ''}`}
                  autoFocus
                />
                <button type="submit" className="construction-button">
                  <span>Enter</span>
                  <span className="button-arrow">→</span>
                </button>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.span
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {error}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.form>

            <motion.div
              className="construction-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <span className="footer-text">Dakota Perry — Portfolio</span>
            </motion.div>
          </div>

          <div className="construction-decoration">
            <div className="decoration-grid" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
