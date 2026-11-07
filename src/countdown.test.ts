import { afterEach, describe, expect, it } from 'bun:test'
import { countdownText, msUntilTalk, talkCountdownText } from '#src/countdown.ts'
import { ClockError } from '#src/gmt-time.ts'

// the event day, 7 November 2026
const gmt = (hours: number, minutes: number, seconds: number, ms = 0) =>
  Date.UTC(2026, 10, 7, hours, minutes, seconds, ms)

const originalZone = process.env.TZ

afterEach(() => {
  if (originalZone === undefined) delete process.env.TZ
  else process.env.TZ = originalZone
})

describe('talkCountdownText', () => {
  it('counts down to the 09:15 gmt opening talk', () => {
    expect(talkCountdownText(gmt(8, 2, 51))).toBe('Live in 01:12:09')
  })

  it('counts through the night before the event', () => {
    expect(talkCountdownText(Date.UTC(2026, 10, 6, 22, 0, 0))).toBe('Live in 11:15:00')
  })

  it('rounds a part second up so it never shows zero early', () => {
    expect(talkCountdownText(gmt(9, 14, 59, 500))).toBe('Live in 00:00:01')
  })

  it('says it is starting once 09:15 arrives', () => {
    expect(talkCountdownText(gmt(9, 15, 0))).toBe('Starting now')
  })
})

describe('countdownText', () => {
  it('shows hours, minutes and seconds left until 19:00 gmt', () => {
    expect(countdownText(gmt(17, 2, 51))).toBe('Ends in 01:57:09')
  })

  it('runs from the start of the talk', () => {
    expect(countdownText(gmt(9, 15, 0))).toBe('Ends in 09:45:00')
  })

  it('shows one second left in the final second', () => {
    expect(countdownText(gmt(18, 59, 59))).toBe('Ends in 00:00:01')
  })

  it('rounds a part second up so it never shows zero early', () => {
    expect(countdownText(gmt(18, 59, 59, 500))).toBe('Ends in 00:00:01')
  })

  it('says time is up exactly at 19:00', () => {
    expect(countdownText(gmt(19, 0, 0))).toBe("Time's up")
  })

  it('stays up afterwards', () => {
    expect(countdownText(gmt(23, 59, 59))).toBe("Time's up")
    expect(countdownText(Date.UTC(2026, 10, 8, 12, 0, 0))).toBe("Time's up")
  })

  it('counts on gmt when the machine is on another zone', () => {
    process.env.TZ = 'Asia/Tokyo'
    expect(countdownText(gmt(18, 0, 0))).toBe('Ends in 01:00:00')
  })

  it('rejects a time that is not a number', () => {
    const caught = (() => {
      try {
        return countdownText(Number.NaN)
      } catch (error: unknown) {
        return error
      }
    })()
    expect(caught).toBeInstanceOf(ClockError)
    expect(caught).toHaveProperty('code', 'invalid_time')
  })
})

describe('msUntilTalk', () => {
  it('measures the wait to 09:15 gmt on the event day', () => {
    expect(msUntilTalk(gmt(9, 14, 58))).toBe(2000)
    expect(msUntilTalk(Date.UTC(2026, 10, 6, 22, 0, 0))).toBe(11.25 * 3600 * 1000)
  })

  it('is zero or less once the talk has started', () => {
    expect(msUntilTalk(gmt(9, 15, 0))).toBe(0)
    expect(msUntilTalk(gmt(12, 0, 0))).toBeLessThan(0)
  })
})
