
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';
import { useTranslation, Trans } from 'react-i18next';
import "./ManageUser.scss";
const ModalCreateUser = (props) => {
    const { show, setShow } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false)
    };
    const UpdateSuccess = () => {
        setShow(false)
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("");
        setImage("");
        setPreviewImage("");

    }
    const handleShow = () => setShow(true);

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Username, setUsername] = useState("");
    const [Role, setRole] = useState("User");
    const [Image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const handleUploadImage = (event) => {
        if (event.target && event.target.value && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }
    const validateEmail = (Email) => {
        return String(Email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handSubmitCreateUser = async () => {
        const isValidEmail = validateEmail(Email);
        if (!isValidEmail) {
            toast.info(`Invalid Email`)
            return;
        }
        if (!Password) {
            toast.info(`Invalid Password`)
            return;
        }

        let data = await postCreateNewUser(Email, Password, Username, Role, Image);

        if (data && data.EC === 0) {
            toast.success(data.EM)
            UpdateSuccess();
            props.setCurrentPage(1);
            await props.fetchListUsersWithPaginate(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow} >
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size="xl" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('admin.ModalCreateUser.add_us')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={Email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('admin.ModalCreateUser.pass')}</label>
                            <input type="password" className="form-control" value={Password} onChange={(event) => setPassword(event.target.value)} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">{t('admin.ModalCreateUser.name')}</label>
                            <input type="text" className="form-control" value={Username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">{t('admin.ModalCreateUser.role')}</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)} value={Role}>
                                <option selected value="USER">USER</option>
                                <option selected value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'><FcPlus />{t('admin.ModalCreateUser.upl_img')}</label>
                            <input type='file' id='labelUpload' hidden onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>{t('admin.ModalCreateUser.pre_img')}</span>
                            }

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('admin.ModalCreateUser.btn.cl')}
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitCreateUser()}>
                        {t('admin.ModalCreateUser.btn.save')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateUser;
