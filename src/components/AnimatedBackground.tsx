import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    };
    resize();
    window.addEventListener('resize', resize);

    const blobs = [
      { x: 0.12, y: 0.05, r: 350, color: [156, 107, 189], speed: 0.0003 },
      { x: 0.88, y: 0.08, r: 280, color: [240, 166, 202], speed: 0.0004 },
      { x: 0.5, y: 0.18, r: 250, color: [212, 187, 240], speed: 0.00035 },
      { x: 0.15, y: 0.32, r: 300, color: [240, 166, 202], speed: 0.00025 },
      { x: 0.82, y: 0.38, r: 260, color: [156, 107, 189], speed: 0.00045 },
      { x: 0.35, y: 0.52, r: 280, color: [212, 187, 240], speed: 0.0003 },
      { x: 0.75, y: 0.62, r: 240, color: [240, 166, 202], speed: 0.0004 },
      { x: 0.2, y: 0.72, r: 300, color: [156, 107, 189], speed: 0.00035 },
      { x: 0.6, y: 0.82, r: 260, color: [212, 187, 240], speed: 0.0003 },
      { x: 0.85, y: 0.92, r: 280, color: [240, 166, 202], speed: 0.00025 },
    ];

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((b) => {
        const cx = (b.x + Math.sin(time * b.speed) * 0.04) * canvas.width;
        const cy = (b.y + Math.cos(time * b.speed * 1.3) * 0.02) * canvas.height;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r);
        gradient.addColorStop(0, `rgba(${b.color.join(',')}, 0.04)`);
        gradient.addColorStop(0.5, `rgba(${b.color.join(',')}, 0.015)`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, b.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

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
