import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiHeart } from 'react-icons/fi';
import { useRef, type ReactNode } from 'react';

interface CreativeProps {
  onImageClick?: (images: string[], index: number) => void;
}

const drawings = [
  '/images/drawings/draw1.jpeg',
  '/images/drawings/draw2.jpeg',
  '/images/drawings/draw3.jpeg',
  '/images/drawings/draw4.jpeg',
  '/images/drawings/draw5.jpeg',
];

function BrushReveal({ children, delay = 0, inView }: { children: ReactNode; delay?: number; inView: boolean }) {
  return (
    <div className="brush-reveal">
      <motion.div
        className="brush-reveal__mask"
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : {}}
        transition={{ delay, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="brush-reveal__accent"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: [0, 1, 0] } : {}}
        transition={{ delay, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.4, duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Creative({ onImageClick }: CreativeProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section className="creative" id="creative" ref={ref}>
      <div ref={sectionRef} className="creative__container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label__number">08</span>
          <span className="section-label__line" />
          <span className="section-label__text">Beyond Code</span>
        </motion.div>

        <BrushReveal delay={0.2} inView={inView}>
          <h2 className="section-title">The Creative Side</h2>
        </BrushReveal>

        <motion.div
          className="creative__text glass-card"
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="creative__icon-wrapper">
            <motion.div
              animate={inView ? { scale: [1, 1.2, 1] } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <FiHeart className="creative__icon" />
            </motion.div>
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

        <motion.div className="creative__gallery" style={{ y: parallaxY }}>
          {drawings.map((src, i) => (
            <motion.div
              key={i}
              className="creative__gallery-item glass-card"
              initial={{ opacity: 0, y: 80, rotate: i % 2 === 0 ? -5 : 5 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{
                delay: 0.6 + i * 0.12,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -15,
                scale: 1.05,
                rotate: i % 2 === 0 ? 2 : -2,
                boxShadow: '0 25px 50px rgba(156, 107, 189, 0.3)',
              }}
              onClick={() => onImageClick?.(drawings, i)}
              style={{ cursor: 'pointer' }}
            >
              <div className="creative__image-wrapper">
                <img src={src} alt="Drawing" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
