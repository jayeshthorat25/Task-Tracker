import React, { useMemo, useState, useCallback } from "react";
import {
  ListChecks,
  CalendarIcon,
  Filter,
  Plus,
  Flame,
  HomeIcon,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import TaskItem from "../../components/TaskItem";
import TaskModal from "../../components/TaskModal";
import api from "../../api/api";

function RemainingPage() {
  const { tasks = [], refreshTasks } = useOutletContext();
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const FILTER_OPTIONS = [
    { value: "all", label: "All Tasks" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" },
  ];

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
      key: "totalPending",
      label: "Total Remaining Tasks",
      icon: HomeIcon,
      iconColor: "bg-purple-100 text-purple-600",
      valueKey: "totalPending",
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
      totalPending: tasks.filter((t) => t.status !== "completed").length,
      lowPriority: tasks
        .filter((t) => t.status !== "completed")
        .filter((t) => t.priority === "low").length,
      mediumPriority: tasks
        .filter((t) => t.status !== "completed")
        .filter((t) => t.priority === "medium").length,
      highPriority: tasks
        .filter((t) => t.status !== "completed")
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
      .filter((task) => task.status !== "completed")
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
            <ListChecks className="text-purple-500 w-6 h-6" />
            Remaining Tasks
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

      {/* FILTER */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        {/* Left Label */}
        <div className="flex items-center gap-2 min-w-0">
          <Filter className="w-5 h-5 text-purple-500 shrink-0" />
          <h2 className="text-base md:text-lg font-semibold text-gray-800 truncate">
            {FILTER_LABELS[filter]}
          </h2>
        </div>

        {/* Mobile Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 md:hidden text-sm"
        >
          {FILTER_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-1 bg-purple-50 p-1 rounded-lg">
          {FILTER_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === value
                  ? "bg-white text-purple-700 shadow-sm border"
                  : "text-gray-600 hover:bg-purple-100/50"
              }`}
            >
              {label}
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

export default RemainingPage;
