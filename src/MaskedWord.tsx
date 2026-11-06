import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useRevealTiming } from '#src/use-reveal-timing.ts'

type MaskedWordProps = {
  children: ReactNode
  delay: number
}

export const MaskedWord = ({ children, delay }: MaskedWordProps) => {
  const timing = useRevealTiming()
  return (
    // tight headings push descenders past the line box, the padding keeps them inside the clip
    <span className="mb-[-0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
      <motion.span
        data-reveal
        className="inline-block"
        initial={{ y: '125%' }}
        animate={{ y: 0 }}
        transition={timing(delay)}
      >
        {children}
      </motion.span>
    </span>
  )
}
