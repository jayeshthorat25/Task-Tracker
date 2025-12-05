import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const ProtectedRoutes = () => {

  const { accessToken, loading, user } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;
  if (!accessToken) return <Navigate to="/login" replace />;
  if (!user) return <p>Loading user...</p>;

  return <Outlet />;
};

export default ProtectedRoutes;
