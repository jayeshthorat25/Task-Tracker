import React, { createContext, useEffect, useState } from "react";
import api from "../api/api";
import { set } from "date-fns";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    // console.log("AuthProvider mounted. Stored accessToken:", storedAccessToken);
    // console.log("AuthProvider mounted. Stored user:", storedUser);
    

    if (storedUser &&  storedAccessToken) {
      setAccessToken(storedAccessToken);
      setUser(JSON.parse(storedUser));
    }

    if (!storedUser || !storedAccessToken) {
      setAccessToken(null);
      setUser(null);
    }

    setLoading(false);
  }, []);

  const setAuthToken = (accessToken, user) => {
    setAccessToken(accessToken);
    setUser(user);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeAuthToken = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, loading, setAuthToken, removeAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
