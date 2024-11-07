import React, {useEffect, useState} from 'react'

import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {ReactTags} from 'react-tag-autocomplete'

import {getTagLabelByValue, transformTags} from "../../../utils/index";


const TagAutocomplete = ({ form, setForm }) => {

    const {t} = useTranslation()

    const tags = useSelector(state => state.forms.tags)

    const [selected, setSelected] = useState([]);

    const suggestions = transformTags(tags)

    useEffect(() => {
        const newSelected = form.tags.map(tag => ({
            value: parseInt(tag),
            label: getTagLabelByValue(tags, tag, t)
        }));
        setSelected(newSelected);
    }, []);

    useEffect(() => {
        let tags = selected.map(tag => tag.value)
        setForm({ ...form, tags });
    }, [selected]);

    const onAdd =(newTag) => {
        setSelected([...selected, newTag])
    }

    const onDelete = (tagIndex) => {
        setSelected(selected.filter((_, i) => i !== tagIndex));
    };

    return (
        <div className="">
            <ReactTags
                classNames={'p-3'}
                selected={selected}
                suggestions={suggestions}
                onAdd={onAdd}
                onDelete={onDelete}
            />
        </div>
    );
};



export default TagAutocomplete