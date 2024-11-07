import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import Loading from '../loading/index.jsx';
import JiraItem from '../jira-item/index.jsx';
import JiraCreateTaskBlock from '../task-create-jira/index.jsx';
import { getJiraTasks } from '../../store/slices/jira.slice.js';

const JiraPage = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const user = useSelector(state=>state.auth.user)
    const [createBlock, setCreateBlock] = useState(false)
    const jiraTasks = useSelector(state=>state.jira.tasks)
    const loading = useSelector(state=>state.jira.loading)

    useEffect(() => {
        dispatch(getJiraTasks({email: user.email}))
    }, []);

    const handleOpenCreateBlock = ()=>{
        setCreateBlock(true)
    }

    if (loading) return <Loading/>

    return (
        <div className='pt-90 p-4 my-3'>
            <h1 className=''>{t('jiraTasks')}</h1>
            <ul className='rounded mb-2'>
                {
                    jiraTasks.length === 0 ? <h2 className=''>{t('noJiraTasks')}</h2> :
                    jiraTasks.map((task) => (
                        <li key={task.id} className='p-3 rounded box-bg-theme my-2 ' style={{ listStyle: 'none' }}>
                        <JiraItem
                            task={task}
                        />
                    </li>
                ))
            }
            </ul>
            <button onClick={handleOpenCreateBlock} className='btn btn-main my-3'>{t('createTask')}</button>
            {
                createBlock ?
                <JiraCreateTaskBlock
                    user={user}
                    setCreateBlock={setCreateBlock}
                />
                    :
                    null
            }
        </div>
    );
};
export default JiraPage;