import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Cpu, Clock, RefreshCw, Compass } from 'lucide-react';

const cards = [
  {
    icon: Cpu,
    title: 'Escalar stack IA',
    desc: 'Integrar más herramientas de IA en nuestro flujo de trabajo',
    color: 'from-sky-500 to-cyan-500',
  },
  {
    icon: Clock,
    title: 'Participación temprana',
    desc: 'Estar desde la definición del problema, no solo en la solución',
    color: 'from-cyan-500 to-emerald-500',
  },
  {
    icon: RefreshCw,
    title: 'Validación continua',
    desc: 'Ciclos cortos de testeo y aprendizaje integrados al desarrollo',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Compass,
    title: 'Liderar procesos complejos',
    desc: 'Ser el eje que conecta negocio, tecnología y experiencia',
    color: 'from-teal-500 to-sky-500',
  },
];

export default function FutureSection() {
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
    <section className="relative min-h-screen flex items-center justify-center bg-[#0f172a] py-24 px-6">
      <div ref={ref} className="max-w-5xl w-full">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Hacia dónde vamos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-700 ${
                visibleCards[i] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed">{card.desc}</p>
              <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
