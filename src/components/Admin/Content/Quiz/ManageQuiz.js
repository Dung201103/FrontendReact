import "./ManageQuiz.scss";
import Select from "react-select";
import { useState } from "react";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import TableQuiz from "./TableQuiz";
import { Accordion } from "react-bootstrap";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";
import { useTranslation, Trans } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useRef } from "react";


const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];
const ManageQuiz = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null)
    const [reloadQuiz, setReloadQuiz] = useState(false);
    const fileInputRef = useRef(null);
    const { t } = useTranslation();
    const handleChangeFile = (event) => {
        if (event.target && event.target.value && event.target.files[0]) {

            setImage(event.target.files[0])
        }
    }
    const handleSubmitQuiz = async () => {
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (!name) {
            toast.error('Name is required!')
            return;
        }
        if (!description) {
            toast.error('Description is required!')
            return;
        }
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage(null)
            // trigger reload for QuizQA
            setReloadQuiz(!reloadQuiz)


            // clear file input UI
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
        else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="quiz-container">
            <Tabs
                defaultActiveKey="title"
                id="uncontrolled-tab-example"
                className="mb-2"
                justify
            >
                <Tab className="p-3 pt-0" eventKey="title" title={t('quiz.ManageQuiz.title')}>
                    <div className="add-new">



                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">{t('quiz.ManageQuiz.add-q')}:</legend>
                            <div className="form-floating mb-3">
                                <input type="text" class="form-control" placeholder="your quiz name" value={name} onChange={(event) => setName(event.target.value)} />
                                <label >{t('quiz.ManageQuiz.name')}</label>
                            </div>
                            <div className="form-floating">
                                <input type="text"
                                    class="form-control"
                                    placeholder="description"
                                    value={description} onChange={(event) => setDescription(event.target.value)}
                                />
                                <label >{t('quiz.ManageQuiz.d')}</label>
                            </div>

                            <div className="my-3">
                                <Select
                                    value={type}
                                    // onChange={this.handleChange}
                                    defaultValue={type}
                                    onChange={setType}
                                    options={options}
                                    placeholder={t('quiz.ManageQuiz.quiztype')}
                                />
                            </div>
                            <div>
                                <div className="more-actions form-group">
                                    <label className="mb-1">{t('quiz.ManageQuiz.upl_img')}</label>
                                    <input type="file" className="form-control"
                                        onChange={(event) => handleChangeFile(event)}
                                        ref={fileInputRef}
                                    />

                                </div>
                            </div>
                            <div className="mt-3">
                                <button
                                    onClick={() => handleSubmitQuiz()}
                                    className="btn btn-warning">{t('quiz.ManageQuiz.save')}</button>
                            </div>
                        </fieldset>

                    </div>
                    <div className="list-detail">
                        <TableQuiz />
                    </div>
                </Tab>
                <Tab className="p-3 pt-0" eventKey="upd_qa" title={t('quiz.ManageQuiz.upd_qa')}>
                    <QuizQA reload={reloadQuiz} />
                </Tab>
                <Tab className="p-3 pt-0" eventKey="assign" title={t('quiz.ManageQuiz.assign')} >
                    <AssignQuiz />
                </Tab>
            </Tabs>


        </div>

    )
}
export default ManageQuiz;