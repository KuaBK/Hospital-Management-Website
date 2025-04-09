import axios from "axios"

export const fetchApi = async (searchValue, setLoading, setSearchResult) => {
    setLoading(true);

    await axios.get("https://hospital-management-website-v6hl.onrender.com/device", {
        params: {
            keyword: searchValue,
        }
    }).then(result => setSearchResult(result.data));

    setLoading(false);
};