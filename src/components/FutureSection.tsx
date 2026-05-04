import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Download, Sparkles, BookOpen, Braces } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type TeamResource = {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  actionLabel: string;
  /**
   * Enlace al recurso:
   * - Archivo en el repo: colócalo en `public/recursos/` y usa `/recursos/nombre.ext` (se sugiere descarga en el navegador).
   * - Página externa (Notion, Drive, etc.): URL absoluta `https://...` (se abre en pestaña nueva sin forzar descarga).
   */
  href?: string | null;
};

/** Lista editable en código: cada objeto es una tarjeta (puedes duplicar un bloque `{ ... }` para sumar más). */
export const TEAM_RESOURCES: TeamResource[] = [
  {
    icon: Sparkles,
    title: 'Skill de Claude · UI Kit',
    description:
      'Skill listo para usar con nuestro UI kit: contexto de componentes, tono y patrones para acelerar diseño y revisión en Claude.',
    tag: 'Claude · Skill',
    actionLabel: 'Descargar skill',
    href: '/recursos/achsux-ui-setup.skill',
  },
  {
    icon: BookOpen,
    title: 'Librería de prompts',
    description:
      'Colección curada de prompts para exploración, prototipos, validación con usuarios sintéticos y handoff.',
    tag: 'Prompts',
    actionLabel: 'Abrir librería',
    href: null,
  },
  {
    icon: Braces,
    title: 'Tokens de diseño (JSON)',
    description:
      'Exportación base de tokens de color, espaciado, radii y tipografía del sistema para prototipos y código.',
    tag: 'Design tokens',
    actionLabel: 'Descargar JSON',
    href: '/recursos/achs-tokens-v2.json',
  },
];

function ResourceCard({
  resource,
  visible,
}: {
  resource: TeamResource;
  visible: boolean;
}) {
  const { icon: Icon, title, description, tag, actionLabel, href } = resource;
  const hasLink = Boolean(href);

  const isLocalPublicFile = Boolean(href?.startsWith('/'));

  const shell =
    'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-700 hover:border-white/[0.14] hover:bg-white/[0.05] sm:p-7';

  const body = (
    <>
      <div className="mb-4 inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-sky-200/90">
        {tag}
      </div>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 shadow-lg shadow-sky-500/15 transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{description}</p>
      <div className="mt-6 pt-2">
        {hasLink && href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...(isLocalPublicFile ? { download: true } : {})}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.02] hover:shadow-sky-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden />
            {actionLabel}
          </a>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/45">
            <Download className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
            {actionLabel}
            <span className="ml-1 text-[11px] font-normal uppercase tracking-wider text-white/35">
              · próximamente
            </span>
          </span>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </>
  );

  return (
    <div className={`${shell} ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>{body}</div>
  );
}

export default function FutureSection() {
  const { ref, isVisible } = useScrollAnimation(0.12);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => TEAM_RESOURCES.map(() => false));

  useEffect(() => {
    if (!isVisible) return;
    TEAM_RESOURCES.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCards((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 200);
    });
  }, [isVisible]);

  return (
    <section id="section-future" className="relative flex min-h-screen items-center justify-center bg-[#0f172a] px-6 py-24 md:py-32">
      <div ref={ref} className="w-full max-w-5xl">
        <h2
          className={`text-center text-3xl font-bold text-white transition-all duration-700 sm:text-4xl md:text-5xl ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          Recursos del equipo
        </h2>
        <p
          className={`mx-auto mt-5 max-w-2xl text-center text-sm text-slate-400 transition-all delay-100 duration-700 sm:text-base ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          Material compartido del UI kit y del flujo con IA: skill para Claude, prompts reutilizables y tokens en JSON.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {TEAM_RESOURCES.map((resource, i) => (
            <ResourceCard key={resource.title} resource={resource} visible={visibleCards[i] ?? false} />
          ))}
        </div>
      </div>
    </section>
  );
}
