import React from 'react';

import {Link} from "react-router-dom";
import parse from "html-react-parser";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {getTagLabelByValue} from "../../utils/index.js";
import { getDate } from '../../utils/index.js';

const FormCardItem = ({form, editable=false, handleEdit, handleDelete, adminRole=false}) => {

    const {t} = useTranslation()
    const tags = useSelector(state=>state.forms.tags)

    return (
        <div
            className="box-bg-theme box-shadow p-3 rounded my-2">
            <Link to={`/forms/${form.id}`}
                  className="text-primary fs-3 my-2">{form.title}</Link>

            {!editable || adminRole ?
                <p className="fs-6 text-muted">{t('author')}: {form.user?.name}</p> : null
            }

            <div className="">{parse(form.description)}</div>
            {
                editable ? <p className="">
                        {t('createdOn')}: {getDate(form.createdAt)}
                    </p>
                    : null
            }
            <div className="my-3">
                {
                    form.tags.map(tag => {
                        return (
                            <span
                                key={tag}
                                className="tag-green p-2 rounded mx-1">
                                {getTagLabelByValue(tags, tag, t)}
                            </span>
                        )
                    })
                }
            </div>
            {
                editable ?
                    <div className=''>
                        <button
                            onClick={() => handleEdit(form.id)}
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
                    :
                    null
            }
        </div>
    );
};

export default FormCardItem;