import type { CSSProperties, ReactNode } from 'react'
import wordmark from '#src/assets/logos/frame-wordmark-dark.png'
import { MaskedWord } from '#src/MaskedWord.tsx'

// Frame's four track-briefing slides, laid out from FRAME_Corkathon_Presentation1.pptx.
// Positions are the deck's own EMU values on its 12192000 x 6858000 slide, so the
// layout matches theirs on a 16:9 screen.
const SLIDE_W = 12192000
const SLIDE_H = 6858000

type Sized = CSSProperties & { '--size'?: string }

const at = (x: number, y: number, w: number, h?: number): CSSProperties => ({
  left: `${(x / SLIDE_W) * 100}cqw`,
  top: `${(y / SLIDE_H) * 100}cqh`,
  width: `${(w / SLIDE_W) * 100}cqw`,
  ...(h === undefined ? {} : { height: `${(h / SLIDE_H) * 100}cqh` }),
})

// PowerPoint pads every text box 0.1in left and right, 0.05in top
const INSET: CSSProperties = { padding: `${(45720 / SLIDE_H) * 100}cqh ${(91440 / SLIDE_W) * 100}cqw 0` }

// a point on the 13.33in deck is 1/960 of its width
const pt = (size: number) => `${(size * 100) / 960}cqw`

const COLUMNS = [508000, 4318000, 8128000] as const
const COLUMN_W = 3556000

type TextProps = { x: number; y: number; w: number; size: number; className?: string; children: ReactNode }

const Text = ({ x, y, w, size, className = '', children }: TextProps) => (
  <p className={`absolute leading-[1.25] ${className}`} style={{ ...at(x, y, w), ...INSET, fontSize: pt(size) }}>
    {children}
  </p>
)

// the olive numerals drop below large-text size on a phone, so they grow there
const Numeral = ({ x, y, children }: { x: number; y: number; children: ReactNode }) => (
  <p
    className="absolute text-[length:var(--size)] leading-[1.1] font-bold text-frame-olive portrait:text-[8cqw]"
    style={{ ...at(x, y, COLUMN_W), ...INSET, '--size': pt(32) } as Sized}
  >
    {children}
  </p>
)

const Label = ({ x, y, w = COLUMN_W, children }: { x: number; y: number; w?: number; children: ReactNode }) => (
  <Text x={x} y={y} w={w} size={12} className="font-bold tracking-[0.125em] uppercase">
    {children}
  </Text>
)

const Rule = ({ x, y, w }: { x: number; y: number; w: number }) => (
  <div aria-hidden="true" className="absolute border-t border-frame-rule" style={at(x, y, w)} />
)

type ChromeProps = { title: string; section: string; page: string; children: ReactNode }

const FrameChrome = ({ title, section, page, children }: ChromeProps) => (
  <div className="slide overflow-hidden bg-frame-stone font-frame-sans text-frame-plum">
    <img src={wordmark} alt="" className="absolute h-auto" style={at(508000, 558800, 762000)} />
    <Rule x={508000} y={863600} w={11188700} />
    <h1
      className="absolute text-[length:var(--size)] leading-[0.9] font-bold tracking-[0.07em] uppercase portrait:text-[6cqw]"
      style={{ ...at(508000, 1168400, 11176000), ...INSET, '--size': pt(22) } as Sized}
    >
      <MaskedWord delay={0.2}>{title}</MaskedWord>
    </h1>
    {children}
    <Rule x={508000} y={6400800} w={11188700} />
    <Text x={508000} y={6464300} w={5080000} size={10} className="tracking-[0.15em] text-frame-muted uppercase">
      {section}
    </Text>
    <Text x={10414000} y={6464300} w={1270000} size={10} className="text-right text-frame-muted">
      {page}
    </Text>
  </div>
)

type Column = { number: string; label: string; body: string }

const WHO: readonly Column[] = [
  {
    number: '01',
    label: 'FRAME',
    body: 'A professional services firm working with clients across Cork, Dublin, New York and Grand Cayman. Like most organisations, we run on data that lives in many places.',
  },
  {
    number: '02',
    label: 'Harry Page',
    body: 'Founding AI and Automation Analyst. Builds the tools that take repetitive data work off the team.',
  },
  {
    number: '03',
    label: 'Why this track',
    body: 'Data is where good ideas most often stall. Plenty of organisations have it; far fewer can actually use it. We see that every day, and we think you can do something about it.',
  },
]

export const FrameWhoSlide = () => (
  <FrameChrome title="Who we are" section="Who we are" page="2">
    {WHO.map((column, index) => (
      <div key={column.number}>
        <Rule x={COLUMNS[index]} y={2117041} w={COLUMN_W} />
        <Numeral x={COLUMNS[index]} y={2390775}>
          {column.number}
        </Numeral>
        <Label x={COLUMNS[index]} y={2987675}>
          {column.label}
        </Label>
        <Text x={COLUMNS[index]} y={3343275} w={COLUMN_W} size={16}>
          {column.body}
        </Text>
      </div>
    ))}
  </FrameChrome>
)

