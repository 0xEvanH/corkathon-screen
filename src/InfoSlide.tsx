import { MaskedWord } from '#src/MaskedWord.tsx'

type QrCode = {
  url: string
  alt: string
}

type InfoSlideProps = {
  title: string
  points: readonly string[]
  qr?: QrCode
}

export const InfoSlide = ({ title, points, qr }: InfoSlideProps) => {
  // one point reads as a statement, a long list steps down a size so it still fits
  const pointSize =
    points.length === 1
      ? 'text-[5cqw] portrait:text-[9cqw]'
      : points.length >= 5
        ? 'text-[2.6cqw] portrait:text-[5.2cqw]'
        : 'text-[3cqw] portrait:text-[6cqw]'
  const pointPadding = points.length >= 5 ? 'py-[1.1cqw] portrait:py-[3cqw]' : 'py-[1.3cqw] portrait:py-[3.5cqw]'
  const list = (
    <ul className={`font-display leading-tight font-semibold tracking-[-0.01em] text-paper ${pointSize}`}>
      {points.map((point, index) => (
        <li key={point} className={`border-t border-slot-text/40 ${pointPadding}`}>
          <MaskedWord delay={0.5 + index * 0.12}>{point}</MaskedWord>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="slide flex flex-col justify-center gap-[3.5cqw] bg-ink px-[7cqw] portrait:gap-[9cqw]">
      <h1 className="font-display text-[6.6cqw] leading-[1.12] font-semibold tracking-[-0.03em] text-accent-bright portrait:text-[12cqw]">
        <MaskedWord delay={0.2}>{title}</MaskedWord>
      </h1>
      {qr ? (
        <div className="flex items-center gap-[4cqw] portrait:flex-col portrait:items-start portrait:gap-[6cqw]">
          <div className="min-w-0 flex-1">{list}</div>
          <figure className="m-0 flex shrink-0 flex-col items-center gap-[0.8cqw] rounded-[1.5cqw] bg-paper p-[1.2cqw] portrait:gap-[2cqw] portrait:rounded-[3cqw] portrait:p-[3cqw]">
            <img src={qr.url} alt={qr.alt} className="block size-[17cqw] portrait:size-[28cqw]" />
            <figcaption className="font-display text-[2.2cqw] leading-none font-semibold tracking-[0.08em] text-ink uppercase portrait:text-[4.5cqw]">
              <MaskedWord delay={1}>Scan me</MaskedWord>
            </figcaption>
          </figure>
        </div>
      ) : (
        list
      )}
    </div>
  )
}
