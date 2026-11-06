import { describe, expect, it } from 'bun:test'
import { FLUTE_COUNT, createFlutedPixels, fluteDelay } from '#src/fluted-field.ts'

const WIDTH = FLUTE_COUNT * 20
const HEIGHT = 60

const pixels = createFlutedPixels(WIDTH, HEIGHT, 2026)

const channelMean = (channel: number, left: number, right: number) => {
  let sum = 0
  let samples = 0
  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = left; x < right; x += 1) {
      sum += pixels[(y * WIDTH + x) * 4 + channel] ?? 0
      samples += 1
    }
  }
  return sum / samples
}

describe('createFlutedPixels', () => {
  it('fills every pixel with four channels', () => {
    expect(pixels).toHaveLength(WIDTH * HEIGHT * 4)
  })

  it('leaves every pixel fully opaque', () => {
    expect(pixels.filter((_, index) => index % 4 === 3).every((alpha) => alpha === 255)).toBe(true)
  })

  it('paints the same field for the same seed', () => {
    expect(createFlutedPixels(WIDTH, HEIGHT, 2026)).toEqual(pixels)
  })

  it('changes the grain with the seed', () => {
    expect(createFlutedPixels(WIDTH, HEIGHT, 7)).not.toEqual(pixels)
  })

  it('runs from deep blue on the left to cyan on the right', () => {
    const leftGreen = channelMean(1, 0, WIDTH / 5)
    const rightGreen = channelMean(1, (WIDTH * 4) / 5, WIDTH)
    expect(rightGreen).toBeGreaterThan(leftGreen * 2)
  })

  it('stays blue on the left where the title sits', () => {
    expect(channelMean(2, 0, WIDTH / 2)).toBeGreaterThan(channelMean(1, 0, WIDTH / 2) * 1.5)
  })

  it('cuts a dark crease at the right edge of a rib', () => {
    const ribWidth = WIDTH / FLUTE_COUNT
    const ribStart = ribWidth * 20
    const middle = channelMean(1, ribStart + ribWidth * 0.4, ribStart + ribWidth * 0.6)
    const crease = channelMean(1, ribStart + ribWidth - 1, ribStart + ribWidth)
    expect(crease).toBeLessThan(middle * 0.85)
  })

  it('adds grain so neighbouring pixels differ', () => {
    const first = pixels.slice(0, 40)
    const distinct = new Set(first.filter((_, index) => index % 4 === 0))
    expect(distinct.size).toBeGreaterThan(3)
  })
})

describe('fluteDelay', () => {
  it('starts at the centre', () => {
    expect(fluteDelay(FLUTE_COUNT / 2, FLUTE_COUNT)).toBeLessThan(0.1)
  })

  it('reaches the edges last', () => {
    expect(fluteDelay(0, FLUTE_COUNT)).toBeGreaterThan(1)
  })

  it('spreads evenly to both sides', () => {
    expect(fluteDelay(3, FLUTE_COUNT)).toBeCloseTo(fluteDelay(FLUTE_COUNT - 4, FLUTE_COUNT))
  })

  it('never gets earlier moving outwards', () => {
    const delays = Array.from({ length: FLUTE_COUNT / 2 }, (_, step) =>
      fluteDelay(FLUTE_COUNT / 2 + step, FLUTE_COUNT),
    )
    expect(delays).toEqual(delays.toSorted((a, b) => a - b))
  })
})
