import { motion } from 'framer-motion'
import './TechStack.css'

const stack = {
  'Languages': ['TypeScript', 'JavaScript', 'Python', 'SQL'],
  'Frontend': ['React', 'Next.js', 'Vue', 'Tailwind'],
  'Backend': ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
  'Tools': ['Git', 'Docker', 'Figma', 'AWS'],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const groupVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function TechStack() {
  return (
    <motion.div
      className="tech"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="section-label">Stack</span>
      
      <motion.div 
        className="tech-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {Object.entries(stack).map(([category, items]) => (
          <motion.div 
            key={category} 
            className="tech-group"
            variants={groupVariants}
          >
            <h3 className="tech-category">{category}</h3>
            <ul className="tech-list">
              {items.map((item) => (
                <motion.li 
                  key={item}
                  variants={itemVariants}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="tech-item-dot" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
