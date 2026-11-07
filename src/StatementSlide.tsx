import { FlutedField } from '#src/FlutedField.tsx'
import { MaskedWord } from '#src/MaskedWord.tsx'

// the fluted backdrop of the title and begin slides, with one big line along the bottom
export const StatementSlide = ({ words }: { words: readonly string[] }) => (
  <div className="slide overflow-hidden bg-ink">
    <FlutedField />
    <h1 className="absolute inset-x-0 bottom-0 px-[6cqw] pb-[5cqw] font-display text-[10cqw] leading-[1.05] font-semibold tracking-[-0.035em] text-paper portrait:pb-[14cqw] portrait:text-[15cqw]">
      {words.map((word, index) => (
        <span key={word}>
          <MaskedWord delay={0.9 + index * 0.15}>{word}</MaskedWord>{' '}
        </span>
      ))}
    </h1>
  </div>
)
