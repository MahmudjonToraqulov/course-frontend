import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {deleteForm, getAllForms, getFormById} from "../../store/slices/form.slice.js";
import Loading from '../loading/index.jsx';
import AdminFormSearchBar from '../admin-form-search-bar/index.jsx';
import { checkSearchValues } from '../../utils/index.js';
import FormCardItem from '../form-card-item/index.jsx';

const defaultSearchInputs = {
    title: '',
    tag: 'All',
    author: 'All',
}

const HandleFormsAdmin = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const forms = useSelector(state => state.forms.forms)
    const loading = useSelector(state => state.forms.loading)

    const [authors, setAuthors] = useState([])
    const [searchInputs, setSearchInputs] = useState(defaultSearchInputs)

    useEffect(() => {
        handleGetForms()
    }, []);

    useEffect(() => {
        if (forms.length && forms[0].user){
            let authors = forms.map(form => form.user);
            if (!authors.length) return
            const uniqueAuthors = Array.from(
                new Map(authors.map(author => [author.id, author])).values()
            );
            setAuthors(uniqueAuthors);
        }
    }, [forms]);

    const handleGetForms = () => {
        dispatch(getAllForms())
    }

    const handleNavigate = () => {
        navigate(`/edit-form`)
    }

    const handleEdit = async (id) => {
        await dispatch(getFormById({id, handleNavigate}))
    }

    const handleDelete = (id) => {
        dispatch(deleteForm({id, handleAfterSucess: handleGetForms}))
    }

    if (loading) return <Loading/>
    if (!forms) return

    return (
        <div className='pt-90 p-4'>
            <h1 className='text-main'>{t('manageForms')}</h1>
            <AdminFormSearchBar
                searchInputs={searchInputs}
                setSearchInputs={setSearchInputs}
                authors={authors}
                defaultSearchInputs={defaultSearchInputs}
            />
            <div className=''>
                {
                    forms.length === 0 &&
                    <h2 className=''>{t('noForms')}</h2>
                }

                {forms.map((form) => {
                    if(!checkSearchValues(form, searchInputs)) return
                    return <FormCardItem
                            key={form.id}
                            form={form}
                            editable={true}
                            adminRole={true}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    }
                )}
            </div>
        </div>
    );
};

export default HandleFormsAdmin;