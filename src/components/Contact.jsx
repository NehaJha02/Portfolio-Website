import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiGithub, FiLinkedin, FiPhone } from 'react-icons/fi';

const contactLinks = [
  {
    icon: <FiMail />,
    label: "Email",
    value: "nehaj0888@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=nehaj0888@gmail.com",
  },
  {
    icon: <FiLinkedin />,
    label: "LinkedIn",
    value: "Neha Jha",
    href: "https://www.linkedin.com/in/neha-jha-02n/",
  },
  {
    icon: <FiGithub />,
    label: "GitHub",
    value: "NehaJha02",
    href: "https://github.com/NehaJha02",
  },
  {
    icon: <FiPhone />,
    label: "Phone",
    value: "+91 81169 27964",
    href: "tel:+918116927964",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.4 + i * 0.12,
      duration: 0.7,
      type: 'spring',
      stiffness: 150,
      damping: 15,
    },
  }),
};

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact__container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label__number">09</span>
          <span className="section-label__line" />
          <span className="section-label__text">Get In Touch</span>
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Let's Connect
        </motion.h2>

        <motion.p
          className="contact__intro"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          I'm always open to interesting conversations, collaborations, or just a friendly hello.
          Feel free to reach out!
        </motion.p>

        <div className="contact__grid">
          {contactLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__card glass-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{
                y: -12,
                scale: 1.08,
                boxShadow: '0 20px 40px rgba(156, 107, 189, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="contact__card-icon"
                whileHover={{ rotate: [0, -15, 15, 0], scale: 1.3 }}
                transition={{ duration: 0.5 }}
              >
                {link.icon}
              </motion.div>
              <span className="contact__card-label">{link.label}</span>
              <span className="contact__card-value">{link.value}</span>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="contact__footer"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p>Designed & built with <FiHeart className="contact__heart" /> by Neha Jha</p>
          <p className="contact__year">2025</p>
        </motion.div>
      </div>
    </section>
  );
}

function FiHeart({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );
}
