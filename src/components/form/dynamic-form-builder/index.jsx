import React, { useState } from 'react';

import {useTranslation} from "react-i18next";

import SelectOptionsEditor from '../select-options-editor/index.jsx';
import FormFieldItems from '../form-field-items/index.jsx';
import {addField, validateName, editField} from '../../../utils/index.js';

const fieldItemTemplate = {
    name: '',
    type: 'text',
    selectOptions: null,
    hidden: false
}

const DynamicFormBuilder = ({ formFields, setFormFields, setForm }) => {

    const {t} = useTranslation()

    const [editingIndex, setEditingIndex] = useState(null);
    const [fieldItem, setFieldItem] = useState(fieldItemTemplate)

    const resetFieldItem = ()=>{
        setEditingIndex(null);
        setFieldItem(fieldItemTemplate)
    }

    const handleSetFieldItem = (changeValue) => {
        setFieldItem(prevState => ({
            ...prevState,
            ...changeValue
        }));
    }

    const setFieldName = (name)=>{
        handleSetFieldItem({name});
    }

    const setFieldType = (type)=>{
        handleSetFieldItem({type});
        if (type === 'select') {
            setSelectOptions([]);
        }
    }

    const setSelectOptions = (options) => {
        handleSetFieldItem({options: options });
    }

    const setFieldHidden = (value)=>{
        handleSetFieldItem({hidden: value });
    }

    const handleAddField = () => {
        if (!validateName(fieldItem.name, formFields, editingIndex, true, t)) return;
        if (editingIndex !== null) editField(formFields, editingIndex, fieldItem, setFormFields, resetFieldItem, t)
        else addField(fieldItem, setFormFields, formFields, resetFieldItem, t)
    };

    const handleCancelAddField = () => {
        resetFieldItem()
    };

    return (
        <div className='mt-5 box-bg-theme rounded p-4 mb-3'>
            <h2 className="text-main">{t('formFields')}</h2>
            <div className="">
                <div className="">
                    <div className="mb-4">
                        <p className="text-main fs-4">{t('fieldName')}:</p>
                        <input
                            type="text"
                            value={fieldItem.name}
                            onChange={(e) => setFieldName(e.target.value)}
                            className="form-control input-theme"
                        />
                    </div>

                    <div className="mb-4">
                        <p className="text-main fs-4">{t('fieldType')}:</p>
                        <select
                            value={fieldItem.type}
                            onChange={(e) => setFieldType(e.target.value)}
                            className="form-control input-theme"
                        >
                            <option value="text">{t('text')}</option>
                            <option value="textarea">{t('textarea')}</option>
                            <option value="select">{t('select')}</option>
                            <option value="boolean">{t('boolean')}</option>
                        </select>
                    </div>

                    {fieldItem.type === 'select' && (
                        <SelectOptionsEditor selectOptions={fieldItem.options}
                                             setSelectOptions={setSelectOptions}/>
                    )}

                    <div className="mb-4 d-flex align-items-center">
                        <label className="text-main fs-4" for='hiddenQuestionChecked' >{t('hiddenQuestion')}:</label>
                        <input
                            id='hiddenQuestionChecked'
                            className='ml-4 form-check-input fs-4 mx-1'
                            type="checkbox"
                            checked={fieldItem.hidden}
                            onChange={(e) => setFieldHidden(e.target.checked)}
                        />
                    </div>

                    <div className=" mb-4">
                        {editingIndex !== null && (
                            <button type="button" onClick={handleCancelAddField} className="btn btn-main mx-2">
                                {t('cancel')}
                            </button>
                        )}
                        <button type="button" onClick={handleAddField} className="btn btn-main mx-2">
                            {editingIndex !== null ? t('saveChanges') : t('addField')}
                        </button>
                    </div>
                </div>

                <div className="">
                    <FormFieldItems
                        formFields={formFields}
                        setFormFields={setFormFields}
                        setFieldName={setFieldName}
                        setFieldType={setFieldType}
                        setEditingIndex={setEditingIndex}
                        setSelectOptions={setSelectOptions}
                        setFieldHidden={setFieldHidden}
                        editingIndex={editingIndex}
                        setForm={setForm}
                    />
                </div>
            </div>
        </div>
    );
};

export default DynamicFormBuilder;