import ChangeLanguage from "../language-switcher/index.jsx";
import ThemeOption from "../theme-option/index.jsx";
import LoginLogoutBtn from "./LogInOut.jsx";
import NavMenuItems from "./NavMenuItems.jsx";

const NavMenu = () => {
    return (
        <div className='d-flex align-items-center justify-content-between'>
            <NavMenuItems/>
            <div className="d-flex align-items-center">
                <div className="theme-options">
                    <ThemeOption theme="dark" />
                    <ThemeOption theme="light" />
                    <ThemeOption theme="purple" />
                </div>
                <ChangeLanguage/>
                <LoginLogoutBtn/>
            </div>
        </div>
    );
};

export default NavMenu;