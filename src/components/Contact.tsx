import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      const response = await fetch('https://formspree.io/f/xpwzgvkd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', company: '', budget: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div
      className="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="contact-header">
        <span className="section-label">Contact</span>
        <h2 className="contact-title">Let's work together</h2>
        <p className="contact-subtitle">
          Have a project in mind? Fill out the form and I'll get back to you within 24 hours.
        </p>
      </div>

      <motion.form 
        className="contact-form" 
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="form-row" variants={itemVariants}>
          <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
              placeholder="John Doe"
            />
            <span className="input-highlight" />
          </div>
          <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              placeholder="john@company.com"
            />
            <span className="input-highlight" />
          </div>
        </motion.div>

        <motion.div className="form-row" variants={itemVariants}>
          <div className={`form-group ${focusedField === 'company' ? 'focused' : ''}`}>
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              onFocus={() => setFocusedField('company')}
              onBlur={() => setFocusedField(null)}
              placeholder="Company Inc."
            />
            <span className="input-highlight" />
          </div>
          <div className={`form-group ${focusedField === 'budget' ? 'focused' : ''}`}>
            <label htmlFor="budget">Budget</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              onFocus={() => setFocusedField('budget')}
              onBlur={() => setFocusedField(null)}
            >
              <option value="">Select budget range</option>
              <option value="<5k">Less than $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="50k+">$50,000+</option>
            </select>
            <span className="input-highlight" />
          </div>
        </motion.div>

        <motion.div 
          className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}
          variants={itemVariants}
        >
          <label htmlFor="message">Project Details *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            required
            rows={5}
            placeholder="Tell me about your project, timeline, and goals..."
          />
          <span className="input-highlight" />
        </motion.div>

        <motion.button 
          type="submit" 
          className="submit-btn"
          disabled={status === 'sending'}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="btn-text">
            {status === 'sending' ? 'Sending...' : 
             status === 'sent' ? 'Message Sent!' : 
             status === 'error' ? 'Try Again' : 'Send Message'}
          </span>
          <span className="btn-arrow">→</span>
          <span className="btn-shine" />
        </motion.button>
      </motion.form>
    </motion.div>
  )
}
