import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trails = useRef(Array.from({ length: 6 }, () => ({ x: 0, y: 0 })));
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onEnter = () => setHidden(false);
    const onLeave = () => setHidden(true);
    const onHoverIn = () => setHovering(true);
    const onHoverOut = () => setHovering(false);

    const animate = () => {
      // Smooth ring follow
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

      // Trail particles follow with increasing delay
      trails.current.forEach((t, i) => {
        const target = i === 0 ? pos.current : trails.current[i - 1];
        t.x += (target.x - t.x) * (0.2 - i * 0.025);
        t.y += (target.y - t.y) * (0.2 - i * 0.025);
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.transform = `translate(${t.x}px, ${t.y}px)`;
          trailRefs.current[i].style.opacity = (1 - i / trails.current.length) * 0.3;
        }
      });

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    const attachHovers = () => {
      document.querySelectorAll('a, button, .glass-card, .navbar__link, .projects__card, .creative__gallery-item, .education__gallery-item, .hometown__card').forEach((el) => {
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    };
    attachHovers();

    const observer = new MutationObserver(attachHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
    };
  }, []);

  const vis = hidden ? 'cursor--hidden' : '';
  const hov = hovering ? 'cursor--hovering' : '';

  return (
    <>
      {/* Trail particles */}
      {trails.current.map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="cursor-trail"
          style={{ width: 6 - i * 0.5, height: 6 - i * 0.5 }}
        />
      ))}
      <div ref={dotRef} className={`cursor-dot ${vis} ${hov}`} />
      <div ref={ringRef} className={`cursor-ring ${vis} ${hov}`} />
    </>
  );
}
