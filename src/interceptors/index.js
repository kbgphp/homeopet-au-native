import axios from 'axios';
import { TOAST } from "../utils";
import { CONFIG } from "../config"



// Add a request interceptor
axios.interceptors.request.use(
    config => {
        config.headers['X-API-Key'] = CONFIG?.X_API_KEY;
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// Add a response interceptor
axios.interceptors.response.use(
    res => res,
    error => {
        console.log('error: ', error);
        TOAST.show('error', error?.response?.data?.msg);
        if (error?.response?.data?.msg) {
            TOAST.show('error', error?.response?.data?.msg);
        } else if (error?.code === 'ERR_NETWORK') {
            TOAST.show('error', error?.message);
        }

        if (error.response.status === 401) {
            return Promise.reject(error)
        }
        //   can add multiple error code 
        return Promise.reject(error)
    }

)






export { axios };