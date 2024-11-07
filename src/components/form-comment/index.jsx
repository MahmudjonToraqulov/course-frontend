import React, { useEffect, useState } from 'react';

import { io } from 'socket.io-client';
import {useTranslation} from "react-i18next";
import FormCommentItem from '../form-comment-item';


const FormComment = ({ formId, user }) => {

    const {t} = useTranslation()

    const [comment, setComment] = useState('');
    const [socket, setSocket] = useState(null);
    const [comments, setComments] = useState([]);

    const SOCKET_URL = import.meta.env.VITE_REACT_APP_API_URL.replace('/api', '')

    const handleSetComment = (e) => setComment(e.target.value);
    useEffect(() => {
        const socketInstance = io(SOCKET_URL, { query: { formId } });
        setSocket(socketInstance);
        socketInstance.on('updateComments', (data) => {
            setComments(data);
        });
        socketInstance.emit('getComments', formId);
        return () => {
            socketInstance.disconnect();
        };
    }, [formId]);
    const handleSaveComment = () => {
        if (comment.trim()) {
            socket.emit('addComment', {
                formId,
                userId: user.id,
                comment,
            });
            setComment('');
        }
    };

    return (
        <div className='mt-5'>
            <h2 className="text-main">{t('comments')}</h2>
            {comments.length > 0 ? (
                comments.map((comment, index) => {
                    return (
                        <FormCommentItem key={index} comment={comment} />
                    )
                })
            ) : (
                <p>{t('noComments')}</p>
            )}
            {user && (
                <div className="">
                    <textarea
                        value={comment}
                        onChange={handleSetComment}
                        className="form-control mb-3 mt-4 p-3 border rounded box-bg-theme-2 text-main input-theme border"
                        placeholder={t('writeComment')}
                    />
                    <button
                        onClick={handleSaveComment}
                        className="btn btn-main"
                    >
                        {t('writeComment')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormComment;