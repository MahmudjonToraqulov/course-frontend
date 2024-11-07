import React from 'react';

import ImageUploading from 'react-images-uploading';
import {useTranslation} from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';


const AddImage=({image, setImage}) =>{

    const {t} = useTranslation()

    const onChange = (image) => {
        setImage(image);
    };

    return (
        <div>
            <ImageUploading
                multiple={false}
                value={image}
                onChange={onChange}
                dataURLKey="data_url"
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                  }) => (
                    <div className="upload__image-wrapper">

                        {   !image.length &&
                            <button
                                className='btn btn-main cursor-pointer'
                                style={isDragging ? {color: 'red'} : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                <FontAwesomeIcon className='mx-2' icon={faUpload} />
                                {t('addImage')}
                            </button>
                        }
                        {imageList.map((image, index) => (
                            <div key={index}>
                                <img className='' src={image['data_url']}/>
                                <div className="">
                                    <button className='btn btn-main mx-1 mt-2' onClick={() => onImageUpdate(index)}>{t('update')}</button>
                                    <button className='btn btn-danger mx-1 mt-2' onClick={() => onImageRemove(index)}>{t('remove')}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

export default AddImage