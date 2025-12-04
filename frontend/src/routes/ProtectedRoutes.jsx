import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

// PROTECTED ROUTE WRAPPER
const ProtectedRoutes = () => {
  
  const accessToken = localStorage.getItem("accessToken");
  // const currentUser = JSON.parse(localStorage.getItem("user"));

  const { loading ,user: currentUser } = useContext(AuthContext);

  if(loading){
    console.log("Auth loading state in ProtectedRoutes:", loading);
    return <h1>Loading...</h1>
  }
  // useEffect(() => {
  // if (!accessToken) {
  //   navigate("/login", { replace: true });
  // }
  // }, [accessToken, navigate]);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
      <Outlet />
  );
};

export default ProtectedRoutes;
