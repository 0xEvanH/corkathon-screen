import { describe, expect, it } from 'bun:test'
import { SLIDES, slideFromHash, stepForKey, stepSlide } from '#src/slide-deck.ts'

describe('slide order', () => {
  it('runs the opening talk and lands on the clock', () => {
    expect(SLIDES).toEqual([
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
    ])
  })
})

describe('slideFromHash', () => {
  it('opens the slide named in the hash', () => {
    expect(slideFromHash('#clock')).toBe('clock')
  })

  it('starts at the title with no hash', () => {
    expect(slideFromHash('')).toBe('title')
  })

  it('starts at the title when the hash is not a slide', () => {
    expect(slideFromHash('#constructor')).toBe('title')
  })
})

describe('stepSlide', () => {
  it('moves forward one slide', () => {
    expect(stepSlide('title', 1)).toBe('presenter')
  })

  it('moves back one slide', () => {
    expect(stepSlide('goal', -1)).toBe('presenter')
  })

  it('holds on the clock instead of wrapping to the title', () => {
    expect(stepSlide('clock', 1)).toBe('clock')
  })

  it('holds on the first slide going back', () => {
    expect(stepSlide('title', -1)).toBe('title')
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
