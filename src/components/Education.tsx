import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBookOpen, FiMapPin, FiCalendar } from 'react-icons/fi';
import TiltCard from './TiltCard';

interface EducationProps {
  onImageClick?: (images: string[], index: number) => void;
}

const schoolImages = [
  '/images/school/sps7.jpeg',
  '/images/school/sps3.jpeg',
  '/images/school/sps1.jpeg',
  '/images/school/sps2.jpeg',
  '/images/school/sps4.jpeg',
  '/images/school/sps5.jpeg',
  '/images/school/sps6.jpeg',
];

const collegeImages = [
  '/images/college/lpu3.jpeg',
  '/images/college/lpu1.jpeg',
  '/images/college/lpu2.jpeg',
  '/images/college/lpu4.jpeg',
  '/images/college/lpu6.jpeg',
];

const education = [
  {
    title: "B.Tech in Computer Science & Engineering",
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    period: "Aug 2022 – Present",
    images: collegeImages,
    description: "Currently pursuing my degree, building real-world projects, solving 300+ coding problems, and growing as a developer every day."
  },
  {
    title: "Intermediate (PCM) & Matriculation",
    institution: "Saint Paul's School",
    location: "Jalpaiguri, West Bengal",
    period: "Till 2022",
    images: schoolImages,
    description: "Where it all began — from cultural performances to school trips, every moment shaped who I am today."
  },
];

export default function Education({ onImageClick }: EducationProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="education" id="education" ref={ref}>
      <div className="education__container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label__number">03</span>
          <span className="section-label__line" />
          <span className="section-label__text">Education</span>
        </motion.div>

        <h2 className="section-title">
          Where I Learned & Grew
        </h2>

        <div className="education__timeline">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              className="education__item"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.3, duration: 0.7 }}
            >
              <TiltCard className="education__card glass-card">
                <div className="education__info">
                  <h3 className="education__title">{edu.title}</h3>
                  <div className="education__meta">
                    <span><FiBookOpen /> {edu.institution}</span>
                    <span><FiMapPin /> {edu.location}</span>
                    <span><FiCalendar /> {edu.period}</span>
                  </div>
                  <p className="education__desc">{edu.description}</p>
                </div>

                <div className="education__gallery">
                  {edu.images.map((img, j) => (
                    <motion.div
                      key={j}
                      className="education__gallery-item"
                      whileHover={{ scale: 1.08, zIndex: 10 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => onImageClick?.(edu.images, j)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={img} alt={edu.institution} />
                    </motion.div>
                  ))}
                </div>
              </TiltCard>

              <div className="education__timeline-dot" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
