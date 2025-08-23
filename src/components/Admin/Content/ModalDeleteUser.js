import "./ManageUser.scss";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { deleleUser } from '../../../services/apiService';
import { useTranslation, Trans } from 'react-i18next';
import _ from 'lodash';
const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;
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
    const [Role, setRole] = useState("");
    const [Image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataDelete)) {
            setEmail(dataDelete.email);
            setPassword(dataDelete.password);
            setUsername(dataDelete.username);
            setRole(dataDelete.role);
            setImage("");
            if (dataDelete.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataDelete.image}`);
            }

        }

    }, [dataDelete]);
    const handleUploadImage = (event) => {
        if (event.target && event.target.value && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }

    const handSubmitDeleteUser = async () => {



        let data = await deleleUser(dataDelete.id);
        console.log(">>> componet", data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()

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
                    <Modal.Title>{t('admin.ModalDeleteUser.delete')}</Modal.Title>
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
                            <label className="form-label">{t('admin.ModalDeleteUser.name')}</label>
                            <input type="text" className="form-control" value={Username} disabled onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">{t('admin.ModalDeleteUser.role')}</label>
                            <select className="form-select" disabled onChange={(event) => setRole(event.target.value)} value={Role}>
                                <option value={Role}>{Role}</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' disabled htmlFor='labelUpload'><FcPlus />{t('admin.ModalDeleteUser.upl_img')}</label>
                            <input type='file' id='labelUpload' disabled hidden onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>{t('admin.ModalDeleteUser.pre_img')}</span>
                            }

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('admin.ModalDeleteUser.btn.cl')}
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitDeleteUser()}>
                        {t('admin.ModalDeleteUser.btn.delete')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteUser;
