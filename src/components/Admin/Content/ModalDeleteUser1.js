import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleleUser } from '../../../services/apiService';

function ModalDeleteUser1(props) {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmitDeleteUser = async () => {
        let data = await deleleUser(dataDelete.id);
        console.log(">>> componet", data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            await props.fetchListUsers();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comfirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete<b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDeleteUser() }}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser1;