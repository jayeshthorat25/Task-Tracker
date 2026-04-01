import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiPublic from "../../api/api";
import { toast } from "react-toastify";
import DynamicForm from "../../components/DynamicForm.jsx";

function LoginPage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setAuthToken } = useContext(AuthContext);

  /* Form Schema */
  const loginSchema = [
    {
      type: "email",
      name: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      required: true,
      className:
        "block w-full rounded-lg border border-purple-100 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
      className:
        "block w-full rounded-lg border border-purple-100 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await apiPublic.post("/auth/login", formData);
      // console.log("Login response:", response.data);
      setAuthToken(response.data.accessToken, response.data.user);
      toast.success("Login successful!");
      if (response.data.user.role === "admin")
        navigate("/admin/dashboard", { replace: true });
      else navigate("/user/dashboard", { replace: true });
    } catch (error) {
      if (error.response) setError(error.response.data.detail);
      else setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-fuchsia-50 via-purple-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Login to Your Account
          </h1>
        </div>
        <div className="bg-white/90 backdrop-blur-sm border-purple-100 rounded-2xl shadow-sm p-6">
          {error && (
            <p className="mb-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {/* <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-lg border border-purple-100 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-lg border border-purple-100 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md hover:cursor-pointer transition-all disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form> */}

          <DynamicForm
            schema={loginSchema}
            values={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel={loading ? "Logging in..." : "Log In"}
            formClass="space-y-4"
            fieldWrapperClass="mb-4"
            buttonClass="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
          />
        </div>
        <p className="mt-6 text-center text-xs text-gray-500">
          Don't have an account? &nbsp;
          <Link
            to="/signup"
            className="font-semibold text-purple-600 hover:text-purple-700 hover:cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
