import frameWordmark from '#src/assets/logos/frame-wordmark.png'
import { MaskedWord } from '#src/MaskedWord.tsx'

// Frame's cover slide, laid out from slide 1 of FRAME_Corkathon_Presentation1.pptx.
// Their small grey (#ccc6c8) text is lifted to #e8e4e5 so it passes contrast on the olive.
export const FrameCoverSlide = () => (
  <div className="slide overflow-hidden bg-frame-olive font-frame-sans">
    <p className="absolute top-[8.1cqh] left-[4.9cqw] text-[1.04cqw] font-bold tracking-[0.2em] text-paper portrait:text-[3cqw]">
      <MaskedWord delay={0.2}>CORK · DUBLIN · NEW YORK · GRAND CAYMAN</MaskedWord>
    </p>
    <h1 className="absolute top-[22.2cqh] left-[4.2cqw] w-[38.4cqw] portrait:w-[70cqw]">
      <img src={frameWordmark} alt="" className="block h-auto w-full" />
      <span className="visually-hidden">Frame track briefing</span>
    </h1>
    <p className="absolute top-[55.5cqh] left-[4.9cqw] text-[1.15cqw] tracking-[0.2em] text-frame-mist portrait:text-[3.2cqw]">
      <MaskedWord delay={0.4}>CORKATHON · TRACK BRIEFING</MaskedWord>
    </p>
    <div className="absolute top-[80.3cqh] left-[4.9cqw] leading-[1.3] portrait:top-auto portrait:bottom-[18cqh]">
      <p className="text-[1.46cqw] font-bold text-paper portrait:text-[4.5cqw]">
        <MaskedWord delay={0.6}>Harry Page</MaskedWord>
      </p>
      <p className="text-[1.25cqw] text-frame-mist portrait:text-[3.6cqw]">
        <MaskedWord delay={0.7}>Founding AI and Automation Analyst, FRAME</MaskedWord>
      </p>
    </div>
    <div className="absolute inset-x-[4.9cqw] top-[93.3cqh] flex items-baseline justify-between portrait:top-auto portrait:bottom-[6cqh]">
      <p className="font-frame-serif text-[1.25cqw] text-frame-mist portrait:text-[3.6cqw]">
        <MaskedWord delay={0.8}>your vision, our framework</MaskedWord>
      </p>
      <p className="text-[1.04cqw] tracking-[0.15em] text-frame-mist portrait:text-[3cqw]">
        <MaskedWord delay={0.8}>NOVEMBER 2026</MaskedWord>
      </p>
    </div>
  </div>
)
