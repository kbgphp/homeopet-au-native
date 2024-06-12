import { CONFIG } from "@src/config";
import { axios } from "@src/interceptors";

const handleError = err => {
    return Promise.reject(err?.response?.data);
};


const GET = async (url) => {
    try {
        return await axios.get(`${CONFIG.API_URL}/${url}`).then((response) => response.data);
    } catch (err) {
        return handleError(err);
    }
};

const POST = async (url, body) => {
    try {
        return await axios.post(`${CONFIG.API_URL}/${url}`, body).then((response) => response.data);
    } catch (err) {
        return handleError(err);
    }
};

// only to get data not error handling, error handling is done on interceptor layer
const CUSTOM_POST = async (url, body = {}) => {
    try {
        return await axios.post(`${CONFIG.API_URL}/${url}`, body).then((response) => response.data);
    } catch (err) {
        return Promise.resolve({});
    }
};




// export all methods
export const _REST = {
    GET, POST, CUSTOM_POST
};
