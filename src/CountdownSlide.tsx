import { talkCountdownText } from '#src/countdown.ts'
import { FlipClock } from '#src/FlipClock.tsx'

// the same poster and clock as the closing slide, counting down to the opening talk
export const CountdownSlide = () => (
  <div className="stage">
    <h1 className="visually-hidden">Corkathon, UCC Computer Science Society</h1>
    <FlipClock countdown={talkCountdownText} />
  </div>
)
