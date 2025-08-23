import axios from "../utils/axiosCustomize";

const postCreateNewUser = (Email, Password, Username, Role, Image) => {
    const data = new FormData();
    data.append('email', Email);
    data.append('password', Password);
    data.append('username', Username);
    data.append('role', Role);
    data.append('userImage', Image);
    return axios.post('api/v1/participant', data);
}
const getAllUsers = () => {
    return axios.get(`api/v1/participant/all`);
}
const putUpdateNewUser = (Id, Username, Role, Image) => {
    const data = new FormData();
    data.append('id', Id);
    data.append('username', Username);
    data.append('role', Role);
    data.append('userImage', Image);
    return axios.put('api/v1/participant', data);
}
const deleleUser = (userID) => {
    return axios.delete(`api/v1/participant`, { data: { id: userID } });
}
const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);

}
const postLogin = (Email, Password) => {
    return axios.post(`api/v1/login`, { email: Email, password: Password });
}
const postRegister = (Email, Password, Username) => {
    return axios.post(`api/v1/register`, { email: Email, password: Password, username: Username });
}
const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}
const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}
const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data });
}
const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data);
}
const getAllQuizForAdmin = () => {
    return axios.get(`api/v1/quiz/all`);
}

const putUpdateQuizForAdmin = (id, description, name, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
}
const deleteQuizForAdmin = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
}
const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
}
const postCreateNewAnswerForQuestion = (description, correct_answer, questionid) => {

    return axios.post('api/v1/answer', {
        description, correct_answer, questionid
    });
}
const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}
const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}
const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
}
const Logout = (email, refresh_token) => {
    return axios.post(`api/v1/logout`, { email, refresh_token });
}
const getOverview = () => {
    return axios.get(`api/v1/overview`);
}
const ChangeUserPassword = (current_password, new_password) => {
    return axios.post(`api/v1/change-password`, { current_password, new_password });
}
const UpdateProfile = (username, userImage) => {
    const data = new FormData();
    data.append("username", username);
    if (userImage) data.append("userImage", userImage);
    return axios.post(`api/v1/profile`, data);
};
const HistoryQuiz = () => {
    return axios.get(`api/v1/history`);
}
export {
    postCreateNewUser, getAllUsers, putUpdateNewUser, deleleUser, getUserWithPaginate, postLogin, postRegister,
    getQuizByUser, getDataQuiz, postSubmitQuiz, postCreateNewQuiz, getAllQuizForAdmin, putUpdateQuizForAdmin, deleteQuizForAdmin,
    postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion, postAssignQuiz, getQuizWithQA, postUpsertQA, Logout, getOverview,
    ChangeUserPassword, UpdateProfile, HistoryQuiz
}