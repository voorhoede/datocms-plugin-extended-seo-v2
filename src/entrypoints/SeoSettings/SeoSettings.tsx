import { useState, useMemo } from 'react'
import {
  Canvas,
  Form,
  TextField,
  Button,
  FieldGroup,
  SelectField,
} from 'datocms-react-ui'
import { RenderModalCtx } from 'datocms-plugin-sdk'

import ImageUploader from '../../components/ImageUploader/ImageUploader'

import { twitterCardOptions } from '../../lib/constants'
import { FieldValues, TwitterCardType } from '../../lib/types'

type Props = {
  ctx: RenderModalCtx
}

export default function SeoSettings({ ctx }: Props) {
  const fieldValuesParameters = ctx.parameters.fieldValue as FieldValues
  const validators: any = ctx.parameters.validators

  const [titleInput, setTitleInput] = useState<string>(
    fieldValuesParameters?.title || '',
  )
  const [descriptionInput, setDescriptionInput] = useState<string>(
    fieldValuesParameters?.description || '',
  )
  const [cardTypeInput, setCardTypeInput] = useState<TwitterCardType | null>(
    twitterCardOptions.find(
      (option) => option.value === fieldValuesParameters?.twitter_card,
    ) || null,
  )

  const [imageId, setImageId] = useState<string | undefined>(
    fieldValuesParameters?.image,
  )
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    ctx.parameters?.imageUrl as string,
  )

  const titleFieldHint: string | null = useMemo(() => {
    const max = validators?.title_length?.max
    const min = validators?.title_length?.min

    if (min && max) {
      return `Field length must be between ${min} and ${max} characters`
    }

    if (min) {
      return `Field must be at least ${min} characters`
    }

    if (max) {
      return `Field cannot be more than ${max} characters`
    }

    return null
  }, [validators])

  const descriptionFieldHint: string | null = useMemo(() => {
    const max = validators?.description_length?.max
    const min = validators?.description_length?.min

    if (min && max) {
      return `Field length must be between ${min} and ${max} characters`
    }

    if (min) {
      return `Field must be at least ${min} characters`
    }

    if (max) {
      return `Field cannot be more than ${max} characters`
    }

    return null
  }, [validators])

  function handleSubmit() {
    const fieldValue = {
      title: titleInput || null,
      description: descriptionInput || null,
      twitter_card: cardTypeInput?.value || null,
      image: imageId || null,
    }

    ctx.resolve({
      fieldValue,
      imageUrl,
    })
  }

  function removeImage() {
    setImageId(undefined)
    setImageUrl('')
  }

  async function openUploadModal() {
    return await ctx.selectUpload({ multiple: false })
  }

  function uploadFromGallery() {
    openUploadModal().then((response) => {
      if (response) {
        setImageId(response?.id)
        setImageUrl(response?.attributes?.url)
      }
    })
  }

  return (
    <Canvas ctx={ctx}>
      <Form onSubmit={handleSubmit}>
        <FieldGroup>
          <TextField
            name="Title"
            id="Title"
            label="Title"
            placeholder="Title"
            hint={titleFieldHint}
            onChange={(newValue) => setTitleInput(newValue)}
            value={titleInput}
          />

          <TextField
            name="Description"
            id="Description"
            label="Description"
            placeholder="Description"
            hint={descriptionFieldHint}
            onChange={(newValue) => setDescriptionInput(newValue)}
            value={descriptionInput}
          />

          <ImageUploader
            label="Sharing image (Facebook, Twitter)"
            title="Drag an image here"
            hint="Max size 1GB"
            folderButtonLabel="From Gallery"
            uploadedButttonLabel="Remove and replace"
            uploadFromGallery={uploadFromGallery}
            imageUrl={imageUrl}
            removeImage={removeImage}
            imageLoaded={() => ctx.updateHeight()}
          />

          <SelectField
            name="Twitter-card-type"
            id="option"
            label="Twitter card type"
            placeholder="Use global settings defaults"
            selectInputProps={{
              options: twitterCardOptions,
            }}
            onChange={(newValue: any) => {
              setCardTypeInput(newValue)
            }}
            value={cardTypeInput}
          />

          <Button fullWidth buttonType="primary" type="submit">
            Save SEO settings
          </Button>
        </FieldGroup>
      </Form>
    </Canvas>
  )
}
