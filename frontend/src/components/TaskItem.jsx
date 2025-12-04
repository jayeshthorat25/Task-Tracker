import {
  Calendar,
  Edit2,
  MoreVertical,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { format, isToday, set } from "date-fns";
import api from "../api/api";
import TaskModal from "./TaskModal";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function TaskItem({ task, onRefresh, onEdit}) {

  const { user } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [ownerName, setOwnerName] = useState("");

  const borderColor =
    status === "completed"
      ? "border-green-500"
      : status === "in_progress"
      ? "border-yellow-500"
      : "border-gray-300";

  useEffect(() => {
    setStatus(task.status);
  }, [task.status]);


  useEffect(() => {
    const fetchOwner = async () => {
      if (!task.created_by) return;
      if (user.role !== "admin") return;

      try {
        const res = await api.get(
          `/admin/user/${task.created_by}`
        );
        setOwnerName(res.data.name);
      } catch (error) {
        console.error("Failed to fetch task owner:", error);
      }
    };

    fetchOwner();
  }, [task.created_by, user.role]);

  const STATUS_LABELS = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
  };

  const STATUS_COLORS = {
    pending: "text-gray-500",
    in_progress: "text-yellow-600",
    completed: "text-green-600",
  };

  const handleStatusChange = async (newStatus) => {
    setStatusMenuOpen(false);

    try {
      // const updatedTask = { ...task, status: newStatus };
      await api.patch(
        `/users/tasks/${task.id}`,
        { status: newStatus }
      );

      setStatus(newStatus);
      onRefresh();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async () => {

    setShowMenu(false);
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await api.delete(
        `/users/tasks/${task.id}`
      );
      onRefresh();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleSave = async (updatedTask) => {
    setShowEditModal(false);
    try {
      await api.put(
        `/users/tasks/${updatedTask.id}`,
        updatedTask
      );
      onRefresh();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <div
        className={`group p-4 sm:p-5 rounded-xl shadow-sm bg-white border-l-4 hover:shadow-md transition-all duration-300 border ${borderColor}`}
      >
        <div className="flex items-start justify-between gap-4">
          {/* LEFT CONTENT */}
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2 mb-1 flex-wrap">
              <h3
                className={`text-base sm:text-lg font-medium truncate ${
                  status === "completed"
                    ? "text-gray-400 line-through"
                    : "text-gray-800"
                }`}
              >
                {task.title}
              </h3>

              <span
                className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                  {
                    low: "bg-green-100 text-green-900",
                    medium: "bg-purple-100 text-purple-900",
                    high: "bg-fuchsia-300 text-fuchsia-900",
                  }[task.priority] || "bg-gray-100 text-gray-700"
                }`}
              >
                {task.priority}
              </span>
            </div>

            {task.description && (
              <p className="text-sm text-gray-500 mt-1 truncate">
                {task.description}
              </p>
            )}

            {/* STATUS */}
            <p className={`mt-2 text-xs font-medium ${STATUS_COLORS[status]}`}>
              Status: {STATUS_LABELS[status]}
            </p>

            {/* OWNER NAME (ADMIN ONLY) */}
            {ownerName && (
              <p className="text-xs text-gray-600 mt-1">
                Owner: <span className="font-medium">{ownerName}</span>
              </p>
            )}
          </div>

          {/* RIGHT SIDE MENU */}
          <div className="flex flex-col items-end gap-2 sm:gap-3">


            {/* STATUS DROPDOWN */}
                          {(user.id === task.created_by) && (
            <div className="relative">
              <button
                onClick={() => setStatusMenuOpen(!statusMenuOpen)}
                className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-purple-100 rounded-lg flex items-center gap-1 transition"
              >
                Set Status <ChevronDown size={14} />
              </button>

              {statusMenuOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-purple-100 rounded-xl shadow-lg z-10 overflow-hidden">
                  {Object.keys(STATUS_LABELS).map((key) => (
                    <button
                      key={key}
                      onClick={() => handleStatusChange(key)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-purple-50 transition"
                    >
                      {STATUS_LABELS[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            )}
            {(user.id === task.created_by) && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 sm:p-1.5 hover:bg-purple-100 rounded-lg text-gray-500 hover:text-purple-700 transition"
              >
                <MoreVertical size={18} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-1 w-40 sm:w-48 bg-white border border-purple-100 rounded-xl shadow-lg z-10 overflow-hidden">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowEditModal(true);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-purple-50 flex items-center gap-2"
                  >
                    <Edit2 size={14} className="text-purple-600" />
                    Edit Task
                  </button>

                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-purple-50 flex items-center gap-2"
                  >
                    <Trash2 size={14} className="text-red-600" />
                    Delete Task
                  </button>
                </div>
              )}
            </div>
            )}

            {/* DUE DATE */}
            <div className="flex items-center gap-1.5 text-xs font-medium whitespace-nowrap text-gray-500">
              <Calendar size={14} />
              {task.due_date
                ? isToday(new Date(task.due_date))
                  ? "Due Today"
                  : `Due ${format(new Date(task.due_date), "MMM d, yyyy")}`
                : "No Due Date"}
            </div>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        taskToEdit={task}
        onSave={handleSave}
      />
    </>
  );
}

export default TaskItem;
