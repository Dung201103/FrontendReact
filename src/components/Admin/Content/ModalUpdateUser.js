import "./ManageUser.scss";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { putUpdateNewUser } from '../../../services/apiService';
import { useTranslation, Trans } from 'react-i18next';
import _ from 'lodash';
const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false)
        props.resetUpdateData()
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
    const [Role, setRole] = useState("");
    const [Image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setPassword(dataUpdate.password);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }

        }

    }, [dataUpdate]);
    const handleUploadImage = (event) => {
        if (event.target && event.target.value && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }

    const handSubmitCreateUser = async () => {



        let data = await putUpdateNewUser(dataUpdate.id, Username, Role, Image);
        console.log(">>> componet", data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            UpdateSuccess();

            await props.fetchListUsersWithPaginate(props.currentPage);

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
                    <Modal.Title>{t('admin.ModalUpdateUser.upd_us')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={Email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('admin.ModalUpdateUser.pass')}</label>
                            <input type="password" className="form-control" value={Password}
                                disabled
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">{t('admin.ModalUpdateUser.name')}</label>
                            <input type="text" className="form-control" value={Username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">{t('admin.ModalUpdateUser.role')}</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)} value={Role}>
                                <option selected value="USER">USER</option>
                                <option selected value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'><FcPlus />{t('admin.ModalUpdateUser.upl_img')}</label>
                            <input type='file' id='labelUpload' hidden onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>{t('admin.ModalUpdateUser.pre_img')}</span>
                            }

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('admin.ModalUpdateUser.btn.cl')}
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitCreateUser()}>
                        {t('admin.ModalUpdateUser.btn.save')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateUser;
