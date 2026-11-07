import { panel } from '#src/deck-content.ts'
import { MaskedWord } from '#src/MaskedWord.tsx'

// the sponsor keynote and panel while the judges deliberate
export const PanelSlide = () => (
  <div className="slide flex flex-col justify-center gap-[3cqw] bg-ink px-[7cqw] portrait:gap-[7cqw]">
    <div>
      <p className="font-display text-[1.8cqw] font-semibold tracking-[0.08em] text-slot-text uppercase portrait:text-[4cqw]">
        <MaskedWord delay={0.2}>{panel.kicker}</MaskedWord>
      </p>
      <h1 className="mt-[1cqw] font-display text-[6.6cqw] leading-[1.12] font-semibold tracking-[-0.03em] text-accent-bright portrait:mt-[3cqw] portrait:text-[11cqw]">
        <MaskedWord delay={0.35}>{panel.title}</MaskedWord>
      </h1>
    </div>
    <div className="flex gap-[3cqw] portrait:flex-col portrait:gap-[5cqw]">
      {panel.people.map((person, index) => (
        <div key={person.name} className="flex min-w-0 flex-1 items-center gap-[2cqw] portrait:gap-[4cqw]">
          <div className="grid aspect-square h-[30cqh] shrink-0 place-items-center overflow-hidden rounded-[2cqmin] bg-slot portrait:h-[16cqh]">
            <img src={person.photoUrl} alt={person.name} className="size-full object-contain object-bottom" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-[3cqw] leading-tight font-semibold text-paper portrait:text-[6cqw]">
              <MaskedWord delay={0.6 + index * 0.15}>{person.name}</MaskedWord>
            </p>
            <p className="mt-[0.6cqw] font-display text-[1.9cqw] leading-tight font-semibold text-slot-text portrait:text-[4.2cqw]">
              <MaskedWord delay={0.7 + index * 0.15}>{person.role}</MaskedWord>
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)
