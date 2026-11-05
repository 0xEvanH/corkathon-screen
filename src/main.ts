import { createFlipDigit } from '#src/flip-digit'
import { gmtDigits, msUntilNextSecond } from '#src/gmt-time'

const clock = document.querySelector<HTMLElement>('#clock')
if (!clock) throw new Error('index.html is missing the #clock element')

const spokenTime = (digits: string[]) => {
  const [h1, h2, m1, m2, s1, s2] = digits
  return `${h1}${h2}:${m1}${m2}:${s1}${s2} GMT`
}

const flipDigits = gmtDigits(Date.now()).map((digit) => createFlipDigit(digit))
clock.prepend(...flipDigits.map((digit) => digit.element))

const render = () => {
  const digits = gmtDigits(Date.now())
  digits.forEach((digit, index) => flipDigits[index]?.showDigit(digit))
  clock.setAttribute('aria-label', spokenTime(digits))
}

// rescheduled off the wall clock each time so drift never builds up
const tick = () => {
  render()
  setTimeout(tick, msUntilNextSecond(Date.now()))
}

document.addEventListener('visibilitychange', render)
tick()
