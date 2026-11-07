import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const clock = (page: Page) => page.getByRole('timer')

const openAt = async (page: Page, time: string, slide = 'deadlinecountdown') => {
  const paused = new Date(time)
  await page.clock.install({ time: new Date(paused.getTime() - 1000) })
  await page.clock.pauseAt(paused)
  await page.goto(`/#${slide}`)
  await expect(clock(page)).toBeVisible()
}

const shownDigits = (page: Page) => page.locator('[data-flap-face="top"]').allTextContents()

test('shows the current gmt time on load', async ({ page }) => {
  await openAt(page, '2026-11-05T13:42:07Z')
  await expect(clock(page)).toHaveAccessibleName('13:42:07 GMT')
  expect(await shownDigits(page)).toEqual(['1', '3', '4', '2', '0', '7'])
})

test('flips only the digit that changed', async ({ page }) => {
  await openAt(page, '2026-11-05T13:42:07Z')
  await page.clock.runFor(1000)
  await expect(clock(page)).toHaveAccessibleName('13:42:08 GMT')
  await expect(page.locator('[data-flipping]')).toHaveCount(1)
  await expect(page.locator('[data-flipping]')).toHaveCount(0)
  expect(await shownDigits(page)).toEqual(['1', '3', '4', '2', '0', '8'])
})

test('rolls every digit over at midnight', async ({ page }) => {
  await openAt(page, '2026-11-05T23:59:59Z')
  await page.clock.runFor(1000)
  await expect(page.locator('[data-flipping]')).toHaveCount(6)
  await expect(page.locator('[data-flipping]')).toHaveCount(0)
  expect(await shownDigits(page)).toEqual(['0', '0', '0', '0', '0', '0'])
})

test('catches up after the tab sleeps', async ({ page }) => {
  await openAt(page, '2026-11-05T13:42:07Z')
  await page.clock.fastForward('01:00:00')
  await expect(clock(page)).toHaveAccessibleName('14:42:07 GMT')
})

test('names the event for screen readers', async ({ page }) => {
  await openAt(page, '2026-11-05T13:42:07Z')
  await expect(page).toHaveTitle('Corkathon, UCC Computer Science Society')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Corkathon, UCC Computer Science Society',
  )
})

test('sits on the monitor glass at 1920x1080', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await openAt(page, '2026-11-05T13:42:07Z')
  const box = await clock(page).boundingBox()
  if (!box) throw new Error('clock has no box')
  // glass edges measured off corkathonposter1920x1080.png
  expect(box.x).toBeGreaterThan(708)
  expect(box.x + box.width).toBeLessThan(1232)
  expect(box.y).toBeGreaterThan(210)
  expect(box.y + box.height).toBeLessThan(692)
  expect(Math.abs(box.x + box.width / 2 - 970)).toBeLessThan(1)
  expect(Math.abs(box.y + box.height / 2 - 451)).toBeLessThan(1)
})

for (const size of [
  { width: 360, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  test(`fits ${size.width}x${size.height} with no scroll and no axe issues`, async ({ page }) => {
    await page.setViewportSize(size)
    await openAt(page, '2026-11-05T13:42:07Z')
    const box = await clock(page).boundingBox()
    if (!box) throw new Error('clock has no box')
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(size.width)
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(scrollWidth).toBe(size.width)
    // axe runs on timers so the paused clock has to let go first
    await page.clock.resume()
    const scan = await new AxeBuilder({ page }).analyze()
    expect(scan.violations).toEqual([])
  })
}

test.describe('on a machine set to irish summer time', () => {
  test.use({ timezoneId: 'Europe/Dublin' })

  test('still shows gmt', async ({ page }) => {
    await openAt(page, '2026-07-01T12:00:00Z')
    await expect(clock(page)).toHaveAccessibleName('12:00:00 GMT')
  })
})

test.describe('with reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })

  test('swaps digits with no flip', async ({ page }) => {
    await openAt(page, '2026-11-05T13:42:07Z')
    await page.clock.runFor(1000)
    await expect(clock(page)).toHaveAccessibleName('13:42:08 GMT')
    await expect(page.locator('[data-flipping]')).toHaveCount(0)
    expect(await shownDigits(page)).toEqual(['1', '3', '4', '2', '0', '8'])
  })
})

test('centres the clock on a portrait phone', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await openAt(page, '2026-11-05T13:42:07Z')
  const box = await clock(page).boundingBox()
  if (!box) throw new Error('clock has no box')
  expect(Math.abs(box.x + box.width / 2 - 180)).toBeLessThan(1)
})

test('splits each numeral evenly across the hinge', async ({ page }) => {
  await openAt(page, '2026-11-05T13:42:07Z')
  const padding = await page
    .locator('[data-flap-face="top"]')
    .first()
    .evaluate((face) => {
      const size = Number.parseFloat(getComputedStyle(face).fontSize)
      return Number.parseFloat(getComputedStyle(face).paddingBottom) / size
    })
  expect(padding).toBeCloseTo(0.1)
})

test('loads the poster as the background', async ({ page }) => {
  const poster = page.waitForResponse(
    (response) => response.request().resourceType() === 'image',
  )
  await openAt(page, '2026-11-05T13:42:07Z')
  expect((await poster).status()).toBe(200)
})

