import { AnimatePresence, motion } from 'motion/react'
import type { ComponentType } from 'react'
import { BeginSlide } from '#src/BeginSlide.tsx'
import { ClockSlide } from '#src/ClockSlide.tsx'
import { CountdownSlide } from '#src/CountdownSlide.tsx'
import { format, frame, goal, housekeeping, ignite, judging } from '#src/deck-content.ts'
import { FrameBackdropSlide } from '#src/FrameBackdropSlide.tsx'
import { FrameChallengeSlide, FrameDirectionsSlide, FrameJudgingSlide, FrameWhoSlide } from '#src/FrameTrackSlides.tsx'
import { IgniteBriefSlide } from '#src/IgniteBriefSlide.tsx'
import { InfoSlide } from '#src/InfoSlide.tsx'
import { PresenterSlide } from '#src/PresenterSlide.tsx'
import { QuoteSlide } from '#src/QuoteSlide.tsx'
import type { SlideId } from '#src/slide-deck.ts'
import { SponsorSlide } from '#src/SponsorSlide.tsx'
import { TitleSlide } from '#src/TitleSlide.tsx'
import { useRevealTiming } from '#src/use-reveal-timing.ts'
import { useSlideDeck } from '#src/use-slide-deck.ts'

const SLIDE_VIEWS: Record<SlideId, ComponentType> = {
  countdown: CountdownSlide,
  title: TitleSlide,
  quote: QuoteSlide,
  presenter: PresenterSlide,
  goal: () => <InfoSlide {...goal} />,
  format: () => <InfoSlide {...format} />,
  judging: () => <InfoSlide {...judging} />,
  housekeeping: () => <InfoSlide {...housekeeping} />,
  frame: () => <SponsorSlide {...frame} />,
  'frame-backdrop': FrameBackdropSlide,
  'frame-who': FrameWhoSlide,
  'frame-challenge': FrameChallengeSlide,
  'frame-directions': FrameDirectionsSlide,
  'frame-judging': FrameJudgingSlide,
  ignite: () => <SponsorSlide {...ignite} />,
  'ignite-brief': IgniteBriefSlide,
  begin: BeginSlide,
  deadlinecountdown: ClockSlide,
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
