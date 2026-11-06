import type { ReactNode } from 'react'
import { MaskedWord } from '#src/MaskedWord.tsx'

type SponsorSlideProps = {
  name: string
  blurb: string
  photoUrl: string
  logoUrl: string
  logoAlt: string
}

const SponsorTile = ({ children }: { children: ReactNode }) => (
  <div
    data-sponsor-tile
    className="grid aspect-square h-[38cqh] shrink-0 place-items-center overflow-hidden rounded-[2cqmin] bg-slot portrait:h-auto portrait:w-[41cqw]"
  >
    {children}
  </div>
)

export const SponsorSlide = ({ name, blurb, photoUrl, logoUrl, logoAlt }: SponsorSlideProps) => (
  <div className="slide flex items-center justify-between gap-[5cqw] bg-ink px-[7cqw] portrait:flex-col portrait:items-start portrait:justify-center">
    <div className="min-w-0">
      <h1 className="font-display text-[12cqw] leading-[1.05] font-semibold tracking-[-0.035em] text-paper portrait:text-[20cqw]">
        <MaskedWord delay={0.2}>{name}</MaskedWord>
      </h1>
      <p className="mt-[2cqw] font-display text-[3cqw] leading-tight font-semibold text-slot-text portrait:mt-[5cqw] portrait:text-[6cqw]">
        <MaskedWord delay={0.6}>{blurb}</MaskedWord>
      </p>
    </div>
    <div className="flex shrink-0 gap-[2cqw]">
      <SponsorTile>
        <img
          src={photoUrl}
          alt={`${name} representative`}
          className="size-full object-contain object-bottom"
        />
      </SponsorTile>
      <SponsorTile>
        <img src={logoUrl} alt={logoAlt} className="size-full object-contain p-[3cqmin]" />
      </SponsorTile>
    </div>
  </div>
)
