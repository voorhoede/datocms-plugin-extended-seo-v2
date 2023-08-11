export type FieldValues = {
  title?: string
  description?: string
  twitter_card?: TwitterCardValue
  image?: string
}

export enum TwitterCard {
  summary = 'summary',
  summaryLabel = 'Summary',
  summaryLargeImage = 'summary_large_image',
  summaryLargeImageLabel = 'Summary with large image',
}

export type TwitterCardValue =
  | TwitterCard.summary
  | TwitterCard.summaryLargeImage
export type TwitterCardLabel =
  | TwitterCard.summaryLabel
  | TwitterCard.summaryLargeImageLabel

export type TwitterCardType = {
  label: TwitterCard.summaryLabel | TwitterCard.summaryLargeImageLabel
  value: TwitterCard.summary | TwitterCard.summaryLargeImage
}

export enum Socials {
  facebook = 'facebook',
  linkedin = 'linkedin',
  twitter = 'twitter',
  whatsapp = 'whatsapp',
  slack = 'slack',
  openSearch = 'open-search',
  google = 'google-default',
}
