import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Blob parameters
    const blobs = [
      { x: 0.15, y: 0.1, r: 250, color: [156, 107, 189], speed: 0.0003 },
      { x: 0.85, y: 0.15, r: 200, color: [240, 166, 202], speed: 0.0004 },
      { x: 0.5, y: 0.3, r: 180, color: [212, 187, 240], speed: 0.00035 },
      { x: 0.2, y: 0.5, r: 220, color: [240, 166, 202], speed: 0.00025 },
      { x: 0.8, y: 0.55, r: 190, color: [156, 107, 189], speed: 0.00045 },
      { x: 0.4, y: 0.7, r: 210, color: [212, 187, 240], speed: 0.0003 },
      { x: 0.7, y: 0.85, r: 170, color: [240, 166, 202], speed: 0.0004 },
      { x: 0.3, y: 0.9, r: 200, color: [156, 107, 189], speed: 0.00035 },
    ];

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((b) => {
        const cx = (b.x + Math.sin(time * b.speed) * 0.05) * canvas.width;
        const cy = (b.y + Math.cos(time * b.speed * 1.3) * 0.03) * canvas.height;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r);
        gradient.addColorStop(0, `rgba(${b.color.join(',')}, 0.06)`);
        gradient.addColorStop(0.5, `rgba(${b.color.join(',')}, 0.03)`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, b.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    // Re-size on scroll height change
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-bg" />;
}
