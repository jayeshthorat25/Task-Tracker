import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import api from "../api/api";
import { Circle, TrendingUp, Zap } from "lucide-react";
import StatCard from "./StatCard";
import { AuthContext } from "../context/AuthContext";

function Layout() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  const fetchTasks = useCallback(
    async (url) => {
      setLoading(true);
      setError(null);
      try {
        // console.log("User role in Layout:", user.role);
        let response;
        if (!url && user.role === "admin") {
          url = "admin/all_tasks";
        } else if (!url && user.role === "user") {
          url = "users/tasks";
        }
        response = await api.get(url);
        setTasks(response.data);
        // console.log("Tasks fetched:", response.data);
      } catch (err) {
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  useEffect(() => {
    fetchTasks();
    // console.log(user)
  }, []);
  // console.log("Tasks fetched in Layout:", tasks);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const remaining = total - completed;
    const completionPercentage =
      total > 0 ? Math.round((completed / total) * 100) : 0;
    const overdue = tasks.filter((task) => {
      // console.log("Checking task for overdue:", task);
      const dueDate = new Date(task.due_date);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      // console.log(dueDate, now);
      return task.status !== "completed" && dueDate < now;
    }).length;
    return { total, completed, remaining, completionPercentage, overdue };
  }, [tasks]);

  if (!user) {
    // console.log("No user data available in Layout.");
    return <div>Loading...</div>;
  }

  return (
    <div className="main-h-screen bg-gray-50">
      <Navbar user={user} />
      <Sidebar user={user} tasks={tasks} />

      <div className="ml-0 xl:ml-64 lg:ml-64 md:ml-16 pt-16 p-3 sm:p-4 md:p-4 transition-all duration-300">
        {/* <div className="grid grid-cols-l xl:grid-cols-3 gap-4 sm:gap-6"> */}
          <div className="xl:col-span-2 space-y-3 sm:space-y-4">
            <Outlet context={{ tasks, refreshTasks: fetchTasks }} />
          </div>

          {/* Task Statistics */}
          
        {/* </div> */}
      </div>
    </div>
  );
}

export default Layout;
