export const SLIDES = [
  'countdown',
  'title',
  'quote',
  'presenter',
  'goal',
  'format',
  'judging',
  'housekeeping',
  'frame',
  'frame-backdrop',
  'frame-who',
  'frame-challenge',
  'frame-directions',
  'frame-judging',
  'ignite',
  'ignite-brief',
  'begin',
  'deadlinecountdown',
] as const

export type SlideId = (typeof SLIDES)[number]

export type SlideStep = 1 | -1

const FORWARD_KEYS = new Set([' ', 'Enter', 'ArrowRight', 'PageDown'])
const BACK_KEYS = new Set(['ArrowLeft', 'PageUp'])

const isSlideId = (value: string): value is SlideId => SLIDES.some((slide) => slide === value)

/** Reads the slide from `#title`, or from a path like `/title` when the host serves it. */
export const slideFromLocation = (hash: string, pathname: string): SlideId =>
  hash ? slideFromHash(hash) : slideFromHash(pathname.replace(/^\/+|\/+$/g, ''))

export const slideFromHash = (hash: string): SlideId => {
  const name = hash.replace(/^#/, '')
  // a bare address opens on the title, the countdown is only shown at #countdown
  return isSlideId(name) ? name : 'title'
}

export const stepSlide = (current: SlideId, step: SlideStep): SlideId =>
  SLIDES[SLIDES.indexOf(current) + step] ?? current

export const stepForKey = (key: string): SlideStep | null => {
  if (FORWARD_KEYS.has(key)) return 1
  if (BACK_KEYS.has(key)) return -1
  return null
}
