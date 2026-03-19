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
      { x: 0.08, y: 0.03, r: 500, color: [176, 136, 212], speed: 0.0002 },
      { x: 0.92, y: 0.06, r: 450, color: [224, 132, 158], speed: 0.0003 },
      { x: 0.5, y: 0.15, r: 400, color: [232, 180, 160], speed: 0.00025 },
      { x: 0.12, y: 0.32, r: 480, color: [194, 163, 224], speed: 0.00018 },
      { x: 0.88, y: 0.38, r: 420, color: [212, 184, 150], speed: 0.00035 },
      { x: 0.3, y: 0.52, r: 460, color: [224, 132, 158], speed: 0.00022 },
      { x: 0.75, y: 0.6, r: 400, color: [176, 136, 212], speed: 0.0003 },
      { x: 0.18, y: 0.72, r: 480, color: [232, 180, 160], speed: 0.00025 },
      { x: 0.6, y: 0.82, r: 420, color: [194, 163, 224], speed: 0.0002 },
      { x: 0.85, y: 0.92, r: 450, color: [224, 132, 158], speed: 0.00018 },
    ];

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((b) => {
        const cx = (b.x + Math.sin(time * b.speed) * 0.04) * canvas.width;
        const cy = (b.y + Math.cos(time * b.speed * 1.3) * 0.02) * canvas.height;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r);
        gradient.addColorStop(0, `rgba(${b.color.join(',')}, 0.18)`);
        gradient.addColorStop(0.5, `rgba(${b.color.join(',')}, 0.07)`);
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
