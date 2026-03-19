import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiStar, FiCode, FiFileText } from 'react-icons/fi';

const achievements = [
  {
    icon: <FiStar />,
    title: "5-Star Golden Badge in C++",
    platform: "HackerRank",
    description: "Achieved the highest level certification in C++ programming",
    image: "/images/achievements/hackerrank-badge.png",
  },
  {
    icon: <FiCode />,
    title: "314+ Problems Solved",
    platform: "GeeksforGeeks",
    description: "Coding Score: 888 | Institute Rank: 1064",
    image: "/images/achievements/gfg-score.jpeg",
  },
];

const certificates = [
  {
    icon: <FiFileText />,
    title: "Cloud Computing Certification",
    issuer: "NPTEL",
    date: "Jun 2025",
    file: "/images/certificates/cloud.pdf",
    preview: "/images/certificates/cloud-preview.jpg",
  },
  {
    icon: <FiAward />,
    title: "DSA Self-Paced",
    issuer: "GeeksforGeeks",
    date: "Jul 2024",
    file: "/images/certificates/gfg-dsa.pdf",
    preview: "/images/certificates/gfg-dsa-preview.jpg",
  },
];

export default function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="achievements" id="achievements" ref={ref}>
      <div className="achievements__container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label__number">07</span>
          <span className="section-label__line" />
          <span className="section-label__text">Recognition</span>
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Achievements & Certificates
        </motion.h2>

        {/* Achievements */}
        <motion.h3
          className="achievements__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Achievements
        </motion.h3>
        <div className="achievements__grid">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              className="achievements__card glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.7 }}
              whileHover={{ y: -8 }}
            >
              <div className="achievements__card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="achievements__platform">{item.platform}</p>
              <p className="achievements__desc">{item.description}</p>
              {item.image && (
                <div className="achievements__image-wrapper">
                  <img src={item.image} alt={item.title} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Certificates */}
        <motion.h3
          className="achievements__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Certificates
        </motion.h3>
        <div className="achievements__cert-grid">
          {certificates.map((cert, i) => (
            <motion.div
              key={i}
              className="achievements__cert-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              <div className="achievements__cert-preview">
                <img src={cert.preview} alt={cert.title} />
              </div>
              <div className="achievements__cert-info">
                <div className="achievements__cert-icon">{cert.icon}</div>
                <div>
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer} &bull; {cert.date}</p>
                </div>
              </div>
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="achievements__cert-link"
              >
                View Certificate
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
