import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import './Menu.css'

interface MenuProps {
  onClose: () => void
}

const links = [
  { label: 'Home', href: '#intro', num: '01' },
  { label: 'About', href: '#about', num: '02' },
  { label: 'Work', href: '#projects', num: '03' },
  { label: 'Contact', href: '#contact', num: '04' },
]

const menuVariants = {
  closed: { 
    scaleY: 0,
    originY: 0,
  },
  open: { 
    scaleY: 1,
    originY: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      delayChildren: 0.2,
    }
  },
  exit: { 
    scaleY: 0,
    originY: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.03,
      staggerDirection: -1,
    }
  }
}

const itemVariants = {
  closed: { 
    opacity: 0, 
    x: -20,
  },
  open: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: { 
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    }
  }
}

export default function Menu({ onClose }: MenuProps) {
  return (
    <motion.div
      className="menu"
      variants={menuVariants}
      initial="closed"
      animate="open"
      exit="exit"
    >
      <motion.div className="menu-header" variants={itemVariants}>
        <span className="menu-title">Navigation</span>
        <button className="menu-close" onClick={onClose}>
          <span>Close</span>
          <span className="close-icon">✕</span>
        </button>
      </motion.div>

      <nav className="menu-nav">
        {links.map((link) => (
          <motion.a
            key={link.href}
            href={link.href}
            className="menu-link"
            onClick={onClose}
            variants={itemVariants}
          >
            <span className="link-num">{link.num}</span>
            <span className="link-label">{link.label}</span>
          </motion.a>
        ))}
      </nav>

      <motion.div className="menu-footer" variants={itemVariants}>
        <div className="menu-socials">
          <a href="https://github.com/kotyperry" target="_blank" rel="noopener noreferrer" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/koty-perry/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
