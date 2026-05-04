import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { STORY_SECTION_IDS, STORY_SECTIONS } from '../storySections';
import { useActiveStorySection } from '../hooks/useActiveStorySection';

/** Misma cadencia que antes tenía el CTA dentro del hero (título → subtítulo → botón). */
const HERO_CTA_DELAY_MS = 1300;

export default function SectionContinueControl() {
  const ids = STORY_SECTION_IDS;
  const activeIndex = useActiveStorySection(ids);
  const hasNext = activeIndex < STORY_SECTIONS.length - 1;
  const nextPreview = STORY_SECTIONS[activeIndex]?.nextPreview;

  const heroIntroDone = useRef(false);
  const [heroCtaVisible, setHeroCtaVisible] = useState(false);

  useEffect(() => {
    if (activeIndex !== 0) {
      heroIntroDone.current = true;
      setHeroCtaVisible(true);
      return;
    }

    if (heroIntroDone.current) {
      setHeroCtaVisible(true);
      return;
    }

    const t = window.setTimeout(() => {
      setHeroCtaVisible(true);
      heroIntroDone.current = true;
    }, HERO_CTA_DELAY_MS);

    return () => window.clearTimeout(t);
  }, [activeIndex]);

  if (!hasNext) return null;

  const goNext = () => {
    heroIntroDone.current = true;
    setHeroCtaVisible(true);
    const nextId = STORY_SECTIONS[activeIndex + 1]?.id;
    if (!nextId) return;
    document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const primaryLabel = activeIndex === 0 ? 'Comenzar historia' : 'Continuar';

  return (
    <div
      className={`fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-1000 ${
        activeIndex === 0 && !heroCtaVisible ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      }`}
      aria-live="polite"
    >
      <button
        type="button"
        onClick={goNext}
        aria-label={
          activeIndex === 0
            ? nextPreview
              ? `Comenzar la historia. Siguiente: ${nextPreview}`
              : 'Comenzar la historia'
            : nextPreview
              ? `Continuar. Siguiente: ${nextPreview}`
              : 'Continuar'
        }
        className="pointer-events-auto group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold text-lg rounded-full overflow-hidden transition hover:scale-105 hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e1a]"
      >
        <span className="relative z-10">{primaryLabel}</span>
        <ChevronDown className="relative z-10 w-5 h-5 shrink-0 animate-bounce" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </button>
    </div>
  );
}
