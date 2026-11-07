import { AnimatePresence, motion } from 'motion/react'
import type { ComponentType } from 'react'
import { BeginSlide } from '#src/BeginSlide.tsx'
import { ClockSlide } from '#src/ClockSlide.tsx'
import { CountdownSlide } from '#src/CountdownSlide.tsx'
import { finalsFormat, format, frame, goal, housekeeping, ignite, igniteDeck, judging, thanks } from '#src/deck-content.ts'
import { FrameBackdropSlide } from '#src/FrameBackdropSlide.tsx'
import { FrameCoverSlide } from '#src/FrameCoverSlide.tsx'
import { FrameWhoSlide } from '#src/FrameTrackSlides.tsx'
import { ImageSlide } from '#src/ImageSlide.tsx'
import { InfoSlide } from '#src/InfoSlide.tsx'
import { PanelSlide } from '#src/PanelSlide.tsx'
import { PresenterSlide } from '#src/PresenterSlide.tsx'
import { QuoteSlide } from '#src/QuoteSlide.tsx'
import type { SlideId } from '#src/slide-deck.ts'
import { SponsorSlide } from '#src/SponsorSlide.tsx'
import { StatementSlide } from '#src/StatementSlide.tsx'
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
  'frame-cover': FrameCoverSlide,
  'frame-who': FrameWhoSlide,
  ignite: () => <SponsorSlide {...ignite} />,
  'ignite-deck-1': () => <ImageSlide {...igniteDeck[0]} />,
  'ignite-deck-2': () => <ImageSlide {...igniteDeck[1]} />,
  'ignite-deck-3': () => <ImageSlide {...igniteDeck[2]} />,
  'ignite-deck-4': () => <ImageSlide {...igniteDeck[3]} />,
  'ignite-deck-5': () => <ImageSlide {...igniteDeck[4]} />,
  'ignite-deck-6': () => <ImageSlide {...igniteDeck[5]} />,
  'ignite-deck-7': () => <ImageSlide {...igniteDeck[6]} />,
  begin: BeginSlide,
  deadlinecountdown: ClockSlide,
  finals: () => <StatementSlide words={['Top', '10', 'finalists']} />,
  'finals-format': () => <InfoSlide {...finalsFormat} />,
  panel: PanelSlide,
  awards: () => <StatementSlide words={['And', 'the', 'winners', 'are…']} />,
  thanks: () => <InfoSlide {...thanks} />,
  // the deck ends where it began, on the event title
  outro: TitleSlide,
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
