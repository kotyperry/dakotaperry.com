import { motion } from 'framer-motion'
import './Experience.css'

const experiences = [
  { role: 'Senior Full-Stack Developer', company: 'TechVision Labs', period: '2024 — Present' },
  { role: 'Freelance Developer', company: 'Self-Employed', period: '2021 — Present' },
  { role: 'Frontend Developer', company: 'Digital Dynamics', period: '2022 — 2024' },
  { role: 'Web Developer', company: 'Creative Agency', period: '2020 — 2022' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Experience() {
  return (
    <motion.div
      className="experience"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="section-label">Experience</span>
      
      <motion.div 
        className="experience-list"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="exp-item"
            variants={itemVariants}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.2 }}
          >
            <span className="exp-indicator">
              <span className="exp-dot" />
              {index < experiences.length - 1 && <span className="exp-line" />}
            </span>
            <span className="exp-period">{exp.period}</span>
            <div className="exp-details">
              <span className="exp-role">{exp.role}</span>
              <span className="exp-company">{exp.company}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
