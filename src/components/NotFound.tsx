import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import './NotFound.css'

export default function NotFound() {
  return (
    <motion.div
      className="notfound-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="notfound-content">
        <motion.div
          className="notfound-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="notfound-label">
            <span className="label-dot" />
            Error 404
          </span>
          <h1 className="notfound-title">
            <span className="title-line">Page Not</span>
            <span className="title-line">Found</span>
          </h1>
          <p className="notfound-subtitle">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          className="notfound-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/" className="notfound-button">
            <span>Back to Home</span>
            <span className="button-arrow">→</span>
          </Link>
        </motion.div>

        <motion.div
          className="notfound-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <span className="footer-text">Dakota Perry — Portfolio</span>
        </motion.div>
      </div>

      <div className="notfound-decoration">
        <div className="decoration-grid" />
      </div>
    </motion.div>
  )
}
