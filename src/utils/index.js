import axios from "axios";
import {toast} from "react-toastify";
import CryptoJS from 'crypto-js'
import { setUser } from "../store/slices/auth.slice";
import {getTags, getTopics} from "../store/slices/form.slice";
import validator from 'validator';


export const messageFromServer = (message)=>{
    toast.error(message)
}

export const localMessage = (message)=>{
    toast.error(message)
}

export const handleErrorMessage = (action, message)=>{
    if(action?.payload?.response?.data?.message) return messageFromServer(action.payload.response.data.message)
    localMessage(message)
}

export const checkSearchValues = (form, searchInputs)=>{
    if(searchInputs.title && !form.title.toLowerCase().includes(searchInputs.title.toLowerCase())){
        return false
    }
    if(searchInputs.tag!=="All" && !form.tags.includes(searchInputs.tag)){
        return false
    }
    if(searchInputs.author!=="All" && form.user.id!==parseInt(searchInputs.author)){
        return false
    }
    return true
}

export const editFromObjectToArray = (object)=>{
    const arr = Object.entries(object).map(([key, value]) => ({ question: key, answer: value }));
    return arr;
}

export const editFromArrayToObject = (arr)=>{
    const formObject = arr.reduce((acc, item) => {
        acc[item.question] = item.answer;
        return acc;
    }, {});
    return formObject;
}

export const arrayToObjectWithId = (formObject, answers)=>{
    const result = Object.keys(formObject).map(key => {
        const originalItem = answers.find(item => item.question === key);
        return {
            id: originalItem.id,
            question: key,
            answer: formObject[key]
        };
    });
    return result
}

export const DragEndFields = (result, items, setItems) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
}

const validateForEmptyValue = (value, t) => {
    if (!value) {
        toast.warning(t('enterName'));
        return false;
    }
    return true
}

const validateForUniqueValue = (list, isObject, editingIndex, trimmedValue, t) => {
    const isEditing = editingIndex !== null;
    const isDuplicate = list.some((item, index) => {
        const itemName = isObject ? item.name.trim() : item.trim();
        return itemName === trimmedValue && (isEditing ? editingIndex !== index : true);
    });

    if (isDuplicate) {
        toast.warning(`${trimmedValue} ${t('isInUse')}`);
        return false;
    }
    return true;
}

const checkForOptions = (fieldItem, t) => {
    if (fieldItem.type === 'select' && fieldItem.options.length < 2) {
        toast.warning(t('minTwoOptions'));
        return false;
    }
    if (fieldItem.type !== 'select') {
        return {...fieldItem, options: null}
    }
    return fieldItem
}

export const addOptionValue = (setSelectOptions, selectOptions, optionValue) => {
    setSelectOptions([...selectOptions, optionValue]);
}

export const validateName = (value, list, editingIndex, isObject = false, t) => {
    const trimmedValue = value.trim();
    if (!validateForEmptyValue(trimmedValue, t)) return false
    if (!validateForUniqueValue(list, isObject, editingIndex, trimmedValue, t)) return false;
    return true;
};

export const validateSalesForceData = (data, t)=>{
    if (!data.name) {
        toast.warning(t('nameRequired'))
        return false
    }
    if (!data.email) {
        toast.warning(t('emailRequired'))
        return false
    }
    if (data.email && !validator.isEmail(data.email)){
        toast.warning(t('notValidEmail'))
        return false
    }
    if (data.phone && !validator.isMobilePhone(data.phone)){
        toast.warning(t('notValidPhone'))
        return false
    }
    return true
}

export const editOptionValue = (selectOptions, editingOptionIndex, optionValue, setSelectOptions) => {
    const updatedOptions = [...selectOptions];
    updatedOptions[editingOptionIndex] = optionValue;
    setSelectOptions(updatedOptions);
}

export const editField = (formFields, editingIndex, fieldItem, setFormFields, resetFieldItem, t) => {
    const updatedFields = [...formFields];
    const checkedFieldItem = checkForOptions(fieldItem, t)
    if (!checkedFieldItem) return
    updatedFields[editingIndex] = {...checkedFieldItem, id:formFields[editingIndex].id}
    setFormFields(updatedFields);
    resetFieldItem()
}

export const addField = (fieldItem, setFormFields, formFields, resetFieldItem, t) => {
    const checkedFieldItem = checkForOptions(fieldItem, t)
    if (!checkedFieldItem) return
    setFormFields([...formFields, checkedFieldItem]);
    resetFieldItem()
}

export const getDate = (date)=>{
    return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
        })
}


export const handleAsyncThunk = async (url, method, data, thunkApi, functionIfSuccess=()=>{}, functionIfReject=()=>{})=>{
    try {
        const response = await axios[method](url, data)
        functionIfSuccess(response)
        return response.data
    }
    catch (e) {
        functionIfReject()
        return thunkApi.rejectWithValue(e)
    }
}

export const handleCreateEditAsyncThunk = async (url, method, data, thunkApi, functionIfSuccess=()=>{}, functionIfReject=()=>{})=>{
    try {
        const response = await axios[method](url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        functionIfSuccess(response)
        return response.data
    }
    catch (e) {
        functionIfReject()
        return thunkApi.rejectWithValue(e)
    }
}



const encryptData = (data, secretKey) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (encryptedData, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export const saveUserLocally=(user)=>{
    const encryptedUser = encryptData(JSON.stringify(user), import.meta.env.VITE_REACT_APP_API_URL)
    localStorage.setItem('user', encryptedUser)
}

export const setLocallySavedUser =(dispatch)=>{
    if(localStorage.getItem('user')){
        const decryptedUser = decryptData(localStorage.getItem('user'), import.meta.env.VITE_REACT_APP_API_URL)
        dispatch(setUser(JSON.parse(decryptedUser)))
    }
}

const deleteLocallySavedUser = ()=>{
    localStorage.removeItem('user')
}

export const handleLogout = ()=>{
    deleteLocallySavedUser()
    window.location.reload()
}


export function getTagsAndTopics(dispatch){
    dispatch(getTags())
    dispatch(getTopics())
}

export function transformTags (tags){
    return tags.map(tag => ({
        value: tag.id,
        label: tag.label,
    }))
}

export function getTagLabelByValue (tags, value, t){
    if (tags.length){
        const tag = tags.find(tag => {
            return parseInt(tag.id) === parseInt(value)
        })
        return tag?.label || t('undefined')
    }
}

export function getTopicValueById (topics, id, t){
    if (topics.length){
        const topic = topics.find(topic => {
            return parseInt(topic.id) === parseInt(id)
        })
        return topic?.label || t('undefined')
    }
}


export function validateRegistration(form, t) {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
        toast.error(t('fillAllFields'))
        return false;
    }
    if (!validator.isEmail(form.email)) {
        toast.error(t('notValidEmail'))
        return false;
    }
    return true
}

export function validateLogIn(form, t) {
    if (!form.email.trim() ||!form.password.trim()) {
        toast.error(t('fillAllFields'))
        return false;
    }
    return true
}