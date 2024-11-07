import React from 'react';

import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const FormCommentItem = ({comment, admin = false, deleteComment = null}) => {

    const {t} = useTranslation()

    const author = comment.user.id===comment.form.userId

    return (
        <div className="box-bg-theme my-4 box-shadow">
            <div
                className={"p-3 rounded my-3 shadow box-bg-theme-2"+ (author&&!admin?"":"bg-white")}>
                <div className="">
                    <div>
                        <p className="border-bottom p-2">
                            {t('author')}: <span className="">{comment.user.name} {author&&!admin?` (${t('formAuthor')})`:""}</span>
                        </p>

                        {admin && (
                            <p className="">
                                {t('formTitle')}: <Link to={`/forms/${comment.form.id}`} className="">{comment.form.title}</Link>
                            </p>
                        )}

                    </div>
                </div>
                <p className="">
                    {comment.comment}
                </p>
                    {admin && (
                        <button
                            onClick={() => deleteComment(comment.id)}
                            className="btn btn-danger"
                        >
                            {t('delete')}
                        </button>
                    )}
            </div>
        </div>

    );
};

export default FormCommentItem;