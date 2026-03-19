import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const paragraphs = [
  "Some people follow a fixed path — school, degree, job. I've been more interested in understanding what happens in between.",
  "I'm Neha Jha, from the foothills of Jalpaiguri, West Bengal — a small town where the Kanchenjunga meets the horizon. Currently pursuing Computer Science and Engineering at Lovely Professional University, I didn't just focus on learning concepts — I focused on building things that helped me understand them better.",
  "That's how projects like a legal chatbot and a location-based food platform came into the picture — not as perfect products, but as steps where I learned how real applications are designed, broken, and improved.",
  "Right now, I'm working as a Software Developer Intern at Ralakde Automation, where things are less structured and more real — problems don't come with instructions, and solutions take time, patience, and thinking.",
  "Outside of all this, I paint — not to be productive, but to slow down and think differently.",
  "I'm not trying to rush the process. I'm just trying to understand it better, one step at a time."
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about__container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label__number">01</span>
          <span className="section-label__line" />
          <span className="section-label__text">My Story</span>
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          The Journey So Far
        </motion.h2>

        <div className="about__content">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className={`about__paragraph ${i === 0 ? 'about__paragraph--highlight' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
