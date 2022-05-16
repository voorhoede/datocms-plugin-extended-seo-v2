import { Canvas, Form, TextField, Button, FieldGroup, SelectField } from 'datocms-react-ui';
import ImageUploader from '../ImageUploader/ImageUploader';
import "datocms-react-ui/styles.css";
import { useState } from 'react';

const twitterCardOptions = [
  { label: 'Summary with large image', value: "summary_large_image" },
  { label: 'Summary', value: 'summary' },
];

const EditModal = ({ ctx }) => {
  const fieldValuesParameters = ctx.parameters.fieldValue;

  const [titleInput, setTitleInput] = useState(fieldValuesParameters?.title || "");
  const [descriptionInput, setDescriptionInput] = useState(fieldValuesParameters?.description || "");
  const [cardTypeInput, setCardTypeInput] = useState(twitterCardOptions.find((option) =>
    option.value === fieldValuesParameters?.twitter_card
  ) || "");

  const [imageId, setImageId] = useState(fieldValuesParameters?.image || "");
  const [imageUrl, setImageUrl] = useState(ctx.parameters?.imageUrl || "");

  function handleSubmit(event) {
    const fieldValue = {
      title: titleInput,
      description: descriptionInput,
      twitter_card: cardTypeInput.value,
      image: imageId,
    }

    ctx.resolve({
      fieldValue, imageUrl
    });
  }

  function removeImage() {
    setImageId(null);
    setImageUrl('');
  }

  async function openUploadModal() {
    return await ctx.selectUpload({ multiple: false });
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
      <Form onSubmit={
        handleSubmit
      }>
        <FieldGroup>
          <TextField
            name="Title"
            id="Title"
            label="Title"
            placeholder="Title"
            hint="Field cannot be more than 60 characters"
            onChange={(newValue) => setTitleInput(newValue)}
            value={titleInput}
          />

          <TextField
            name="Description"
            id="Description"
            label="Description"
            placeholder="Description"
            hint="Field cannot be more than 160 characters"
            onChange={(newValue) => setDescriptionInput(newValue)}
            value={descriptionInput}
          />

          <ImageUploader
            name="Image Uploader"
            label="Sharing image (Facebook, Twitter)"
            title="Drag an image here"
            hint="Max size 1GB"
            plusButton="Upload New"
            folderButton="From Gallery"
            uploadFromGallery={uploadFromGallery}
            imageUrl={imageUrl}
            removeImage={removeImage}

          />

          <SelectField
            name="Twitter-card-type"
            id="option"
            label="Twitter card type"
            placeholder="Use global settings defaults"
            selectInputProps={{
              options: [
                { label: 'Summary with large image', value: "summary_large_image" },

                { label: 'Summary', value: 'summary' },
              ],
            }}
            onChange={(newValue) => {
              setCardTypeInput(newValue)
            }}
            value={cardTypeInput}
          />
        </FieldGroup>

        <FieldGroup>
          <Button fullWidth buttonType="primary" type='submit'>
            Save SEO settings
          </Button>
        </FieldGroup>

      </Form>
    </Canvas>
  )
}

export default EditModal