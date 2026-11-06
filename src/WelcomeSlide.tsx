import { motion } from 'motion/react'
import { MaskedWord } from '#src/MaskedWord.tsx'
import { useRevealTiming } from '#src/use-reveal-timing.ts'

const DOT_DELAYS = [1, 1.35, 1.7]

export const WelcomeSlide = () => {
  const timing = useRevealTiming()
  return (
    <div className="slide grid place-content-center bg-ink px-[7cqw]">
      <h1 className="font-display text-[9.5cqw] leading-[1.12] font-semibold tracking-[-0.03em] text-paper portrait:text-[14cqw]">
        <MaskedWord delay={0.2}>Welcome</MaskedWord>
        {DOT_DELAYS.map((delay) => (
          <motion.span
            key={delay}
            data-reveal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={timing(delay, 0.2)}
          >
            .
          </motion.span>
        ))}{' '}
        <span className="text-accent-bright">
          <MaskedWord delay={2.4}>to</MaskedWord>
        </span>
      </h1>
    </div>
  )
}
