import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const chars = '!<>-_\\/[]{}—=+*^?#________';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextScramble({ text, className = '', delay = 0 }: TextScrambleProps) {
  const [display, setDisplay] = useState('');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const length = text.length;
    let frame = 0;
    const totalFrames = length * 3;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        let output = '';
        for (let i = 0; i < length; i++) {
          const revealAt = i * 3;
          if (frame >= revealAt + 3) {
            output += text[i];
          } else if (frame >= revealAt) {
            output += chars[Math.floor(Math.random() * chars.length)];
          } else {
            output += ' ';
          }
        }
        setDisplay(output);
        frame++;
        if (frame > totalFrames + 5) {
          setDisplay(text);
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, text, delay]);

  return (
    <span ref={ref} className={className}>
      {display || '\u00A0'}
    </span>
  );
}
