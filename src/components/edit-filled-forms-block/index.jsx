import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {deleteFilledForm, getFilledFormById} from "../../store/slices/filledForm.slice.js";
import {getFormById} from "../../store/slices/form.slice.js";
import Loading from '../loading/index.jsx';
import FilledFormCardItem from '../filled-form-card-item/index.jsx'


const EditFilledFormsBlock = ({handleGetFilledForms}) => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const filledForms = useSelector(state => state.filledForms.filledForms)
    const loading = useSelector(state => state.filledForms.loading)

    const handleNavigate = ()=>{
        navigate(`/edit-filled-form`)
    }

    const handleEdit = async (form) => {
        dispatch(getFormById({id:form.form.id}))
        dispatch(getFilledFormById({id:form.id, handleNavigate}))
    }

    const handleDelete = (id) => {
        dispatch(deleteFilledForm({id, handleIfSuccess:handleGetFilledForms}))
    }

    if (loading) return <Loading/>

    return (
        <div className='pt-90 p-3 my-4'>
            <h1 className='text-main'>{t('usersAnswers')}</h1>
            <div className=''>
                {
                    !filledForms.length ?
                        <h2 className=''>{t('noFilledForms')}</h2>
                        :
                    filledForms.map((item) => {
                        return (
                            <FilledFormCardItem
                                key={item.id}
                                form={item}
                                editable={true}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )
                    })}
            </div>
        </div>
    );
};

export default EditFilledFormsBlock;