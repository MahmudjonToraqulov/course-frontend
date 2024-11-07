import React from 'react';

import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import Loading from '../loading';
import { getDate } from '../../utils';

const FilledFormPage = () => {

    const {t} = useTranslation()

    const answers = useSelector(state=>state.filledForms.answers)
    const loading = useSelector(state=>state.filledForms.loading)

    if (loading) return <Loading />
    if (!answers) return

    return (
        <div className="pt-90 p-4">
            <div className='mt-4 p-4 box-bg-theme rounded'>
                <div className="">
                    <h1 className="text-main">{answers.form.title}</h1>
                    <h2 className="text-xl text-gray-600">{t('filledBy')}:
                        <span className="font-medium"> {answers.user.name}</span>
                    </h2>
                    <p className="">{t('filledOn')}: {getDate(answers.createdAt)}</p>
                </div>
                <div className="">
                    {answers.items.map(item => (
                        <div key={item.id} className="p-4 border ">
                            <h3 className="">{t('question')}: {item.question}</h3>
                            <p className="">{t('answer')}: {item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilledFormPage;