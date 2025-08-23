import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation, Trans } from 'react-i18next';

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const { t } = useTranslation();
    useEffect(() => {
        fetchListQuiz();
        fetchUser();
    }, [])
    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    const fetchUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let User = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}   ${item.username}  -  ${item.email}`
                }
            })
            setListUser(User)
        }
    }
    const handleAssign = async () => {
        let rs = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (rs && rs.EC === 0) {
            toast.success(rs.EM);

        } else {
            toast.error(rs.EM)
        }
    }
    return (

        <div className="assign-quiz-container row">
            <div className="col-6 form-group ">
                <label className="mb-2">{t('quiz.assign-quiz.select-quiz')}:</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className="col-6 form-group ">
                <label className="mb-2">{t('quiz.assign-quiz.select-user')}:</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button onClick={() => handleAssign()} className='btn btn-warning mt-3'>{t('quiz.assign-quiz.assign')}</button>
            </div>
        </div>
    )
}
export default AssignQuiz;