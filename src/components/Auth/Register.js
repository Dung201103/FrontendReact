import { useState } from 'react';
import './Register.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiService';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { icons } from 'react-icons';
import Languages from '../Header/Languages';
import { useTranslation, Trans } from 'react-i18next';
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { t } = useTranslation();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const navigate = useNavigate();
    const validateEmail = (Email) => {
        return String(Email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSignUp = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.info(`Invalid Email`)
            return;
        }
        if (!password) {
            toast.info(`Invalid Password`)
            return;
        }
        if (!username) {
            toast.info(`Invalid Username`)
            return;
        }
        let data = await postRegister(email, password, username);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login')

        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <div className='register-container'>
            <div className='header'>
                <span>{t('register.header.text')}</span>
                <button onClick={() => navigate('/login')}>{t('register.header.login')}</button>
                <Languages />
            </div>
            <div className='title col-4 mx-auto'>
                Dra
            </div>
            <div className='welcome mx-auto'>
                {t('register.start')}
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input type={"email"} className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group pass-group'>
                    <label>{t('register.pass')} (*)</label>
                    <input type={isShowPassword ? "text" : "password"}
                        className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                    {isShowPassword ?
                        <span className='icon-eye' onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span>
                        :
                        <span className='icon-eye' onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div >
                <div className='form-group'>
                    <label>{t('register.name')} (*)</label>
                    <input type={"text"} className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <button className='btn-submit' onClick={() => handleSignUp()}>{t('register.btn.signup')}</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}> &#60;&#60; {t('register.btn.home')}</span>
                </div>

            </div>
        </div>
    )
}
export default Register;