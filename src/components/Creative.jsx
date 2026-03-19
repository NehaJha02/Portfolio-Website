import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiHeart } from 'react-icons/fi';

const drawings = [
  '/images/drawings/draw1.jpeg',
  '/images/drawings/draw2.jpeg',
  '/images/drawings/draw3.jpeg',
  '/images/drawings/draw4.jpeg',
  '/images/drawings/draw5.jpeg',
];

export default function Creative({ onImageClick }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="creative" id="creative" ref={ref}>
      <div className="creative__container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label__number">08</span>
          <span className="section-label__line" />
          <span className="section-label__text">Beyond Code</span>
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          The Creative Side
        </motion.h2>

        <motion.div
          className="creative__text glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="creative__icon-wrapper">
            <FiHeart className="creative__icon" />
          </div>
          <h3>Art & Creative Expression</h3>
          <p>
            Outside of code, I find peace in drawing. It's not about being productive —
            it's about slowing down, thinking differently, and seeing the world from a
            perspective that logic alone can't capture.
          </p>
          <p>
            I believe creativity and technology aren't opposites — they complement each other.
            The patience I learn from drawing helps me write better code, and the problem-solving
            from coding helps me see new patterns in art.
          </p>
        </motion.div>

        <div className="creative__gallery">
          {drawings.map((src, i) => (
            <motion.div
              key={i}
              className="creative__gallery-item glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onImageClick?.(drawings, i)}
              style={{ cursor: 'pointer' }}
            >
              <div className="creative__image-wrapper">
                <img src={src} alt="Drawing" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
