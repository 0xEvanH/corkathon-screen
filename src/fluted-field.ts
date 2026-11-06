export const FLUTE_COUNT = 30

type Rgb = readonly [number, number, number]

type RampStop = { at: number; color: Rgb }

const SPREAD_SECONDS = 1.5
const GRAIN_STRENGTH = 26

const RAMP: readonly RampStop[] = [
  { at: 0, color: [24, 44, 226] },
  { at: 0.35, color: [38, 80, 234] },
  { at: 0.62, color: [78, 150, 238] },
  { at: 0.85, color: [54, 214, 234] },
  { at: 1, color: [184, 242, 226] },
]

const CREASE_COLOR: Rgb = [28, 52, 224]

// mulberry32, seeded so the grain matches on every screen and every run
const seededRandom = (seed: number) => {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let mixed = Math.imul(state ^ (state >>> 15), 1 | state)
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296
  }
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const mix = (from: number, to: number, amount: number) => from + (to - from) * amount

const blob = (x: number, y: number, centreX: number, centreY: number, sizeX: number, sizeY: number) =>
  Math.exp(-(((x - centreX) / sizeX) ** 2) - ((y - centreY) / sizeY) ** 2)

const rampColor = (position: number): Rgb => {
  const t = clamp01(position)
  const upper = RAMP.findIndex((stop) => stop.at >= t)
  const to = RAMP[Math.max(upper, 1)] ?? RAMP[1]
  const from = RAMP[Math.max(upper, 1) - 1] ?? RAMP[0]
  if (!from || !to) return [0, 0, 0]
  const amount = (t - from.at) / (to.at - from.at)
  return [
    mix(from.color[0], to.color[0], amount),
    mix(from.color[1], to.color[1], amount),
    mix(from.color[2], to.color[2], amount),
  ]
}

// where the light sits before the ribs bend it, 0 is deep blue and 1 is the pale hotspot
const lightAt = (x: number, y: number) =>
  0.06 +
  0.82 * x ** 1.4 +
  0.3 * blob(x, y, 0.3, -0.02, 0.55, 0.12) -
  0.1 * blob(x, y, 0.12, 0.72, 0.3, 0.3) +
  0.34 * blob(x, y, 0.96, 0.7, 0.05, 0.2)

const flutedColor = (x: number, y: number): Rgb => {
  const rib = x * FLUTE_COUNT
  const across = rib - Math.floor(rib)
  // each rib magnifies its slice of the light, more so towards the bottom
  const bentX = x + (across - 0.5) * (0.07 + 0.07 * y)
  const sheen = 0.05 * clamp01(1 - across / 0.2)
  const base = rampColor(lightAt(clamp01(bentX), y) + sheen)
  const crease = across ** (6.5 - 4.5 * x * y) * (0.4 + 0.6 * x)
  return [
    mix(base[0], CREASE_COLOR[0], crease),
    mix(base[1], CREASE_COLOR[1], crease),
    mix(base[2], CREASE_COLOR[2], crease),
  ]
}

export const createFlutedPixels = (width: number, height: number, seed: number) => {
  const random = seededRandom(seed)
  const pixels = new Uint8ClampedArray(width * height * 4)
  for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
      const [red, green, blue] = flutedColor(column / width, row / height)
      const grain = (random() - 0.5) * GRAIN_STRENGTH
      const offset = (row * width + column) * 4
      pixels[offset] = red + grain
      pixels[offset + 1] = green + grain
      pixels[offset + 2] = blue + grain
      pixels[offset + 3] = 255
    }
  }
  return pixels
}

export const fluteDelay = (index: number, count: number) =>
  Math.abs((index + 0.5) / count - 0.5) * 2 * SPREAD_SECONDS
