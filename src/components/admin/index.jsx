import React, {useEffect, useState} from "react";

import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const AdminPage = () => {

    const [panelItems, setPanelItems] = useState(null)
    const {t} = useTranslation()

    useEffect(() => {
        setPanelItems(t('adminDashboard', { returnObjects: true }));
    }, [t]);

    if (!panelItems) return

    return (
            <div className="pt-90 p-4 mt-2">
                <h1 className="text-main">{panelItems.header}</h1>
                <div className="container d-flex flex-wrap">
                    {panelItems?.items.map(item => {
                        return (
                            <div key={item.title} className="box-bg-theme box-shadow p-3 rounded my-2 mr-2 col-md-6 p-3 mb-5 ">
                                <h2 className="text-main">{item.title}</h2>
                                <p className="">{item.description}</p>
                                <Link
                                    to={item.url}
                                    className="btn btn-main ">
                                    {panelItems.buttonTitle}
                                </Link>
                            </div>
                        );
                    })}

                </div>
            </div>
    );
};

export default AdminPage;