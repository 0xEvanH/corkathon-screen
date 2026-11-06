export const SLIDES = [
  'title',
  'presenter',
  'goal',
  'format',
  'judging',
  'housekeeping',
  'frame',
  'ignite',
  'begin',
  'clock',
] as const

export type SlideId = (typeof SLIDES)[number]

export type SlideStep = 1 | -1

const FORWARD_KEYS = new Set([' ', 'Enter', 'ArrowRight', 'PageDown'])
const BACK_KEYS = new Set(['ArrowLeft', 'PageUp'])

const isSlideId = (value: string): value is SlideId => SLIDES.some((slide) => slide === value)

export const slideFromHash = (hash: string): SlideId => {
  const name = hash.replace(/^#/, '')
  return isSlideId(name) ? name : SLIDES[0]
}

export const stepSlide = (current: SlideId, step: SlideStep): SlideId =>
  SLIDES[SLIDES.indexOf(current) + step] ?? current

export const stepForKey = (key: string): SlideStep | null => {
  if (FORWARD_KEYS.has(key)) return 1
  if (BACK_KEYS.has(key)) return -1
  return null
}
