import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import Loading from '../loading/index.jsx';
import FormCardItem from '../form-card-item/index.jsx';
import { getAllForms } from '../../store/slices/form.slice.js';


const Forms = () => {

    const {t}= useTranslation()
    const dispatch = useDispatch()

    const forms = useSelector(state=>state.forms.forms)
    const loading = useSelector(state=>state.forms.loading)
    const user = useSelector(state=>state.auth.user)

    useEffect(() => {
        dispatch(getAllForms())
    }, []);

    if (!forms) return
    if (loading) return <Loading/>

    return (
        <div className='pt-90 p-4'>
            <div className='flex justify-between items-start mb-4'>
                <h1 className="header-title">{t('forms')}</h1>
                {
                    user &&
                    <Link className='btn btn-main' to='/form-templates'>{t('createForm')}</Link>
                }
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {
                    forms.length === 0 &&
                    <h2 className='text-2xl'>{t('noForms')}</h2>
                }
                {forms.map(form => (
                    <FormCardItem
                        key={form.id}
                        form={form}
                    />
                ))}
            </div>
        </div>
    );
};

export default Forms;