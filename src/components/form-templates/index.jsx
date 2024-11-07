import React from 'react';

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {resetForm, setSelectedForm} from "../../store/slices/form.slice.js";
import {templates} from "../templates.js";

const FormTemplates = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCreateNewForm = () => {
        dispatch(resetForm())
        navigate('/create-form')
    }

    const handleCreateFormFromTemplate = (template) => {
        dispatch(setSelectedForm(template))
        navigate('/create-form')
    }

    return (
        <div className='pt-90 p-4'>
            <div className=''>
                <h2 className="text-main">{t('chooseTemplate')}</h2>
                <button
                    className="btn btn-main mb-2"
                    onClick={handleCreateNewForm}
                >
                    {t('createNewForm')}
                </button>
            </div>
            <div className='d-flex p-2'>
                {
                    templates.map((template) => {
                        return (
                            <button
                                className="p-3 box-bg-theme rounded m-2 box-shadow"
                                onClick={() => handleCreateFormFromTemplate(template)}
                                key={template.id}>
                                <h2 className="text-main">{template.title}</h2>
                                <p className="">{template.description}</p>
                                <p className="">{t('questions')}: {template.formFields?.length || 0}</p>
                            </button>
                        )}
                    )
                }
            </div>
        </div>
    );
};

export default FormTemplates;