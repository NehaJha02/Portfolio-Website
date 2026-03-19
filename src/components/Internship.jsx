import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCheckCircle } from 'react-icons/fi';

const training = {
  title: "Data Structures and Algorithms",
  provider: "GeeksforGeeks",
  period: "Mar 2024 – Jul 2024",
  points: [
    "Completed extensive training focused on problem solving",
    "Hands-on experience with arrays, linked lists, stacks, queues, trees, and graphs",
    "Mastered sorting, searching, recursion, dynamic programming, and backtracking",
    "Solved multiple coding challenges to enhance logical thinking"
  ]
};

const internship = {
  title: "Software Developer Intern",
  company: "Ralakde Automation",
  period: "Present",
  points: [
    "Working on real-world development tasks and production code",
    "Learning debugging, system design, and cross-team collaboration",
    "Gaining hands-on experience in end-to-end application development",
    "Solving problems without fixed instructions — building patience and critical thinking"
  ]
};

export default function Internship() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="internship" id="internship" ref={ref}>
      <div className="internship__container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label__number">06</span>
          <span className="section-label__line" />
          <span className="section-label__text">Experience</span>
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Where I've Worked & Trained
        </motion.h2>

        <div className="internship__timeline">
          {/* Internship */}
          <motion.div
            className="internship__item"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="internship__dot internship__dot--active">
              <FiBriefcase />
            </div>
            <div className="internship__card glass-card">
              <div className="internship__badge">Current</div>
              <h3>{internship.title}</h3>
              <p className="internship__company">{internship.company}</p>
              <p className="internship__period">{internship.period}</p>
              <ul className="internship__points">
                {internship.points.map((p, i) => (
                  <li key={i}><FiCheckCircle className="internship__check" /> {p}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Training */}
          <motion.div
            className="internship__item"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="internship__dot">
              <FiBriefcase />
            </div>
            <div className="internship__card glass-card">
              <h3>{training.title}</h3>
              <p className="internship__company">{training.provider}</p>
              <p className="internship__period">{training.period}</p>
              <ul className="internship__points">
                {training.points.map((p, i) => (
                  <li key={i}><FiCheckCircle className="internship__check" /> {p}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
