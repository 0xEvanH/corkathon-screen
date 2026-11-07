import { describe, expect, it } from 'bun:test'
import { SLIDES, slideFromHash, slideFromLocation, stepForKey, stepSlide } from '#src/slide-deck.ts'

describe('slide order', () => {
  it('runs the opening talk and lands on the clock', () => {
    expect(SLIDES).toEqual([
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
    ])
  })
})

describe('slideFromHash', () => {
  it('opens the slide named in the hash', () => {
    expect(slideFromHash('#deadlinecountdown')).toBe('deadlinecountdown')
  })

  it('starts at the title with no hash', () => {
    expect(slideFromHash('')).toBe('title')
  })

  it('starts at the title when the hash is not a slide', () => {
    expect(slideFromHash('#constructor')).toBe('title')
  })
})

describe('slideFromLocation', () => {
  it('reads a path like /countdown', () => {
    expect(slideFromLocation('', '/countdown')).toBe('countdown')
    expect(slideFromLocation('', '/deadlinecountdown/')).toBe('deadlinecountdown')
  })

  it('prefers the hash over the path', () => {
    expect(slideFromLocation('#judging', '/countdown')).toBe('judging')
  })

  it('opens the title at the bare address', () => {
    expect(slideFromLocation('', '/')).toBe('title')
  })
})

describe('stepSlide', () => {
  it('moves forward one slide', () => {
    expect(stepSlide('title', 1)).toBe('quote')
  })

  it('moves back one slide', () => {
    expect(stepSlide('goal', -1)).toBe('presenter')
  })

  it('holds on the clock instead of wrapping to the title', () => {
    expect(stepSlide('deadlinecountdown', 1)).toBe('deadlinecountdown')
  })

  it('goes back from the title to the countdown', () => {
    expect(stepSlide('title', -1)).toBe('countdown')
  })

  it('holds on the first slide going back', () => {
    expect(stepSlide('countdown', -1)).toBe('countdown')
  })
})

describe('stepForKey', () => {
  it.each([' ', 'Enter', 'ArrowRight', 'PageDown'])('moves forward on %p', (key) => {
    expect(stepForKey(key)).toBe(1)
  })

  it.each(['ArrowLeft', 'PageUp'])('moves back on %p', (key) => {
    expect(stepForKey(key)).toBe(-1)
  })

  it('ignores every other key', () => {
    expect(stepForKey('a')).toBeNull()
  })
})
