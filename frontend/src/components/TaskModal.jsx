// import {
//   AlignLeft,
//   Calendar,
//   CheckCircle,
//   Flag,
//   PlusCircle,
//   Save,
//   X,
// } from "lucide-react";
// import React, { useCallback, useEffect, useState } from "react";

// const priorityStyles = {
//   low: "bg-green-100 text-green-700 border-green-200",
//   medium: "bg-purple-100 text-purple-700 border-purple-200",
//   high: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
// };

// function TaskModal({ isOpen, onClose, taskToEdit, onSave }) {
//   const [taskData, setTaskData] = useState({
//     title: "",
//     description: "",
//     priority: "low",
//     dueDate: "",
//     completed: "pending",
//     id: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const today = new Date().toISOString().split("T")[0];

//   useEffect(() => {
//     if (!isOpen) return;
//     if (taskToEdit) {
//       setTaskData({
//         title: taskToEdit.title || "",
//         description: taskToEdit.description || "",
//         priority: taskToEdit.priority || "Low",
//         dueDate: taskToEdit.due_date ? taskToEdit.due_date.split("T")[0] : "",
//         completed:
//           taskToEdit.status === "completed"
//             ? "completed"
//             : taskToEdit.status === "pending"
//             ? "pending"
//             : "in_progress",
//         id: taskToEdit.id || null,
//       });
//     } else {
//       setTaskData({
//         title: "",
//         description: "",
//         priority: "low",
//         dueDate: "",
//         completed: "pending",
//         id: null,
//       });
//     }
//     setError(null);
//   }, [isOpen, taskToEdit]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const body = {
//         title: taskData.title,
//         description: taskData.description,
//         priority: taskData.priority.toLowerCase(),
//         due_date: taskData.dueDate,
//         status:
//           taskData.completed === "completed"
//             ? "completed"
//             : taskData.completed === "in_progress"
//             ? "in_progress"
//             : "pending",
//       };
//       if (taskData.id) {
//         // Edit existing task
//         // const response = await axios.put(
//         //   `http://localhost:8000/api/users/2/tasks/${taskData.id}`,
//         //   body
//         // );
//         onSave({ ...body, id: taskData.id });
//       } else {
//         // Create new task
//         // const response = await axios.post("http://localhost:8000/api/users/2/tasks", body);
//         onSave(body);
//       }
//       setLoading(false);
//       onClose();
//     } catch (err) {
//       setError("Failed to save task. Please try again.");
//       // console.log("Error saving task:", err);
//       setLoading(false);
//     }
//   };

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setTaskData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
//       <div className="bg-white border border-purple-100 rounded-xl max-w-md w-full shadow-lg relative p-6 animate-fadeIn">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//             {taskData.id ? "Edit Task" : "Create New Task"}
//           </h2>

//           <button
//             onClick={() => onClose()}
//             className="p-2 text-gray-500 hover:text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && (
//             <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
//               {error}
//             </div>
//           )}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Task Title
//             </label>
//             <div className="flex items-center border border-purple-100 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all duration-200">
//               <input
//                 type="text"
//                 name="title"
//                 required
//                 value={taskData.title}
//                 onChange={handleChange}
//                 className="w-full focus:outline-none text-sm"
//                 placeholder="Enter task title"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
//               <AlignLeft className="w-4 h-4 text-purple-500" />
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={taskData.description}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-4 py-2.5 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
//               placeholder="Enter task description (optional)"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
//                 <Flag className="w-4 h-4 text-purple-500" />
//                 Priority
//               </label>
//               <select
//                 name="priority"
//                 value={taskData.priority}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm ${
//                   priorityStyles[taskData.priority]
//                 }`}
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>

