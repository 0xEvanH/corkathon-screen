import { useEffect, useRef } from 'react'
import { countdownText } from '#src/countdown.ts'
import { createFlipDigit } from '#src/flip-digit.ts'
import { gmtDigits, msUntilNextSecond } from '#src/gmt-time.ts'

const spokenTime = (digits: string[]) => {
  const [h1, h2, m1, m2, s1, s2] = digits
  return `${h1}${h2}:${m1}${m2}:${s1}${s2} GMT`
}

export const FlipClock = () => {
  const clockRef = useRef<HTMLDivElement>(null)
  const countdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clock = clockRef.current
    const countdown = countdownRef.current
    if (!clock || !countdown) return undefined

    const flipDigits = gmtDigits(Date.now()).map((digit) => createFlipDigit(digit))
    clock.prepend(...flipDigits.map((digit) => digit.element))

    const render = () => {
      const now = Date.now()
      const digits = gmtDigits(now)
      digits.forEach((digit, index) => flipDigits[index]?.showDigit(digit))
      clock.setAttribute('aria-label', spokenTime(digits))
      countdown.textContent = countdownText(now)
    }

    let timer: ReturnType<typeof setTimeout>
    // rescheduled off the wall clock each time so drift never builds up
    const tick = () => {
      render()
      timer = setTimeout(tick, msUntilNextSecond(Date.now()))
    }

    document.addEventListener('visibilitychange', render)
    tick()

    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', render)
      flipDigits.forEach((digit) => digit.element.remove())
    }
  }, [])

  return (
    <div ref={clockRef} className="flip-clock" role="timer">
      <div className="zone-card" aria-hidden="true">
        GMT
      </div>
      <div ref={countdownRef} className="countdown-card" />
    </div>
  )
}
