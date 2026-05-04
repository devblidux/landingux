import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Ear, PenTool, RefreshCw, Monitor } from 'lucide-react';

const steps = [
  { icon: Ear, label: 'Escuchar requerimientos', color: 'from-slate-400 to-slate-500' },
  { icon: PenTool, label: 'Diseñar en Figma', color: 'from-slate-400 to-slate-500' },
  { icon: RefreshCw, label: 'Iterar', color: 'from-slate-400 to-slate-500' },
  { icon: Monitor, label: 'Entregar pantallas', color: 'from-slate-400 to-slate-500' },
];

export default function BeforeSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false]);
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    steps.forEach((_, i) => {
      setTimeout(() => {
        setVisibleSteps((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 400);
    });
    setTimeout(() => setMessageVisible(true), steps.length * 400 + 600);
  }, [isVisible]);

  return (
    <section id="section-before" className="relative min-h-screen flex items-center justify-center bg-[#0f172a] py-24 px-6">
      <div ref={ref} className="max-w-5xl w-full">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Hace 6 meses trabajábamos así
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 mb-16">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`flex flex-col items-center gap-3 transition-all duration-700 ${
                  visibleSteps[i] ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-4 scale-90'
                }`}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm sm:text-base text-slate-400 text-center max-w-[140px] font-medium">
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`hidden sm:block mx-4 transition-all duration-500 ${
                    visibleSteps[i] ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                >
                  <div className="w-12 h-0.5 bg-gradient-to-r from-slate-500 to-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className={`max-w-2xl mx-auto transition-all duration-1000 ${
            messageVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <div className="relative bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8 text-center backdrop-blur-sm">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
            <p className="relative text-lg sm:text-xl md:text-2xl text-amber-200 font-medium leading-relaxed">
              "Un modelo correcto... pero lento para el ritmo del negocio"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
