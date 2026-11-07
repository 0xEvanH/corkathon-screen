import { motion } from 'motion/react'
import { useRevealTiming } from '#src/use-reveal-timing.ts'

type ImageSlideProps = {
  title: string
  src: string
  alt: string
}

// a whole slide supplied as an image (a sponsor's own deck), letterboxed on black
export const ImageSlide = ({ title, src, alt }: ImageSlideProps) => {
  const timing = useRevealTiming()
  return (
    <div className="slide overflow-hidden bg-ink">
      <h1 className="visually-hidden">{title}</h1>
      <motion.img
        data-reveal
        src={src}
        alt={alt}
        className="absolute inset-0 size-full object-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={timing(0.1, 0.5)}
      />
    </div>
  )
}
