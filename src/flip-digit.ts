export type FlipDigit = {
  element: HTMLElement
  showDigit: (digit: string) => void
}

type Half = { root: HTMLElement; face: HTMLElement }

type Leaf = Half & { body: HTMLElement }

type FlapParts = { backTop: Half; backBottom: Half; leafTop: Leaf; leafBottom: Leaf }

const FALL_MS = 190
const LAND_MS = 285
const LAND_CONTACT = 0.62

const createHalf = (edge: 'top' | 'bottom'): Half => {
  const root = document.createElement('div')
  root.className = `flap-half flap-half-${edge}`
  const face = document.createElement('div')
  face.className = 'flap-face'
  root.append(face)
  return { root, face }
}

const createLeaf = (edge: 'top' | 'bottom'): Leaf => {
  const half = createHalf(edge)
  half.root.classList.add('flap-leaf')
  const body = document.createElement('div')
  body.className = 'flap-body'
  half.root.prepend(body)
  return { ...half, body }
}

const animateFlap = (parts: FlapParts, onLanded: () => void): Animation[] => {
  const falling: KeyframeAnimationOptions = { duration: FALL_MS, easing: 'ease-in', fill: 'both' }
  const landing: KeyframeAnimationOptions = { duration: LAND_MS, delay: FALL_MS, fill: 'both' }
  const covering: KeyframeAnimationOptions = { ...landing, duration: LAND_MS * LAND_CONTACT }

  const landed = parts.leafBottom.root.animate(
    [
      { transform: 'rotateX(90deg)', easing: 'ease-in' },
      { transform: 'rotateX(0deg)', offset: LAND_CONTACT, easing: 'ease-out' },
      // the flap kicks back off its stop like a real one
      { transform: 'rotateX(7deg)', offset: 0.8, easing: 'ease-in' },
      { transform: 'rotateX(0deg)' },
    ],
    landing,
  )
  landed.onfinish = onLanded

  return [
    landed,
    parts.leafTop.root.animate(
      [{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(-90deg)' }],
      falling,
    ),
    // glass is see through so the digit under a flap has to fade or both show at once
    parts.backTop.face.animate([{ opacity: 0 }, { opacity: 1 }], falling),
    parts.backBottom.face.animate([{ opacity: 1 }, { opacity: 0 }], covering),
    parts.leafTop.body.animate([{ opacity: 0.35 }, { opacity: 0.6 }], falling),
    // ends at zero so the flap melts into the card with no jump on settle
    parts.leafBottom.body.animate([{ opacity: 0.6 }, { opacity: 0 }], landing),
  ]
}

export const createFlipDigit = (initial: string): FlipDigit => {
  const element = document.createElement('div')
  element.className = 'flap-card'
  element.setAttribute('aria-hidden', 'true')

  const parts: FlapParts = {
    backTop: createHalf('top'),
    backBottom: createHalf('bottom'),
    leafTop: createLeaf('top'),
    leafBottom: createLeaf('bottom'),
  }
  const { backTop, backBottom, leafTop, leafBottom } = parts
  element.append(backTop.root, backBottom.root, leafTop.root, leafBottom.root)
  backTop.face.dataset.flapFace = 'top'
  backTop.face.textContent = initial
  backBottom.face.textContent = initial

  let current = initial
  let running: Animation[] = []

  const settle = () => {
    running.forEach((animation) => animation.cancel())
    running = []
    backBottom.face.textContent = current
    delete element.dataset.flipping
  }

  const showDigit = (digit: string) => {
    if (digit === current) return
    settle()
    const previous = current
    current = digit
    backTop.face.textContent = digit
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      backBottom.face.textContent = digit
      return
    }
    leafTop.face.textContent = previous
    leafBottom.face.textContent = digit
    element.dataset.flipping = ''
    running = animateFlap(parts, settle)
  }

  return { element, showDigit }
}
