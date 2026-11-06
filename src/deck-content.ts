import frameLogo from '#src/assets/logos/frame.png'
import igniteLogo from '#src/assets/logos/ignite-ucc-light.png'
import framePhoto from '#src/assets/people/frame.png'
import ignitePhoto from '#src/assets/people/ignite.png'

type InfoContent = {
  title: string
  points: readonly string[]
}

type SponsorContent = {
  name: string
  blurb: string
  photoUrl: string
  logoUrl: string
  logoAlt: string
}

export const society = {
  name: 'UCC Computer Science Society',
  blurb: 'Placeholder: what the society does',
}

export const goal: InfoContent = {
  title: "Today's goal",
  points: ['Placeholder: what every team should finish today'],
}

export const format: InfoContent = {
  title: 'Format & Devpost',
  points: [
    'Placeholder: team size',
    'Placeholder: hacking hours',
    'Placeholder: Devpost link',
    'Placeholder: submission deadline',
  ],
}

export const judging: InfoContent = {
  title: 'Judging',
  points: [
    'Placeholder: first criterion',
    'Placeholder: second criterion',
    'Placeholder: third criterion',
    'Placeholder: how demos run',
  ],
}

export const housekeeping: InfoContent = {
  title: 'Quick housekeeping',
  points: [
    'Placeholder: Wi-Fi',
    'Placeholder: food times',
    'Placeholder: toilets and fire exits',
    'Placeholder: who to ask for help',
  ],
}

export const frame: SponsorContent = {
  name: 'Frame',
  blurb: 'Placeholder: who Frame are and why they are here',
  photoUrl: framePhoto,
  logoUrl: frameLogo,
  logoAlt: 'Frame logo',
}

export const ignite: SponsorContent = {
  name: 'Ignite',
  blurb: 'Placeholder: who Ignite are and why they are here',
  photoUrl: ignitePhoto,
  logoUrl: igniteLogo,
  logoAlt: 'University College Cork logo',
}
