import quote from '#src/assets/first-hackathon-quote.png'
import { MaskedWord } from '#src/MaskedWord.tsx'

export const QuoteSlide = () => (
  <div className="slide flex flex-col justify-center gap-[3cqw] bg-ink px-[7cqw] portrait:gap-[8cqw]">
    <h1 className="font-display text-[3cqw] leading-tight font-semibold tracking-[-0.01em] text-slot-text portrait:text-[7cqw]">
      <MaskedWord delay={0.2}>From one of your applications</MaskedWord>
    </h1>
    <img
      src={quote}
      alt="Past projects, hackathons or achievements: This will be my first hackathon and I am very excited and willing to put all I have got in it"
      className="block h-auto w-full rounded-[1.5cqw] portrait:rounded-[3cqw]"
    />
  </div>
)
