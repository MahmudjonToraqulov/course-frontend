import {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

import {getMe, logout} from "../../store/slices/auth.slice.js";
import {
    addAdmin,
    blockUser, deleteUser,
    getAllUsers,
    removeAdmin,
    selfDeleteFromUsers,
    unblockUser
} from "../../store/slices/user.slice.js";
import Loading from "../loading/index.jsx";
import UsersHeader from "./users/userHeader.jsx";
import UserItem from "./users/userItem.jsx";


const HandleUsersAdmin = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const users = useSelector(state => state.users.users)
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    const handleGetAllUsers = async () => {
        await dispatch(getAllUsers())
        dispatch(selfDeleteFromUsers(user.id))
    }

    useEffect(() => {
        handleGetAllUsers()
    }, [])

    const handleCheckMe = async (id) => {
        if (id === user.id) {
            navigate('/')
            dispatch(getMe({id: id}))
        }
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleRemoveAdmin = async (id) => {
        await dispatch(removeAdmin(id))
        handleCheckMe(id)
        handleGetAllUsers()
    }

    const handleAddAdmin = async (id) => {
        await dispatch(addAdmin(id))
        handleGetAllUsers()
    }

    const handleBlockUser = async (id) => {
        await dispatch(blockUser(id))
        if (id === user.id) return handleLogout()
        handleGetAllUsers()
    }

    const handleUnblockUser = async (id) => {
        await dispatch(unblockUser(id))
        handleGetAllUsers()
    }

    const handleDeleteUser = async (id) => {
        await dispatch(deleteUser(id))
        if (id === user.id) return handleLogout()
        handleGetAllUsers()
    }



    if (loading) return <Loading/>

    return (
        <div className="pt-90 p-4">
            <h1 className="text-main">{t('usersPage.title')}</h1>
            <div className=" ">
                <table className="table table-theme rounded p-3">
                    <UsersHeader/>
                        <UserItem
                            selfUser={true}
                            userItem={user}
                            handleRemoveAdmin={handleRemoveAdmin}
                            handleAddAdmin={handleAddAdmin}
                            handleBlockUser={handleBlockUser}
                            handleUnblockUser={handleUnblockUser}
                            handleDeleteUser={handleDeleteUser}
                        />

                        {
                            users.map((userItem, index) => (
                                    <UserItem
                                        key={userItem.id}
                                        index={index}
                                        userItem={userItem}
                                        handleRemoveAdmin={handleRemoveAdmin}
                                        handleAddAdmin={handleAddAdmin}
                                        handleBlockUser={handleBlockUser}
                                        handleUnblockUser={handleUnblockUser}
                                        handleDeleteUser={handleDeleteUser}
                                    />
                                )
                            )
                        }
                </table>
            </div>
        </div>
    );
};

export default HandleUsersAdmin;