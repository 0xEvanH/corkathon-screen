import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SlideDeck } from '#src/SlideDeck.tsx'
import '#src/theme.css'
import '#src/stage.css'
import '#src/flip-clock.css'

const root = document.querySelector('#root')
if (!root) throw new Error('index.html is missing the #root element')

createRoot(root).render(
  <StrictMode>
    <SlideDeck />
  </StrictMode>,
)
