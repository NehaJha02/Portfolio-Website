import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiCplusplus, SiJavascript, SiTypescript, SiHtml5, SiCss,
  SiReact, SiNodedotjs, SiDjango, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiVercel
} from 'react-icons/si';
import { FiDatabase, FiUsers, FiTarget, FiRefreshCw, FiCode, FiServer } from 'react-icons/fi';
import FloatingShapes from './FloatingShapes';

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "C++", icon: <SiCplusplus /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "HTML", icon: <SiHtml5 /> },
      { name: "CSS", icon: <SiCss /> },
      { name: "SQL", icon: <FiDatabase /> },
    ]
  },
  {
    title: "Technologies & Tools",
    skills: [
      { name: "React", icon: <SiReact /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Django", icon: <SiDjango /> },
      { name: "REST APIs", icon: <FiServer /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "Vercel", icon: <SiVercel /> },
    ]
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Problem Solving", icon: <FiTarget /> },
      { name: "Team Player", icon: <FiUsers /> },
      { name: "Project Mgmt", icon: <FiCode /> },
      { name: "Adaptability", icon: <FiRefreshCw /> },
    ]
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="skills" id="skills" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />
      <div className="skills__container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label__number">04</span>
          <span className="section-label__line" />
          <span className="section-label__text">Skills</span>
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Tools I Work With
        </motion.h2>

        <div className="skills__categories">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              className="skills__category"
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
            >
              <h3 className="skills__category-title">{cat.title}</h3>
              <motion.div
                className="skills__grid"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {cat.skills.map((skill, j) => (
                  <motion.div
                    key={j}
                    className="skills__item glass-card"
                    variants={itemVariants}
                    whileHover={{
                      y: -12,
                      scale: 1.1,
                      rotateY: 10,
                      boxShadow: '0 20px 40px rgba(156, 107, 189, 0.3)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="skills__icon">{skill.icon}</div>
                    <span className="skills__name">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
