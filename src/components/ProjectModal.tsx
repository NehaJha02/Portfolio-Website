import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub } from 'react-icons/fi';

interface Project {
  emoji: string;
  title: string;
  subtitle: string;
  tech: string[];
  date: string;
  highlights: string[];
  github: string;
  gradient: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="project-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="project-modal__content"
          initial={{ scale: 0.7, opacity: 0, rotateX: 20 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.7, opacity: 0, rotateX: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="project-modal__close" onClick={onClose}>
            <FiX />
          </button>

          <div className="project-modal__header" style={{ background: project.gradient }}>
            <motion.span
              className="project-modal__emoji"
              animate={{ rotate: [0, -10, 10, -5, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              {project.emoji}
            </motion.span>
            <h2>{project.title}</h2>
            <p className="project-modal__subtitle">{project.subtitle}</p>
            <span className="project-modal__date">{project.date}</span>
          </div>

          <div className="project-modal__body">
            <div className="project-modal__tech">
              {project.tech.map((t, j) => (
                <motion.span
                  key={j}
                  className="projects__tech-tag"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + j * 0.05, type: 'spring' }}
                >
                  {t}
                </motion.span>
              ))}
            </div>

            <h3>Key Highlights</h3>
            <ul className="project-modal__highlights">
              {project.highlights.map((h, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + j * 0.1 }}
                >
                  {h}
                </motion.li>
              ))}
            </ul>

            <div className="project-modal__links">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal__link"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub /> View Source Code
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
