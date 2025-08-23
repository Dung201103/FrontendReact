import SideBar from "./SideBar";
import './Admin.scss'
import { FaHeart, FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Languages from "../Header/Languages";
import { NavDropdown } from "react-bootstrap";
import { useTranslation, Trans } from 'react-i18next';

const Admin = (props) => {
    const [collapsed, setcollapsed] = useState(false);
    const { t } = useTranslation();
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setcollapsed(!collapsed)}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <Languages />
                        <NavDropdown title={t('admin.header.settings')} id="basic-nav-dropdown">
                            <NavDropdown.Item >{t('admin.header.prof')}</NavDropdown.Item>
                            <NavDropdown.Item >
                                {t('admin.header.logout')}
                            </NavDropdown.Item>
                        </NavDropdown>


                    </div>
                </div>

                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>

        </div >

    )
}
export default Admin;