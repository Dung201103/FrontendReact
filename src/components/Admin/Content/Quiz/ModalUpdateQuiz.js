
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiService';
import _ from 'lodash';
import "./ActionsQuiz.scss";
import { useTranslation, Trans } from 'react-i18next';
const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false)
        props.resetUpdateData()
    };
    const UpdateSuccess = () => {
        setShow(false)
        setDescription("");
        setName("");
        setDifficulty("");
        setImage("");
        setPreviewImage("");
    }
    const handleShow = () => setShow(true);

    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setDescription(dataUpdate.description);
            setName(dataUpdate.name);
            setDifficulty(dataUpdate.difficulty);
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

    const handSubmitUpdateQuiz = async () => {



        let data = await putUpdateQuizForAdmin(dataUpdate.id, description, name, difficulty, image);
        console.log(">>> componet", data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            UpdateSuccess();
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
                    <Modal.Title>{t('quiz.ModalUpdateQuiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('quiz.ModalUpdateQuiz.des')}</label>
                            <input type="description" className="form-control" value={description}
                                onChange={(event) => setDescription(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('quiz.ModalUpdateQuiz.name')}</label>
                            <input type="description" className="form-control" value={name}
                                onChange={(event) => setName(event.target.value)} />
                        </div>


                        <div className="col-md-4">
                            <label className="form-label">{t('quiz.ModalUpdateQuiz.difficult')}</label>
                            <select className="form-select" onChange={(event) => setDifficulty(event.target.value)} value={difficulty}>
                                <option value="EASY">{t('quiz.ModalUpdateQuiz.diff.es')}</option>
                                <option value="MEDIUM">{t('quiz.ModalUpdateQuiz.diff.med')}</option>
                                <option value="HARD">{t('quiz.ModalUpdateQuiz.diff.hard')}</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'><FcPlus />{t('quiz.ModalUpdateQuiz.upl_img')}</label>
                            <input type='file' id='labelUpload' hidden onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>{t('quiz.ModalUpdateQuiz.pre_img')}</span>
                            }

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('quiz.ModalUpdateQuiz.button.close')}
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitUpdateQuiz()}>
                        {t('quiz.ModalUpdateQuiz.button.save_chang')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateQuiz;