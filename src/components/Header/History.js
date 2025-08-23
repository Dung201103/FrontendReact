import { useState, useEffect } from "react";
import moment from "moment/moment";
import { HistoryQuiz } from "../../services/apiService";
import { useTranslation } from "react-i18next";
const History = (props) => {
    const [listHistory, setListHistory] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        fetchHistory();
    }, [])
    const fetchHistory = async () => {
        let res = await HistoryQuiz();
        if (res && res.EC === 0) {
            let newData = res?.DT?.data?.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item?.quizHistory?.name ?? "",
                    id: item.id,
                    date: moment(item.createdAt).utc().format("DD/MM/YYYY")
                }
            })
            if (newData.length > 7) {
                newData = newData.slice(newData.length - 7, newData.length);
            }
            setListHistory(newData);
        }
    }
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('profile.History.quiz_name')}</th>
                        <th scope="col">{t('profile.History.sum_qs')}</th>
                        <th scope="col">{t('profile.History.sum_correct')}</th>
                        <th scope="col">{t('profile.History.date')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 &&
                        listHistory.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.date}</td>
                                </tr>
                            );
                        })
                    }
                    {listHistory && listHistory.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>{t('profile.History.error')}</td>
                        </tr>
                    }

                </tbody>
            </table>
        </>
    )
}
export default History;