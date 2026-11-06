import { ClockError } from '#src/gmt-time.ts'

const HACKING_ENDS_GMT = { hours: 21, minutes: 15 }

const pad = (value: number) => String(value).padStart(2, '0')

export const countdownText = (epochMs: number) => {
  if (!Number.isFinite(epochMs)) throw new ClockError(epochMs)
  const now = new Date(epochMs)
  const end = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    HACKING_ENDS_GMT.hours,
    HACKING_ENDS_GMT.minutes,
  )
  // rounded up so zero only ever lands on the end itself
  const seconds = Math.ceil((end - epochMs) / 1000)
  if (seconds <= 0) return "Time's up"
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor(seconds / 60) % 60
  return `Ends in ${pad(hours)}:${pad(minutes)}:${pad(seconds % 60)}`
}
