import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function FinalSection() {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const t1 = setTimeout(() => setQuoteVisible(true), 600);
    const t2 = setTimeout(() => setSubVisible(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; hue: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() * 60 + 160,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(${(p.hue + particles[j].hue) / 2}, 60%, 50%, ${0.05 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0e1a]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/80 via-transparent to-[#0a0e1a]/90 z-[1]" />

      <div ref={ref} className="relative z-10 text-center px-6 max-w-4xl">
        <p
          className={`text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight transition-all duration-1500 ${
            quoteVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          No cambiamos herramientas.
          <br />
          <span className="bg-gradient-to-r from-sky-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Cambiamos la forma de generar valor.
          </span>
        </p>

        <p
          className={`mt-10 text-lg sm:text-xl md:text-2xl text-white/50 font-light transition-all duration-1000 ${
            subVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Somos el puente entre negocio, tecnología y usuarios.
        </p>
      </div>
    </section>
  );
}
