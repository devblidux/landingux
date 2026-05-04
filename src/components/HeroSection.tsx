import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
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
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.08 * (1 - dist / 150)})`;
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

  useEffect(() => {
    const t1 = setTimeout(() => setTitleVisible(true), 300);
    const t2 = setTimeout(() => setSubtitleVisible(true), 800);
    const t3 = setTimeout(() => setCtaVisible(true), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const scrollToNext = () => {
    const next = document.getElementById('section-before');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0e1a]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-transparent to-[#0a0e1a] z-[1]" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1
          className={`text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">UX</span>
          <span className="text-white/60 mx-3 sm:mx-5 text-3xl sm:text-5xl md:text-6xl">→</span>
          <span className="bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">Product Design</span>
          <span className="text-white/60 mx-3 sm:mx-5 text-3xl sm:text-5xl md:text-6xl">+</span>
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">IA</span>
        </h1>

        <p
          className={`mt-8 text-lg sm:text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Cómo evolucionamos en 6 meses para acelerar decisiones y reducir incertidumbre
        </p>

        <button
          onClick={scrollToNext}
          className={`mt-12 group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-1000 hover:scale-105 hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="relative z-10">Comenzar historia</span>
          <ChevronDown className="relative z-10 w-5 h-5 animate-bounce" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent z-[2]" />
    </section>
  );
}
