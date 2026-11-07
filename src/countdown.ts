import { ClockError } from '#src/gmt-time.ts'

// Corkathon is on Saturday 7 November 2026. The opening countdown runs to the talk,
// which starts itself, and the closing clock runs to the end of hacking.
const TALK_STARTS = Date.UTC(2026, 10, 7, 9, 15)
const HACKING_ENDS = Date.UTC(2026, 10, 7, 19, 0)

const pad = (value: number) => String(value).padStart(2, '0')

const checked = (epochMs: number) => {
  if (!Number.isFinite(epochMs)) throw new ClockError(epochMs)
  return epochMs
}

// rounded up so zero only ever lands on the target itself
const secondsUntil = (target: number, epochMs: number) => Math.ceil((target - checked(epochMs)) / 1000)

const hms = (seconds: number) =>
  `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}`

/** Milliseconds until the opening talk, zero or less once it has started. */
export const msUntilTalk = (epochMs: number) => TALK_STARTS - checked(epochMs)

/** The opening countdown, shown before the talk. */
export const talkCountdownText = (epochMs: number) => {
  const seconds = secondsUntil(TALK_STARTS, epochMs)
  return seconds > 0 ? `Live in ${hms(seconds)}` : 'Starting now'
}

/** The closing countdown, shown on the clock after the talk. */
export const countdownText = (epochMs: number) => {
  const seconds = secondsUntil(HACKING_ENDS, epochMs)
  return seconds > 0 ? `Ends in ${hms(seconds)}` : "Time's up"
}
