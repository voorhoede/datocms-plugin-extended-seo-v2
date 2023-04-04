import { allowedImageExtension } from './constants'
import { buildClient } from '@datocms/cma-client-browser'

export default function useData(datoApiToken: string, environment: string) {
  const datoClient = buildClient({ apiToken: datoApiToken, environment })
  async function getImageUrl(uploadId: string) {
    if (!uploadId) {
      return undefined
    }

    const image = await datoClient.uploads.find(uploadId)
    const isImage = allowedImageExtension.includes(image.mime_type || '')

    if (isImage && image.is_image) {
      return image.url
    }

    return undefined
  }

  return {
    getImageUrl,
  }
}