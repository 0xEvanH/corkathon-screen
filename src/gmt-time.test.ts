import { afterEach, describe, expect, it } from 'bun:test'
import { ClockError, gmtDigits, msUntilNextSecond } from '#src/gmt-time'

const originalZone = process.env.TZ

afterEach(() => {
  if (originalZone === undefined) delete process.env.TZ
  else process.env.TZ = originalZone
})

describe('gmtDigits', () => {
  it('pads every field to two digits at the epoch', () => {
    expect(gmtDigits(0)).toEqual(['0', '0', '0', '0', '0', '0'])
  })

  it('splits hours, minutes and seconds in order', () => {
    expect(gmtDigits(Date.UTC(2026, 10, 5, 13, 42, 7))).toEqual(['1', '3', '4', '2', '0', '7'])
  })

  it('stays on gmt when the machine is on irish summer time', () => {
    process.env.TZ = 'Europe/Dublin'
    expect(gmtDigits(Date.UTC(2026, 6, 1, 12, 0, 0)).join('')).toBe('120000')
  })

  it('stays on gmt when the machine is far from it', () => {
    process.env.TZ = 'Asia/Tokyo'
    expect(gmtDigits(Date.UTC(2026, 10, 5, 23, 59, 59)).join('')).toBe('235959')
  })

  it('drops milliseconds instead of rounding up', () => {
    expect(gmtDigits(Date.UTC(2026, 10, 5, 0, 0, 0) + 999).join('')).toBe('000000')
  })

  it('rejects a time that is not a number', () => {
    const caught = (() => {
      try {
        return gmtDigits(Number.NaN)
      } catch (error: unknown) {
        return error
      }
    })()
    expect(caught).toBeInstanceOf(ClockError)
    expect(caught).toHaveProperty('code', 'invalid_time')
  })
})

describe('msUntilNextSecond', () => {
  it('waits a full second when exactly on the boundary', () => {
    expect(msUntilNextSecond(5000)).toBe(1000)
  })

  it('waits only the remainder partway through a second', () => {
    expect(msUntilNextSecond(5750)).toBe(250)
  })
})
