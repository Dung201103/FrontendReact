import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useTranslation, Trans } from 'react-i18next';
import Information from './Information';
import ChangePassWord from './ChangePassword';
import History from './History';
import "./Profile.scss"
const Profile = (props) => {
    const { show, setShow } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false)
    };
    return (

        <Modal show={show} onHide={handleClose} size="xl" className='modal-profile'>
            <Modal.Header closeButton>
                <Modal.Title>{t('profile.title.main')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    defaultActiveKey="infor"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="infor" title={t('profile.title.infor')}>
                        <Information />
                    </Tab>
                    <Tab eventKey="password" title={t('profile.title.password')}>
                        <ChangePassWord />
                    </Tab>
                    <Tab eventKey="history" title={t('profile.title.history')} >
                        <History />
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
}

export default Profile;