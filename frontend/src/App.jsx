import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/user/CurrentUserTasks.jsx";
import RemainingPage from "./pages/user/RemainingPage.jsx";
import CompletedPage from "./pages/user/CompletedPage.jsx";
import AllTasks from "./pages/admin/AllTasks.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignupPage from "./pages/auth/SignupPage.jsx";
import AllUsers from "./pages/admin/AllUsers.jsx";
import UserTasks from "./pages/admin/UserTasks.jsx";
import UserDashboard  from "./pages/user/UserDashboard.jsx"
import AdminDashboard  from "./pages/admin/AdminDashboard.jsx"
import HomePage from "./pages/HomePage.jsx"

import { AuthContext } from "./context/AuthContext.jsx";
import PublicRoutes from "./routes/PublicRoutes.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
// import AuthProtected from "./routes/AuthProtected.jsx";
import UserRoute from "./routes/UserRoute.jsx";
import AdminRoute from "./routes/AdminRoutes.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* AUTH REQUIRED */}
      <Route element={<ProtectedRoutes />}>

        {/* USER ROUTES */}
        <Route element={<UserRoute />}>
          <Route element={<Layout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<Dashboard />} />
            <Route path="/user/remaining" element={<RemainingPage />} />
            <Route path="/user/complete" element={<CompletedPage />} />
            <Route path="user/tasks/:id" element={<TaskDetails />} />
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<AdminRoute />}>
          <Route element={<Layout />}>
            <Route path="/admin/dashboard" element={<UserDashboard />} />
            <Route path="/admin/tasks" element={<AllTasks />} />
            <Route path="/admin/users" element={<AllUsers />} />
            <Route path="/admin/users/:userId/tasks" element={<UserTasks />} />
            <Route path="/admin/tasks/:id" element={<TaskDetails />} />
          </Route>
        </Route>

      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
