import React, {useEffect, useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {register} from "../../store/slices/auth.slice.js";
import { validateRegistration } from "../../utils/index.js";

const Register = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loading = useSelector(state=>state.auth.loading)
    const userName = useSelector(state=>state.auth?.user?.name)

    useEffect(() => {
        if (userName){
            navigate('/')
        }
    }, [userName]);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSetName = (e) => {
        setName(e.target.value)
    }

    const handleSetEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSetPassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateRegistration({name, email, password}, t)) return
        dispatch(register({name, email, password}))
    }

    return (
        <div className="pt-90 p-4">
            <div className=" p-3 d-flex align-items-center d-inline">
                <form className="m-auto box-bg-theme rounded p-4 mt-4">
                    <h2 className="text-main text-center">{t('loginRegistration.registration.title')}</h2>

                    <div className="mb-3">
                        <label className="text-main fs-5" htmlFor="name">
                            {t('loginRegistration.registration.name')}
                        </label><br />
                        <input
                            value={name}
                            onChange={e => handleSetName(e)}
                            type="text"
                            id="name"
                            className="input-group p-1"
                            placeholder={t('loginRegistration.registration.namePlaceHolder')}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="text-main fs-5" htmlFor="email">
                            {t('loginRegistration.email')}
                        </label><br />
                        <input
                            value={email}
                            onChange={e => handleSetEmail(e)}
                            type="email"
                            id="email"
                            className="input-group p-1"
                            placeholder={t('loginRegistration.emailPlaceHolder')}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="text-main fs-5" htmlFor="password">
                            {t('loginRegistration.password')}
                        </label><br />
                        <input
                            value={password}
                            onChange={e => handleSetPassword(e)}
                            type="password"
                            id="password"
                            className="input-group p-1"
                            placeholder={t('loginRegistration.passwordPlaceHolder')}
                        />
                    </div>

                    <div className="">
                        <button
                            disabled={loading}
                            onClick={handleSubmit}
                            type="submit"
                            className="btn btn-main "
                        >
                            {loading? t('loading') : t('loginRegistration.registration.registerBtn')}
                        </button>
                    </div>
                    <p className="text-center text-gray-600 text-sm mt-4">
                        {t('loginRegistration.registration.redirectToLogin.text')}
                        <Link to="/signin" className="text-primary font-semibold">
                            {t('loginRegistration.registration.redirectToLogin.linkText')}
                        </Link>
                    </p>
                </form>

            </div>
        </div>
    );
};

export default Register;