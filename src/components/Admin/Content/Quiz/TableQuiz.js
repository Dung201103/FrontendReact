import { useState, useEffect } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import { Accordion } from "react-bootstrap";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { useTranslation } from "react-i18next";
const TableQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const { t } = useTranslation();
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    useEffect(() => {
        fetchListQuiz();
    }, [])
    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }

    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    const handleClickBtnUpdate = (quiz) => {

        setShowModalUpdateQuiz(true);
        setDataUpdate(quiz);
    }
    const handleClickBtnDelete = (quiz) => {

        setShowModalDeleteQuiz(true);
        setDataDelete(quiz);
    }
    return (
        <>

            <div>{t('quiz.TableQuiz.list_quiz')}:</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">{t('quiz.TableQuiz.id')}</th>
                        <th scope="col">{t('quiz.TableQuiz.name')}</th>
                        <th scope="col">{t('quiz.TableQuiz.des')}</th>
                        <th scope="col">{t('quiz.TableQuiz.type')}</th>
                        <th scope="col">{t('quiz.TableQuiz.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td >{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>@{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button className="btn btn-warning mx-3" onClick={() => handleClickBtnUpdate(item)}>{t('quiz.TableQuiz.btn.edit')}</button>
                                    <button className="btn btn-danger" onClick={() => handleClickBtnDelete(item)}>{t('quiz.TableQuiz.btn.delete')}</button>
                                </td>
                            </tr>
                        )
                    }

                    )}


                </tbody>
            </table>

            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchListQuiz={fetchListQuiz}
                resetUpdateData={resetUpdateData}

            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}

            />

        </>
    )
}
export default TableQuiz;