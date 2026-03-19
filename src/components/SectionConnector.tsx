import { motion, useScroll, useTransform } from 'framer-motion';

export default function SectionConnector() {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

  return (
    <div className="section-connector">
      <div className="section-connector__track" />
      <motion.div className="section-connector__fill" style={{ height }} />
      <motion.div
        className="section-connector__glow"
        style={{ height, opacity: glowOpacity }}
      />
      {/* Dots at each section */}
      {[8, 18, 28, 38, 48, 56, 64, 74, 84, 92].map((pos, i) => (
        <motion.div
          key={i}
          className="section-connector__dot"
          style={{ top: `${pos}%` }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      ))}
    </div>
  );
}
