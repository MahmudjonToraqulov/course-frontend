import {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {getAllForms, getAllFormsBySearchWord} from "../../store/slices/form.slice.js";
import Loading from "../loading/index.jsx";
import FormCardItem from "../form-card-item/index.jsx";

const Home = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()

    const forms = useSelector(state=>state.forms.forms)
    useSelector(state=>console.log(state))
    const loading = useSelector(state=>state.forms.loading)

    const [searchWord, setSearchWord] = useState('')

    useEffect(() => {
        dispatch(getAllForms())
    }, []);

    const handleChangeSearchWord = (e)=>{
        setSearchWord(e.target.value)
    }
    const handleStartSearch = ()=>{
        dispatch(getAllFormsBySearchWord(searchWord))
    }

    if (loading) return <Loading/>

    return (
        <div className="pt-90 p-4">
            <h1 className='header-title'>{t('searchForms')}</h1>
            <div className='display-flex input-group  mb-2'>
                <input value={searchWord} onInput={handleChangeSearchWord} className=' form-control input-theme' placeholder={t('searchWord')} type="text"/>
                <button onClick={handleStartSearch} className='btn btn-main'>{t('search')}</button>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                {
                    forms.length === 0 &&
                    <h2 className='text-2xl'>{t('noForms')}</h2>
                }
                {
                    forms.map(form=>{
                        return(
                            <FormCardItem
                                key={form.id}
                                form={form}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Home;