import { useState, useEffect } from 'react'
import { Canvas, Button, FieldHint } from 'datocms-react-ui'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import get from 'lodash/get'
import { FaPen } from 'react-icons/fa'

import TabList from '../../components/TabList/TabList'

import { socials, defaultUrl } from '../../lib/constants'
import { buildPreviewURL } from '../../lib/helpers'
import useDato from '../../lib/useDato'

import styles from './FieldExtension.module.css'

type Props = {
  ctx: RenderFieldExtensionCtx
}

export default function FieldExtension({ ctx }: Props) {
  const { currentUserAccessToken, environment } = ctx
  const locale: string = ctx.locale
  const fieldValue: any = get(ctx.formValues, ctx.fieldPath)
  const imageId = fieldValue?.image || ''
  const { getImageUrl } = useDato(currentUserAccessToken || '', environment)
  const [socialImageUrl, setSocialImageUrl] = useState('')

  const slugField = Object.values(ctx.fields).find((value) => {
    return value?.attributes.field_type === 'slug'
  })
  const slugFieldPrefix =
    slugField?.attributes?.appearance?.parameters?.url_prefix
  const slugFieldId = slugField?.attributes.api_key || ''
  const slugFieldLocalized: boolean = slugField?.attributes.localized || false

  const slugFieldPath: string = slugFieldLocalized
    ? `${slugFieldId}.${locale}`
    : slugFieldId

  const slugFieldData: any = get(ctx.formValues, slugFieldPath)

  async function handleOpenModal() {
    return await ctx.openModal({
      id: 'seoSettings',
      title: 'Edit SEO settings',
      width: 'l',
      parameters: {
        fieldValue,
        imageUrl: socialImageUrl,
      },
    })
  }

  function openConfigure() {
    handleOpenModal().then((response: any) => {
      if (response) {
        ctx.setFieldValue(ctx.fieldPath, response.fieldValue)
        setSocialImageUrl(response.imageUrl)
      }
    })
  }

  function resetData() {
    ctx.setFieldValue(ctx.fieldPath, null)
    setSocialImageUrl('')
  }

  async function fetchImage() {
    if (!socialImageUrl) {
      const imageUrl = await getImageUrl(imageId)
      setSocialImageUrl(imageUrl)
    }
  }

  useEffect(() => {
    fetchImage()
    // eslint-disable-next-line
  }, [])

  const SocialTabs = Object.entries(socials).map(([title, slug]) => (
    <div key={title}>
      <iframe
        className={styles.iframe}
        title={title}
        src={buildPreviewURL(slug, {
          title: fieldValue?.title,
          description: fieldValue?.description,
          image: socialImageUrl,
          card: fieldValue?.twitter_card,
          url: `${slugFieldPrefix || defaultUrl}/${slugFieldData || ''}`
        })}
      />
    </div>
  ))

  return (
    <Canvas ctx={ctx}>
      {fieldValue ? (
        <TabList onConfigure={openConfigure} resetData={resetData}>
          {SocialTabs}
        </TabList>
      ) : (
        <div className={styles.fieldset}>
          <FieldHint>No SEO setting configured</FieldHint>
          <Button
            className={styles.button}
            buttonSize="xxs"
            onClick={openConfigure}
            leftIcon={<FaPen />}
          >
            Configure
          </Button>
        </div>
      )}
    </Canvas>
  )
}
