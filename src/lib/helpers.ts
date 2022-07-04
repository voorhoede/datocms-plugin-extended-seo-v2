import { Socials } from './types';
import { headsUpUrl, defaultUrl } from './constants';

let config = { title: '', description: '', image: '', url: '', card: '' }

export function buildPreviewURL(social: Socials, options = {}) {
  config = Object.assign(config, options)
  const baseUrl = headsUpUrl
  const params = new URLSearchParams()
  params.set('title', config.title || '')
  params.set('description', config.description || '')
  params.set('image', config.image || '')
  params.set('url', config.url || defaultUrl)

  params.set('theme', 'default')

  if (social === 'slack') {
    params.set('additionalData', JSON.stringify([]))
  }

  if (config.card) {
    params.set('card', config.card)
  }

  return `${baseUrl}/previews/${social}/${social}.html?${params}`
}