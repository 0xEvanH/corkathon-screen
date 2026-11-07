import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Locator, type Page } from '@playwright/test'

const heading = (page: Page) => page.getByRole('heading', { level: 1 })

const EVENT_TITLE = 'Corkathon 2026'
const QUOTE_TITLE = 'From one of your applications'
const PRESENTER_TITLE = "Hi, I'm Masood"
const BEGIN_TITLE = 'Let the hacking begin'
const SPONSORS = [
  ['frame', 'Harry Page', 'Frame logo'],
  ['ignite', 'Eamon Curtin', 'University College Cork logo'],
] as const
const TALK = [
  ['title', EVENT_TITLE],
  ['quote', QUOTE_TITLE],
  ['presenter', PRESENTER_TITLE],
  ['goal', "Today's goal"],
  ['format', 'Format & Devpost'],
  ['judging', 'Judging'],
  ['housekeeping', 'Quick housekeeping'],
  ['begin', BEGIN_TITLE],
] as const
const EVENING = [
  ['finals', 'Top 10 finalists'],
  ['finals-format', 'Final pitches'],
  ['panel', 'Sponsor keynote & panel'],
  ['frame', 'Harry Page'],
  ['frame-backdrop', 'Frame'],
  ['frame-cover', 'Frame track briefing'],
  ['frame-who', 'Who we are'],
  ['ignite', 'Eamon Curtin'],
  ['ignite-deck-1', 'IGNITE: UCC’s Home for Entrepreneurship'],
  ['ignite-deck-2', 'What is IGNITE?'],
  ['ignite-deck-3', 'What you get when you join IGNITE'],
  ['ignite-deck-4', 'Is this you?'],
  ['ignite-deck-5', 'IGNITE for students'],
  ['ignite-deck-6', 'Follow IGNITE and join the community'],
  ['ignite-deck-7', 'Your next profile photo could be on us!'],
  ['awards', 'And the winners are…'],
  ['thanks', 'Thank you'],
  ['outro', EVENT_TITLE],
] as const

const expectLoaded = async (image: Locator) => {
  await expect(image).toBeVisible()
  await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
}

test('opens on the event title', async ({ page }) => {
  await page.goto('/')
  await expect(heading(page)).toHaveText(EVENT_TITLE)
})

test('introduces the presenter and the society', async ({ page }) => {
  await page.goto('/#presenter')
  await expect(heading(page)).toHaveText(PRESENTER_TITLE)
  await expectLoaded(page.getByRole('img', { name: 'Masood' }))
  await expect(page.getByText('UCC Computer Science Society')).toBeVisible()
})

test('walks all eight opening slides with the space bar and ends on the clock', async ({ page }) => {
  await page.goto('/')
  for (const [, title] of TALK) {
    await expect(heading(page)).toHaveText(title)
    await page.keyboard.press('Space')
  }
  await expect(page.getByRole('timer')).toBeVisible()
})

for (const [slide, count] of [['goal', 1], ['format', 4], ['judging', 4], ['housekeeping', 5], ['finals-format', 4], ['thanks', 3]] as const) {
  test(`lists ${count} on ${slide}`, async ({ page }) => {
    await page.goto(`/#${slide}`)
    await expect(page.getByRole('listitem')).toHaveCount(count)
  })
}

