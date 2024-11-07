import React, { useState } from 'react';

import {useTranslation} from "react-i18next";

import { addOptionValue, editOptionValue, validateName } from '../../../utils/index';
import SelectOptionsItems from '../select-option-items';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SelectOptionsEditor = ({ selectOptions, setSelectOptions }) => {

    const {t} = useTranslation()

    const [optionValue, setOptionValue] = useState('');
    const [editingOptionIndex, setEditingOptionIndex] = useState(null);

    const handleAddOption = () => {
        if (!validateName(optionValue, selectOptions, editingOptionIndex, false, t)) return;
        if (editingOptionIndex !== null) {
            editOptionValue(selectOptions, editingOptionIndex, optionValue, setSelectOptions);
        } else {
            addOptionValue(setSelectOptions, selectOptions, optionValue);
        }
        handleResetOption()
    };

    const handleResetOption = ()=>{
        setEditingOptionIndex(null);
        setOptionValue('');
    }

    const handleCancelAddOption = () => {
        handleResetOption()
    };

    return (
        <div className="mb-2 ">
            <p className="text-main">{t('selectOptions')}:</p>
            <div className="">
                <input
                    type="text"
                    value={optionValue}
                    onChange={(e) => setOptionValue(e.target.value)}
                    className="input-group mb-2"
                />
                {editingOptionIndex !== null && (
                    <button type="button" onClick={handleCancelAddOption} className="btn btn-main mx-2">
                        <FontAwesomeIcon icon={faTimes} className='' /> {t('cancel')}
                    </button>
                )}
                <button type="button" onClick={handleAddOption} className="btn btn-main mx-2">
                    {editingOptionIndex !== null ?  t('saveOption') : t('addOption')}
                </button>
            </div>

            <SelectOptionsItems
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                setOptionValue={setOptionValue}
                setEditingOptionIndex={setEditingOptionIndex}
                editingOptionIndex={editingOptionIndex}
            />
        </div>
    );
};

export default SelectOptionsEditor;