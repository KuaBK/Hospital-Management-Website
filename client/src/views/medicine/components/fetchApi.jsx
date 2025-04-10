import axios from "axios"

export const fetchApi = async (searchValue, setLoading, setSearchResult) => {
    setLoading(true);

    await axios.get("https://hospital-management-website-gude.onrender.com/medicine", {
        params: {
            keyword: searchValue,
        }
    }).then(result => setSearchResult(result.data));

    setLoading(false);
};