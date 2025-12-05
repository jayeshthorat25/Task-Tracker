import React, { createContext, useEffect, useState } from "react";
import api from "../api/api";
import { getAccessToken} from "../services/authService";
import { set } from "date-fns";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAccessToken = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      console.log("Token refreshed:", token);
      setAuthToken(token);
    } catch (error) {
      console.error("Error refreshing token:", error);
      removeAuthToken();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    } else {
      refreshAccessToken();
    }
    setLoading(false);
  }, []);
  
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await api.get("/auth/me");
      const user = response.data;
      console.log("Fetched user after token refresh:", user);
      setUser(user);
      // Store updated values
      // localStorage.setItem("user", JSON.stringify(user));
    }catch (error) {
      console.error("Error fetching user:", error);
      removeAuthToken();
      toast.error("Session expired. Please log in again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && !user) {
      getUser();
    }
  }, [accessToken, user]);

  const setAuthToken = (accessToken) => {
    setLoading(true);
    setAccessToken(accessToken);
    getUser();
    localStorage.setItem("accessToken", accessToken);
    setLoading(false);
  };

  const removeAuthToken = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, loading, setAuthToken, removeAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
