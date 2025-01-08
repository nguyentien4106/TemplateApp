import { COOKIE_REFRESH_TOKEN_KEY, COOKIE_TOKEN_KEY } from '@/constants/cookie';
import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie'

const getAPIUrl = async () => {
    const url = import.meta.env.VITE_API_URL

    return url ?? 'https://localhost/'; 
}

const apiConfig: AxiosRequestConfig = {
    baseURL: await getAPIUrl(),
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    responseType: 'json',
}

const apiClient = axios.create(apiConfig);

apiClient.interceptors.request.use(
    function (config) {
        config.headers['X-Refresh-Token'] = Cookies.get(COOKIE_REFRESH_TOKEN_KEY);
        config.headers['X-Token'] = Cookies.get(COOKIE_TOKEN_KEY);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// apiClient.interceptors.response.use(
//     function (response) {
//         return response
//     },
//     function (error: AxiosError) {
//         const status = error.response ? error.response.status : null;
//         const originalRequest = error.config;
//         console.log(status)
//         console.log(originalRequest)
//     }
// )

export default apiClient;