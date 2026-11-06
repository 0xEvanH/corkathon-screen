import { afterEach, describe, expect, it } from 'bun:test'
import { countdownText } from '#src/countdown.ts'
import { ClockError } from '#src/gmt-time.ts'

const gmt = (hours: number, minutes: number, seconds: number, ms = 0) =>
  Date.UTC(2026, 10, 7, hours, minutes, seconds, ms)

const originalZone = process.env.TZ

afterEach(() => {
  if (originalZone === undefined) delete process.env.TZ
  else process.env.TZ = originalZone
})

describe('countdownText', () => {
  it('shows hours, minutes and seconds left until 21:15 gmt', () => {
    expect(countdownText(gmt(17, 2, 51))).toBe('Ends in 04:12:09')
  })

  it('pads a full day to two digit hours', () => {
    expect(countdownText(gmt(0, 0, 0))).toBe('Ends in 21:15:00')
  })

  it('shows one second left in the final second', () => {
    expect(countdownText(gmt(21, 14, 59))).toBe('Ends in 00:00:01')
  })

  it('rounds a part second up so it never shows zero early', () => {
    expect(countdownText(gmt(21, 14, 59, 500))).toBe('Ends in 00:00:01')
  })

  it('says time is up exactly at 21:15', () => {
    expect(countdownText(gmt(21, 15, 0))).toBe("Time's up")
  })

  it('stays up for the rest of the day instead of rolling to tomorrow', () => {
    expect(countdownText(gmt(23, 59, 59))).toBe("Time's up")
  })

  it('counts on gmt when the machine is on another zone', () => {
    process.env.TZ = 'Asia/Tokyo'
    expect(countdownText(gmt(20, 15, 0))).toBe('Ends in 01:00:00')
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
