import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Target, Zap, Users, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Target,
    label: 'Escuchar y entender el negocio',
    desc: 'Profundizamos en objetivos y métricas antes de diseñar',
    color: 'from-sky-500 to-cyan-500',
    glow: 'shadow-sky-500/20',
  },
  {
    icon: Zap,
    label: 'Prototipar ultra rápido',
    desc: 'De idea a prototipo navegable en horas, no semanas',
    color: 'from-cyan-500 to-emerald-500',
    glow: 'shadow-cyan-500/20',
  },
  {
    icon: Users,
    label: 'Iterar con stakeholders navegando prototipos',
    desc: 'Feedback real sobre lo que se siente, no lo que se explica',
    color: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/20',
  },
  {
    icon: ShieldCheck,
    label: 'Validar con usuarios sintéticos',
    desc: 'Datos de validación antes de escribir una línea de código',
    color: 'from-teal-500 to-sky-500',
    glow: 'shadow-teal-500/20',
  },
];

export default function NewWorkflowSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false]);
  const [highlightVisible, setHighlightVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    steps.forEach((_, i) => {
      setTimeout(() => {
        setVisibleSteps((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 350);
    });
    setTimeout(() => setHighlightVisible(true), steps.length * 350 + 500);
  }, [isVisible]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0f172a] py-24 px-6">
      <div ref={ref} className="max-w-6xl w-full">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Nueva forma de trabajar
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-700 ${
                visibleSteps[i] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg ${step.glow} group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{step.label}</h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{step.desc}</p>
              <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 ${
            highlightVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <div className="relative bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-2xl p-8 sm:p-10 text-center backdrop-blur-sm">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent leading-relaxed">
              "Pasamos de diseñar interfaces a diseñar decisiones"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
