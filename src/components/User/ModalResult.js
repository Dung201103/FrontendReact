
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { ToastContainer, toast, Bounce } from 'react-toastify';

import _ from 'lodash';
import { useTranslation } from 'react-i18next';
const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => setShow(true);



    console.log("check result:", dataModalResult)
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow} >
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('user.ModalResult.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{t('user.ModalResult.sum_qs')}: <b>{dataModalResult.countTotal}</b></div>
                    <div>{t('user.ModalResult.sum_as')}: <b>{dataModalResult.countCorrect}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose();
                        props.handleShowAnswer();
                    }}>
                        {t('user.ModalResult.result')}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {t('user.ModalResult.cl')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalResult;