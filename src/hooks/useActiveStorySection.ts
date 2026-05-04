import { useEffect, useState } from 'react';

/** Índice de la sección cuyo centro está más cerca del centro del viewport (scroll o programa). */
export function useActiveStorySection(sectionIds: readonly string[]): number {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;

      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const sectionMid = r.top + r.height / 2;
        const dist = Math.abs(sectionMid - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });

      setActiveIndex(best);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [sectionIds]);

  return activeIndex;
}
