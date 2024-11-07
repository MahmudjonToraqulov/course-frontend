import React, {useEffect, useState} from 'react';

import i18n from "i18next";
import Select from 'react-select';

const languages = [
    { value: 'en', label: 'en' },
    { value: 'uz', label: 'uz' },
]

const ChangeLanguage = () => {

    const [language, setLanguage] = useState(languages[0])

    const setLanguageLocally = (e)=>{
        localStorage.setItem('language', JSON.stringify(e));
    }

    const getLangFromLocalAndSet = ()=>{
        const storedLanguage = JSON.parse(localStorage.getItem('language'))
        if (storedLanguage) {
            setLanguage(storedLanguage);
            i18n.changeLanguage(storedLanguage.value);
        }
    }

    const changeLanguage = (e)=>{
        i18n.changeLanguage(e.value);
        setLanguage(e)
        setLanguageLocally(e)
    }

    useEffect(() => {
        getLangFromLocalAndSet()
    }, []);

    return (
        <Select
            className= 'mx-2 box-bg-theme' 
            value={language}
            onChange={changeLanguage}
            options={languages}
        />
    );
};

export default ChangeLanguage;