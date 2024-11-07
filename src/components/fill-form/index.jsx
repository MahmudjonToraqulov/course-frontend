import React, {useEffect} from 'react';

import {useNavigate, useParams} from "react-router-dom";
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {arrayToObjectWithId, editFromArrayToObject, editFromObjectToArray} from "../../utils/index.js";
import {createFilledForm, editFilledForm} from "../../store/slices/filledForm.slice.js";
import {getFormById} from "../../store/slices/form.slice.js";
import Loading from '../loading/index.jsx';
import QuestionItem from '../question-item/index.jsx';

const FillForm = ({editMode=false}) => {

    const {t} = useTranslation()
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const form = useSelector(state=>state.forms.selectedForm)
    const loading = useSelector(state=>state.forms.loading)
    const answers = useSelector(state=>state.filledForms.answers)
    const user = useSelector(state=>state.auth.user)

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const handleGetForm = ()=>{
        if (!editMode) dispatch(getFormById({id}))
    }

    const handleNavigate = async()=>{
        if (editMode){
            dispatch(getFilledFormById({id:answers.id, handleNavigate: ()=>navigate(`/filledFormPage`)}))
        }
        else navigate(`/forms`)
    }

    const handleSetDefaultAnswers =()=>{
        if (editMode&&answers?.items){
           reset(editFromArrayToObject(answers.items))
        }
    }

    useEffect(() => {
        handleSetDefaultAnswers()
        handleGetForm()
    }, []);

    const handleSave=(data)=>{
        let items = editFromObjectToArray(data)
        let formData = {formId: id, userId: user.id, items}
        dispatch(createFilledForm({data:formData, handleIfSuccess:handleNavigate}))
    }
    const handleEdit=(data)=>{
        dispatch(editFilledForm({data:arrayToObjectWithId(data, answers.items), handleIfSuccess:handleNavigate}))
    }

    if (loading) return <Loading/>
    if(!form?.title) return null

    return (
        <div className="pt-90 p-4">
            <div className='p-4 rounded mt-4 box-bg-theme rounded'>
                <h2 className='text-main mb-2'>{form.title}</h2>
                <form onSubmit={handleSubmit((data) => editMode ? handleEdit(data) : handleSave(data))}>
                    <div className=''>
                        {
                            form?.formFields?.map(item=>{
                                if(item.hidden) return null
                                return (
                                    <div key={item.name} className='m-2'>
                                        <label>
                                            <p className=''>{item.name}</p>
                                            <QuestionItem
                                                item={item}
                                                register={register}
                                                />
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className='btn btn-main my-2' type='submit'>{editMode ? t('edit') : t('save')}</button>
                </form>
            </div>
        </div>
    );
};

export default FillForm;