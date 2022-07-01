import { TwitterCard, TwitterCardType, Socials } from './types'

export const socials = {
  GOOGLE: Socials.google,
  FACEBOOK: Socials.facebook,
  LINKEDIN: Socials.linkedin,
  TWITTER: Socials.twitter,
  WHATSAPP: Socials.whatsapp,
  SLACK: Socials.slack,
}

export const twitterCardOptions: TwitterCardType[] = [
  {
    label: TwitterCard.summaryLargeImageLabel,
    value: TwitterCard.summaryLargeImage,
  },
  { label: TwitterCard.summaryLabel, value: TwitterCard.summary },
]

export const headsUpUrl = 'https://heads-up-web-app.netlify.app'