import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import EditFilledFormsBlock from '../edit-filled-forms-block/index.jsx';
import EditFormsBlock from '../edit-forms-block/index.jsx';
import { getFormsByUserId } from '../../store/slices/form.slice.js';
import { getFilledFormsByUserId } from '../../store/slices/filledForm.slice.js';
import { useTranslation } from 'react-i18next';
import Salesforce from '../salesforce/index.jsx';

const UserPage = () => {
    const [openSalesforce, setOpenSalesforce] = useState(false)
    const {t} = useTranslation()
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)

    const handleGetFormsByUserId = () => {
        dispatch(getFormsByUserId(user.id))
    }

    const handleGetFilledFormsByUserId = () => {
        dispatch(getFilledFormsByUserId(user.id))
    }

    const handleOpenSalesforce = () => {
        setOpenSalesforce(true)
    }

    useEffect(() => {
        handleGetFormsByUserId()
        handleGetFilledFormsByUserId()
    }, []);

    const [chosenTab, setChosenTab] = useState('forms')

    const handleChooseForms = ()=>{
        setChosenTab('forms')
    }

    const handleChooseFilled = ()=>{
        setChosenTab('filled')
    }

    return (
        <div className='pt-90 p-4 mt-3'>
            <div className=''>
                <div>
                    <button
                        onClick={handleChooseForms}
                        className={'btn m-1 ' + (chosenTab === "forms" ? "btn-primary " : " btn-main")}>{t('forms')}
                    </button>
                    <button
                        onClick={handleChooseFilled}
                        className={'btn m-1 ' + (chosenTab === "filled" ? "btn-primary " : " btn-main")}>{t('filledForms')}
                    </button>
                </div>
            </div>
            {
                chosenTab === 'forms' ?
                <EditFormsBlock handleGetFormsByUserId={handleGetFormsByUserId}/>
                :
                <EditFilledFormsBlock handleGetFilledForms={handleGetFilledFormsByUserId}/>
            }
            {
                !user?.salesforceid
                    ?
                    <button onClick={handleOpenSalesforce} className='btn btn-main'>Salesforce</button>
                    :
                    null
            }
            {
                openSalesforce
                    ?
                    <Salesforce
                        setOpenSalesforce={setOpenSalesforce}
                    />
                    :
                    null
            }
        </div>
    );
};

export default UserPage;