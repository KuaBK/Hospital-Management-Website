import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { FiPlus } from "react-icons/fi";

import Search from "./search";
import InputForm from "./inputForm";
import DeleteForm from "./deleteForm";
import { fetchApi } from "./fetchApi";

function ListDevice() {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputChange, setInputChange] = useState(false);

    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [ID, setID] = useState("");

    useEffect(
        () => {
            fetchApi(searchValue, setLoading, setSearchResult);
        }, [inputChange]
    );

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
                        <h5 className="mx-2 mb-0">Danh sách thiết bị</h5>
                        <button 
                            className="d-flex flex-row justify-content-between p-2 me-3 border border-0 rounded-3" 
                            style={{backgroundColor: "#3497F9", color: "white"}}
                            onClick={handleCreate}
                        >
                            <FiPlus size={24}></FiPlus>
                            <p className="mb-0 ms-1">Thêm thiết bị mới</p>
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
                                    <th scope="col">Tên thiết bị</th>
                                    <th scope="col">Tình trạng</th>
                                    <th scope="col">Sẵn có</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResult.map((device) => {
                                    return (
                                        <tr key={device._id}>
                                            <td scope="col">{device.name}</td>
                                            <td scope="col">{device.status}</td>
                                            <td scope="col">{device.availability}</td>
                                            <td>
                                                <Link to={device._id}>
                                                    <button className="border border-0 rounded-2 p-2 me-2" style={{backgroundColor: "#3497F9", color: "white"}}>
                                                        Thông tin
                                                    </button>
                                                </Link>
                                                <button className="border border-0 rounded-2 p-2 me-2" style={{background: "#FF6558", color: "white"}} onClick={() => handleDelete(device._id)}>
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
                ID={ID}
                setID={setID}
            ></DeleteForm>
        </>
    )
}

export default ListDevice;