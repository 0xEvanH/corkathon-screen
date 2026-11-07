export const SLIDES = [
  'countdown',
  'title',
  'quote',
  'presenter',
  'goal',
  'format',
  'judging',
  'housekeeping',
  'begin',
  'deadlinecountdown',
  'finals',
  'finals-format',
  'panel',
  'frame',
  'frame-backdrop',
  'frame-cover',
  'frame-who',
  'ignite',
  'ignite-deck-1',
  'ignite-deck-2',
  'ignite-deck-3',
  'ignite-deck-4',
  'ignite-deck-5',
  'ignite-deck-6',
  'ignite-deck-7',
  'awards',
  'thanks',
  'outro',
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
