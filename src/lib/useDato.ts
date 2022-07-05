import { allowedImageExtension } from './constants'
const { SiteClient } = require('datocms-client')

export default function useData(datoApiToken: string, environment: string) {
  const datoClient = new SiteClient(datoApiToken, { environment })
  async function getImageUrl(uploadId: string) {
    if (!uploadId) {
      return undefined
    }

    const image = await datoClient.uploads.find(uploadId)
    const isImage = allowedImageExtension.includes(image.mimeType)

    if (isImage && image.isImage) {
      return image.url
    }

    return undefined
  }

  return {
    getImageUrl,
  }
}