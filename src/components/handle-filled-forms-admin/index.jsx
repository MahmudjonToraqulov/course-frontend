import React, {useEffect} from 'react';

import {useDispatch} from "react-redux";
import EditFilledFormsBlock from '../edit-filled-forms-block';

import {getAllFilledForms} from "../../store/slices/filledForm.slice";

const HandleFilledFormsAdmin = () => {

    const dispatch = useDispatch()

    const handleGetFilledForms = ()=>{
        dispatch(getAllFilledForms())
    }

    useEffect(() => {
        handleGetFilledForms()
    }, []);

    return (
        <EditFilledFormsBlock handleGetFilledForms={handleGetFilledForms}/>
    );
};

export default HandleFilledFormsAdmin;