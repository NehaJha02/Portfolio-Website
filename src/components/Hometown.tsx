import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FloatingShapes from './FloatingShapes';

interface HometownProps {
  onImageClick?: (images: string[], index: number) => void;
}

const images = [
  { src: '/images/jalpaiguri/jpg1.jpeg' },
  { src: '/images/jalpaiguri/jpg2.jpeg' },
  { src: '/images/jalpaiguri/jpg3.jpeg' },
];

const allSrcs = images.map((img) => img.src);

export default function Hometown({ onImageClick }: HometownProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="hometown" id="hometown" ref={ref}>
      <FloatingShapes />
      <div className="hometown__container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label__number">02</span>
          <span className="section-label__line" />
          <span className="section-label__text">My Hometown</span>
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Jalpaiguri, West Bengal
        </motion.h2>

        <motion.p
          className="hometown__description"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A small town at the foothills of the Himalayas, where the mountains paint the horizon
          and the rivers tell stories of centuries. This is where I belong.
        </motion.p>

        <div className="hometown__gallery">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="hometown__card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.7 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => onImageClick?.(allSrcs, i)}
              style={{ cursor: 'pointer' }}
            >
              <div className="hometown__image-wrapper">
                <img src={img.src} alt="Jalpaiguri" className="hometown__image" />
                <div className="hometown__image-overlay" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
