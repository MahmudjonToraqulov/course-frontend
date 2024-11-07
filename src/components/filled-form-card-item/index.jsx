import React from 'react';

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {getFilledFormById} from "../../store/slices/filledForm.slice.js";
import { getDate } from '../../utils/index.js';

const FilledFormCardItem = ({form, handleEdit, handleDelete}) => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNavigate = ()=>{
        dispatch(getFilledFormById({id:form.id, handleNavigate:()=>navigate('/filled-form-page')}))
    }

    if (!form.form) return
    return (
        <div
            className="box-bg-theme p-3 my-3 box-shadow">
            <button onClick={handleNavigate} className="border-none bg-none text-primary fs-4 font-bold rounded">{form.form.title}</button>
            <p className="">{t('filledBy')}: {form.user.name}</p>
            <p className="">
                {t('filledOn')}: {getDate(form.createdAt)}
            </p>

            <div className=''>
                <button
                    onClick={() => handleEdit(form)}
                    className='btn btn-main mx-2'
                >
                    {t('edit')}
                </button>
                <button
                    onClick={() => handleDelete(form.id)}
                    className='btn btn-danger mx-2'
                >
                    {t('delete')}
                </button>
            </div>
        </div>
    );
};

export default FilledFormCardItem;