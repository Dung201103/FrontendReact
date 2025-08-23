
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { deleteQuizForAdmin } from '../../../../services/apiService';
import _ from 'lodash';
import "./ActionsQuiz.scss";
import { useTranslation, Trans } from 'react-i18next';
const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => setShow(true);
    const { t } = useTranslation();
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataDelete)) {
            setDescription(dataDelete.description);
            setName(dataDelete.name);
            setDifficulty(dataDelete.difficulty);
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



        let data = await deleteQuizForAdmin(dataDelete.id);
        console.log(">>> componet", data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            await props.fetchListQuiz();

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

            <Modal show={show} onHide={handleClose} size="xl" className='modal-add-quiz'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('quiz.ModalDeleteQuiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('quiz.ModalDeleteQuiz.des')}</label>
                            <input type="description" className="form-control" value={description}
                                disabled
                                onChange={(event) => setDescription(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('quiz.ModalDeleteQuiz.name')}</label>
                            <input type="description" className="form-control" value={name}
                                disabled
                                onChange={(event) => setName(event.target.value)} />
                        </div>


                        <div className="col-md-4">
                            <label className="form-label">{t('quiz.ModalDeleteQuiz.difficult')}</label>
                            <select className="form-select" disabled onChange={(event) => setDifficulty(event.target.value)} value={difficulty}>
                                <option value="EASY">{t('quiz.ModalDeleteQuiz.diff.es')}</option>
                                <option value="MEDIUM">{t('quiz.ModalDeleteQuiz.diff.med')}</option>
                                <option value="HARD">{t('quiz.ModalDeleteQuiz.diff.hard')}</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' disabled htmlFor='labelUpload'><FcPlus />{t('quiz.ModalDeleteQuiz.upl_img')}</label>
                            <input type='file' id='labelUpload' hidden disabled onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>{t('quiz.ModalDeleteQuiz.pre_img')}</span>
                            }

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('quiz.ModalDeleteQuiz.button.close')}
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitDeleteUser()}>
                        {t('quiz.ModalDeleteQuiz.button.delete')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteQuiz;