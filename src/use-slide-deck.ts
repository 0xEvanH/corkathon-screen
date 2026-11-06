import { useCallback, useEffect, useState } from 'react'
import { slideFromHash, stepForKey, stepSlide, type SlideId } from '#src/slide-deck.ts'

export const useSlideDeck = () => {
  const [slide, setSlide] = useState<SlideId>(() => slideFromHash(location.hash))

  // the hash keeps a refresh mid event on the clock instead of replaying the intro
  useEffect(() => {
    history.replaceState(null, '', `#${slide}`)
  }, [slide])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const step = stepForKey(event.key)
      if (step === null) return
      event.preventDefault()
      if (!event.repeat) setSlide((current) => stepSlide(current, step))
    }
    const onHashChange = () => setSlide(slideFromHash(location.hash))

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  const advance = useCallback(() => setSlide((current) => stepSlide(current, 1)), [])

  return { slide, advance }
}
