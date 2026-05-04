import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Search, Rocket, CheckCircle } from 'lucide-react';

const blocks = [
  {
    icon: Search,
    title: 'Exploración',
    items: ['Investigación stack IA', 'Cambio de mindset'],
    color: 'from-sky-500 to-cyan-500',
    accent: 'sky',
  },
  {
    icon: Rocket,
    title: 'Adopción',
    items: ['Prototipos navegables', 'Iteración con negocio'],
    color: 'from-cyan-500 to-emerald-500',
    accent: 'cyan',
  },
  {
    icon: CheckCircle,
    title: 'Consolidación',
    items: ['Validación temprana', 'Reducción de incertidumbre'],
    color: 'from-emerald-500 to-teal-500',
    accent: 'emerald',
  },
];

export default function TimelineSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const [progress, setProgress] = useState(0);
  const [visibleBlocks, setVisibleBlocks] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    if (!isVisible) return;

    let frame: number;
    const start = Date.now();
    const duration = 2000;

    const animate = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);

      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    blocks.forEach((_, i) => {
      setTimeout(() => {
        setVisibleBlocks((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, (i + 1) * 600);
    });

    return () => cancelAnimationFrame(frame);
  }, [isVisible]);

  return (
    <section id="section-timeline" className="relative min-h-screen flex items-center justify-center bg-[#0a0e1a] py-24 px-6">
      <div ref={ref} className="max-w-5xl w-full">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          6 meses de evolución
        </h2>

        <div className="relative">
          {/* Progress line background */}
          <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-white/5 rounded-full -translate-y-1/2" />
          {/* Animated progress line */}
          <div
            className="hidden sm:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-sky-500 via-emerald-500 to-teal-400 rounded-full -translate-y-1/2 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {blocks.map((block, i) => (
              <div
                key={i}
                className={`relative transition-all duration-700 ${
                  visibleBlocks[i] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
                }`}
              >
                {/* Connector dot */}
                <div className="hidden sm:flex absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${block.color} shadow-lg ring-4 ring-[#0a0e1a]`} />
                </div>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 mt-8 sm:mt-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${block.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                    <block.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{block.title}</h3>
                  <ul className="space-y-2">
                    {block.items.map((item, j) => (
                      <li key={j} className="text-slate-400 text-sm sm:text-base flex items-center justify-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${block.color} flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
