import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';
import { Logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';
import Profile from './Profile';
import Languages from './Languages';
import { useState } from 'react';
const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isShowModalProfile, setIsShowModalProfile] = useState(false);
    let navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')
    }
    const handleRegister = () => {
        navigate('/register')
    }
    const handleLogout = async () => {
        let rs = await Logout(account.email, account.refresh_token);
        if (rs && rs.EC === 0) {
            //clear data redux
            dispatch(doLogout());
            navigate('/login')
        } else {
            toast.error(rs.EM);
        }
    }
    return (
        <>
            <Navbar bg="light" expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink to="/" className='navbar-brand'>Dra</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link'>{t('header.home')}</NavLink>
                            <NavLink to="/users" className='nav-link'>{t('header.user')}</NavLink>
                            <NavLink to="/admins" className='nav-link'>{t('header.admin')}</NavLink>
                        </Nav>
                        <Nav>
                            {isAuthenticated === false ?
                                <>
                                    <button className='btn-login' onClick={() => handleLogin()}> {t('header.login')} </button>
                                    <button className='btn-signup' onClick={() => handleRegister()}> {t('header.signup')}</button>
                                </>
                                :
                                <NavDropdown title={t('header.settings')} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => setIsShowModalProfile(true)}>{t('header.profile')}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogout()}>
                                        {t('header.logout')}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                            <Languages />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <Profile
                show={isShowModalProfile}
                setShow={setIsShowModalProfile}
            />
        </>
    );
}

export default Header;