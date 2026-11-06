import { motion } from 'motion/react'
import { society } from '#src/deck-content.ts'
import { MaskedWord } from '#src/MaskedWord.tsx'
import { presenter } from '#src/presenter.ts'
import { useRevealTiming } from '#src/use-reveal-timing.ts'

const PresenterPhoto = () => {
  const timing = useRevealTiming()
  return (
    <div className="relative aspect-4/5 h-[76cqh] shrink-0 overflow-hidden rounded-[2cqmin] bg-slot portrait:h-[46cqh]">
      <motion.div
        data-reveal
        className="grid size-full place-items-center"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={timing(0.7, 1.4)}
      >
        <img
          src={presenter.photoUrl}
          alt={presenter.name}
          className="size-full object-contain object-bottom"
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 origin-right bg-accent"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={timing(0.7, 1)}
      />
    </div>
  )
}

export const PresenterSlide = () => (
  <div className="slide flex items-center justify-between gap-[5cqw] bg-ink px-[7cqw] portrait:flex-col portrait:items-start portrait:justify-center">
    <div className="min-w-0">
      <h1 className="font-display text-[6.6cqw] leading-[1.12] font-semibold tracking-[-0.03em] text-paper portrait:text-[12cqw]">
        <span className="block">
          <MaskedWord delay={0.2}>Hi,</MaskedWord> <MaskedWord delay={0.35}>I'm</MaskedWord>
        </span>{' '}
        <span className="block">
          <MaskedWord delay={0.9}>{presenter.name}</MaskedWord>
        </span>
      </h1>
      <p className="mt-[2.5cqw] font-display text-[2.6cqw] leading-tight font-semibold text-accent-bright portrait:mt-[4cqw] portrait:text-[5.5cqw]">
        <MaskedWord delay={1.3}>{society.name}</MaskedWord>
      </p>
      <p className="mt-[0.6cqw] font-display text-[2.2cqw] leading-tight font-semibold text-slot-text portrait:mt-[1.5cqw] portrait:text-[5cqw]">
        <MaskedWord delay={1.45}>{society.blurb}</MaskedWord>
      </p>
    </div>
    <PresenterPhoto />
  </div>
)
