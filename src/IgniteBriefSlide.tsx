import { igniteBrief } from '#src/deck-content.ts'
import { MaskedWord } from '#src/MaskedWord.tsx'

// Ignite's challenge prompt, then what IGNITE at UCC does
export const IgniteBriefSlide = () => (
  <div className="slide flex flex-col justify-center gap-[3.5cqw] bg-ink px-[7cqw] portrait:gap-[8cqw]">
    <div>
      <p className="font-display text-[1.8cqw] font-semibold tracking-[0.08em] text-slot-text uppercase portrait:text-[4cqw]">
        <MaskedWord delay={0.2}>{igniteBrief.track}</MaskedWord>
      </p>
      <h1 className="mt-[1cqw] font-display text-[6.6cqw] leading-[1.12] font-semibold tracking-[-0.03em] text-accent-bright portrait:mt-[3cqw] portrait:text-[11cqw]">
        <MaskedWord delay={0.35}>{igniteBrief.prompt}</MaskedWord>
      </h1>
      <p className="mt-[1.5cqw] max-w-[72cqw] font-display text-[2.6cqw] leading-tight font-semibold text-paper portrait:mt-[4cqw] portrait:max-w-none portrait:text-[5.2cqw]">
        <MaskedWord delay={0.5}>{igniteBrief.pitch}</MaskedWord>
      </p>
    </div>
    <div>
      <h2 className="font-display text-[2.2cqw] font-semibold text-paper portrait:text-[5cqw]">
        <MaskedWord delay={0.6}>What IGNITE does</MaskedWord>
      </h2>
      <ul className="mt-[1cqw] font-display text-[2.6cqw] leading-tight font-semibold tracking-[-0.01em] text-slot-text portrait:mt-[3cqw] portrait:text-[5.2cqw]">
        {igniteBrief.points.map((point, index) => (
          <li key={point} className="border-t border-slot-text/40 py-[1.1cqw] portrait:py-[3cqw]">
            <MaskedWord delay={0.75 + index * 0.12}>{point}</MaskedWord>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
