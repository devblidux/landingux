import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Briefcase, GitBranch, TrendingUp, Layers } from 'lucide-react';

const bullets = [
  { icon: Briefcase, text: 'Entendemos negocio' },
  { icon: GitBranch, text: 'Diseñamos flujos complejos' },
  { icon: TrendingUp, text: 'Participamos en decisiones estratégicas' },
  { icon: Layers, text: 'Pensamos productos end-to-end' },
];

export default function RoleEvolutionSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [transformActive, setTransformActive] = useState(false);
  const [visibleBullets, setVisibleBullets] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    if (!isVisible) return;
    setTimeout(() => setTransformActive(true), 400);
    bullets.forEach((_, i) => {
      setTimeout(() => {
        setVisibleBullets((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 1200 + i * 300);
    });
  }, [isVisible]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0e1a] py-24 px-6">
      <div ref={ref} className="max-w-4xl w-full text-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          UX → Product Design
        </h2>

        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-16">
          <div
            className={`px-6 sm:px-10 py-4 sm:py-5 rounded-xl border-2 transition-all duration-1000 ${
              transformActive
                ? 'border-slate-600 bg-slate-800/30 text-slate-500 scale-90'
                : 'border-sky-500/50 bg-sky-500/10 text-sky-300 scale-100'
            }`}
          >
            <span className="text-lg sm:text-2xl font-bold">UX Designer</span>
          </div>

          <div className={`transition-all duration-1000 ${transformActive ? 'scale-110' : 'scale-100'}`}>
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-1000 ${
              transformActive ? 'bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/30' : 'bg-slate-700'
            }`}>
              <svg className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-1000 ${transformActive ? 'text-white' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          <div
            className={`px-6 sm:px-10 py-4 sm:py-5 rounded-xl border-2 transition-all duration-1000 ${
              transformActive
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 scale-110 shadow-lg shadow-emerald-500/10'
                : 'border-slate-600 bg-slate-800/30 text-slate-500 scale-90'
            }`}
          >
            <span className="text-lg sm:text-2xl font-bold">Product Designer</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {bullets.map((bullet, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 transition-all duration-700 ${
                visibleBullets[i] ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-4 scale-95'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <bullet.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium text-sm sm:text-base">{bullet.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
