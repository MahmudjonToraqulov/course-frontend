import React, {useEffect} from 'react';

import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import parse from 'html-react-parser';
import {useTranslation} from "react-i18next";

import {getFormById} from "../../store/slices/form.slice.js";
import {getTagLabelByValue, getTopicValueById} from "../../utils/index.js";
import Loading from '../loading/index.jsx';
import FormComment from '../form-comment/index.jsx';

const FormPage = () => {

    const {t} = useTranslation()
    const {id} = useParams()
    const dispatch = useDispatch()

    const form = useSelector(state => state.forms.selectedForm)
    const loading = useSelector(state => state.forms.loading)
    const tags = useSelector(state => state.forms.tags)
    const topics = useSelector(state => state.forms.topics)
    const user = useSelector(state => state.auth.user)

    const AuthorOrAdmin = form?.user?.id === user?.id || user?.role === 'admin'

    useEffect(() => {
        dispatch(getFormById({id}))
    }, [])

    if (loading) return <Loading/>
    if (!form) return
    return (
        <main>
            <div className="pt-90 p-4 mt-4">
                <div className="box-bg-theme p-4">
                <div className=''>
                    <div className={form.imageUrl ? "w-1/2" : "w-full"}>
                        <h2 className="text-main">Title: {form.title}</h2>
                        <p className="text-main">{t('author')}: {form.user?.name}</p>

                        <div className="mb-2">
                            <h2 className="text-main">{t('description')}:</h2>
                            <div className="text-main">{parse(form.description)}</div>
                        </div>

                        {form.tags && form.tags.length ?
                            <div className="mb-2">
                                <h2 className="text-main">{t('tags')}:</h2>
                                <div className="mb-2">
                                    {
                                        form.tags.map(tag => (
                                            <span key={tag}
                                                  className="tag-green p-2 m-2">{getTagLabelByValue(tags, tag, t)}</span>
                                        ))
                                    }
                                </div>
                            </div> : null
                        }

                        <div className="my-2">
                            <h2 className="text-main">{t('topic')}:</h2>
                            <p className="text-main">{getTopicValueById(topics, form?.topicId, t)}</p>
                        </div>
                    </div>

                    {form.imageUrl &&
                        <div className=''>
                            <div className="">
                                <img
                                    className="rounded"
                                    src={form.imageUrl} alt={form.title}/>
                            </div>
                        </div>
                    }
                </div>

                <div className="">
                    <h2 className="text-main">{t('questions')}</h2>
                    <ul className="">
                        {
                            form.formFields.map((formField, index) => {
                                if (formField.hidden && !AuthorOrAdmin) return null
                                return (
                                    <li key={formField.id} className="box-bg-theme-2 p-3 rounded shadow-sm m-3">
                                        <div>
                                            <div>
                                            <span
                                                className="text-main">{t('question')} {index + 1}: </span>
                                                <span className='text-success font-bold'>{formField.name}</span>
                                            </div>
                                            <div>
                                                <span className="text-main">{t('questionType')}: </span>
                                                <span className='text-success font-bold'>{t(formField.type)}</span>
                                            </div>
                                            {
                                                AuthorOrAdmin ?
                                                    <div>
                                                        <span className="text-main">{t('hiddenQuestion')}: </span>
                                                        <span
                                                            className='text-success font-bold'>{formField.hidden ? t('yes') : t('no')}</span>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                {user ?
                    <div className=''>
                        <Link to={`/fill-form/${id}`} className='btn btn-main'>{t('fillForm')}</Link>
                    </div>:null
                }

                <FormComment user={user} formId={form.id}/>
                </div>
            </div>
        </main>
    )
};

export default FormPage;