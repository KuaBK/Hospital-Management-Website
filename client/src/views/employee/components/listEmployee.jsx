import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { FiPlus } from "react-icons/fi";

import Search from "./search";
import InputForm from "./inputForm";
import DeleteForm from "./deleteForm";
import { fetchApi } from "./fetchApi";

function ListEmployee() {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputChange, setInputChange] = useState(false);

    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteID, setDeleteID] = useState("");

    useEffect(
        () => {
            fetchApi(searchValue, setLoading, setSearchResult);
        }, [inputChange]
    );

    const handleDelete = (id) => {
        setDeleteID(id);
        setShowDelete(true);
    }

    const handleCreate = () => {
        setShowAdd(true);
    }

    return (
        <>
            <div className="p-5" style={{width: "80%"}}>
                <h3 className="mx-4 mt-2 mb-4">Nhân viên</h3>
                <div className="card border border-0">
                    <div className="d-flex flex-row justify-content-between align-items-center mb-3 border-bottom p-3">
                        <h5 className="mx-2 mb-0">Danh sách nhân viên</h5>
                        <button 
                            className="d-flex flex-row justify-content-between p-2 me-3 border border-0 rounded-3" 
                            style={{backgroundColor: "#3497F9", color: "white"}}
                            onClick={handleCreate}
                        >
                            <FiPlus size={24}></FiPlus>
                            <p className="mb-0 ms-1">Thêm nhân viên</p>
                        </button>
                    </div>
                    <Search
                        inputRef={inputRef}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        inputChange={inputChange}
                        setInputChange={setInputChange}
                    ></Search>
                    <div className="px-3">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">Họ tên</th>
                                    <th scope="col">Tuổi</th>
                                    <th scope="col">Giới tính</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Chức vụ</th>
                                    <th scope="col">Chuyên môn</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResult.map((employee) => {
                                    const id = employee._id;
                                    return (
                                        <tr key={employee._id}>
                                            <td>{employee.name}</td>
                                            <td>{employee.age}</td>
                                            <td>{employee.gender}</td>
                                            <td>{employee.address}</td>
                                            <td>{employee.phone_number}</td>
                                            <td>{employee.position}</td>
                                            <td>{employee.specialization}</td>
                                            <td>
                                                <Link to={employee._id}>
                                                    <button className="border border-0 rounded-2 p-2 me-2" style={{backgroundColor: "#3497F9", color: "white"}}>
                                                        Thông tin
                                                    </button>
                                                </Link>
                                                <button className="border border-0 rounded-2 p-2 me-2" style={{background: "#FF6558", color: "white"}} onClick={() => handleDelete(employee._id)}>
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <InputForm
                showAdd={showAdd}
                setShowAdd={setShowAdd}
                searchValue={searchValue}
                setLoading={setLoading}
                setSearchResult={setSearchResult}
            ></InputForm>
            <DeleteForm
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                searchValue={searchValue}
                setLoading={setLoading}
                setSearchResult={setSearchResult}
                deleteID={deleteID}
                setDeleteID={setDeleteID}
            ></DeleteForm>
        </>
    )
}

export default ListEmployee;