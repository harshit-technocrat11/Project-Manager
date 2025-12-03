import { createContext, use, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { api } from "@/api/api.js";

export const AuthContext = createContext();

//we pass the children --> children level components and tags
// so Authprovider ==  wrapper
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  //true - if token not null
  // false if token is null
  // const isAuthenticated = !!token;



  const loginUser = async (email, password) => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      console.log("-Frontend (loginUser()) : ", res.data);
      console.log("jwt: ",res.data.jwt)
      console.log("msg: ",res.data.msg)
      console.log("user: ",res.data.user)

      

      localStorage.setItem("token", res.data.jwt);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user))
      
      console.log("user login successful");
      return { success: true, message: res.data.msg, user: res.data.user };

    } catch (err) {
      console.log(
        "Login attempt failed:", err.response?.data?.msg || err.msg);
      return {
        // err.response?.data?.msg ||
        message: err.response?.data?.msg || "invalid credentials",
        success: false,
      };
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
      });

       localStorage.setItem("token", res.data.jwt);
       setUser(res.data.user);
       localStorage.setItem("user", JSON.stringify(res.data.user));
      return { success: true, message: res.data.msg ||" User Registration successful!" };
    } catch (err) {
      console.error(
        "Registration failed:", err.response?.data?.msg || err.msg);
      return {
        success: false,
        message: err.response?.data?.msg ,
      };
    }
  };

  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/user-details");
      setUser(res.data.user);
    } 
    catch (err) {
      localStorage.removeItem("token");
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
     loadUser();
  },[])

  const logoutUser = () => {
    try{

      setUser(null);
      // setToken("");
      
      // localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      document.cookie = "token="
      console.info("user , logged out ");
    }
      catch (err) {
        console.error("Logout error:", err);
    }
  };

  
  const isAuthenticated = !!user;

  return (
    //it provides the value - funcs globally to the children
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginUser,
        logoutUser,
        user,
        registerUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// authContext hook ---

export const useAuth = () => useContext(AuthContext);

// instead of writing --> const {token  , isAuthenticated} = useContext(AuthContext)  everytime -- we can simply write

// const {token } = useAuth ()
