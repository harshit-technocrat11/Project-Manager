import axios from "axios"

//  withCredentials: false, - no cookies allowed
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, 
})

// jwt from localstorage / middleware
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");

    if (token && token.length > 0) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  //autologut --> token expired
  (err)=>{
    if ( err.response && err.response.status === 401){

      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href="/login"
    }
    return Promise.reject(err)
  }
)

