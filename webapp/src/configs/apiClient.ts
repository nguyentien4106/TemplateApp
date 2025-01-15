import accountApis from '@/apis/account';
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
        const accessToken = Cookies.get(COOKIE_TOKEN_KEY);
        if (accessToken && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error: AxiosError) {
        if (error.response && error.response.status === 401) {
            // TODO: Logout and redirect to login page
            const accessToken = Cookies.get(COOKIE_TOKEN_KEY);
            const refreshToken = Cookies.get(COOKIE_REFRESH_TOKEN_KEY);

            if(accessToken && refreshToken) {
                // Refresh token
                const result = await accountApis.refreshToken({ accessToken, refreshToken});
                if(result.succeed){
                    Cookies.set(COOKIE_TOKEN_KEY, result.data.accessToken);
                    Cookies.set(COOKIE_REFRESH_TOKEN_KEY, result.data.refreshToken);

                    if(!error.config){
                        window.location.href = "/sign-in";
                        return Promise.reject(error);
                    }

                    error.config.headers.Authorization = `Bearer ${result.data.accessToken}`;
                    return axios.request(error.config);
                }
                else{
                    // TODO: Logout and redirect to login page
                    Cookies.remove(COOKIE_TOKEN_KEY);
                    Cookies.remove(COOKIE_REFRESH_TOKEN_KEY);
                    window.location.href = "/sign-in";
                }
            }
            else {
                // TODO: Logout and redirect to login page
                Cookies.remove(COOKIE_TOKEN_KEY);
                Cookies.remove(COOKIE_REFRESH_TOKEN_KEY);
                window.location.href = "/sign-in";
            }

            return Promise.reject(error)
        }
    }
)

export default apiClient;