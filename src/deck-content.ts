import frameLogo from '#src/assets/logos/frame.png'
import igniteLogo from '#src/assets/logos/ignite-ucc-light.png'
import framePhoto from '#src/assets/people/frame.png'
import ignitePhoto from '#src/assets/people/ignite.png'
import whatsappQr from '#src/assets/whatsapp-qr.png'
import igniteDeck1 from '#src/assets/ignite/ignite-1.jpg'
import igniteDeck2 from '#src/assets/ignite/ignite-2.jpg'
import igniteDeck3 from '#src/assets/ignite/ignite-3.jpg'
import igniteDeck4 from '#src/assets/ignite/ignite-4.jpg'
import igniteDeck5 from '#src/assets/ignite/ignite-5.jpg'
import igniteDeck6 from '#src/assets/ignite/ignite-6.jpg'
import igniteDeck7 from '#src/assets/ignite/ignite-7.jpg'

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

// the evening: final pitches, the sponsor panel while judges deliberate, then awards
export const finalsFormat: InfoContent = {
  title: 'Final pitches',
  points: [
    '3-minute pitch, then 2 minutes of Q&A',
    'Strict timer, so lead with your live demo',
    'Judged on innovation, impact, technical depth and presentation',
    'Finalists, have your laptop ready before you\'re called',
  ],
}

export const panel = {
  kicker: 'While the judges deliberate',
  title: 'Sponsor keynote & panel',
  people: [
    { name: 'Harry Page', role: 'Founding AI and Automation Analyst, Frame', photoUrl: framePhoto },
    { name: 'Eamon Curtin', role: 'Programme Director, IGNITE UCC', photoUrl: ignitePhoto },
  ],
} as const

export const thanks: InfoContent = {
  title: 'Thank you',
  points: ['Frame', 'Ignite', 'The volunteers and mentors helping out today'],
}

// IGNITE's own introduction deck (IGNITE_Introduction_for_Corkathon.pdf), one image per page
export const igniteDeck = [
  {
    title: 'IGNITE: UCC’s Home for Entrepreneurship',
    src: igniteDeck1,
    alt: 'IGNITE, UCC’s Home for Entrepreneurship. Founders holding up their start-up logos.',
  },
  {
    title: 'What is IGNITE?',
    src: igniteDeck2,
    alt: 'What is IGNITE? Ireland’s leading graduate startup incubation programme, designed for ambitious founders ready to turn their innovative ideas into thriving businesses.',
  },
  {
    title: 'What you get when you join IGNITE',
    src: igniteDeck3,
    alt: 'What you get when you join IGNITE: expert mentorship, start-up funding, practical workshops and training, personalised coaching and peer support, talks from successful founders, dedicated desk space, and access to UCC’s global alumni community.',
  },
  {
    title: 'Is this you?',
    src: igniteDeck4,
    alt: 'Is this you? An early-stage business idea, a recent graduate from any discipline, from any Irish university or third-level institution, ready to commit full time, with passion and potential. Register your interest with the QR code. Next intake early 2027. ignite@ucc.ie, Western Gateway Building, UCC, ignite.ucc.ie.',
  },
  {
    title: 'IGNITE for students',
    src: igniteDeck5,
    alt: 'IGNITE for students: Startup Lab, a 6-week programme; monthly Meetups; Ideas for Impact, a one-day hackathon; and the UCC Student Entrepreneur of the Year Competition.',
  },
  {
    title: 'Follow IGNITE and join the community',
    src: igniteDeck6,
    alt: 'QR codes to follow IGNITE for Students on Instagram and to join the IGNITE student entrepreneur community.',
  },
  {
    title: 'Your next profile photo could be on us!',
    src: igniteDeck7,
    alt: 'IGNITE photoshoot giveaway: sign up for the IGNITE student newsletter for a chance to win a professional headshot.',
  },
] as const