const cardStyle = (page: Page) =>
  page
    .locator('.flap-card')
    .first()
    .evaluate((card) => {
      const style = getComputedStyle(card)
      return {
        backdrop: style.backdropFilter,
        background: style.backgroundColor,
        border: style.borderTopWidth,
        shadow: style.boxShadow,
      }
    })

const channels = (color: string) => (color.match(/[\d.]+/g) ?? []).map(Number)

test('frosts the cards in blue glass with no stroke edge', async ({ page }) => {
  await openAt(page, '2026-11-05T13:42:07Z')
  const style = await cardStyle(page)
  const [red = 0, green = 0, blue = 0, alpha = 1] = channels(style.background)
  expect(style.backdrop).toContain('blur')
  expect(blue).toBeGreaterThan(green * 2)
  expect(blue).toBeGreaterThan(red * 2)
  expect(alpha).toBeLessThan(1)
  expect(style.border).toBe('0px')
  expect(style.shadow).not.toContain('inset')
})

test('hides the incoming digit behind the flap so glass never ghosts', async ({ page }) => {
  await openAt(page, '2026-11-05T13:42:07Z')
  await page.clock.runFor(1000)
  const opacity = await page.locator('[data-flipping] [data-flap-face="top"]').evaluate((face) => {
    document.getAnimations().forEach((animation) => {
      animation.pause()
      animation.currentTime = 0
    })
    return getComputedStyle(face).opacity
  })
  expect(opacity).toBe('0')
})

test('falls back to solid cards when transparency is reduced', async ({ page }) => {
  const session = await page.context().newCDPSession(page)
  await session.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-transparency', value: 'reduce' }],
  })
  await openAt(page, '2026-11-05T13:42:07Z')
  const style = await cardStyle(page)
  expect(style.backdrop).toBe('none')
  expect(channels(style.background)[3]).toBeUndefined()
})

const countdown = (page: Page) => page.locator('.countdown-card')

test('counts down to the opening talk on the countdown slide', async ({ page }) => {
  await openAt(page, '2026-11-07T08:02:51Z', 'countdown')
  await expect(countdown(page)).toHaveText('Live in 01:12:09')
  await page.clock.runFor(1000)
  await expect(countdown(page)).toHaveText('Live in 01:12:08')
})

test('counts through the night before the event', async ({ page }) => {
  await openAt(page, '2026-11-06T22:00:00Z', 'countdown')
  await expect(countdown(page)).toHaveText('Live in 11:15:00')
})

test('starts the opening talk at 09:15', async ({ page }) => {
  await openAt(page, '2026-11-07T09:14:58Z', 'countdown')
  await expect(countdown(page)).toHaveText('Live in 00:00:02')
  await page.clock.runFor(3000)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Corkathon 2026')
  await expect(page).toHaveURL(/#title$/)
})

test('stays on the clock after the talk instead of replaying it', async ({ page }) => {
  await openAt(page, '2026-11-07T10:00:00Z')
  await page.clock.runFor(5000)
  await expect(clock(page)).toBeVisible()
  await expect(page).toHaveURL(/#deadlinecountdown$/)
})

test('counts down to 19:00 under the clock', async ({ page }) => {
  await openAt(page, '2026-11-07T17:02:51Z')
  await expect(countdown(page)).toHaveText('Ends in 01:57:09')
  await page.clock.runFor(1000)
  await expect(countdown(page)).toHaveText('Ends in 01:57:08')
})

test('says time is up the moment the countdown ends', async ({ page }) => {
  await openAt(page, '2026-11-07T18:59:59Z')
  await expect(countdown(page)).toHaveText('Ends in 00:00:01')
  await page.clock.runFor(1000)
  await expect(countdown(page)).toHaveText("Time's up")
  await expect(clock(page)).toHaveAccessibleName('19:00:00 GMT')
})

test('stays up after the end when the page is reloaded', async ({ page }) => {
  await openAt(page, '2026-11-07T22:30:00Z')
  await expect(countdown(page)).toHaveText("Time's up")
})

test('catches the countdown up after the tab sleeps', async ({ page }) => {
  await openAt(page, '2026-11-07T17:02:51Z')
  await page.clock.fastForward('01:00:00')
  await expect(countdown(page)).toHaveText('Ends in 00:57:09')
})

for (const size of [
  { width: 360, height: 800 },
  { width: 1440, height: 900 },
]) {
  for (const [slide, time] of [
    ['countdown', '2026-11-07T08:02:51Z'],
    ['deadlinecountdown', '2026-11-07T17:02:51Z'],
  ]) {
    test(`keeps the ${slide} text inside the glass at ${size.width}`, async ({ page }) => {
      await page.setViewportSize(size)
      await openAt(page, time, slide)
      const box = await countdown(page).boundingBox()
      if (!box) throw new Error('countdown has no box')
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(size.width)
      expect(box.y + box.height).toBeLessThanOrEqual(size.height)
      const text = await countdown(page).evaluate((card) => {
        const range = document.createRange()
        range.selectNodeContents(card)
        const lines = range.getClientRects()
        const bounds = range.getBoundingClientRect()
        const edge = card.getBoundingClientRect()
        return {
          lines: lines.length,
          inside:
            bounds.left >= edge.left &&
            bounds.right <= edge.right &&
            bounds.top >= edge.top &&
            bounds.bottom <= edge.bottom,
        }
      })
      expect(text).toEqual({ lines: 1, inside: true })
    })
  }
}
