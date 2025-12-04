import { Route, Routes, useNavigate, Outlet } from "react-router-dom";

import { useState, useEffect, useContext } from "react";
import api from "./api/api";

import Layout from "./components/DashboardLayout";
import Dashboard from "./pages/user/CurrentUserTasks.jsx";
import RemainingPage from "./pages/user/RemainingPage.jsx";
import CompletedPage from "./pages/user/CompletedPage.jsx";
import AllTasks from "./pages/admin/AllTasks.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignupPage from "./pages/auth/SignupPage.jsx";
import AllUsers from "./pages/admin/AllUsers.jsx";
import UserTasks from "./pages/admin/UserTasks.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import PublicRoutes from "./routes/PublicRoutes.jsx";



function App() {
  const navigate = useNavigate();
  const { user, removeAuthToken } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Protected Routes */}
      {/* User Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout user={user} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/remaining" element={<RemainingPage />} />
          <Route path="/complete" element={<CompletedPage />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout user={user} />}>
          <Route path="/admin/tasks" element={<AllTasks />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/users/:userId/tasks" element={<UserTasks />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<h1 className="text-center mt-20 text-3xl">404 Not Found</h1>}
      />
    </Routes>
  );
}

export default App;