const PROBLEMS = [
  {
    title: 'Timing matters',
    body: 'The same data means something different in January and in June. Answers go stale quickly, and a late or out-of-date answer can be worse than none.',
  },
  {
    title: 'Data is scattered',
    body: 'It lives across systems, spreadsheets and inboxes. Pulling it together, and trusting what you get, takes more effort than using it.',
  },
  {
    title: 'The users aren’t technical',
    body: 'The people who need the answers are experts in their own field, not developers. Whatever holds the data must be workable without help.',
  },
] as const

export const FrameChallengeSlide = () => (
  <FrameChrome title="The challenge" section="The challenge" page="3">
    <Text x={508000} y={1879600} w={11176000} size={26} className="font-frame-serif italic">
      Your challenge: take data that exists today and turn it into something a busy person can act on.
    </Text>
    <Text x={508000} y={3175000} w={11176000} size={11} className="tracking-[0.15em] text-frame-muted uppercase">
      What we see every day
    </Text>
    {PROBLEMS.map((problem, index) => (
      <div key={problem.title}>
        <div aria-hidden="true" className="absolute bg-frame-sage" style={at(COLUMNS[index], 3530600, COLUMN_W, 2540000)} />
        <Text x={COLUMNS[index] + 203200} y={3733800} w={3149600} size={17} className="font-bold">
          {problem.title}
        </Text>
        <Text x={COLUMNS[index] + 203200} y={4343400} w={3149600} size={16}>
          {problem.body}
        </Text>
      </div>
    ))}
  </FrameChrome>
)

const DIRECTIONS: readonly Column[] = [
  {
    number: '01',
    label: 'A clear idea',
    body: 'One sentence that says what it is. A well-argued concept with a rough prototype beats a polished build nobody can explain.',
  },
  {
    number: '02',
    label: 'Honest about its limits',
    body: 'Say what it does well, where it breaks and what you would do with more time. Knowing the gaps counts for more than hiding them.',
  },
  {
    number: '03',
    label: 'Usable by non-technical people',
    body: 'Someone with no technical background asks a plain-language question and gets a usable answer, with no query language and no training session.',
  },
]

export const FrameDirectionsSlide = () => (
  <FrameChrome title="What great looks like" section="What great looks like" page="4">
    <Text x={508000} y={1905000} w={11176000} size={16} className="font-frame-serif">
      What to build: whatever form it takes, aim for these three qualities. The next slide covers how it is scored.
    </Text>
    {DIRECTIONS.map((direction, index) => (
      <div key={direction.number}>
        <Rule x={COLUMNS[index]} y={2730500} w={COLUMN_W} />
        <Numeral x={COLUMNS[index]} y={2895600}>
          {direction.number}
        </Numeral>
        <Label x={COLUMNS[index]} y={3505200}>
          {direction.label}
        </Label>
        <Text x={COLUMNS[index]} y={4089400} w={COLUMN_W} size={16}>
          {direction.body}
        </Text>
      </div>
    ))}
    <Text x={508000} y={5740400} w={11176000} size={13} className="font-frame-serif text-frame-muted italic">
      Build whatever you like. Use live data: open Irish data (data.gov.ie, CSO), public calendars and registers, or a
      dataset you build yourselves. Keep it buildable in nine hours.
    </Text>
  </FrameChrome>
)

const CRITERIA_X = [508000, 3365500, 6223000, 9080500] as const
const CRITERIA_W = 2603500

const CRITERIA = [
  {
    label: 'Innovation',
    body: 'A fresh use of data, an unexpected combination of sources, or an insight nobody had before. A dashboard on its own will not score well here.',
  },
  {
    label: 'Impact',
    body: 'Would this matter to someone if it existed? Be clear about who benefits, how, and why it is worth doing. The bigger and more credible the difference, the better.',
  },
  {
    label: 'Technical depth',
    body: 'Sound engineering under the hood: real data, sensible transformations and a design you can explain. We will ask how it works, not just what it does.',
  },
  {
    label: 'Presentation and demo quality',
    body: 'Show the data driving the result live, and tell the story so that anyone in the room can follow it. Clarity beats polish.',
  },
] as const

export const FrameJudgingSlide = () => (
  <FrameChrome title="How it’s judged" section="How it’s judged" page="5">
    <Text x={508000} y={1905000} w={11176000} size={16} className="font-frame-serif">
      How it is scored: four criteria, weighted equally.
    </Text>
    {CRITERIA.map((criterion, index) => (
      <div key={criterion.label}>
        <div aria-hidden="true" className="absolute bg-frame-sage" style={at(CRITERIA_X[index], 2921000, CRITERIA_W, 76200)} />
        <Label x={CRITERIA_X[index]} y={3175000} w={CRITERIA_W}>
          {criterion.label}
        </Label>
        <Text x={CRITERIA_X[index]} y={3810000} w={CRITERIA_W} size={16}>
          {criterion.body}
        </Text>
      </div>
    ))}
  </FrameChrome>
)
