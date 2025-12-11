import {
  AlertTriangle,
  ArrowLeft,
  CalendarIcon,
  Clock,
  Edit2,
  Flag,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import TaskModal from "../components/TaskModal";
import { format, isBefore, isToday } from "date-fns";
import { toast } from "react-toastify";

const priorityColors = {
  high: "text-red-600 bg-red-100",
  medium: "text-orange-600 bg-orange-100",
  low: "text-green-600 bg-green-100",
};

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchTask = async () => {
    try {
      const res = await api.get(`/users/tasks/${id}`);
      setTask(res.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/users/tasks/${id}`);
      navigate("/"); // go back to dashboard
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleUpdate = async (updatedTask) => {
    setShowEditModal(false);
    try {
      await api.put(`/users/tasks/${updatedTask.id}`, updatedTask);
      onRefresh();
      toast.success("Task Updated Successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
    }
    fetchTask();
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const displayDueDate = () => {
    if (!task?.due_date)
      return <span className="text-gray-400 italic">No Due Date</span>;

    const dueDate = new Date(task.due_date);
    const today = new Date();
    const isCompleted = task.status?.toLowerCase() === "completed";

    if (isToday(dueDate)) {
      return (
        <span className="text-orange-500 font-medium flex items-center gap-1">
          <AlertTriangle size={16} className="text-orange-500" />
          Due Today
        </span>
      );
    }

    if (isBefore(dueDate, today) && !isCompleted) {
      return (
        <span className="text-red-600 font-semibold flex items-center gap-1">
          <AlertTriangle size={18} className="text-red-600" />
          Overdue - {format(dueDate, "MMM d, yyyy")}
        </span>
      );
    }

    return (
      <span className="text-blue-500 font-medium">
        Due {format(dueDate, "MMM d, yyyy")}
      </span>
    );
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading task...</p>;
  if (!task)
    return <p className="text-center mt-10 text-gray-500">Task not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Header */}
      <div className="px-4 py-5 bg-white shadow-sm rounded-xl border border-purple-100 flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">{task.title}</h1>

          <span
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              priorityColors[task.priority]
            }`}
          >
            Priority:{" "}
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={deleteTask}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-purple-100 space-y-6">
        {/* Status */}
        <div className="flex gap-3 items-center">
          <Clock className="text-purple-500" />
          <span
            className={`font-medium ${
              task.status === "Completed" ? "text-green-600" : "text-red-500"
            }`}
          >
            Status: {task.status}
          </span>
        </div>

        {/* Due Date */}
        <div className="flex gap-3 items-center">
          <CalendarIcon className="text-purple-500" />
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <span>Due Date:</span>
            {displayDueDate()}
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Flag className="text-purple-500" /> Description
          </h2>
          <p className="text-gray-600 whitespace-pre-wrap">
            {task.description || "No description provided."}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <TaskModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          taskToEdit={task}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default TaskDetails;
