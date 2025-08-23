import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';

import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import './Sidebar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <>
            <ProSidebar
                image={sidebarBg}

                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={'3em'} color={"00bfff"} />
                        <span onClick={() => navigate('/')}>Dra</span>

                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        // suffix={<span className="badge red">New</span>}
                        >    {t('admin.SideBar.dasboard')}
                            <Link to="/admins/dashboard" />
                        </MenuItem>

                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            // suffix={<span className="badge yellow">3</span>}

                            // icon={<FaRegLaughWink />}
                            icon={<FaGem />}
                            title="Features"
                        >
                            <MenuItem> {t('admin.SideBar.mn_us')}
                                <Link to="/admins/manage-users" />
                            </MenuItem>
                            <MenuItem>{t('admin.SideBar.mn_qz')}
                                <Link to="/admins/manage-quizzes" />
                            </MenuItem>
                            <MenuItem>{t('admin.SideBar.mn_qs')}
                                <Link to="/admins/manage-questions" />
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                viewSource
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}
export default SideBar;