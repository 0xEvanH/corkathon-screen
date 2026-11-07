import frameLogo from '#src/assets/logos/frame.png'
import igniteLogo from '#src/assets/logos/ignite-ucc-light.png'
import framePhoto from '#src/assets/people/frame.png'
import ignitePhoto from '#src/assets/people/ignite.png'
import whatsappQr from '#src/assets/whatsapp-qr.png'

type InfoContent = {
  title: string
  points: readonly string[]
  qr?: { url: string; alt: string }
}

type SponsorContent = {
  name: string
  blurb: string
  photoAlt?: string
  photoUrl: string
  logoUrl: string
  logoAlt: string
}

export const society = {
  name: 'UCC Computer Science Society',
  blurb: 'UCC\'s home for anyone into tech: talks, workshops, socials and hackathons like this one',
}

export const goal: InfoContent = {
  title: "Today's goal",
  points: ['Build something real and demo it live by 19:00'],
}

export const format: InfoContent = {
  title: 'Format & Devpost',
  points: [
    'Teams of up to 3',
    'Hacking runs 09:45 to 19:00 in the Dora Allman Room, 4th floor of The Hub',
    'Register and submit at corkathon.devpost.com',
    'Devpost locks at 19:00 sharp. No late entries',
  ],
}

export const judging: InfoContent = {
  title: 'Judging',
  points: [
    'Innovation and impact: is it new, and does it matter?',
    'Technical depth: did you actually build it?',
    'Presentation and demo: can you show it working?',
    'Top 10 pitch live in Boole 2 from 19:35: 3 minutes + 2 minutes Q&A',
  ],
}

export const housekeeping: InfoContent = {
  title: 'Quick housekeeping',
  points: [
    'Clean up after yourselves',
    'Anything wrong? Tell a mentor, Masood or the WhatsApp group',
    'Lunch 11:30, donuts 12:30, pizza 17:00, snacks all day',
    'We\'re taking photos. Tell us if you\'d rather not be in them',
    'Wi-Fi is eduroam. Toilets and fire exits are shown in the room',
  ],
  qr: { url: whatsappQr, alt: 'QR code to join the Corkathon WhatsApp group' },
}

export const frame: SponsorContent = {
  name: 'Harry Page',
  blurb: 'Founding AI and Automation Analyst at Frame',
  photoAlt: 'Harry Page',
  photoUrl: framePhoto,
  logoUrl: frameLogo,
  logoAlt: 'Frame logo',
}

export const ignite: SponsorContent = {
  name: 'Eamon Curtin',
  blurb: 'Programme Director of IGNITE at UCC',
  photoAlt: 'Eamon Curtin',
  photoUrl: ignitePhoto,
  logoUrl: igniteLogo,
  logoAlt: 'University College Cork logo',
}

// facts from ucc.ie/en/ignite (about us) and UCC's 2025 news on IGNITE's HEA award
export const igniteBrief = {
  track: 'Ignite\'s challenge',
  prompt: 'Best Startup Potential',
  pitch: 'The team most ready to become a real company: a clear customer, a real problem and a first version people would use, or pay for.',
  points: [
    'UCC\'s award-winning start-up incubator, running since 2011',
    'Backs recent UCC graduates to go full time on a start-up',
    'Almost 250 founders and close to 200 start-up ideas so far',
  ],
} as const
