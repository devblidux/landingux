import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeftRight,
  Layers3,
  RefreshCw,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

type LegacyPain = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Degradado del badge del icono */
  iconBg: string;
  iconGlow: string;
  /** Borde superior / acento de tarjeta */
  cardAccent: string;
};

/** Dolores del flujo anterior — cada uno es una tarjeta visual con icono y color propio. */
const LEGACY_PAINS: LegacyPain[] = [
  {
    icon: RefreshCw,
    title: 'Retrabajo en bucle',
    description:
      'Validaciones con negocio llegaban tarde: decisiones cuando el diseño ya estaba cerrado y volvíamos atrás una y otra vez.',
    iconBg: 'from-amber-500 to-orange-600',
    iconGlow: 'shadow-amber-500/25',
    cardAccent: 'border-t-2 border-t-amber-500/65',
  },
  {
    icon: ArrowLeftRight,
    title: 'Idas y vueltas sin síntesis',
    description:
      'Mucho ping‑pong entre técnica y negocio para alinear detalles finos, sin un prototipo que sintetizara el acuerdo.',
    iconBg: 'from-rose-500 to-pink-600',
    iconGlow: 'shadow-rose-500/25',
    cardAccent: 'border-t-2 border-t-rose-500/60',
  },
  {
    icon: Layers3,
    title: 'Pantallas sueltas en Figma',
    description:
      'Exceso de vistas sin narrativa compartida y poca documentación útil para decidir con claridad.',
    iconBg: 'from-violet-500 to-indigo-600',
    iconGlow: 'shadow-violet-500/25',
    cardAccent: 'border-t-2 border-t-violet-500/60',
  },
  {
    icon: Smartphone,
    title: '“Navegable”, pero poco realista',
    description:
      'El tiempo justo impedía acercarse a una experiencia creíble; las maquetas navegables no reflejaban el producto real.',
    iconBg: 'from-cyan-500 to-teal-600',
    iconGlow: 'shadow-cyan-500/25',
    cardAccent: 'border-t-2 border-t-cyan-500/65',
  },
];

export default function TurningPointSection() {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);
  const [painsVisible, setPainsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setPhase(0);
      setPainsVisible(false);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || phase < 2) {
      if (phase < 2) setPainsVisible(false);
      return;
    }
    const t = setTimeout(() => setPainsVisible(true), 700);
    return () => clearTimeout(t);
  }, [phase, isVisible]);

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
    <section id="section-turning-point" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0e1a] px-6 py-24">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0f172a] via-transparent to-[#0a0e1a]" />

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl text-center">
        <h2
          className={`mb-16 text-3xl font-bold text-white transition-all duration-700 sm:text-4xl md:text-5xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          El punto de inflexión
        </h2>

        <div className="relative flex h-40 items-center justify-center sm:h-48">
          <p
            className={`absolute inset-0 flex items-center justify-center text-2xl font-bold transition-all duration-1000 sm:text-3xl md:text-5xl ${
              phase >= 1 ? 'scale-90 -translate-y-4 opacity-0 blur-sm' : 'translate-y-0 scale-100 opacity-100'
            } text-white/80`}
          >
            ¿Cómo diseñamos pantallas?
          </p>
          <p
            className={`absolute inset-0 flex items-center justify-center text-2xl font-bold transition-all duration-1000 sm:text-3xl md:text-5xl ${
              phase >= 2 ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-90 opacity-0 blur-sm'
            }`}
          >
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              ¿Cómo reducimos incertidumbre antes de construir?
            </span>
          </p>
        </div>

        <div
          className={`mx-auto mt-8 transition-all duration-700 sm:mt-12 ${
            painsVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
          }`}
          aria-live="polite"
        >
          <div className="mx-auto mb-6 inline-flex rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-md">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200/85">
              Antes · dolores del flujo anterior
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {LEGACY_PAINS.map((pain, i) => {
              const Icon = pain.icon;
              return (
                <article
                  key={pain.title}
                  className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] px-4 py-4 text-left shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.14] hover:from-white/[0.08] sm:px-5 sm:py-5 ${pain.cardAccent} ${
                    painsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: painsVisible ? `${100 + i * 110}ms` : '0ms' }}
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-white/[0.07] to-transparent opacity-60 transition-opacity group-hover:opacity-100" />

                  <div className="relative flex gap-3 sm:gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 ${pain.iconBg} ${pain.iconGlow}`}
                    >
                      <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" strokeWidth={1.85} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="text-sm font-bold leading-snug text-white sm:text-base">{pain.title}</h3>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400 sm:text-xs">{pain.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
