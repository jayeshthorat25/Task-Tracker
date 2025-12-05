import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserRoute = () => {
  const { user } = useContext(AuthContext);

  return user?.role === "user" ? <Outlet /> : <Navigate to="/admin/tasks" replace />;
};

export default UserRoute;
