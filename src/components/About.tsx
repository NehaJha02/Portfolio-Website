import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';


const paragraphs = [
  { text: "Some people follow a fixed path — school, degree, job. I've been more interested in understanding what happens in between.", highlight: true },
  { text: "I'm Neha Jha, from the foothills of Jalpaiguri, West Bengal — a small town where the Kanchenjunga meets the horizon. Currently pursuing Computer Science and Engineering at Lovely Professional University, I didn't just focus on learning concepts — I focused on building things that helped me understand them better." },
  { text: "That's how projects like a legal chatbot and a location-based food platform came into the picture — not as perfect products, but as steps where I learned how real applications are designed, broken, and improved." },
  { text: "Right now, I'm working as a Software Developer Intern at Ralakde Automation, where things are less structured and more real — problems don't come with instructions, and solutions take time, patience, and thinking." },
  { text: "Outside of all this, I paint — not to be productive, but to slow down and think differently." },
  { text: "I'm not trying to rush the process. I'm just trying to understand it better, one step at a time." },
];

/* Each paragraph reveals with a clip-path wipe */
function ClipReveal({ children, delay, direction }: { children: React.ReactNode; delay: number; direction: 'left' | 'right' }) {
  const from = direction === 'left' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
  return (
    <motion.div
      initial={{ clipPath: from, opacity: 0 }}
      whileInView={{ clipPath: 'inset(0 0% 0 0%)', opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const decoY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <section className="about" id="about" ref={ref}>
      <div ref={sectionRef} className="about__container">
        <motion.div className="about__deco-line" style={{ y: decoY }} />

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

        <h2 className="section-title">
          The Journey So Far
        </h2>

        <div className="about__content">
          {paragraphs.map((p, i) => (
            <ClipReveal key={i} delay={0.1 + i * 0.08} direction={i % 2 === 0 ? 'left' : 'right'}>
              <p className={`about__paragraph ${p.highlight ? 'about__paragraph--highlight' : ''}`}>
                {p.text}
              </p>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
