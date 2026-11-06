import { FlutedField } from '#src/FlutedField.tsx'
import { MaskedWord } from '#src/MaskedWord.tsx'

export const TitleSlide = () => (
  <div className="slide overflow-hidden bg-ink">
    <FlutedField />
    <h1 className="absolute inset-x-0 bottom-0 px-[6cqw] pb-[5cqw] font-display text-[12cqw] leading-[1.05] font-semibold tracking-[-0.035em] text-paper portrait:pb-[14cqw] portrait:text-[15cqw]">
      <span className="block">
        <MaskedWord delay={0.9}>Corkathon</MaskedWord>
      </span>{' '}
      <span className="block">
        <MaskedWord delay={1.1}>2026</MaskedWord>
      </span>
    </h1>
  </div>
)
