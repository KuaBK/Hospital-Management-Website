import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { FiPlus } from "react-icons/fi";

import Search from "./search";
import InputForm from "./inputForm";
import UpdateForm from "./updateForm"
import DeleteForm from "./deleteForm";
import { fetchApi } from "./fetchApi";

import moment from "moment";
moment().format();

function ListMedicine() {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputChange, setInputChange] = useState(false);

    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [ID, setID] = useState("");

    useEffect(
        () => {
            fetchApi(searchValue, setLoading, setSearchResult);
        }, [inputChange]
    );

    const handleUpdate = (id) => {
        setID(id);
        setShowUpdate(true);
    }

    const handleDelete = (id) => {
        setID(id);
        setShowDelete(true);
    }

    const handleCreate = () => {
        setShowAdd(true);
    }

    return (
        <>
            <div className="p-5" style={{width: "80%"}}>
                <h3 className="mx-4 mt-2 mb-4">Thuốc</h3>
                <div className="card border border-0">
                    <div className="d-flex flex-row justify-content-between align-items-center mb-3 border-bottom p-3">
                        <h5 className="mx-2 mb-0">Danh sách thuốc</h5>
                        <button 
                            className="d-flex flex-row justify-content-between p-2 me-3 border border-0 rounded-3" 
                            style={{backgroundColor: "#3497F9", color: "white"}}
                            onClick={handleCreate}
                        >
                            <FiPlus size={24}></FiPlus>
                            <p className="mb-0 ms-1">Thêm thuốc mới</p>
                        </button>
                    </div>
                    <Search
                        inputRef={inputRef}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        inputChange={inputChange}
                        setInputChange={setInputChange}
                    ></Search>
                    <div className="px-3" style={{maxHeight: "390px", overflowY: "scroll"}}>
                        <table className="table align-middle">
                            <thead style={{position: "sticky", top: "0px"}}>
                                <tr>
                                    <th scope="col">Tên thuốc</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Hạn sử dụng</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResult.map((medicine) => {
                                    let counter = 0;
                                    const dataArray = medicine.data;
                                    return (
                                        dataArray.map((data) => {
                                            if (counter == 0) {
                                                counter++;
                                                return (
                                                    <tr className="align-middle" key={data.expire}>
                                                        <td rowSpan={dataArray.length}>{medicine.name}</td>
                                                        <td>{data.quantity}</td>
                                                        <td>{moment(data.expire).format("DD-MM-YYYY")}</td>
                                                        <td rowSpan={dataArray.length}>
                                                            <button className="border border-0 rounded-2 p-2 me-2" style={{backgroundColor: "#3497F9", color: "white"}} onClick={() => handleUpdate(medicine._id)}>
                                                                Thêm số lượng
                                                            </button>
                                                            <button className="border border-0 rounded-2 p-2 me-2" style={{background: "#FF6558", color: "white"}} onClick={() => handleDelete(medicine._id)}>
                                                                Xóa
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            } else {
                                                return (
                                                    <tr key={data.expire}>
                                                        <td>{data.quantity}</td>
                                                        <td>{moment(data.expire).format("DD-MM-YYYY")}</td>
                                                    </tr>
                                                )
                                            }
                                        })
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
            <UpdateForm
                showUpdate={showUpdate}
                setShowUpdate={setShowUpdate}
                ID={ID}
                setID={setID}
                searchValue={searchValue}
                setLoading={setLoading}
                setSearchResult={setSearchResult}
            ></UpdateForm>
            <DeleteForm
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                searchValue={searchValue}
                setLoading={setLoading}
                setSearchResult={setSearchResult}
                ID={ID}
                setID={setID}
            ></DeleteForm>
        </>
    )
}

export default ListMedicine;