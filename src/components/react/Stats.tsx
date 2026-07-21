import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import './Stats.css'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Shipped' },
  { value: 12, suffix: '+', label: 'Years Experience' },
  { value: 40, suffix: '+', label: 'Brands Served' },
  { value: 10, suffix: '+', label: 'Platforms Shipped' },
]

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!inView) return
    
    const duration = 2000
    // Use easeOutExpo for premium feel
    const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    const startTime = performance.now()
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(progress)
      
      setCount(Math.floor(easedProgress * value))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value, inView])
  
  return <span>{count}{suffix}</span>
}

const statVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      className="stats"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="section-label">Numbers</span>
      
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label} 
            className="stat"
            custom={i}
            variants={statVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="stat-value">
              <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
            </span>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
