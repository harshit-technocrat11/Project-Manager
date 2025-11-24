import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

//we pass the children --> children level components and tags
// so Authprovider ==  wrapper
export const AuthProvider = ({ children }) => {
  //first state
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // second state--> JWT token sent by backend.
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  //true - if token not null
  // false if token is null
  const isAuthenticated = !!token;

  const login = (userData, jwtToken) => {
    //store in the state
    setUser(userData);
    setToken(jwtToken);

    //storing it
    console.log("user - ", userData);
    console.log("token-", jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    console.log("bye");

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    //it provides the value - funcs globally to the children
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// authContext hook ---

export const useAuth = () => useContext(AuthContext);

// instead of writing --> const {token  , isAuthenticated} = useContext(AuthContext)  everytime -- we can simply write

// const {token } = useAuth ()
