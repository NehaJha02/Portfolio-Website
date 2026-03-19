import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub } from 'react-icons/fi';
import TiltCard from './TiltCard';

const projects = [
  {
    emoji: "\uD83D\uDEE1\uFE0F",
    title: "LawAware",
    subtitle: "Legal Chatbot Platform",
    tech: ["React", "Node.js", "MongoDB Atlas"],
    date: "Oct 2024",
    highlights: [
      "Interactive legal chatbot with 85%+ accuracy in pilot testing",
      "Dynamic community forum with real-time threads and nested replies",
      "Modular frontend for browsing legal articles, child safety protocols, and verified news feeds",
      "NoSQL database architecture for scalable content storage"
    ],
    github: "https://github.com/NehaJha02/LawAware",
    gradient: "linear-gradient(135deg, #e8d5f5 0%, #f0e0ff 50%, #fce4ec 100%)"
  },
  {
    emoji: "\uD83C\uDF5C",
    title: "EZFood",
    subtitle: "Food Discovery Platform",
    tech: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    date: "Apr 2024",
    highlights: [
      "Location-based food discovery with 90%+ user satisfaction",
      "JWT-based secure authentication with role-based access control",
      "Custom admin dashboard for CRUD operations and real-time analytics",
      "RESTful APIs for AI-driven dish search and geolocation tagging"
    ],
    github: "https://github.com/NehaJha02/EZFood-main",
    gradient: "linear-gradient(135deg, #fce4ec 0%, #f8e8ff 50%, #e8d5f5 100%)"
  },
];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="projects__container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label__number">05</span>
          <span className="section-label__line" />
          <span className="section-label__text">Projects</span>
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Things I've Built
        </motion.h2>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80, rotateX: 15 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                delay: 0.3 + i * 0.2,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TiltCard className="projects__card glass-card">
                <div className="projects__card-header" style={{ background: project.gradient }}>
                  <motion.span
                    className="projects__emoji"
                    animate={{ rotate: [0, -10, 10, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    {project.emoji}
                  </motion.span>
                  <span className="projects__date">{project.date}</span>
                  <h3 className="projects__title">{project.title}</h3>
                  <p className="projects__subtitle">{project.subtitle}</p>
                </div>

                <div className="projects__card-body">
                  <div className="projects__tech-tags">
                    {project.tech.map((t, j) => (
                      <motion.span
                        key={j}
                        className="projects__tech-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.6 + i * 0.2 + j * 0.05, type: 'spring', stiffness: 300 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  <ul className="projects__highlights">
                    {project.highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.7 + i * 0.2 + j * 0.08 }}
                      >
                        {h}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="projects__links">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__link"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub /> View Code
                    </motion.a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
