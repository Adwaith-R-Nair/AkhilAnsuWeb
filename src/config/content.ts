// All text content for the site lives here

export const LOVE_REASONS = [
  {
    number: '01',
    title: 'You made me feel emotionally safe',
    body: "I didn't have to pretend or filter myself around you. I could be real — even in my worst moments — and still feel accepted.",
  },
  {
    number: '02',
    title: "You stayed when things weren't easy",
    body: "Not everything between us was smooth, but you didn't walk away at the first sign of difficulty. That effort mattered.",
  },
  {
    number: '03',
    title: 'You understood me beyond words',
    body: "There were moments you just got it — without me having to explain everything. That kind of connection is rare.",
  },
  {
    number: '04',
    title: "You believed in me when I couldn't",
    body: "Even when I doubted myself, you held onto faith in me. That support shaped me more than you probably realize.",
  },
  {
    number: '05',
    title: 'You handled my flaws with care',
    body: "You didn't try to break me down because of my imperfections. You held them with patience instead of judgment.",
  },
  {
    number: '06',
    title: 'We shared something real, not perfect',
    body: "It wasn't flawless, but it was honest. And honesty carries more weight than perfection ever could.",
  },
  {
    number: '07',
    title: 'You brought calm into my chaos',
    body: 'In moments where I felt overwhelmed, your presence grounded me in a way nothing else could.',
  },
  {
    number: '08',
    title: 'You showed consistency, not just intensity',
    body: "It wasn't just about big moments — it was the small, steady ways you showed up that made a difference.",
  },
  {
    number: '09',
    title: 'You listened to understand, not just respond',
    body: "You didn't just hear me — you tried to feel what I was saying. That made me feel valued.",
  },
  {
    number: '10',
    title: "You cared in ways that weren't always visible",
    body: "Not everything you did was loud or obvious, but your care showed in subtle, meaningful ways.",
  },
  {
    number: '11',
    title: 'You helped me grow as a person',
    body: 'Being with you made me reflect, learn, and become more aware of myself — even through the difficult parts.',
  },
  {
    number: '12',
    title: 'You were honest, even when it was uncomfortable',
    body: "You didn't hide behind convenience. You chose truth, even when it was hard to say or hear.",
  },
  {
    number: '13',
    title: 'We created moments that actually meant something',
    body: 'Not just memories, but moments that stayed — because they were genuine.',
  },
  {
    number: '14',
    title: 'You respected parts of me that others overlooked',
    body: "You saw value in things about me that I didn't even notice myself.",
  },
  {
    number: '15',
    title: 'You made me feel chosen, not just kept around',
    body: 'There was intention in how you showed up — and that made all the difference.',
  },
  {
    number: '16',
    title: 'Because you are you',
    body: 'Not for what you do, not for what you give — but simply for who you are at your core. And that, by itself, is enough.',
  },
  {
    number: '17',
    title: 'Your quiet strength',
    body: "You don't always show it loudly, but it's there — in how you handle things, in how you endure, in how you stay even when things aren't easy.",
  },
  {
    number: '18',
    title: 'The warmth of your hug',
    body: 'It feels like a pause — like everything loud and chaotic outside just softens for a moment. Like the world can wait.',
  },
  {
    number: '19',
    title: 'The way you say "I\'m here"',
    body: 'Simple words. But when you say them, they carry actual weight. That kind of steady reassurance matters more than any grand promise ever could.',
  },
  {
    number: '20',
    title: 'How loved you made me feel, without even trying',
    body: "Some people make you feel like warmth is something you have to earn. You never did that. With you, it was just there — quiet, genuine, and without conditions. That's rarer than most people ever realize.",
  },
  {
    number: '∞',
    title: 'And the list goes on...',
    body: 'Twenty reasons felt like a start. But the truth is, you can\'t be captured in a list. Some things just have to be felt — and everything about you is one of them.',
  },
]

export const MEMORIES = [
  { period: 'The Beginning', title: 'When We First Met', caption: 'photo-01.jpg' },
  { period: 'Early Days', title: 'The Silly Outings', caption: 'photo-02.jpg' },
  { period: 'Growing Together', title: 'Stolen Smiles', caption: 'photo-03.jpg' },
  { period: 'The Quiet Moments', title: 'Just Existing Together', caption: 'photo-04.jpg' },
  { period: 'Adventures', title: 'Somewhere We Loved', caption: 'photo-05.jpg' },
  { period: 'The Hard Parts', title: 'We Stayed Anyway', caption: 'photo-06.jpg' },
  { period: 'Little Things', title: 'Shared Food & Laughter', caption: 'photo-07.jpg' },
  { period: 'One Year', title: 'Everything It Held', caption: 'photo-08.jpg' },
]

export const AUDIO_MAP: Record<string, string | null> = {
  intro: null,
  apology: null,
  love: null,
  memories: null,
  letter: null,
  video: null,
  choice: null,
  reconcile: null,
  closure: null,
  future: null,
  easter: null,
  creator: null,
}

export const PAGE_ORDER = [
  'intro',
  'apology',
  'love',
  'memories',
  'letter',
  'video',
  'choice',
  // reconcile or closure come next based on userChoice
  'future',
  'easter',
  'creator',
] as const

export const PAGE_LABELS: Record<string, string> = {
  intro: 'Our World',
  apology: 'An Apology',
  love: 'Why I Love You',
  memories: 'Our Story',
  letter: 'The Letter',
  video: 'His Words',
  choice: 'Your Choice',
  reconcile: 'A New Beginning',
  closure: 'A Gentle Goodbye',
  future: 'What Could\'ve Been',
  easter: 'One More Thing',
  creator: 'From Adwaith',
}
