import { useState, useEffect } from 'react'
import { Canvas, Button } from 'datocms-react-ui'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import get from 'lodash/get'
import { FaPenToSquare } from 'react-icons/fa6'

import TabList from '../../components/TabList/TabList'

import { socials, defaultUrl } from '../../lib/constants'
import {
  buildPreviewURL,
  getFieldByType,
  getFieldData,
} from '../../lib/helpers'
import useDato from '../../lib/useDato'

import * as styles from './FieldExtension.module.css'

type Props = {
  ctx: RenderFieldExtensionCtx
}

export default function FieldExtension({ ctx }: Props) {
  const { currentUserAccessToken, environment } = ctx
  const fieldValue: any = get(ctx.formValues, ctx.fieldPath)
  const { getImageUrl } = useDato(currentUserAccessToken || '', environment)
  const [socialImageUrl, setSocialImageUrl] = useState('')

  const titleField = getFieldByType(ctx, 'string')
  const titleFieldData = getFieldData(ctx, titleField)

  const slugField = getFieldByType(ctx, 'slug')
  const slugFieldData = getFieldData(ctx, slugField)
  const slugFieldPrefix =
    slugField?.attributes?.appearance?.parameters?.url_prefix

  const imageField =
    getFieldByType(ctx, 'file') || getFieldByType(ctx, 'gallery')
  const imageFieldData = getFieldData(ctx, imageField)

  const imageId =
    fieldValue?.image ||
    imageFieldData?.upload_id ||
    imageFieldData?.[0]?.upload_id ||
    ''

  async function handleOpenModal() {
    return await ctx.openModal({
      id: 'seoSettings',
      title: 'Edit SEO settings',
      width: 's',
      parameters: {
        fieldValue,
        imageUrl: fieldValue?.image ? socialImageUrl : '',
        validators: ctx.field.attributes.validators,
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
    const imageUrl = await getImageUrl(imageId)
    if (!imageUrl) return
    setSocialImageUrl(imageUrl)
  }

  useEffect(() => {
    fetchImage()
    // eslint-disable-next-line
  }, [imageId])

  const previewObject = {
    title: fieldValue?.title || titleFieldData || '',
    description: fieldValue?.description,
    image: socialImageUrl,
    card: fieldValue?.twitter_card,
    url: `${slugFieldPrefix || defaultUrl}/${slugFieldData || ''}`,
  }

  const SocialTabs = Object.entries(socials).map(([title, slug]) => (
    <div key={title}>
      <iframe
        className={styles.iframe}
        title={title}
        src={buildPreviewURL(slug, previewObject)}
      />
    </div>
  ))

  return (
    <Canvas ctx={ctx}>
      {previewObject?.title ? (
        <TabList onConfigure={openConfigure} resetData={resetData}>
          {SocialTabs}
        </TabList>
      ) : (
        <div className={styles.fieldset}>
          <p className="body">No SEO setting configured</p>
          <Button
            className={styles.button}
            buttonSize="s"
            onClick={openConfigure}
            leftIcon={<FaPenToSquare />}
          >
            Configure
          </Button>
        </div>
      )}
    </Canvas>
  )
}
