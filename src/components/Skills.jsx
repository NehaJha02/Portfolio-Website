import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiCplusplus, SiJavascript, SiTypescript, SiHtml5, SiCss,
  SiReact, SiNodedotjs, SiDjango, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiVercel
} from 'react-icons/si';
import { FiDatabase, FiUsers, FiTarget, FiRefreshCw, FiCode, FiServer } from 'react-icons/fi';

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

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="skills__container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label__number">04</span>
          <span className="section-label__line" />
          <span className="section-label__text">Skills</span>
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Tools I Work With
        </motion.h2>

        <div className="skills__categories">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              className="skills__category"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
            >
              <h3 className="skills__category-title">{cat.title}</h3>
              <div className="skills__grid">
                {cat.skills.map((skill, j) => (
                  <motion.div
                    key={j}
                    className="skills__item glass-card"
                    whileHover={{ y: -8, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="skills__icon">{skill.icon}</div>
                    <span className="skills__name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
