import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import Loading from '../loading/index.jsx';
import { getMe, salesForce } from '../../store/slices/auth.slice.js';
import { validateSalesForceData } from '../../utils/index.js';

const Salesforce = ({setOpenSalesforce}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    useEffect(() => {
        if (user){
            reset({
                name: user.name,
                email: user.email
            })
        }
    }, [user]);

    const handleClose = async () => {
        setOpenSalesforce(false)
    }

    const handleNavigate = async () => {
        dispatch(getMe(user.id))
        setOpenSalesforce(false)
    }

    const handleCreate = (data) => {
        if (!validateSalesForceData(data, t)) return
        dispatch(salesForce({data:{...data, userId: user.id}, handleNavigate}))
    }
    if (loading) return <Loading/>

    return (
        <div className='my-3'>
            <div className=' '>
                <div className='rounded p-4 box-bg-theme'>
                    <h1 className='text-3xl mb-4'>{t('salesforceIntegration')}</h1>
                    <form onSubmit={handleSubmit(handleCreate)}>
                        <div className='mb-4'>
                            <label>
                                <p className='mb-2'>{t('name')}<span className='text-red-500'> *</span></p>
                                <input className='form-control input-theme p-2' {...register('name')} />
                            </label>
                        </div>
                        <div className='mb-4'>
                            <label>
                                <p className='mb-2'>{t('email')}<span className='text-red-500'> *</span></p>
                                <input className='form-control input-theme p-2' {...register('email')} />
                            </label>
                        </div>
                        <div className='mb-4'>
                            <label>
                                <p className='mb-2'>{t('phone')}</p>
                                <input className='form-control input-theme p-2' {...register('phone')} />
                            </label>
                        </div>
                        <div className='mb-4'>
                        <label>
                                <p className='mb-2'>{t('jobTitle')}</p>
                                <input className='form-control input-theme p-2' {...register('title')} />
                            </label>
                        </div>
                        <div className=''>
                            <button
                                onClick={handleClose}
                                className='btn btn-danger mx-1'>{t('cancel')}
                            </button>
                            <button type="submit" className='btn btn-main mx-1'>{t('create')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Salesforce;