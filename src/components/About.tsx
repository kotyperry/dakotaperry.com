import { motion } from 'framer-motion'
import './About.css'

const valueVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.4 + i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function About() {
  const values = [
    { num: '01', text: 'Performance First' },
    { num: '02', text: 'Clean Architecture' },
    { num: '03', text: 'User-Centered' },
  ]

  return (
    <motion.div
      className="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="section-label">About</span>
      
      <motion.h2 
        className="about-headline"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        I'm a self-taught developer who turned curiosity into craft.
      </motion.h2>
      
      <motion.div 
        className="about-body"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <p>
          Based in Tulsa, Oklahoma, I've spent the last 5+ years building 
          digital experiences for startups, agencies, and Fortune 500 companies.
        </p>
        <p>
          I believe great software is about more than just code—it's about 
          understanding people and solving real problems with elegant solutions.
        </p>
      </motion.div>

      <div className="about-values">
        {values.map((value, i) => (
          <motion.div 
            key={value.num}
            className="value"
            custom={i}
            variants={valueVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.2 }}
          >
            <span className="value-num">{value.num}</span>
            <span className="value-text">{value.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
