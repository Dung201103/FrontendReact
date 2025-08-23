import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import TableUser from "./TableUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import ModalDeleteUser1 from "./ModalDeleteUser1";
import { useTranslation, Trans } from 'react-i18next';
const ManageUser = (props) => {
    const LIMIT_USER = 2;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [ListUsers, setListUsers] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        fetchListUsersWithPaginate(1);
    }, []);
    const fetchListUsers = async () => {
        let res = await getAllUsers()
        console.log(">>> componet test all", res)
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)

        }
    }
    const handleClickBtnUpdate = (user) => {

        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const handleClickBtnDelete = (user) => {

        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                {t('admin.manage-user.title')}
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}><FcPlus />{t('admin.manage-user.add')}</button>

                </div>
                <div className="table-users-container">
                    {/* <TableUser ListUsers={ListUsers} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete} /> */}
                    <TableUserPaginate
                        ListUsers={ListUsers} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete}
                        pageCount={pageCount} fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        currentPage={currentPage} setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    resetUpdateData={resetUpdateData}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                />
                {/* <ModalDeleteUser1
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                /> */}
            </div>
        </div>
    )
}
export default ManageUser;