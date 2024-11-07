import React, {useEffect, useState} from 'react';

import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const NavMenuItems = () => {

    const pathname = useLocation().pathname;
    const {t} = useTranslation()

    let user = useSelector(state => state.auth.user)

    const [navItems, setNavItems] = useState([])
    
    useEffect(() => {
        const items = t('nav', { returnObjects: true });
        setNavItems(Array.isArray(items) ? items : []); 
    }, [t]);

    return (
        <nav className='p-2'>
            {navItems?.map((navItem) => {
                if (user?.role !== 'admin' && navItem.url === '/admin'||
                    !user && navItem.url === '/my-page'
                ) return null
                return (
                    <Link
                        key={navItem.label}
                        className={'text-main text-lg mx-2 fs-4 text-decoration-none cursor-pointer text-capitalize' + (pathname === navItem.url ? ' text-primary' : '')}
                        to={navItem.url}>
                        {navItem.label}
                    </Link>
                );
            })}
        </nav>
    )
};

export default NavMenuItems;