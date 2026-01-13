import { motion } from 'framer-motion'
import './Loader.css'

const letterVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Loader() {
  const name = "DAKOTA PERRY"
  
  return (
    <motion.div 
      className="loader"
      exit={{ 
        opacity: 0,
        scale: 1.05,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="loader-content">
        <motion.div 
          className="loader-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="loader-name">
            {name.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="loader-char"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
          <motion.div 
            className="loader-bar"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.6, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          />
          <motion.span 
            className="loader-subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            Developer & Designer
          </motion.span>
        </motion.div>
      </div>
      
      <motion.div 
        className="loader-bg-effect"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  )
}
