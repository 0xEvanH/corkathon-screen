import frameWordmark from '#src/assets/logos/frame-wordmark.png'
import { MaskedWord } from '#src/MaskedWord.tsx'

// Frame's own backdrop, laid out to match FRAME_Backdrop.pptx
export const FrameBackdropSlide = () => (
  <div className="slide overflow-hidden bg-frame-olive">
    <p className="absolute top-[6.6cqh] left-[4.9cqw] font-frame-sans text-[1.04cqw] font-bold text-paper portrait:text-[3.6cqw]">
      <MaskedWord delay={0.2}>CORK · DUBLIN · NEW YORK · GRAND CAYMAN</MaskedWord>
    </p>
    <h1 className="absolute top-[27.8cqh] left-[4.2cqw] w-[50cqw] portrait:w-[84cqw]">
      <img src={frameWordmark} alt="" className="block h-auto w-full" />
      <span className="visually-hidden">Frame</span>
    </h1>
    <p className="absolute top-[88.8cqh] left-[4.9cqw] font-frame-serif text-[1.8cqw] text-frame-stone italic portrait:top-auto portrait:bottom-[8cqh] portrait:text-[7cqw]">
      <MaskedWord delay={0.5}>your vision, our framework</MaskedWord>
    </p>
  </div>
)
