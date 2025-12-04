import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PublicRoutes() {
  // const user = JSON.parse(localStorage.getItem("user"));

  const { accessToken, loading ,user} = useContext(AuthContext);

  if(loading){
    return <h1>Loading...</h1>
  }

  if (user && user.role === "user") {
    return <Navigate to="/" replace />;
  }

  if (user && user.role === "admin") {
    return <Navigate to="/admin/tasks" replace />;
  }

  // If no user logged in → allow access to public routes (login/register pages)
  return <Outlet />;
}

export default PublicRoutes;
