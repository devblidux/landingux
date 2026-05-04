import { useState } from 'react';
import {
  BarChart3,
  CalendarHeart,
  CalendarRange,
  CreditCard,
  ExternalLink,
  FilePenLine,
  Landmark,
  Sun,
  UserRoundPlus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export type ImpactProject = {
  icon: LucideIcon;
  title: string;
  summary: string;
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

export default function MethodologyExamplesSection() {
  const { ref, isVisible } = useScrollAnimation(0.12);
  const [impactTab, setImpactTab] = useState<ImpactVertical>('preventivo');

  return (
    <section
      id="section-methodology-examples"
      className="relative flex min-h-screen items-start justify-center bg-[#0f172a] px-6 py-20 md:py-28"
    >
      <div ref={ref} className="w-full max-w-5xl">
        <h2
          className={`text-center text-2xl font-bold text-white transition-all duration-700 sm:text-4xl md:text-5xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          Ejemplos de nuestra metodología
        </h2>
        <p
          className={`mx-auto mt-4 max-w-xl text-center text-sm text-slate-400 transition-all delay-100 duration-700 sm:text-base ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          Proyectos donde aplicamos el flujo actual de trabajo con IA y prototipado rápido.
        </p>

        <div
          className={`mx-auto mt-10 transition-all duration-700 delay-150 sm:mt-12 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <div
            className="mx-auto flex max-w-sm justify-center rounded-full border border-white/[0.08] bg-black/25 p-1 shadow-inner shadow-black/20"
            role="tablist"
            aria-label="Vertical: prevención o salud"
          >
            <button
              type="button"
              role="tab"
              aria-selected={impactTab === 'preventivo'}
              id="tab-methodology-preventivo"
              aria-controls="panel-methodology-impacto"
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
              id="tab-methodology-salud"
              aria-controls="panel-methodology-impacto"
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
            id="panel-methodology-impacto"
            role="tabpanel"
            aria-labelledby={impactTab === 'preventivo' ? 'tab-methodology-preventivo' : 'tab-methodology-salud'}
            className="mx-auto mt-5 grid max-w-3xl gap-2 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2"
          >
            {impactByVertical[impactTab].map((project, idx) => (
              <ProjectCard
                key={`${impactTab}-${idx}`}
                project={project}
                accent={impactTab === 'preventivo' ? 'emerald' : 'sky'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
