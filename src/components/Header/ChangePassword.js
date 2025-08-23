
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { ChangeUserPassword } from '../../services/apiService';
import { useTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

const ChangePassWord = (props) => {
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [currentpassword, setCurrentPassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [password, setPassword] = useState("");



    const handleChangePassword = async () => {
        let rs = await ChangeUserPassword(currentpassword, newpassword);
        if (rs && rs.EC === 0) {
            toast.success(rs.EM)

        } else {
            toast.error(rs.EM);
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow} >
                Launch demo modal
            </Button> */}


            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">{t('profile.ChangePassWord.current_pass')}</label>
                        <input type="password" className="form-control" value={currentpassword} onChange={(event) => setCurrentPassword(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('profile.ChangePassWord.new_pass')}</label>
                        <input type="password" className="form-control" value={newpassword}
                            onChange={(event) => setNewpassword(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('profile.ChangePassWord.cf_pass')}</label>
                        <input type="password" className="form-control" value={password}
                            onChange={(event) => setPassword(event.target.value)} />
                    </div>


                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => handleChangePassword()}>
                    {t('profile.ChangePassWord.update_btn')}
                </Button>
            </Modal.Footer>

        </>
    );
}
export default ChangePassWord;