for (const [slide, photo, logo] of SPONSORS) {
  test(`shows the person and logo on ${slide}`, async ({ page }) => {
    await page.goto(`/#${slide}`)
    await expectLoaded(page.getByRole('img', { name: photo }))
    await expectLoaded(page.getByRole('img', { name: logo }))
  })

  for (const size of [
    { width: 360, height: 800 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    test(`keeps ${slide} text clear of its images at ${size.width}`, async ({ page }) => {
      await page.setViewportSize(size)
      await page.goto(`/#${slide}`)
      const text = await heading(page).boundingBox()
      const images = await page.locator('[data-sponsor-tile]').evaluateAll((tiles) =>
        tiles.map((tile) => {
          const { left, right, top, bottom } = tile.getBoundingClientRect()
          return { left, right, top, bottom }
        }),
      )
      if (!text) throw new Error('heading has no box')
      expect(images).toHaveLength(2)
      for (const image of images) {
        const apart =
          image.left >= text.x + text.width || image.top >= text.y + text.height
        expect(apart).toBe(true)
        expect(image.left).toBeGreaterThanOrEqual(0)
        expect(image.right).toBeLessThanOrEqual(size.width)
        expect(image.bottom).toBeLessThanOrEqual(size.height)
      }
    })
  }
}

test('follows a clicker sending page up and page down', async ({ page }) => {
  await page.goto('/')
  await expect(heading(page)).toHaveText(EVENT_TITLE)
  await page.keyboard.press('PageDown')
  await expect(heading(page)).toHaveText(QUOTE_TITLE)
  await page.keyboard.press('PageUp')
  await expect(heading(page)).toHaveText(EVENT_TITLE)
})

test('moves forward on a mouse click', async ({ page }) => {
  await page.goto('/')
  await expect(heading(page)).toHaveText(EVENT_TITLE)
  await page.mouse.click(200, 200)
  await expect(heading(page)).toHaveText(QUOTE_TITLE)
})

test('ignores a held key so one press is one slide', async ({ page }) => {
  await page.goto('/')
  await expect(heading(page)).toHaveText(EVENT_TITLE)
  await page.keyboard.down('ArrowRight')
  await page.keyboard.down('ArrowRight')
  await page.keyboard.up('ArrowRight')
  await expect(heading(page)).toHaveText(QUOTE_TITLE)
})

test('stays on the clock after a refresh', async ({ page }) => {
  await page.goto('/#begin')
  await expect(heading(page)).toHaveText(BEGIN_TITLE)
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('timer')).toBeVisible()
  await expect(page).toHaveURL(/#deadlinecountdown$/)
  await page.reload()
  await expect(page.getByRole('timer')).toBeVisible()
})

test('walks the evening slides on from the deadline clock', async ({ page }) => {
  await page.goto('/#deadlinecountdown')
  await expect(page.getByRole('timer')).toBeVisible()
  for (const [, title] of EVENING) {
    await page.keyboard.press('Space')
    await expect(heading(page)).toHaveText(title)
  }
})

test('does not wrap back to the start from the last slide', async ({ page }) => {
  await page.goto('/#outro')
  await expect(heading(page)).toHaveText(EVENT_TITLE)
  await page.keyboard.press('ArrowRight')
  await expect(page).toHaveURL(/#outro$/)
})

test('falls back to the title on a hash that is not a slide', async ({ page }) => {
  await page.goto('/#nonsense')
  await expect(heading(page)).toHaveText(EVENT_TITLE)
})

for (const slide of ['title', 'begin']) {
  test(`paints the fluted field on ${slide}`, async ({ page }) => {
    await page.goto(`/#${slide}`)
    await expect(heading(page)).toBeVisible()
    const flutes = page.locator('[data-flute]')
    await expect(flutes).toHaveCount(30)
    const blue = await flutes.first().evaluate((canvas: HTMLCanvasElement) =>
      canvas.getContext('2d')?.getImageData(5, 5, 1, 1).data[2],
    )
    expect(blue).toBeGreaterThan(150)
  })
}

test('leaves room for descenders inside the word masks', async ({ page }) => {
  await page.goto('/#begin')
  await expect(heading(page)).toHaveText(BEGIN_TITLE)
  const room = await heading(page)
    .locator('[data-reveal]')
    .first()
    .evaluate((word: HTMLElement) => {
      const mask = word.parentElement
      if (!mask) throw new Error('word has no mask')
      const fontSize = Number.parseFloat(getComputedStyle(word).fontSize)
      return (mask.offsetHeight - word.offsetHeight) / fontSize
    })
  expect(room).toBeGreaterThanOrEqual(0.1)
})

test('makes no requests to other sites', async ({ page }) => {
  const outside: string[] = []
  page.on('request', (request) => {
    if (!request.url().startsWith('http://localhost')) outside.push(request.url())
  })
  await page.goto('/')
  await expect(heading(page)).toHaveText(EVENT_TITLE)
  expect(outside).toEqual([])
})

for (const size of [
  { width: 360, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  for (const [slide, title] of [...TALK, ...EVENING]) {
    test(`${slide} fits ${size.width}x${size.height} with no axe issues`, async ({ page }) => {
      await page.setViewportSize(size)
      await page.goto(`/#${slide}`)
      await expect(heading(page)).toHaveText(title)
      const box = await heading(page).boundingBox()
      if (!box) throw new Error('heading has no box')
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(size.width)
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      expect(scrollWidth).toBe(size.width)
      const overflows = await page
        .locator('.slide')
        .evaluate((slide) => slide.scrollHeight > slide.clientHeight)
      expect(overflows).toBe(false)
      const scan = await new AxeBuilder({ page }).analyze()
      expect(scan.violations).toEqual([])
    })
  }
}

test.describe('with reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })

  for (const [slide] of [...TALK, ...EVENING]) {
    test(`shows ${slide} text at rest with nothing moving in`, async ({ page }) => {
      await page.goto(`/#${slide}`)
      const moving = page.locator('[data-reveal]')
      await expect(moving.first()).toBeVisible()
      await expect
        .poll(() =>
          moving.evaluateAll((items) =>
            items.filter((item) => {
              const style = getComputedStyle(item)
              return style.opacity !== '1' || !['none', 'matrix(1, 0, 0, 1, 0, 0)'].includes(style.transform)
            }).length,
          ),
        )
        .toBe(0)
    })
  }
})
