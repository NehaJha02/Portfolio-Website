import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const paragraphs = [
  "Some people follow a fixed path — school, degree, job. I've been more interested in understanding what happens in between.",
  "I'm Neha Jha, from the foothills of Jalpaiguri, West Bengal — a small town where the Kanchenjunga meets the horizon. Currently pursuing Computer Science and Engineering at Lovely Professional University, I didn't just focus on learning concepts — I focused on building things that helped me understand them better.",
  "That's how projects like a legal chatbot and a location-based food platform came into the picture — not as perfect products, but as steps where I learned how real applications are designed, broken, and improved.",
  "Right now, I'm working as a Software Developer Intern at Ralakde Automation, where things are less structured and more real — problems don't come with instructions, and solutions take time, patience, and thinking.",
  "Outside of all this, I paint — not to be productive, but to slow down and think differently.",
  "I'm not trying to rush the process. I'm just trying to understand it better, one step at a time."
];

function AnimatedTitle({ text, inView }) {
  const words = text.split(' ');
  return (
    <motion.h2 className="section-title">
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              delay: 0.2 + i * 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section className="about" id="about" ref={ref}>
      <div ref={sectionRef} className="about__container">
        {/* Parallax decorative line */}
        <motion.div className="about__deco-line" style={{ y: bgY }} />

        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label__number">01</span>
          <span className="section-label__line" />
          <span className="section-label__text">My Story</span>
        </motion.div>

        <AnimatedTitle text="The Journey So Far" inView={inView} />

        <div className="about__content">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className={`about__paragraph ${i === 0 ? 'about__paragraph--highlight' : ''}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, filter: 'blur(8px)' }}
              animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{
                delay: 0.4 + i * 0.12,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
