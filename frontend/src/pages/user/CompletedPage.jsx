import React, { useMemo, useState, useCallback } from "react";
import {
  ListChecks,
  CalendarIcon,
  Filter,
  Plus,
  Flame,
  HomeIcon,
  CheckCheck,
  CircleCheck,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import TaskItem from "../../components/TaskItem";
import TaskModal from "../../components/TaskModal";
import api from "../../api/api";

function CompletedPage() {
  const { tasks , refreshTasks } = useOutletContext();
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const FILTER_OPTIONS = ["all", "today", "week", "high", "medium", "low"];
  const FILTER_LABELS = {
    all: "All Tasks",
    today: "Today's Tasks",
    week: "This Week",
    high: "High Priority",
    medium: "Medium Priority",
    low: "Low Priority",
  };

  // Stats for top cards
  const STATS = [
    {
      key: "totalCompleted",
      label: "Total Completed Tasks",
      icon: HomeIcon,
      iconColor: "bg-purple-100 text-purple-600",
      valueKey: "totalCompleted",
    },
    {
      key: "lowPriority",
      label: "Low Priority",
      icon: Flame,
      iconColor: "bg-green-100 text-green-600",
      valueKey: "lowPriority",
    },
    {
      key: "mediumPriority",
      label: "Medium Priority",
      icon: Flame,
      iconColor: "bg-orange-100 text-orange-600",
      valueKey: "mediumPriority",
    },
    {
      key: "highPriority",
      label: "High Priority",
      icon: Flame,
      iconColor: "bg-red-100 text-red-600",
      valueKey: "highPriority",
    },
  ];

  const stats = useMemo(
    () => ({
      totalCompleted: tasks.filter((t) => t.status === "completed").length,
      lowPriority: tasks
        .filter((t) => t.status === "completed")
        .filter((t) => t.priority === "low").length,
      mediumPriority: tasks
        .filter((t) => t.status === "completed")
        .filter((t) => t.priority === "medium").length,
      highPriority: tasks
        .filter((t) => t.status === "completed")
        .filter((t) => t.priority === "high").length,
      pending: tasks.filter((t) => t.status !== "completed").length,
      completed: tasks.filter((t) => t.status === "completed").length,
    }),
    [tasks]
  );

  // Filter pending tasks by status + user filter
  const filteredTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return tasks
      .filter((task) => task.status === "completed")
      .filter((task) => {
        const dueDate = new Date(task.due_date);
        switch (filter) {
          case "today":
            return dueDate.toDateString() === today.toDateString();
          case "week":
            return dueDate >= today && dueDate <= nextWeek;
          case "high":
            return task.priority === "high";
          case "medium":
            return task.priority === "medium";
          case "low":
            return task.priority === "low";
          default:
            return true;
        }
      });
  }, [tasks, filter]);

  const handleTaskSave = useCallback(async (task) => {
    try {
      await api.post(`/users/tasks`, task);
      refreshTasks();
      setShowModal(false);
      setSelectedTask(null);
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  }, []);

  return (
    <div className="p-4 md:p-6 min-h-screen overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <div className="min-w-0">
          <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2">
            <CircleCheck className="text-purple-500 w-6 h-6" />
            Completed Tasks
          </h1>
          {/* <p className="text-sm text-gray-500 mt-1 ml-7">Manage your tasks efficiently</p> */}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-linear-to-r from-fuchsia-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-md"
        >
          <Plus size={18} />
          Add New Task
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS.map(({ key, label, icon: Icon, iconColor, valueKey }) => (
          <div
            key={key}
            className={`p-4 rounded-xl bg-white shadow-sm border ${iconColor}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold">{stats[valueKey]}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-500" />
          <h2 className="font-semibold text-gray-800">
            {FILTER_LABELS[filter]}
          </h2>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg md:hidden text-sm"
        >
          {FILTER_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>

        <div className="hidden md:flex space-x-1">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                filter === opt
                  ? "bg-white text-purple-700 shadow-sm border"
                  : "text-gray-600 hover:bg-purple-100/50"
              }`}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* TASK LIST */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="p-6 bg-white rounded-xl shadow-sm border text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Tasks Found
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {filter === "all"
                ? "You have no tasks. Start by adding a new task!"
                : "No tasks match the selected filter."}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-linear-to-r from-fuchsia-500 to-purple-600 text-white rounded-lg text-sm font-medium"
            >
              Add New Task
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onRefresh={refreshTasks}
              showCompleteCheckbox
              onEdit={() => {
                setSelectedTask(task);
                setShowModal(true);
              }}
            />
          ))
        )}
      </div>

      {/* TASK MODAL */}
      <TaskModal
        isOpen={showModal || !!selectedTask}
        onClose={() => {
          setShowModal(false);
          setSelectedTask(null);
        }}
        taskToEdit={selectedTask}
        onSave={handleTaskSave}
      />
    </div>
  );
}

export default CompletedPage;
