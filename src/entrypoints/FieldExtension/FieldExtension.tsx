import { useState, useEffect } from 'react'
import { Canvas, Button, FieldHint } from 'datocms-react-ui'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import get from 'lodash/get'
import { FaPen } from 'react-icons/fa'

import TabList from '../../components/TabList/TabList'

import { socials } from '../../lib/constants'
import { buildPreviewURL } from '../../lib/helpers'
import useDato from '../../lib/useDato'

import styles from './FieldExtension.module.css'

type Props = {
  ctx: RenderFieldExtensionCtx
}

export default function FieldExtension({ ctx }: Props) {
  const fieldValue: any = get(ctx.formValues, ctx.fieldPath)
  const imageId = fieldValue?.image || ''
  const { getImageUrl } = useDato(ctx.currentUserAccessToken as string)
  const [socialImageUrl, setSocialImageUrl] = useState('')

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
        className="social-preview-card"
        title={title}
        src={buildPreviewURL(slug, {
          title: fieldValue?.title,
          description: fieldValue?.description,
          image: socialImageUrl,
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
