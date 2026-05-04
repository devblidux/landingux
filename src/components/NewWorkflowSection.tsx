import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CalendarHeart,
  CalendarRange,
  CreditCard,
  ExternalLink,
  FilePenLine,
  Landmark,
  Sun,
  Target,
  UserRoundPlus,
  Zap,
  Users,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const roadmapSteps = [
  {
    icon: Target,
    label: 'Escuchar y entender el negocio',
    desc: 'Profundizamos en objetivos y métricas antes de diseñar',
    color: 'from-sky-500 to-cyan-500',
    glow: 'shadow-sky-500/25',
  },
  {
    icon: Zap,
    label: 'Prototipar ultra rápido',
    desc: 'De idea a prototipo navegable en horas, no semanas',
    color: 'from-cyan-500 to-emerald-500',
    glow: 'shadow-cyan-500/25',
  },
  {
    icon: Users,
    label: 'Iterar con stakeholders navegando prototipos',
    desc: 'Feedback real sobre lo que se siente, no lo que se explica',
    color: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/25',
  },
  {
    icon: ShieldCheck,
    label: 'Validar con usuarios sintéticos',
    desc: 'Datos de validación antes de escribir una línea de código',
    color: 'from-teal-500 to-sky-500',
    glow: 'shadow-teal-500/25',
  },
] as const;

/** Proyecto del mini portafolio (prevención / salud). */
export type ImpactProject = {
  icon: LucideIcon;
  title: string;
  summary: string;
  /** Opcional: captura `/portfolio/...` detrás del icono (tenue). */
  thumbnail?: string;
  href?: string | null;
};

type ImpactVertical = 'preventivo' | 'salud';

function projectLinkLabel(href: string): string {
  try {
    const u = new URL(href);
    const host = u.hostname.replace(/^www\./, '');
    const path = u.pathname.replace(/\/$/, '');
    return path ? `${host}${path}` : host;
  } catch {
    return href;
  }
}

const impactByVertical: Record<ImpactVertical, ImpactProject[]> = {
  preventivo: [
    {
      icon: CalendarRange,
      title: 'Comités Paritarios · Programa de trabajo',
      summary:
        'Mejora de usabilidad del programa de trabajo y seguimiento alineado a las necesidades de los integrantes; se exploraron tres vistas UI distintas.',
      href: 'https://minutas-cphs.vercel.app/',
    },
    {
      icon: FilePenLine,
      title: 'Comités Paritarios · Minutas',
      summary:
        'Herramienta para facilitar la generación y el resguardo de minutas de reuniones ordinarias, requisito legal y fiscalizable.',
      href: 'https://minutas-cphs.vercel.app/',
    },
    {
      icon: BarChart3,
      title: 'Reportería (ACHS Virtual) · Cartola preventiva',
      summary:
        'Cartola mensual con datos acumulados de la empresa: accidentabilidad, siniestralidad, LGF, vigilancia de la salud y más.',
      href: 'https://layoutachsvirtual.vercel.app/',
    },
    {
      icon: UserRoundPlus,
      title: 'Comités Paritarios · Registro autónomo',
      summary:
        'Autogestión para crear comités en la plataforma, reduciendo dependencia de la empresa y manteniendo trazabilidad.',
      href: 'https://registro-autonomo-cphs.vercel.app/',
    },
    {
      icon: Sun,
      title: 'Nuevo ecosistema preventivo · RUV',
      summary:
        'Plataforma multiacceso para autoevaluación de trabajadores expuestos a rayos UV, con trazabilidad y seguimiento conjunto.',
      href: 'https://preve-ruv.vercel.app/',
    },
    {
      icon: Landmark,
      title: 'Prevención · PEC',
      summary: 'Flujo organizado para alinear el proceso de pago de pensiones.',
      href: 'https://pec-v2.vercel.app/',
    },
  ],
  salud: [
    {
      icon: CreditCard,
      title: 'SEL · Pago de presupuestos online',
      summary:
        'Canal para clientes SEL no adheridos: pago online de citas de evaluación laboral.',
      href: 'https://achs-salud-citas.vercel.app/',
    },
    {
      icon: CalendarHeart,
      title: 'Agendamiento · Convenio DUOC',
      summary: 'Agendamiento de citas de salud mental para usuarios con convenio Duoc UC.',
      href: 'https://achs-salud-citas.vercel.app/',
    },
  ],
};

