import React, { useState } from 'react';

import { useSelector } from "react-redux";
import {useTranslation} from "react-i18next";

const AdminFormSearchBar = ({ authors, searchInputs, setSearchInputs, defaultSearchInputs }) => {

    const {t} = useTranslation()
    const tags = useSelector(state => state.forms.tags);

    const [author, setAuthor] = useState('All');
    const [tag, setTag] = useState('All');

    const resetSearchInputs = () => {
        setAuthor('All')
        setTag('All')
        setSearchInputs(defaultSearchInputs);
    };

    const handleChangeTitle = (e) => {
        setSearchInputs({ ...searchInputs, title: e.target.value });
    };

    const handleChangeTag = (e) => {
        const selectedTagId = e.target.value;
        setTag(selectedTagId);
        setSearchInputs({ ...searchInputs, tag: selectedTagId });
    };

    const handleChangeAuthor = (e) => {
        const selectedAuthorId = e.target.value;
        setAuthor(selectedAuthorId);
        setSearchInputs({ ...searchInputs, author: selectedAuthorId });
    };

    return (
        <div
            className="">
            <input
                className="form-control mb-2 input-theme"
                type="text"
                placeholder={t('searchByTitle')}
                value={searchInputs.title}
                onChange={handleChangeTitle}
            />

            <select
                className="mx-2 p-1"
                value={tag}
                onChange={handleChangeTag}
            >
                <option value='All'>{t('allTags')}</option>
                {tags.map(tag => (
                    <option key={tag.id} value={tag.id}>
                        {tag.label}
                    </option>
                ))}
            </select>

            <select
                className="mx-2 p-1"
                value={author}
                onChange={handleChangeAuthor}
            >
                <option value='All'>{t('allAuthors')}</option>
                {authors.map(author => (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                ))}
            </select>

            <button
                className="btn btn-main text-capitalize mx-2"
                onClick={resetSearchInputs}
            >
                {t('reset')}
            </button>
        </div>

    );
};

export default AdminFormSearchBar;