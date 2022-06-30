import { Button, FormLabel } from 'datocms-react-ui'
import { FaFolderOpen } from 'react-icons/fa'
import 'datocms-react-ui/styles.css'

import styles from './ImageUploader.module.css'

type Props = {
  label: string
  title: string
  hint: string
  folderButtonLabel: string
  uploadedButttonLabel: string
  uploadFromGallery: () => void
  removeImage: () => void
  imageUrl?: string
  imageLoaded?: () => void
}

export default function ImageUploader({
  label,
  title,
  hint,
  folderButtonLabel,
  uploadedButttonLabel,
  imageUrl,
  uploadFromGallery,
  removeImage,
  imageLoaded,
}: Props) {
  return (
    <>
      <FormLabel htmlFor="image-uploader">{label}</FormLabel>
      <fieldset className={styles.fieldset} id="image-uploader">
        {imageUrl ? (
          <>
            <div className={styles.uploadedButtons}>
              <button onClick={removeImage} className={styles.uploadedButton}>
                {uploadedButttonLabel}
              </button>
            </div>
            <img className={styles.uploadedImage} src={imageUrl} alt="" onLoad={imageLoaded}/>
          </>
        ) : (
          <>
            <span className={styles.title}>{title}</span>
            <span className={styles.hint}>{hint}</span>

            <Button
              leftIcon={<FaFolderOpen />}
              buttonSize="s"
              onClick={uploadFromGallery}
            >
              {folderButtonLabel}
            </Button>
          </>
        )}
      </fieldset>
    </>
  )
}
