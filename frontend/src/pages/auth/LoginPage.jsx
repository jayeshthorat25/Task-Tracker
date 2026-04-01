import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiPublic from "../../api/api";
import { toast } from "react-toastify";

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
    // <div className="h-full bg-gray-900">
    //   <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //       <img
    //         src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
    //         alt="Your Company"
    //         className="mx-auto h-10 w-auto"
    //       />
    //       <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
    //         Login in to your account
    //       </h2>
    //     </div>

    //     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //       <form method="" onSubmit={handleSumbit} className="space-y-6">
    //         <div>
    //           <label
    //             htmlFor="email"
    //             className="block text-sm/6 font-medium text-gray-100"
    //           >
    //             Email address
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="email"
    //               type="email"
    //               name="email"
    //               required
    //               value={formData.email}
    //               onChange={handleChange}
    //               autoComplete="email"
    //               className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <div className="flex items-center justify-between">
    //             <label
    //               htmlFor="password"
    //               className="block text-sm/6 font-medium text-gray-100"
    //             >
    //               Password
    //             </label>
    //             <div className="text-sm">
    //               <a
    //                 href="#"
    //                 className="font-semibold text-indigo-400 hover:text-indigo-300"
    //               >
    //                 Forgot password?
    //               </a>
    //             </div>
    //           </div>
    //           <div className="mt-2">
    //             <input
    //               id="password"
    //               type="password"
    //               name="password"
    //               required
    //               value={formData.password}
    //               onChange={handleChange}
    //               autoComplete="current-password"
    //               className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <button
    //             type="submit"
    //             className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    //           >
    //             Log in
    //           </button>
    //         </div>
    //       </form>

    //       <p className="mt-10 text-center text-sm/6 text-gray-400">
    //         Don't have an account?
    //         <Link
    //           to="/signup"
    //           className="font-semibold text-indigo-400 hover:text-indigo-300"
    //         >
    //           Sign up
    //         </Link>
    //       </p>
    //     </div>
    //   </div>
    // </div>

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
          <form onSubmit={handleSubmit} className="space-y-4">
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
          </form>
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
