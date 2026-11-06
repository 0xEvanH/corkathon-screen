import { useReducedMotion, type Transition } from 'motion/react'

const SETTLE_EASE = [0.16, 1, 0.3, 1] as const

export const useRevealTiming = () => {
  const stillOnly = useReducedMotion()
  return (delay: number, duration = 0.8): Transition =>
    stillOnly ? { duration: 0 } : { delay, duration, ease: SETTLE_EASE }
}
