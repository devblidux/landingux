/** Orden narrativo del landing; cada id debe existir en el DOM (atributo id del `<section>`). */
export const STORY_SECTIONS = [
  { id: 'section-hero', nextPreview: 'Hace 6 meses trabajábamos así' },
  { id: 'section-before', nextPreview: 'El punto de inflexión' },
  { id: 'section-turning-point', nextPreview: 'Nueva forma de trabajar' },
  { id: 'section-new-workflow', nextPreview: '6 meses de evolución' },
  { id: 'section-timeline', nextPreview: 'Ejemplos de nuestra metodología' },
  { id: 'section-methodology-examples', nextPreview: 'UX → Product Design' },
  { id: 'section-role-evolution', nextPreview: 'Recursos del equipo' },
  { id: 'section-future', nextPreview: 'Reflexión final' },
  { id: 'section-final', nextPreview: null },
] as const;

export const STORY_SECTION_IDS = STORY_SECTIONS.map((s) => s.id);
