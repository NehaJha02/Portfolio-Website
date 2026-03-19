import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiArrowRight } from 'react-icons/fi';
import ProjectModal from './ProjectModal';

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
    gradient: "linear-gradient(135deg, rgba(156, 107, 189, 0.15), rgba(240, 166, 202, 0.1))"
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
    gradient: "linear-gradient(135deg, rgba(240, 166, 202, 0.15), rgba(212, 187, 240, 0.1))"
  },
];

function ProjectCard({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, -60]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  return (
    <motion.div
      ref={cardRef}
      className="projects__stack-card"
      style={{ y, scale, rotateX, perspective: 1200 }}
      onClick={onClick}
    >
      <div className="projects__card glass-card">
        <div className="projects__card-inner">
          <div className="projects__card-left" style={{ background: project.gradient }}>
            <motion.span
              className="projects__emoji"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              {project.emoji}
            </motion.span>
            <span className="projects__date">{project.date}</span>
            <h3 className="projects__title">{project.title}</h3>
            <p className="projects__subtitle">{project.subtitle}</p>
            <div className="projects__tech-tags">
              {project.tech.map((t, j) => (
                <span key={j} className="projects__tech-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="projects__card-right">
            <ul className="projects__highlights">
              {project.highlights.map((h, j) => (
                <li key={j}>{h}</li>
              ))}
            </ul>
            <div className="projects__links">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="projects__link"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub /> Code
              </a>
              <span className="projects__link projects__link--detail">
                Details <FiArrowRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <section className="projects" id="projects">
        <div className="projects__container">
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label__number">05</span>
            <span className="section-label__line" />
            <span className="section-label__text">Projects</span>
          </motion.div>

          <h2 className="section-title">
            Things I've Built
          </h2>

          <div className="projects__stack">
            {projects.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
