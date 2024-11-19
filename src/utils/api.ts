import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import config from '../assets/config/baseURL.json'



const api : AxiosInstance = axios.create({
    baseURL: config.baseURL,
    timeout: 1000,
});

// Request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
       return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (respose: AxiosResponse) => {
        return respose;
    },
    (error) => {
        if (error.response ?.status === 401) {
            console.log("Unauthorized!  Redirecting to login page")
        }
        return Promise.reject(error);
    });

export default api;