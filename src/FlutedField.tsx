import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { FLUTE_COUNT, createFlutedPixels, fluteDelay } from '#src/fluted-field.ts'
import { useRevealTiming } from '#src/use-reveal-timing.ts'

// width has to divide by the flute count or the strips land on half pixels
const FLUTE_WIDTH = 50
const FIELD_WIDTH = FLUTE_WIDTH * FLUTE_COUNT
const FIELD_HEIGHT = 844

let paintedField: ImageData | null = null

const flutedField = () => {
  paintedField ??= new ImageData(
    createFlutedPixels(FIELD_WIDTH, FIELD_HEIGHT, 2026),
    FIELD_WIDTH,
    FIELD_HEIGHT,
  )
  return paintedField
}

const Flute = ({ index }: { index: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timing = useRevealTiming()

  useEffect(() => {
    canvasRef.current?.getContext('2d')?.putImageData(flutedField(), -index * FLUTE_WIDTH, 0)
  }, [index])

  return (
    <motion.canvas
      ref={canvasRef}
      data-flute
      width={FLUTE_WIDTH}
      height={FIELD_HEIGHT}
      className="absolute top-0 h-full"
      style={{ left: `${(index / FLUTE_COUNT) * 100}%`, width: `${100 / FLUTE_COUNT}%` }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={timing(fluteDelay(index, FLUTE_COUNT), 1.2)}
    />
  )
}

export const FlutedField = () => (
  <div aria-hidden="true" className="absolute inset-0">
    {Array.from({ length: FLUTE_COUNT }, (_, index) => (
      <Flute key={index} index={index} />
    ))}
  </div>
)
