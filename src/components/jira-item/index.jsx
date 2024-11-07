import React from 'react';
import {useTranslation} from "react-i18next";


const JiraItem = ({task}) => {
    const {t} = useTranslation()
    console.log(task);
    

    return (
        <div className="">
            <div className="">
            <h2 className="">Title: {task.title}</h2>
            <p className=""><label> Description: </label> {task.description}</p>
            <div className="my-1">
                    <span>Status: {t(task.status)}</span>
            </div>
            <p className="">{t('priority')}: <span>{t(task.priority)}</span></p>
            </div>
            <p className="">{task.reporter}</p>
        </div>
    );
};
export default JiraItem;