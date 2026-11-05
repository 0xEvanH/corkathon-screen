export class ClockError extends Error {
  readonly code = 'invalid_time'

  constructor(epochMs: number) {
    super(`cannot read a clock time from ${epochMs}`)
    this.name = 'ClockError'
  }
}

const pad = (value: number) => String(value).padStart(2, '0')

export const gmtDigits = (epochMs: number): string[] => {
  if (!Number.isFinite(epochMs)) throw new ClockError(epochMs)
  const time = new Date(epochMs)
  // utc getters because cork is gmt+1 all summer and local time would drift
  return [time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds()]
    .map(pad)
    .join('')
    .split('')
}

export const msUntilNextSecond = (epochMs: number) => 1000 - (epochMs % 1000)
