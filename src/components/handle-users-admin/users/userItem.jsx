import React from 'react';

import {useTranslation} from "react-i18next";

const UserItem = ({userItem, index=1, selfUser=false, handleRemoveAdmin, handleAddAdmin, handleUnblockUser, handleBlockUser, handleDeleteUser}) => {

    const {t} = useTranslation()

    return (
        <tr
            key={index}
            className={"text-center p-4 " + (selfUser ? "user-me-theme" : "")}>
            <td className="">{selfUser? index : index+2}</td>
            <td className="">{userItem.name}{selfUser && ` (${t('usersPage.me')})`} </td>

            <td className="p-1">
                <p className={userItem.blocked ? 'text-danger bg-none fs-5' : 'text-success bg-none fs-5' }>{userItem.blocked?t('usersPage.blocked'):t('usersPage.unblocked')}</p>
            </td>

            <td className="">
                <p className='text-main bg-none fs-5' >{userItem.role === 'admin' ? t('usersPage.admin') : t('usersPage.user')}</p>
            </td>
            <td className="">{userItem.email}</td>
            <td className="">
                <button className='btn btn-red mx-1 text-btn-light mx-2' onClick={() => handleDeleteUser(userItem.id)}>{t('usersPage.deleteUserBtn')}</button>
                <button className='btn btn-blue mx-1 text-btn-light mx-2' onClick={() => {}}>{t('usersPage.viewUser')}</button>
                {!selfUser &&
                userItem.blocked ?
                    <button onClick={() => handleUnblockUser(userItem.id)}
                            className="btn btn-green text-btn-light mx-2">{t('usersPage.unblockUserBtn')}</button>
                    :
                    <button onClick={() => handleBlockUser(userItem.id)}
                            className="btn btn-red text-btn-light mx-2">{t('usersPage.blockUserBtn')}</button>
                }
                {
                    userItem.role === "admin"
                        ? <button onClick={() => handleRemoveAdmin(userItem.id)}
                                  className="btn btn-red text-btn-light mx-2">{t('usersPage.removeAdminBtn')}</button>
                        :
                        <button onClick={() => handleAddAdmin(userItem.id)}
                                className="btn btn-main text-btn-light mx-2">{t('usersPage.setAdminBtn')}</button>
                }
            </td>
        </tr>
    );
};

export default UserItem;