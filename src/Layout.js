import App from './App';

import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Questions/Questions';
import PrivateRoute from './components/routes/privateRoutes';
import React, { Suspense } from 'react';
const NotFound = () => {
    return (
        <div className=' container mt-3 alert alert-danger'>
            404.NotFound data with you current URL
        </div>
    )
}

const Layout = (props) => {
    return (
        < Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<HomePage />} />

                    <Route path="users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />

                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admins" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                } >
                    <Route index element={<DashBoard />} />
                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </Suspense>
    )
}
export default Layout;