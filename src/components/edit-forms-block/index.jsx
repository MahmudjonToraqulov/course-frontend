import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {deleteForm, getFormById} from "../../store/slices/form.slice.js";
import Loading from '../loading/index.jsx';
import FormCardItem from '../form-card-item/index.jsx';

const EditFormsBlock = ({handleGetFormsByUserId}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const forms = useSelector(state => state.forms.forms)
    const loading = useSelector(state => state.forms.loading)


    const handleNavigate = ()=>{
        navigate(`/edit-form`)
    }

    const handleEdit = async (id) => {
        await dispatch(getFormById({id, handleNavigate}))
    }

    const handleDelete = (id) => {
        dispatch(deleteForm({id, handleAfterSucess:handleGetFormsByUserId}))
    }

    if (loading) return <Loading/>
    if (!forms) return

    return (
        <div className='p-4'>
            <h1 className='text-main'>{t('myForms')}</h1>
            <div className=''>
                {
                    !forms.length ?
                        <h2 className=''>{t('noForms')}</h2>
                        :
                    forms.map((form) => (
                    <FormCardItem
                        key={form.id}
                        form={form}
                        editable={true}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default EditFormsBlock;