import { AnimatePresence, motion } from 'motion/react'
import type { ComponentType } from 'react'
import { BeginSlide } from '#src/BeginSlide.tsx'
import { ClockSlide } from '#src/ClockSlide.tsx'
import { format, frame, goal, housekeeping, ignite, judging } from '#src/deck-content.ts'
import { InfoSlide } from '#src/InfoSlide.tsx'
import { PresenterSlide } from '#src/PresenterSlide.tsx'
import type { SlideId } from '#src/slide-deck.ts'
import { SponsorSlide } from '#src/SponsorSlide.tsx'
import { TitleSlide } from '#src/TitleSlide.tsx'
import { useRevealTiming } from '#src/use-reveal-timing.ts'
import { useSlideDeck } from '#src/use-slide-deck.ts'

const SLIDE_VIEWS: Record<SlideId, ComponentType> = {
  title: TitleSlide,
  presenter: PresenterSlide,
  goal: () => <InfoSlide {...goal} />,
  format: () => <InfoSlide {...format} />,
  judging: () => <InfoSlide {...judging} />,
  housekeeping: () => <InfoSlide {...housekeeping} />,
  frame: () => <SponsorSlide {...frame} />,
  ignite: () => <SponsorSlide {...ignite} />,
  begin: BeginSlide,
  clock: ClockSlide,
}

export const SlideDeck = () => {
  const { slide, advance } = useSlideDeck()
  const timing = useRevealTiming()
  const SlideView = SLIDE_VIEWS[slide]

  return (
    <main className="absolute inset-0" onClick={advance}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={timing(0, 0.35)}
        >
          <SlideView />
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
