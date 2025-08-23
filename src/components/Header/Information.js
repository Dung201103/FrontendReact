
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { UpdateProfile } from '../../services/apiService';
import { useTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { doUpdateUser } from '../../redux/action/userAction';
const Information = (props) => {
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("User");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setEmail(account.email);
            setUsername(account.username);
            setRole(account.role);
            setImage(account.image);
            if (account.image) {
                if (account.image.startsWith("data:image")) {
                    // đã là base64 full
                    setPreviewImage(account.image);
                } else {
                    // từ backend (chỉ có chuỗi base64 raw)
                    setPreviewImage(`data:image/jpeg;base64,${account.image}`);
                }
            }

        }

    }, [account]);
    const handleUploadImage = (event) => {
        if (event.target && event.target.value && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }
    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]); // chỉ lấy phần base64
            reader.onerror = reject;
        });
    const handUpdateUser = async () => {
        let rs = await UpdateProfile(username, image);
        if (rs && rs.EC === 0) {
            toast.success(rs.EM)
            let imgBase64 = image instanceof File ? await fileToBase64(image) : account.image;

            dispatch(doUpdateUser({
                ...account, // giữ nguyên token, email, role...
                username,
                image: imgBase64
            }));
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
                    <div className="col-md-4">
                        <label className="form-label">{t('profile.Information.username')}</label>
                        <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email}
                            disabled
                            onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label"  >{t('profile.Information.role')}</label>
                        <select className="form-select" disabled value={role} >
                            <option value={role}>{role}</option>
                        </select>


                    </div>
                    <div className='col-md-12'>
                        <label className='form-label label-upload' htmlFor='labelUpload'><FcPlus />{t('profile.Information.upl_img')}</label>
                        <input type='file' id='labelUpload' hidden onChange={(event) => handleUploadImage(event)} />
                    </div>
                    <div className='col-md-12 img-preview'>
                        {previewImage ?
                            <img src={previewImage} />
                            :
                            <span>{t('profile.Information.pre_img')}</span>
                        }

                    </div>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => handUpdateUser()}>
                    {t('profile.Information.update_btn')}
                </Button>
            </Modal.Footer>

        </>
    );
}
export default Information;