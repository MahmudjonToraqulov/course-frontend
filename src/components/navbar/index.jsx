import React from 'react';
import { Link, Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";
import NavMenu from "./NavMenu.jsx";
import {useSelector} from "react-redux";

const Header = () => {
    const {t} = useTranslation()
    const user = useSelector(state=>state.auth.user)

    return (
        <div className=''>
            <header className='display-flex justify-between mb-16 position-fixed left-0 top-0 w-100 p-3 bg-main header z-3'>
                <NavMenu/>
            </header>
            <Outlet  />
            {
                user ? <Link className='jira-btn' to='jira'>Jira</Link> : null
            }
        </div>

    );
};

export default Header;