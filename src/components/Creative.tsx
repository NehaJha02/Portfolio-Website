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

/* Each drawing "develops" from blurred to sharp as you scroll to it */
function DevelopingImage({ src, index, onImageClick }: {
  src: string; index: number;
  onImageClick?: (images: string[], index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const blur = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 4 : -4, 0]);

  return (
    <motion.div
      ref={ref}
      className="creative__gallery-item glass-card"
      style={{ rotate }}
      whileHover={{ y: -15, scale: 1.04 }}
      onClick={() => onImageClick?.(drawings, index)}
    >
      <motion.div
        className="creative__image-wrapper"
        style={{
          filter: useTransform(
            [blur, brightness],
            ([b, br]) => `blur(${b}px) brightness(${br})`
          ),
          scale,
        }}
      >
        <img src={src} alt="Drawing" />
      </motion.div>
    </motion.div>
  );
}

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

  return (
    <section className="creative" id="creative" ref={ref}>
      <div className="creative__container">
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
            <DevelopingImage key={i} src={src} index={i} onImageClick={onImageClick} />
          ))}
        </div>
      </div>
    </section>
  );
}
