import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Shield, Gauge, Languages, Link2 } from 'lucide-react';

const cards = [
  {
    icon: Shield,
    title: 'Reducimos riesgo',
    desc: 'Validamos antes de construir, evitando retrabajo y decisiones basadas en supuestos',
    color: 'from-sky-500 to-cyan-500',
    glow: 'group-hover:shadow-sky-500/20',
  },
  {
    icon: Gauge,
    title: 'Aceleramos decisiones',
    desc: 'Prototipos navegables en horas que reemplazan semanas de documentos estáticos',
    color: 'from-cyan-500 to-emerald-500',
    glow: 'group-hover:shadow-cyan-500/20',
  },
  {
    icon: Languages,
    title: 'Traducimos complejidad',
    desc: 'Convertimos requisitos ambiguos en experiencias tangibles que todos pueden evaluar',
    color: 'from-emerald-500 to-teal-500',
    glow: 'group-hover:shadow-emerald-500/20',
  },
  {
    icon: Link2,
    title: 'Conectamos negocio y tecnología',
    desc: 'Un lenguaje común entre stakeholders, desarrollo y usuarios',
    color: 'from-teal-500 to-sky-500',
    glow: 'group-hover:shadow-teal-500/20',
  },
];

export default function BusinessImpactSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    if (!isVisible) return;
    cards.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCards((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 250);
    });
  }, [isVisible]);

  return (
    <section id="section-business-impact" className="relative min-h-screen flex items-center justify-center bg-[#0f172a] py-24 px-6">
      <div ref={ref} className="max-w-6xl w-full">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Lo que aportamos hoy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-700 hover:shadow-xl ${card.glow} ${
                visibleCards[i] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed">{card.desc}</p>
              <div className={`absolute bottom-0 left-0 w-full h-1 rounded-b-2xl bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
