import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom";


const ErrorPage = () => {
    const {t} = useTranslation()
    return (
        <div className="pt-90 p-4 mt-4">
            <div className="text-center">
                <h1 className="text-main">404</h1>
                <h2 className="text-main">{t('pageNotFound')}</h2>
                <p className="">{t('pageNoExist')}</p>

                <div className="mt-6">
                    <Link to="/" className="btn btn-main">
                        {t('backHome')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;