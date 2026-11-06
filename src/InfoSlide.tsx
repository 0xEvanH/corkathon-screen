import { MaskedWord } from '#src/MaskedWord.tsx'

type InfoSlideProps = {
  title: string
  points: readonly string[]
}

export const InfoSlide = ({ title, points }: InfoSlideProps) => {
  const pointSize = points.length === 1 ? 'text-[5cqw] portrait:text-[9cqw]' : 'text-[3cqw] portrait:text-[6cqw]'
  return (
    <div className="slide flex flex-col justify-center gap-[3.5cqw] bg-ink px-[7cqw] portrait:gap-[9cqw]">
      <h1 className="font-display text-[6.6cqw] leading-[1.12] font-semibold tracking-[-0.03em] text-accent-bright portrait:text-[12cqw]">
        <MaskedWord delay={0.2}>{title}</MaskedWord>
      </h1>
      <ul className={`font-display leading-tight font-semibold tracking-[-0.01em] text-paper ${pointSize}`}>
        {points.map((point, index) => (
          <li key={point} className="border-t border-slot-text/40 py-[1.3cqw] portrait:py-[3.5cqw]">
            <MaskedWord delay={0.5 + index * 0.12}>{point}</MaskedWord>
          </li>
        ))}
      </ul>
    </div>
  )
}