//             <div>
//               <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
//                 <Calendar className="w-4 h-4 text-purple-500" />
//                 Due Date
//               </label>
//               <input
//                 type="date"
//                 name="dueDate"
//                 value={taskData.dueDate}
//                 required
//                 min={taskToEdit ? taskToEdit.due_date : today}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
//               <CheckCircle className="w-4 h-4 text-purple-500" />
//               Status
//             </label>
//             <div className="flex gap-4">
//               {[
//                 { value: "pending", label: "Pending" },
//                 { value: "in_progress", label: "In Progress" },
//                 { value: "completed", label: "Completed" },
//               ].map(({ value, label }) => (
//                 <label key={value} className="flex items-center">
//                   <input
//                     type="radio"
//                     name="completed"
//                     value={value}
//                     checked={taskData.completed === value}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-700">{label}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-linear-to-r from-fuchsia-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-md transition-all duration-200"
//           >
//             {loading ? (
//               "Saving..."
//             ) : taskData.id ? (
//               <>
//                 <Save className="w-4 h-4" />
//                 Update Task
//               </>
//             ) : (
//               <>
//                 <PlusCircle className="w-4 h-4" />
//                 Create Task
//               </>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default TaskModal;

//V2 with dynamic form
import {
  AlignLeft,
  Calendar,
  CheckCircle,
  Flag,
  PlusCircle,
  Save,
  X,
} from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import DynamicForm from "./DynamicForm";

const priorityStyles = {
  low: "bg-green-100 text-green-700 border-green-200",
  medium: "bg-purple-100 text-purple-700 border-purple-200",
  high: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
};

function TaskModal({ isOpen, onClose, taskToEdit, onSave }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    completed: "pending",
    id: null,
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (taskToEdit) {
      setTaskData({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        priority: taskToEdit.priority || "low",
        dueDate: taskToEdit.due_date?.split("T")[0] || "",
        completed: taskToEdit.status || "pending",
        id: taskToEdit.id || null,
      });
    } else {
      setTaskData({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        completed: "pending",
        id: null,
      });
    }
  }, [taskToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatted = {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      due_date: taskData.dueDate,
      status: taskData.completed,
    };
    onSave(taskData.id ? { ...formatted, id: taskData.id } : formatted);
    onClose();
  };

  if (!isOpen) return null;

  const formFields = [
    {
      type: "text",
      name: "title",
      label: "Task Title",
      placeholder: "Enter task title",
      required: true,
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      icon: AlignLeft,
      placeholder: "Enter description",
    },
    {
      type: "select",
      name: "priority",
      label: "Priority",
      icon: Flag,
      options: [
        { label: "Low", value: "low", className: priorityStyles.low },
        { label: "Medium", value: "medium", className: priorityStyles.medium },
        { label: "High", value: "high", className: priorityStyles.high },
      ],
    },
    {
      type: "date",
      name: "dueDate",
      label: "Due Date",
      icon: Calendar,
      min: taskToEdit ? taskToEdit.due_date : today,
    },
    {
      type: "radio-group",
      name: "completed",
      label: "Status",
      icon: CheckCircle,
      options: [
        { value: "pending", label: "Pending" },
        { value: "in_progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
       <div className="bg-white border border-purple-100 rounded-xl max-w-md w-full shadow-lg relative p-6 animate-fadeIn">
         <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
             {taskData.id ? "Edit Task" : "Create New Task"}
           </h2>

          <button
            onClick={() => onClose()}
            className="p-2 text-gray-500 hover:text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ---------- Dynamic Form ---------- */}
        <DynamicForm
          fields={formFields}
          values={taskData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={taskData.id ? "Update Task" : "Create Task"}
          formClass="space-y-4"
          fieldWrapperClass="mb-4"
          inputClass="w-full px-4 py-2 border border-purple-200 rounded-lg"
          textareaClass="w-full px-4 py-2 border border-purple-200 rounded-lg"
          selectClass={`w-full px-4 py-2 border rounded-lg ${priorityStyles[taskData.priority]}`}
          radioGroupClass="flex gap-4"
          buttonClass="w-full bg-purple-600 text-white py-2 rounded-lg"
          ButtonIcon={taskData.id ? PlusCircle : Save}
        />
      </div>
    </div>
  );
}

export default TaskModal;
