import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiPublic from "../../api/api";
import { toast } from "react-toastify";
import DynamicForm from "../../components/DynamicForm";

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  /* Shared input styles */
  const baseInputClass =
    "block w-full rounded-lg border border-purple-100 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none";

  /* Form Schema */
  const signupSchema = [
    {
      type: "text",
      name: "name",
      label: "Name",
      placeholder: "Enter your name",
      required: true,
      className: baseInputClass,
    },
    {
      type: "email",
      name: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      required: true,
      className: baseInputClass,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
      className: baseInputClass,
    },
    {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      required: true,
      className: baseInputClass,
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
      if (!validatePassword()) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      console.log(formData);
      const response = await apiPublic.post("/auth/signup", formData);
      // console.log(response.data);
      // console.log("User registered successfully");
      toast.success("User registered successfully. Please login.");
      navigate("/login");
    } catch (error) {
      setError(error.response.data.detail);
      console.error("Message: ", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = () => {
    return formData.password === formData.confirmPassword;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-fuchsia-50 via-purple-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Create a New Account
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Enter your Name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-lg border border-purple-100 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
            </div>

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
          
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-purple-100 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-purple-100 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md hover:cursor-pointer transition-all disabled:opacity-60"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form> */}

          <DynamicForm
            schema={signupSchema}
            values={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel={loading ? "Signing up..." : "Sign Up"}
            formClass="space-y-4"
            fieldWrapperClass="mb-4"
            buttonClass="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
          />
        </div>
        <p className="mt-6 text-center text-xs text-gray-500">
          Already have an account? &nbsp;
          <Link
            to="/login"
            className="font-semibold text-purple-600 hover:text-purple-700 hover:cursor-pointer"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
