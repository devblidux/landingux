import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function TurningPointSection() {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const nodes: { x: number; y: number; vx: number; vy: number; size: number; pulse: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      nodes.forEach((n, i) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        const glow = Math.sin(n.pulse) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${0.4 * glow})`;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - n.x;
          const dy = nodes[j].y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const alpha = 0.06 * (1 - dist / 120) * (Math.sin(time + i) * 0.3 + 0.7);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="section-turning-point" className="relative min-h-screen flex items-center justify-center bg-[#0a0e1a] overflow-hidden py-24 px-6">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-transparent to-[#0a0e1a] z-[1]" />

      <div ref={ref} className="relative z-10 text-center max-w-4xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          El punto de inflexión
        </h2>

        <div className="relative h-40 sm:h-48 flex items-center justify-center">
          <p
            className={`absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-5xl font-bold transition-all duration-1000 ${
              phase >= 1 ? 'opacity-0 scale-90 -translate-y-4 blur-sm' : 'opacity-100 scale-100 translate-y-0'
            } text-white/80`}
          >
            ¿Cómo diseñamos pantallas?
          </p>
          <p
            className={`absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-5xl font-bold transition-all duration-1000 ${
              phase >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 blur-sm'
            }`}
          >
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              ¿Cómo reducimos incertidumbre antes de construir?
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
