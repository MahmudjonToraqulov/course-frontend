import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

import {createForm, updateForm} from "../../../store/slices/form.slice";
import Loading from '../../loading';
import FormMainFields from '../main-fields';
import DynamicFormBuilder from '../dynamic-form-builder';

const CreateEditForm = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useSelector(state=>console.log(state))
    const userId = useSelector(state=>state.auth.user?.id)
    const loading = useSelector(state=>state.forms.loading)
    const selectedForm = useSelector(state=>state.forms.selectedForm)

    const [form, setForm] = useState(null);
    const [image, setImage] = useState([])

    useEffect(() => {
        setForm(selectedForm)
    }, [selectedForm]);

    const handleFormFieldsChange = (formFields) => {
        setForm((prevForm) => ({ ...prevForm, formFields }));
    };

    const handleRedirect = (response)=>{
        navigate(`/forms/${response.data.id}`)
    }

    const handleEdit=()=>{
        const formData = handlePrepareForm(form)
        console.log(formData)
        dispatch(updateForm({id: form.id, formData, handleRedirect}))
    }

    const handleCreateNewForm = ()=>{
        const formData = handlePrepareForm({...form, userId})
        dispatch(createForm({formData, handleRedirect}))
    }

    const handlePrepareForm = (form) => {
        const formData = new FormData();
        if (image?.length) formData.append('file', image[0].file);
        formData.append('formData', JSON.stringify(form))
        return formData;
    }

    const handleSubmit = () => {
        if (!form.formFields.length) return toast.warning(t('minOneQuestion'))
        form?.id ? handleEdit() : handleCreateNewForm();
    };

    if (loading) return <Loading/>
    if (!form) return

    return (
        <div className="p-4 pt-90">
            <FormMainFields
                form={form}
                setForm={setForm}
                image={image}
                setImage={setImage}
            />
            <DynamicFormBuilder formFields={form.formFields} setFormFields={handleFormFieldsChange} setForm={setForm}/>
            <button className="btn btn-main" onClick={handleSubmit}>
                {form?.id ? t('edit') : t('create')}
            </button>
        </div>
    );
};

export default CreateEditForm;