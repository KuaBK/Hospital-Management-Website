function Search({inputRef, searchValue, setSearchValue, inputChange, setInputChange}) {
    const handleClear = () => {
        setSearchValue('');
        setInputChange(true);
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div className="form-group col-4 d-flex flex-row justify-content-start p-3">
            <input 
                className="form-control shadow-none col-8" 
                placeholder="Tìm kiếm"
                style={{borderRadius: "10px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px"}}
                ref={inputRef}
                value={searchValue}
                spellCheck={false}
                onChange={handleChange}
                onKeyDown={() => setInputChange(true)}
                onKeyUp={() => setInputChange(false)}
            >
            </input>
            <button
                className="col-3 border border-0"
                style={{borderRadius: "10px", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", 
                backgroundColor: "#3497F9", 
                color: "white"}}
                onClick={handleClear}
            >Xóa</button>
        </div>
   )
}

export default Search;