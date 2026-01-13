import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import './Projects.css'
import { Project } from './ProjectDetail'

export const projects: Project[] = [
  {
    id: 'nexus-dashboard',
    title: 'Nexus Dashboard',
    category: 'Web Application',
    description: 'Real-time analytics dashboard with AI-powered insights.',
    fullDescription: 'Nexus Dashboard is a comprehensive analytics platform designed for enterprise clients who need real-time visibility into their business metrics. The application processes millions of data points daily, presenting them through an intuitive interface that makes complex data accessible to stakeholders at all levels. The AI-powered insights engine identifies trends, anomalies, and opportunities automatically, reducing the time analysts spend on routine data exploration.',
    tech: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis', 'TensorFlow.js', 'WebSockets'],
    year: '2025',
    color: '#1a1a2e',
    role: 'Lead Developer',
    duration: '6 months',
    client: 'Enterprise Corp',
    liveUrl: 'https://example.com',
    highlights: [
      'Reduced data processing latency by 60% through optimized caching strategies',
      'Implemented real-time collaboration features supporting 100+ concurrent users',
      'Built custom D3.js visualizations for complex multi-dimensional data',
      'Designed and deployed AI anomaly detection with 95% accuracy'
    ],
    media: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
        alt: 'Dashboard overview showing key metrics',
        caption: 'Main dashboard view with real-time KPI tracking',
        aspectRatio: 'full-width'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        alt: 'Analytics charts',
        caption: 'Custom D3.js visualizations for trend analysis'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
        alt: 'Data visualization',
        caption: 'AI-powered insights panel'
      },
      {
        type: 'video',
        src: 'https://www.w3schools.com/html/mov_bbb.mp4',
        caption: 'Live demo of real-time data updates',
        aspectRatio: 'full-width'
      }
    ]
  },
  {
    id: 'velocity-commerce',
    title: 'Velocity Commerce',
    category: 'E-commerce',
    description: 'High-performance headless commerce platform.',
    fullDescription: 'Velocity Commerce is a next-generation headless e-commerce platform built for brands that demand exceptional performance and flexibility. The architecture separates the frontend presentation layer from the backend commerce engine, allowing for unlimited customization while maintaining blazing-fast page loads. The platform handles peak traffic of 50,000+ concurrent users while maintaining sub-second response times.',
    tech: ['Next.js', 'Stripe', 'Sanity CMS', 'Vercel', 'GraphQL', 'Tailwind CSS', 'Algolia', 'AWS Lambda'],
    year: '2025',
    color: '#16213e',
    role: 'Full-Stack Developer',
    duration: '8 months',
    client: 'Fashion Brand',
    highlights: [
      'Achieved 98+ Lighthouse performance score across all pages',
      'Integrated headless CMS enabling non-technical content updates',
      'Built custom checkout flow with 40% higher conversion rate',
      'Implemented AI-powered product recommendations'
    ],
    media: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
        alt: 'E-commerce storefront',
        caption: 'Responsive storefront with dynamic product filtering',
        aspectRatio: 'full-width'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
        alt: 'Product detail page',
        caption: 'Immersive product detail experience'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
        alt: 'Shopping cart',
        caption: 'Streamlined checkout process'
      }
    ]
  },
  {
    id: 'pulse-health',
    title: 'Pulse Health',
    category: 'Mobile App',
    description: 'Health tracking with wearable integration.',
    fullDescription: 'Pulse Health is a comprehensive mobile health platform that seamlessly integrates with popular wearable devices to provide users with actionable health insights. The app tracks sleep patterns, activity levels, heart rate variability, and nutrition, using machine learning to provide personalized recommendations. The privacy-first architecture ensures all sensitive health data is encrypted and stored securely on-device.',
    tech: ['React Native', 'Firebase', 'HealthKit', 'Google Fit', 'TensorFlow Lite', 'Node.js', 'MongoDB'],
    year: '2024',
    color: '#1a1a1a',
    role: 'Mobile Developer',
    duration: '5 months',
    highlights: [
      'Integrated with 15+ wearable devices and health platforms',
      'Implemented on-device ML for real-time health predictions',
      'Achieved 4.8★ rating on both App Store and Play Store',
      'Built offline-first architecture for reliable data sync'
    ],
    media: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
        alt: 'Health dashboard',
        caption: 'Personalized health dashboard with daily insights',
        aspectRatio: 'full-width'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80',
        alt: 'Wearable integration',
        caption: 'Seamless wearable device sync',
        aspectRatio: 'portrait'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
        alt: 'Activity tracking',
        caption: 'Detailed activity and workout tracking'
      }
    ]
  },
  {
    id: 'artisan-cms',
    title: 'Artisan CMS',
    category: 'Content Platform',
    description: 'Custom CMS for creative agencies.',
    fullDescription: 'Artisan CMS is a bespoke content management system designed specifically for creative agencies who need more control over their digital presence. Unlike generic CMS solutions, Artisan provides a visual editing experience that matches the final output, real-time collaboration tools, and an extensible plugin architecture. The system handles complex content relationships and media management with ease.',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'AWS S3', 'Elasticsearch', 'Docker'],
    year: '2024',
    color: '#0f0f0f',
    role: 'Backend Architect',
    duration: '4 months',
    client: 'Creative Agency',
    liveUrl: 'https://example.com',
    highlights: [
      'Built visual page builder with drag-and-drop components',
      'Implemented real-time collaborative editing with conflict resolution',
      'Created custom media DAM with AI-powered tagging',
      'Achieved 99.9% uptime SLA for enterprise clients'
    ],
    media: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
        alt: 'CMS editor interface',
        caption: 'Visual page builder with live preview',
        aspectRatio: 'full-width'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
        alt: 'Media library',
        caption: 'AI-powered media management'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
        alt: 'Content workflow',
        caption: 'Custom workflow and approval system'
      }
    ]
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Projects() {
  return (
    <motion.div
      className="projects"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="projects-header">
        <span className="section-label">Selected Work</span>
      </div>

      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects.map((project, index) => (
          <Link
            key={project.id}
            to="/work/$projectId"
            params={{ projectId: project.id }}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <motion.article
              className="project-card"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
            <div 
              className="project-image"
              style={{ background: project.color }}
            >
              <div className="project-placeholder">
                <motion.span 
                  className="placeholder-num"
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 0.6, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
                <span className="placeholder-text">View Project</span>
              </div>
              <div className="project-image-overlay" />
            </div>
            
            <div className="project-content">
              <div className="project-meta">
                <span className="project-category">{project.category}</span>
                <span className="project-year">{project.year}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.slice(0, 3).map((t, i) => (
                  <motion.span 
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    {t}
                  </motion.span>
                ))}
                {project.tech.length > 3 && (
                  <span className="tech-more">+{project.tech.length - 3}</span>
                )}
              </div>
            </div>

            <div className="project-card-cta">
              <span>View Case Study</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>

            <div className="project-card-glow" />
          </motion.article>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  )
}
