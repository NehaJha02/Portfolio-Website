import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiArrowDown } from 'react-icons/fi';

const tagline = "Not just learning, building along the way.";

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= tagline.length) {
        setDisplayText(tagline.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Floating orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      <div className="hero__content">
        <motion.div
          className="hero__image-wrapper"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src="/images/profile/profile.jpeg"
            alt="Neha Jha"
            className="hero__image"
          />
          <div className="hero__image-glow" />
        </motion.div>

        <motion.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Neha Jha
        </motion.h1>

        <motion.div
          className="hero__tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="hero__tagline-text">{displayText}</span>
          <span className={`hero__cursor ${showCursor ? '' : 'hero__cursor--hidden'}`}>|</span>
        </motion.div>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          Software Developer Intern &bull; CSE Student &bull; Creative Soul
        </motion.p>

        <motion.a
          href="#about"
          className="hero__scroll-btn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FiArrowDown />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
