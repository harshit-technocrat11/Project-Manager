import axios from "axios"

//  withCredentials: false, - no cookies allowed
export const api = axios.create({
    baseURL: "/api",
    withCredentials: true, 
})

// jwt from localstorage
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");

    if (token && token.length > 0) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

