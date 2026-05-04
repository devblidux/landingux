import { useEffect, useState } from 'react';
import { Bot, LayoutTemplate, Mic2, RefreshCw, Sparkles, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PHASE_COUNT = 5;

export default function NewWorkflowSection() {
  const { ref, isVisible } = useScrollAnimation(0.12);
  const [phaseVisible, setPhaseVisible] = useState<boolean[]>(() =>
    Array.from({ length: PHASE_COUNT }, () => false),
  );
  const [highlightVisible, setHighlightVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setPhaseVisible(Array.from({ length: PHASE_COUNT }, () => false));
      setHighlightVisible(false);
      return;
    }
    const stepDelay = 340;
    const timers: number[] = [];
    for (let i = 0; i < PHASE_COUNT; i++) {
      timers.push(
        window.setTimeout(() => {
          setPhaseVisible((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * stepDelay),
      );
    }
    const quoteAt = PHASE_COUNT * stepDelay + 420;
    timers.push(window.setTimeout(() => setHighlightVisible(true), quoteAt));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [isVisible]);

  const [v0, v1, v2, v3, v4] = phaseVisible;

  return (
    <section
      id="section-new-workflow"
      className="relative flex min-h-screen items-start justify-center overflow-hidden bg-[#0f172a] px-6 py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        aria-hidden
      >
        <div className="absolute left-1/2 top-[18%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-500/12 blur-[100px]" />
        <div className="absolute bottom-[12%] right-[8%] h-[280px] w-[280px] rounded-full bg-teal-500/10 blur-[90px]" />
        <div className="absolute bottom-[20%] left-[6%] h-[220px] w-[220px] rounded-full bg-cyan-500/8 blur-[80px]" />
      </div>

      <div ref={ref} className="relative z-10 w-full max-w-5xl">
        <h2
          className={`mb-4 text-center text-2xl font-bold text-white transition-all duration-700 sm:text-4xl md:text-5xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          Nueva forma de trabajar
        </h2>
        <p
          className={`mx-auto mb-10 max-w-md text-center text-sm text-slate-400 transition-all delay-100 duration-700 sm:text-base ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          Contexto → prompt → maquetas que iteran; más adelante, usuarios reales y sintéticos.
        </p>

        <div className="mb-14 md:mb-16">
          <div className="mb-8 flex justify-center">
            <div
              className={`origin-center motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:blur-0 transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity motion-reduce:duration-300 ${
                isVisible
                  ? 'pointer-events-auto translate-y-0 scale-100 opacity-100 blur-0 motion-reduce:opacity-100'
                  : 'pointer-events-none translate-y-5 scale-[0.94] opacity-0 blur-[2px] motion-reduce:opacity-0'
              }`}
              aria-hidden={!isVisible}
            >
              <div
                className={`rounded-full bg-gradient-to-r from-sky-400/70 via-cyan-400/55 to-teal-400/65 p-[1px] shadow-[0_4px_24px_rgba(0,0,0,0.35)] ${
                  isVisible ? 'motion-safe:animate-roadmap-badge' : ''
                }`}
              >
                <span className="relative flex items-center justify-center overflow-hidden rounded-full bg-[#0f172a]/95 px-5 py-2.5 backdrop-blur-md sm:px-6 sm:py-3">
                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sky-500/15 via-transparent to-teal-500/12 opacity-90"
                    aria-hidden
                  />
                  <span className="relative text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-100 sm:text-[11px]">
                    Ciclo de trabajo
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop / tablet diagram */}
          <div className="relative mx-auto hidden max-w-4xl sm:block">
            <div className="relative flex flex-col items-center">
              {/* Listen */}
              <div
                className={`relative z-20 transition-all duration-700 ease-out ${
                  v0 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
              >
                <div className="-rotate-1 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/25">
                      <Mic2 className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200/90">
                        Entrada
                      </p>
                      <p className="text-base font-semibold text-white">Escuchar · Entender</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector listen → prompt */}
              <svg
                className={`relative z-10 -my-1 h-14 w-px overflow-visible transition-opacity duration-500 ${
                  v1 ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="56"
                  stroke="url(#wfGradV)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="translate-x-[0.5px]"
                />
                <defs>
                  <linearGradient id="wfGradV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(56,189,248,0.55)" />
                    <stop offset="100%" stopColor="rgba(45,212,191,0.35)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Prompt + Maquetas row */}
              <div className="relative z-10 flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-6">
                <div
                  className={`relative mx-auto flex w-full max-w-[220px] rotate-1 justify-center transition-all duration-700 ease-out lg:mx-0 ${
                    v1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                >
                  <div className="relative w-full rounded-2xl border border-cyan-400/35 bg-gradient-to-b from-cyan-500/15 to-teal-500/10 px-6 py-5 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
                    <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-400/20 via-transparent to-teal-500/10 opacity-80" />
                    <div className="relative flex flex-col items-center text-center">
                      <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg shadow-cyan-500/30">
                        <Sparkles className="h-5 w-5 text-white" strokeWidth={2} />
                      </div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100/85">
                        Brief vivo
                      </p>
                      <p className="mt-1 text-lg font-bold text-white">Prompt</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`relative z-10 -my-2 flex justify-center lg:hidden transition-opacity duration-500 ${
                    v2 ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden
                >
                  <svg width="14" height="40" viewBox="0 0 14 40" className="overflow-visible text-teal-400/60">
                    <line x1="7" y1="2" x2="7" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path
                      d="M 3 22 L 7 31 L 11 22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Horizontal connector */}
                <div
                  className={`relative hidden h-14 shrink-0 items-center lg:flex transition-opacity duration-500 ${
                    v2 ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden
                >
                  <div className="h-px w-10 bg-gradient-to-r from-cyan-400/45 to-teal-400/35" />
                  <svg width="36" height="20" viewBox="0 0 36 20" className="text-teal-400/70">
                    <path
                      d="M 4 10 L 28 10 M 22 5 L 30 10 L 22 15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="h-px w-10 bg-gradient-to-r from-teal-400/35 to-transparent" />
                </div>

                <div
                  className={`relative w-full max-w-md flex-1 transition-all duration-700 ease-out lg:max-w-[340px] ${
                    v2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  <div className="-rotate-1 rounded-2xl border border-teal-400/25 bg-white/[0.05] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-md">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/30">
                        <LayoutTemplate className="h-7 w-7 text-white" strokeWidth={2} />
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-200/85">
                          Artefacto
                        </p>
                        <p className="mt-0.5 text-xl font-bold text-white">Maquetas</p>
                      </div>
                    </div>
                    <div
                      className={`mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0f172a]/60 px-3 py-2.5 transition-opacity duration-700 ${
                        v3 ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <RefreshCw
                        className="h-4 w-4 shrink-0 text-teal-300 motion-safe:animate-[spin_14s_linear_infinite]"
                        aria-hidden
                      />
                      <p className="text-xs font-medium leading-snug text-slate-300">
                        Iteramos · mejoramos · queda{' '}
                        <span className="text-teal-200">reutilizable</span>
                      </p>
                    </div>
                  </div>

                  {/* Loop curve under maquetas → back toward prompt */}
                  <svg
                    className={`pointer-events-none absolute -bottom-[72px] left-1/2 z-0 hidden w-[min(100%,380px)] -translate-x-[58%] overflow-visible lg:block transition-opacity duration-700 ${
                      v3 ? 'opacity-[0.85]' : 'opacity-0'
                    }`}
                    viewBox="0 0 380 88"
                    height="88"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="wfLoopGrad" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(45,212,191,0.5)" />
                        <stop offset="100%" stopColor="rgba(56,189,248,0.25)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 340 12 C 260 92 48 92 28 44"
                      fill="none"
                      stroke="url(#wfLoopGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="motion-safe:animate-workflow-dash"
                      style={{ strokeDasharray: '7 11' }}
                    />
                  </svg>
                </div>
              </div>

              {/* Loop hint mobile */}
              <p
                className={`relative z-10 mt-5 max-w-[18rem] text-center text-[11px] leading-snug text-slate-500 transition-opacity duration-700 lg:hidden ${
                  v3 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Ciclo prompt ↔ maquetas hasta que el artefacto sea estable y reutilizable.
              </p>
            </div>
          </div>

          {/* Mobile stacked */}
          <div className="relative mx-auto space-y-5 sm:hidden">
            <div
              className={`rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all duration-700 ${
                v0 ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-md shadow-sky-500/25">
                  <Mic2 className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-200/85">
                    Entrada
                  </p>
                  <p className="text-sm font-semibold text-white">Escuchar · Entender</p>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl border border-cyan-400/35 bg-gradient-to-b from-cyan-500/15 to-teal-500/10 p-4 transition-all duration-700 ${
                v1 ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 shadow-md shadow-cyan-500/25">
                  <Sparkles className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-100/85">
                    Brief vivo
                  </p>
                  <p className="text-sm font-semibold text-white">Prompt</p>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl border border-teal-400/25 bg-white/[0.05] p-4 backdrop-blur-md transition-all duration-700 ${
                v2 ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-md shadow-teal-500/25">
                  <LayoutTemplate className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-200/85">
                    Artefacto
                  </p>
                  <p className="text-sm font-semibold text-white">Maquetas</p>
                </div>
              </div>
              <div
                className={`mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-[#0f172a]/55 px-3 py-2 transition-opacity duration-700 ${
                  v3 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <RefreshCw className="h-3.5 w-3.5 text-teal-300 motion-safe:animate-[spin_14s_linear_infinite]" />
                <p className="text-[11px] text-slate-400">
                  Iteración · mejora · <span className="text-teal-200">reutilizable</span>
                </p>
              </div>
            </div>
          </div>

          {/* Validation strip */}
          <div
            className={`relative mx-auto mt-16 max-w-3xl transition-all duration-700 ease-out md:mt-[5.25rem] ${
              v4 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Etapa posterior
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
              <div className="group relative flex flex-1 items-center justify-center gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.07] px-5 py-4 backdrop-blur-sm transition-transform duration-300 hover:border-emerald-400/35">
                <Users className="h-7 w-7 text-emerald-300" strokeWidth={2} />
                <span className="text-sm font-semibold text-white">Usuarios reales</span>
              </div>

              <div
                className="hidden items-center gap-2 text-slate-600 sm:flex"
                aria-hidden
              >
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-slate-600/80" />
                <span className="text-[10px] uppercase tracking-widest text-slate-600">+</span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-600/80" />
              </div>

              <div className="group relative flex flex-1 items-center justify-center gap-3 rounded-2xl border border-sky-500/22 bg-sky-500/[0.06] px-5 py-4 backdrop-blur-sm transition-transform duration-300 hover:border-sky-400/32">
                <Bot className="h-7 w-7 text-sky-300" strokeWidth={2} />
                <span className="text-sm font-semibold text-white">Usuarios sintéticos</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mx-auto max-w-3xl transition-all duration-1000 ${
            highlightVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-[0.98] opacity-0'
          }`}
        >
          <div className="relative rounded-xl border border-emerald-500/28 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-6 py-6 text-center backdrop-blur-sm sm:rounded-2xl sm:px-8 sm:py-7">
            <p className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-lg font-bold leading-relaxed text-transparent sm:text-xl md:text-2xl">
              &ldquo;Pasamos de diseñar interfaces a diseñar decisiones&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
