import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { useTranslation, Trans } from 'react-i18next';
const TableUserPaginate = (props) => {

    const { ListUsers, pageCount } = props;
    const { t } = useTranslation();
    const handlePageClick = (event) => {
        props.fetchListUsersWithPaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1);

    };
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">{t('admin.TableUserPaginate.no')}</th>
                        <th scope="col">{t('admin.TableUserPaginate.name')}</th>
                        <th scope="col">Email</th>
                        <th scope="col">{t('admin.TableUserPaginate.role')}</th>
                        <th scope="col">{t('admin.TableUserPaginate.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {ListUsers && ListUsers.length > 0 &&
                        ListUsers.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>

                                        <button className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(item)}
                                        >{t('admin.TableUserPaginate.btn.upd')}</button>
                                        <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(item)}>{t('admin.TableUserPaginate.btn.delete')}</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    {ListUsers && ListUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>{t('admin.TableUserPaginate.notfound')}</td>
                        </tr>
                    }

                </tbody>
            </table>
            <div className="user-pagination">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>

        </>
    )
}
export default TableUserPaginate;