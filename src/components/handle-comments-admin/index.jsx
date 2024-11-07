import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {deleteComment, deleteCommentLocally, getAllComments, refreshComments} from "../../store/slices/comment.slice.js";
import Loading from '../loading/index.jsx';
import FormCommentItem from '../form-comment-item/index.jsx';


const HandleCommentsAdmin = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()

    const comments = useSelector(state=>state.comments.comments)
    const loading = useSelector(state=>state.comments.loading)

    useEffect(() => {
        dispatch(getAllComments())
    }, []);

    const handleDeleteComment = async (id)=>{
        dispatch(deleteCommentLocally(id))
        await dispatch(deleteComment({id}))
        dispatch(refreshComments())
    }

    if (loading) return <Loading/>
    if (!comments) return

    return (
        <div className='pt-90 p-4'>
            <h1 className='text-main'>{t('allComments')}</h1>
            <div className=''>
                {
                    comments.length === 0?
                        <h2 className=''>{t('noComments')}</h2>
                        :
                        null
                }
                {comments.map(comment => {
                    return (
                        <div
                            className=''
                            key={comment.id}
                        >
                            <FormCommentItem
                                comment={comment}
                                admin={true}
                                deleteComment={handleDeleteComment}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default HandleCommentsAdmin;