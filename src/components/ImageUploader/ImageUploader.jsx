import { Button } from 'datocms-react-ui';
import { FaFolderOpen } from "react-icons/fa";
import "datocms-react-ui/styles.css";
import "./ImageUploader.css";
import '../App/App';

const ImageUploader = ({ label, title, hint, folderButton, uploadFromGallery, imageUrl, removeImage }) => {

    if (imageUrl) {
        return (
            <fieldset className='image-uploader__container image-uploader__container--uploaded'>
                <button onClick={removeImage} className="image-uploader__uploaded-button">Remove or replace</button>
                <img className="image-uploader__uploaded-img" src={imageUrl} alt="" />
            </fieldset>
        )
    }

    return (

        <fieldset className='image-uploader'>
            <label className='Image-uploader__label'>
                {label}
            </label>

            <fieldset className='image-uploader__container'>
                <h1 className='image-uploader__title'>
                    {title}
                </h1>

                <p className='image-uploader__hint'>
                    {hint}
                </p>

                <div className='image-uploader__buttons'>

                    <Button leftIcon={<FaFolderOpen />} buttonSize="xxs" onClick={uploadFromGallery}>
                        {folderButton}
                    </Button>
                </div>
            </fieldset>
        </fieldset>
    )
}

export default ImageUploader