function ProjectCard({ project, accent }: { project: ImpactProject; accent: 'sky' | 'emerald' }) {
  const accentBar =
    accent === 'sky'
      ? 'from-sky-400 via-cyan-500 to-sky-500'
      : 'from-emerald-400 via-teal-500 to-emerald-500';
  const accentLink = accent === 'sky' ? 'text-sky-400/95' : 'text-emerald-400/95';
  const accentRing =
    accent === 'sky'
      ? 'focus-visible:ring-sky-400/45 hover:border-sky-500/25'
      : 'focus-visible:ring-emerald-400/45 hover:border-emerald-500/25';

  const href = project.href ?? null;
  const hasLink = Boolean(href);

  const Icon = project.icon;
  const thumbSrc = project.thumbnail;

  const thumbGradient =
    accent === 'sky'
      ? 'from-sky-500 to-cyan-600 shadow-sky-500/25'
      : 'from-emerald-500 to-teal-600 shadow-emerald-500/25';

  const thumbnailEl = (
    <div
      className={`relative mt-0.5 flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br shadow-md ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-[1.04] ${thumbGradient}`}
      aria-hidden
    >
      {thumbSrc ? (
        <>
          <img src={thumbSrc} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-[#0f172a]/55 backdrop-blur-[0.5px]" />
        </>
      ) : null}
      <Icon className="relative z-10 h-[26px] w-[26px] text-white drop-shadow-sm" strokeWidth={1.85} />
    </div>
  );

  const body = (
    <div className="flex min-w-0 gap-2.5">
      <span
        className={`w-0.5 shrink-0 self-stretch rounded-full bg-gradient-to-b ${accentBar} opacity-90 [min-height:52px]`}
        aria-hidden
      />
      {thumbnailEl}
      <div className="min-w-0 flex-1">
        <h5 className="text-[13px] font-semibold leading-snug text-white">{project.title}</h5>
        <p className="mt-1 text-[11px] leading-snug text-slate-400 line-clamp-2">{project.summary}</p>
        {hasLink && href ? (
          <div className={`mt-1.5 flex items-center gap-1 ${accentLink}`}>
            <ExternalLink className="h-3 w-3 shrink-0 opacity-85" aria-hidden />
            <span className="truncate text-[10px] font-medium">{projectLinkLabel(href)}</span>
          </div>
        ) : (
          <p className="mt-1.5 text-[10px] text-white/35">Enlace · próximamente</p>
        )}
      </div>
    </div>
  );

  const cardBase = `rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 transition-all duration-300 ${accentRing}`;

  if (hasLink && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block ${cardBase} hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2`}
      >
        {body}
      </a>
    );
  }

  return <article className={`group ${cardBase}`}>{body}</article>;
}

export default function NewWorkflowSection() {
  const { ref, isVisible } = useScrollAnimation(0.12);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false]);
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const [highlightVisible, setHighlightVisible] = useState(false);
  const [impactTab, setImpactTab] = useState<ImpactVertical>('preventivo');

  useEffect(() => {
    if (!isVisible) return;
    const stepDelay = 380;
    roadmapSteps.forEach((_, i) => {
      setTimeout(() => {
        setVisibleSteps((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * stepDelay);
    });
    const afterRoadmap = roadmapSteps.length * stepDelay + 350;
    setTimeout(() => setPortfolioVisible(true), afterRoadmap);
    setTimeout(() => setHighlightVisible(true), afterRoadmap + 500);
  }, [isVisible]);

  return (
    <section
      id="section-new-workflow"
      className="relative flex min-h-screen items-start justify-center bg-[#0f172a] px-6 py-20 md:py-28"
    >
      <div ref={ref} className="w-full max-w-5xl">
        <h2
          className={`mb-4 text-center text-2xl font-bold text-white transition-all duration-700 sm:text-4xl md:text-5xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          Nueva forma de trabajar
        </h2>
        <p
          className={`mx-auto mb-12 max-w-xl text-center text-sm text-slate-400 transition-all delay-100 duration-700 sm:text-base ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          Flujo de trabajo actual, de punta a punta.
        </p>

        {/* Roadmap */}
        <div className="mb-16 md:mb-20">
          <div className="mb-6 flex justify-center sm:mb-8">
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
                  <span className="relative text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-100 sm:text-[11px]">
                    Roadmap del flujo
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-full lg:items-start lg:justify-between">
            {roadmapSteps.flatMap((step, i) => {
              const column = (
                <div
                  key={`step-${i}`}
                  className={`flex min-w-0 flex-1 flex-col items-center px-1 text-center transition-all duration-700 ${
                    visibleSteps[i] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                >
                  <div
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-md ${step.glow}`}
                  >
                    <step.icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                  <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-white">
                    Paso {i + 1}
                  </span>
                  <h3 className="mt-1 text-[13px] font-semibold leading-snug text-white">{step.label}</h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400 sm:text-xs">
                    {step.desc}
                  </p>
                </div>
              );

              if (i >= roadmapSteps.length - 1) return [column];

              const connector = (
                <div key={`conn-${i}`} className="flex shrink-0 items-center self-start px-0.5 pt-5">
                  <div className="flex items-center gap-px opacity-35">
                    <div className="h-px w-4 bg-gradient-to-r from-transparent to-white/35" />
                    <ArrowRight className="h-3.5 w-3.5 text-white/40" aria-hidden />
                    <div className="h-px w-4 bg-gradient-to-l from-transparent to-white/35" />
                  </div>
                </div>
              );

              return [column, connector];
            })}
          </div>

          <div className="relative lg:hidden">
            <div
              className="absolute bottom-2 left-[22px] top-2 w-px bg-gradient-to-b from-sky-500/35 via-white/12 to-teal-500/35"
              aria-hidden
            />
            <ul className="space-y-6">
              {roadmapSteps.map((step, i) => (
                <li
                  key={step.label}
                  className={`relative flex gap-3 transition-all duration-700 ${
                    visibleSteps[i] ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                  }`}
                >
                  <div
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${step.color} shadow-md ${step.glow}`}
                  >
                    <step.icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 pb-0.5 pt-0.5">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white">
                      Paso {i + 1}
                    </span>
                    <h3 className="mt-0.5 text-sm font-semibold leading-snug text-white">{step.label}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* En qué estamos hoy */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            portfolioVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h3 className="text-center text-xl font-bold text-white sm:text-2xl">En qué estamos hoy</h3>
          <p className="mx-auto mt-2 max-w-lg text-center text-xs text-slate-400 sm:text-sm">
            Proyectos en los que estamos generando impacto con esta metodología.
          </p>

          <div
            className="mx-auto mt-8 flex max-w-sm justify-center rounded-full border border-white/[0.08] bg-black/25 p-1 shadow-inner shadow-black/20"
            role="tablist"
            aria-label="Vertical: prevención o salud"
          >
            <button
              type="button"
              role="tab"
              aria-selected={impactTab === 'preventivo'}
              id="tab-preventivo"
              aria-controls="panel-impacto"
              onClick={() => setImpactTab('preventivo')}
              className={`relative flex-1 rounded-full px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.08em] transition-all sm:text-[13px] ${
                impactTab === 'preventivo'
                  ? 'bg-emerald-500/25 text-emerald-100 shadow-sm ring-1 ring-emerald-400/25'
                  : 'text-white/40 hover:text-white/65'
              }`}
            >
              Prevención
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={impactTab === 'salud'}
              id="tab-salud"
              aria-controls="panel-impacto"
              onClick={() => setImpactTab('salud')}
              className={`relative flex-1 rounded-full px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.08em] transition-all sm:text-[13px] ${
                impactTab === 'salud'
                  ? 'bg-sky-500/25 text-sky-100 shadow-sm ring-1 ring-sky-400/25'
                  : 'text-white/40 hover:text-white/65'
              }`}
            >
              Salud
            </button>
          </div>

          <div
            id="panel-impacto"
            role="tabpanel"
            aria-labelledby={impactTab === 'preventivo' ? 'tab-preventivo' : 'tab-salud'}
            className="mx-auto mt-5 grid max-w-3xl gap-2 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2"
          >
            {impactByVertical[impactTab].map((project, idx) => (
              <ProjectCard key={`${impactTab}-${idx}`} project={project} accent={impactTab === 'preventivo' ? 'emerald' : 'sky'} />
            ))}
          </div>
        </div>

        <div
          className={`mx-auto max-w-3xl transition-all duration-1000 ${
            highlightVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-[0.98] opacity-0'
          }`}
        >
          <div className="relative rounded-xl border border-emerald-500/28 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-6 py-6 text-center backdrop-blur-sm sm:rounded-2xl sm:px-8 sm:py-7">
            <p className="text-lg font-bold leading-relaxed text-transparent sm:text-xl md:text-2xl bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text">
              &ldquo;Pasamos de diseñar interfaces a diseñar decisiones&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
