import { Canvas, Button, FieldHint } from "datocms-react-ui";
import TabList from "../TabList/TabList";
import get from "lodash/get";
import { FaPen } from "react-icons/fa";
import { buildPreviewURL } from '../../lib/helpers';
import { socials } from '../../lib/constants';
import '../EditModal/EditModal';
import { useState, useEffect } from 'react';
import useDato from '../../lib/useDato';

export default function App({ ctx }) {
  const fieldValue = get(ctx.formValues, ctx.fieldPath);
  const imageId = fieldValue?.image || "";
  const { getImageUrl } = useDato(ctx.currentUserAccessToken)
  const [socialImageUrl, setSocialImageUrl] = useState('')

  async function handleOpenModal() {
    return await ctx.openModal({
      id: 'customModal',
      title: 'Edit SEO settings',
      width: 'l',
      parameters: {
        fieldValue,
        imageUrl: socialImageUrl,
      }
    });
  };

  function openConfigure() {
    handleOpenModal().then((response) => {
      if (response) {
        ctx.setFieldValue(ctx.fieldPath, response.fieldValue,);
        setSocialImageUrl(response.imageUrl);
      }
    })
  }

  function resetData() {
    ctx.setFieldValue(ctx.fieldPath, null);
  }

  async function fetchImage() {
    if (!socialImageUrl) {
      const imageUrl = await getImageUrl(imageId)
      setSocialImageUrl(imageUrl)
    }
  }


  useEffect(() => {
    fetchImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const SocialTabs = Object.entries(socials).map(([title, slug]) => (
    <div key={slug} label={title}>
      <iframe
        className="social-preview-card"
        title={title}
        src={buildPreviewURL(slug, {
          title: fieldValue?.title,
          description: fieldValue?.description,
          image: socialImageUrl
        })}
      />
    </div>
  ))


  return (
    <Canvas ctx={ctx}>
      {fieldValue ? <TabList onConfigure={openConfigure} resetData={resetData}>{SocialTabs}</TabList> :
        <fieldset className="seo-parent-button">
          <FieldHint>No SEO setting configured</FieldHint>
          <Button buttonSize="xxs" onClick={openConfigure} leftIcon={<FaPen />}>Configure</Button>
        </fieldset>}
    </Canvas>
  )
}