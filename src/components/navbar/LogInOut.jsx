import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {logout} from "../../store/slices/auth.slice";

const LoginLogoutBtn = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userName = useSelector(state=>state.auth?.user?.name)

    const loginTitle = t('loginRegistration.login.title')
    const logoutTitle = t('logOut')

    const handleLogOut = ()=>{
        dispatch(logout())
        navigate('/')
    }

    return (
        <>
            {userName ? (
                <div className='d-flex align-items-center'>
                    <h2 className='mx-4 text-main'>{userName}</h2>
                    <button className='btn btn-danger' onClick={handleLogOut}>{logoutTitle}</button>
                </div>
            ) : (
                <Link className='btn btn-main' to='/signin'>{loginTitle}</Link>
            )}
        </>
    );
};

export default LoginLogoutBtn;