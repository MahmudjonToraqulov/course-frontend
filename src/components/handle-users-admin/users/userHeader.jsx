import React from 'react';

import {useTranslation} from "react-i18next";

const UsersHeader = () => {

    const {t} = useTranslation()

    return (

        <tr className="">

            <th className="col-span-1 p-4 text-center">Id</th>
            <th className="border-l col-span-2 p-4 text-center">{t('usersPage.name')}</th>
            <th className="border-l col-span-2 p-4 text-center">{t('usersPage.status')}</th>
            <th className="border-l col-span-2 p-4 text-center">{t('usersPage.role')}</th>
            <th className="border-l col-span-3 p-4 text-center">{t('usersPage.email')}</th>
            <th className="border-l col-span-2 p-4 text-center">{t('usersPage.actions')}</th>
        </tr>
    );
};

export default UsersHeader;