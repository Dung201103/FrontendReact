import { useState } from 'react';
import './Login.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from "react-icons/im";
import Languages from '../Header/Languages';
import { useTranslation, Trans } from 'react-i18next';
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const distpatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const validateEmail = (Email) => {
        return String(Email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.info(`Invalid Email`)
            return;
        }
        if (!password) {
            toast.info(`Invalid Password`)
            return;
        }
        setIsLoading(true);
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            distpatch(doLogin(data))
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/')

        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }
    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    }
    return (
        <div className='login-container'>
            <div className='header'>
                <span>{t('login.header.text')}</span>
                <button onClick={() => navigate('/register')}>{t('login.header.signup')}</button>
                <Languages />
            </div>
            <div className='title col-4 mx-auto'>
                Dra
            </div>
            <div className='welcome mx-auto'>
                {t('login.hello')}
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type={"email"} className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label>{t('login.pass')}</label>
                    <input type={"password"} className="form-control" value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </div>
                {/* <span className='forgot-password'>Forgot password ?</span> */}
                <div>
                    <button className='btn-submit' onClick={() => handleLogin()} disabled={isLoading}>
                        {isLoading === true && <ImSpinner10 className='loader-icon' />}
                        <span> {t('login.btn.login')}</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}> &#60;&#60; {t('login.btn.home')}</span>
                </div>

            </div>
        </div>
    )
}
export default Login;