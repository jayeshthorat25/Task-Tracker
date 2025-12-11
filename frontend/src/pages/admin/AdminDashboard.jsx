import React from "react";
import useTaskStats from "../../hooks/useTaskStats";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useOutletContext } from "react-router-dom";

export default function UserDashboard() {
  const { tasks } = useOutletContext();
  const stats = useTaskStats(tasks);

  const statusData = [
    { label: "Completed", value: stats.completed },
    { label: "Pending", value: stats.pending },
    { label: "Overdue", value: stats.overdue },
  ];

  const priorityLabels = ["High", "Medium", "Low"];
  const priorityValues = [
    stats.priorities.high,
    stats.priorities.medium,
    stats.priorities.low,
  ];

  return (
    <div className="p-4 space-y-4 h-[calc(100vh-70px)] overflow-hidden">

      <h2 className="text-xl font-bold text-gray-800">📊 Task Overview</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        {[
          { label: "Total Tasks", value: stats.total, color: "text-purple-600" },
          { label: "Completed", value: stats.completed, color: "text-green-600" },
          { label: "Pending", value: stats.pending, color: "text-orange-500" },
          { label: "Overdue", value: stats.overdue, color: "text-red-600" },
        ].map((item, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-3">
            <p className="text-gray-500 text-xs">{item.label}</p>
            <h2 className={`text-2xl font-semibold ${item.color}`}>{item.value}</h2>
          </div>
        ))}

        {/* Priority Tags */}
        <div className="bg-white shadow rounded-lg p-3 col-span-2 md:col-span-4">
          <p className="text-gray-500 text-xs font-medium">Tasks by Priority</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 rounded bg-red-100 text-red-600 text-sm font-medium">
              High: {stats.priorities.high}
            </span>
            <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-600 text-sm font-medium">
              Medium: {stats.priorities.medium}
            </span>
            <span className="px-2 py-1 rounded bg-green-100 text-green-600 text-sm font-medium">
              Low: {stats.priorities.low}
            </span>
          </div>
        </div>
      </div>

      {/* Charts with fixed height container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[45vh] overflow-hidden">

        <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center justify-center">
          <h3 className="text-md font-semibold mb-2">Status Breakdown</h3>
          <PieChart
            series={[{ data: statusData, innerRadius: 15, outerRadius: 60 }]}
            width={220}
            height={180}
          />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center justify-center">
          <h3 className="text-md font-semibold mb-2">Priority Distribution</h3>
          <BarChart
            xAxis={[{ scaleType: "band", data: priorityLabels }]}
            series={[{ data: priorityValues }]}
            width={240}
            height={180}
          />
        </div>

      </div>
    </div>
  );
}
