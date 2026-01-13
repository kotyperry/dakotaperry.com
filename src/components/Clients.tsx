import { motion } from 'framer-motion'
import './Clients.css'

const clients = [
  { name: 'Google', logo: 'GOOGLE' },
  { name: 'Microsoft', logo: 'MICROSOFT' },
  { name: 'Amazon', logo: 'AMAZON' },
  { name: 'Apple', logo: 'APPLE' },
  { name: 'Meta', logo: 'META' },
  { name: 'Netflix', logo: 'NETFLIX' },
  { name: 'Spotify', logo: 'SPOTIFY' },
  { name: 'Stripe', logo: 'STRIPE' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const logoVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Clients() {
  return (
    <section className="clients">
      <motion.div
        className="clients-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="clients-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Trusted By</span>
          <p className="clients-subtext">
            I've had the privilege of working with industry-leading companies.
          </p>
        </motion.div>

        <motion.div 
          className="clients-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {clients.map((client) => (
            <motion.div
              key={client.name}
              className="client-logo"
              variants={logoVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <span className="logo-text">{client.logo}</span>
              <span className="client-hover-bg" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
