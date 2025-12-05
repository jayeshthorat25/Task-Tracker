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
    return { total, completed, remaining, completionPercentage };
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
        <div className="grid grid-cols-l xl:grid-cols-3 gap-4 sm:gap-6">
          <div className="xl:col-span-2 space-y-3 sm:space-y-4">
            <Outlet context={{ tasks, refreshTasks: fetchTasks }} />
          </div>

          {/* Task Statistics */}
          <div className="xl:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-purple-100">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                Task Statistics
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <StatCard
                  title="Total Tasks"
                  value={stats.total}
                  icon={
                    <Circle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                  }
                />
                <StatCard
                  title="Completed Tasks"
                  value={stats.completed}
                  icon={
                    <Circle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                  }
                />
                <StatCard
                  title="Remaining Tasks"
                  value={stats.remaining}
                  icon={
                    <Circle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fuchsia-500" />
                  }
                />
                <StatCard
                  title="Completion Percentage"
                  value={`${stats.completionPercentage}%`}
                  icon={
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
