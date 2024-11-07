import React from 'react';

import {useSelector} from "react-redux";
import ReactQuill from "react-quill";
import {useTranslation} from "react-i18next";

import {getTopicValueById} from "../../../utils/index.js";

import 'react-quill/dist/quill.snow.css';
import AddImage from '../add-image/index.jsx';
import TagAutocomplete from '../tag/index.jsx';

const FormMainFields = ({form, setForm, image, setImage}) => {

    const {t} = useTranslation()
    const topics = useSelector(state=>state.forms.topics)

    const handleTitleChange = (e) => {
        setForm({...form, title: e.target.value});
    };

    const handleDescriptionChange = (e) => {
        setForm({...form, description: e});
    };

    const handleChangeTopic = (e) => {
        setForm({...form, topicId: e.target.value});
    }

    const handleDeleteImage = ()=>{
        setForm({...form, imageUrl: null})
    }

    if (!form) return

    return (
        <div className='box-bg-theme rounded p-4 mt-4'>
            <div className='mb-4'>
                <p className='text-main fs-4'>{t('title')}</p>
                <input
                    className="form-control input-theme"
                    name="title"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e)}
                    type="text"
                />
            </div>

            <div className='mb-4'>
                <p className='text-main fs-4'>{t('description')}</p>
                <ReactQuill value={form.description} onChange={(e) => handleDescriptionChange(e)} />
            </div>

            <div className='mb-4'>
                <p className='text-main fs-4'>{t('topic')}</p>
                <select
                    value={form.topicId}
                    className='p-2'
                    onChange={(e) => handleChangeTopic(e)}>
                    {
                        topics.map(topic => (
                            <option key={topic.id} value={topic.id}>
                                {getTopicValueById(topics, topic.id, t)}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className='mb-4'>
                <p className='text-main fs-4'>{t('tags')}</p>
                <TagAutocomplete
                    className='p-3'
                    form={form}
                    setForm={setForm}
                />
            </div>

            <div className='mb-4'>
                <p className='text-main fs-4'>{t('image')}</p>
                {
                    form.imageUrl ?
                    <div>
                        <img
                            className='mb-2'
                            src={form.imageUrl}
                            alt={form.title}
                        />
                        <button onClick={handleDeleteImage} className='btn btn-danger'>{t('deleteImage')}</button>
                    </div> :
                        <AddImage
                            image={image}
                            setImage={setImage}
                        />
                }
            </div>
        </div>
    );
};

export default FormMainFields;