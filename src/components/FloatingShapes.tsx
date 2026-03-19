import { motion } from 'framer-motion';

const shapes = [
  { size: 80, x: '8%', y: '15%', delay: 0, duration: 20, color: 'rgba(156, 107, 189, 0.12)' },
  { size: 50, x: '85%', y: '25%', delay: 2, duration: 25, color: 'rgba(240, 166, 202, 0.12)' },
  { size: 100, x: '75%', y: '65%', delay: 4, duration: 22, color: 'rgba(212, 187, 240, 0.10)' },
  { size: 40, x: '15%', y: '75%', delay: 1, duration: 18, color: 'rgba(156, 107, 189, 0.10)' },
  { size: 60, x: '50%', y: '8%', delay: 3, duration: 23, color: 'rgba(240, 166, 202, 0.10)' },
  { size: 35, x: '90%', y: '80%', delay: 5, duration: 19, color: 'rgba(212, 187, 240, 0.12)' },
];

export default function FloatingShapes() {
  return (
    <div className="floating-shapes">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="floating-shape"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            background: s.color,
            borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '30%' : '40% 60% 60% 40%',
            border: `1.5px solid ${s.color.replace(/[\d.]+\)$/, '0.3)')}`,
            backdropFilter: 'blur(2px)',
          }}
          animate={{
            y: [0, -40, 0, 40, 0],
            x: [0, 25, 0, -25, 0],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
