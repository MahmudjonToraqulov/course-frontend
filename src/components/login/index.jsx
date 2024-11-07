import React, {useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import { validateLogIn } from "../../utils";
import { login } from "../../store/slices/auth.slice";
import Loading from "../loading";


const Login = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loading = useSelector(state=>state.auth.loading)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSetEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSetPassword = (e) => {
        setPassword(e.target.value)
    }

    const handleNavigate = () => {
        navigate('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateLogIn({email, password}, t)) return
        dispatch(login({email, password, handleNavigate}))
    }

    if (loading) return <Loading/>
    return (
        <div className="pt-90 p-4 ">
            <div className=" p-3 d-flex align-items-center d-inline ">
                    <form className="m-auto box-bg-theme rounded p-4 mt-4">
                        <h2 className="text-main text-center">{t('loginRegistration.login.title')}</h2>
                        <div className="mb-3">
                            <label className="text-main fs-5" htmlFor="email">
                                {t('loginRegistration.email')}
                            </label><br />
                            <input
                                value={email}
                                onChange={e=>handleSetEmail(e)}
                                type="email"
                                id="email"
                                className="input-group input-theme p-1"
                                placeholder={t('loginRegistration.emailPlaceHolder')}
                            />
                        </div>

                        <div className="mb-3 ">
                            <label className="text-main fs-5 " htmlFor="password">
                                {t('loginRegistration.password')}
                            </label><br />
                            <input
                                value={password}
                                onChange={e=>handleSetPassword(e)}
                                type="password"
                                id="password"
                                className="input-group input-theme p-1"
                                placeholder={t('loginRegistration.passwordPlaceHolder')}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="btn btn-main "
                            >
                                {t('loginRegistration.login.loginBtn')}
                            </button>
                        </div>
                        <p className="text-center text-gray-600 text-sm mt-4">
                            {t('loginRegistration.login.redirectToRegister.text')}
                            <Link to="/signup" className="text-primary font-semibold">
                                {t('loginRegistration.login.redirectToRegister.linkText')}
                            </Link>
                        </p>
                    </form>

            </div>
        </div>
    );
};

export default Login;