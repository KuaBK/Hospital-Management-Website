import axios from "axios"

export const fetchApi = async (searchValue, setLoading, setSearchResult) => {
    setLoading(true);

    await axios.get("http://localhost:3000/employee", {
        params: {
            keyword: searchValue,
        }
    }).then(result => setSearchResult(result.data));

    setLoading(false);
};