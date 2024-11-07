import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import { createJiraTask, refreshJiraTasks } from '../../store/slices/jira.slice';
const priorities = ['High', 'Medium', 'Low']

const JiraCreateTaskBlock = ({setCreateBlock, user}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [issueDetails, setIssueDetails] = useState({
        summary: "",
        description: "",
        priority: "Medium"
    })

    const handleIfSuccess =()=> {
        setCreateBlock(false)
        dispatch(refreshJiraTasks({email:user.email}))
    }

    const handleCloseBlock = () => {
        setCreateBlock(false)
    }

    const handleSendIssue = () => {
        const data = {
            data: {
                email: user.email,
                issueDetails
            },
            handleIfSuccess
        }
        dispatch(createJiraTask(data))
    }

    const handleChangeSummary = (e) => {
        setIssueDetails({...issueDetails, summary: e.target.value})
    }

    const handleChangeDescription = (e) => {
        setIssueDetails({...issueDetails, description: e.target.value})
    }

    const handleChangePriority = (e) => {
        setIssueDetails({...issueDetails, priority: e.target.value})
    }

    return (
        <div className='box-bg-theme p-4 rounded'>
            <h1 className='text-danger my-3'> This Part is Not Working! Couldn't finish! </h1>

            <div className=''>
                <h1 className=''>{t('newTaskJira')}</h1>
                <label className=''>
                    <p className=''>{t('title')}</p>
                    <input
                        value={issueDetails.summary}
                        onChange={handleChangeSummary}
                        className='form-control mb-4 input-theme' type="text"/>
                </label><br />
                <label className=''>
                    <p className=''>{t('description')}</p>
                    <textarea
                        value={issueDetails.description}
                        onChange={handleChangeDescription}
                        className='form-control mb-4 input-theme'></textarea>
                </label><br />
                <label className=''>
                    <p className=''>{t('priority')}</p>
                    <select
                        onChange={handleChangePriority}
                        value={issueDetails.priority}
                        className='form-control mb-4 input-theme'
                    >
                        {
                            priorities.map((priority) => {
                                return (
                                    <option
                                        key={priority} value={priority}>{t(priority)}
                                    </option>
                                )
                            })
                        }
                    </select>
                </label>
                <div className=''>
                    <button onClick={handleCloseBlock} className='btn btn-danger mx-1'>{t('cancel')}</button>
                    <button onClick={handleSendIssue} className='btn btn-main mx-1'>{t('create')}</button>
                </div>
            </div>
        </div>
    );
};
export default JiraCreateTaskBlock;