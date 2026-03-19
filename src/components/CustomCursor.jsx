import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const dot = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rafId = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      dot.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => setHidden(false);
    const onLeave = () => setHidden(true);

    const onHoverIn = () => setHovering(true);
    const onHoverOut = () => setHovering(false);

    const animate = () => {
      ring.current.x += (dot.current.x - ring.current.x) * 0.15;
      ring.current.y += (dot.current.y - ring.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.current.x}px, ${dot.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    // Add hover detection for interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .glass-card, .navbar__link, .hero__scroll-btn, .projects__link, .contact__card');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    rafId.current = requestAnimationFrame(animate);

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      const newTargets = document.querySelectorAll('a, button, .glass-card, .navbar__link, .hero__scroll-btn, .projects__link, .contact__card');
      newTargets.forEach((el) => {
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${hidden ? 'cursor--hidden' : ''} ${hovering ? 'cursor--hovering' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hidden ? 'cursor--hidden' : ''} ${hovering ? 'cursor--hovering' : ''}`}
      />
    </>
  );
}
