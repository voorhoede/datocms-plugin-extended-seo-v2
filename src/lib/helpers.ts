import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import get from 'lodash/get'
import { Socials } from './types'
import { headsUpUrl, defaultUrl } from './constants'

let config = { title: '', description: '', image: '', url: '', card: '' }

// Build preview url from Heads Up
export function buildPreviewURL(social: Socials, options = {}) {
  config = Object.assign(config, options)
  const baseUrl = headsUpUrl
  const params = new URLSearchParams()
  params.set('title', config.title || '')
  params.set('description', config.description || '')
  params.set('image', config.image || '')
  params.set('url', config.url || defaultUrl)

  params.set('theme', 'default')

  if (social === Socials.slack) {
    params.set('additionalData', JSON.stringify([]))
  }

  if (social === Socials.facebook && config.image) {
    params.set('imageSpecified', 'true')
  }

  if (config.card) {
    params.set('card', config.card)
  }

  return `${baseUrl}/previews/${social}/${social}.html?${params}`
}

// Get field from ctx with field_type
export function getFieldByType(ctx: RenderFieldExtensionCtx, field_type: string) {
  const field = Object.values(ctx.fields).filter(value => {
    return value?.relationships?.item_type?.data?.id === ctx.itemType.id
  }).find((value) => {
    return value?.attributes.field_type === field_type
  })
  return field
}

// Get field data from a certain field
export function getFieldData(ctx: RenderFieldExtensionCtx, field: any) {
  const locale: string = ctx.locale
  const fieldId = field?.attributes.api_key || ''
  const fieldLocalized: boolean = field?.attributes.localized || false

  const fieldPath: string = fieldLocalized
    ? `${fieldId}.${locale}`
    : fieldId

  const slugFieldData: any = get(ctx.formValues, fieldPath)

  return slugFieldData
}
