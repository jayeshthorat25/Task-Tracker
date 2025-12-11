import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ClipboardList, ShieldCheck, Sparkles, User } from "lucide-react";
import TaskImage from "../assets/TaskImage.jpg";

function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-fuchsia-50">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-purple-600">Task Manager</h1>

        {/* <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-700 hover:text-purple-600">
            Features
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-600">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-600">
            Contact
          </a>
        </div> */}

        <Link
          to="/login"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
        >
          Login
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16">
        {/* LEFT CONTENT */}
        <div className="max-w-xl space-y-5">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Manage Your Tasks Effortlessly
            <span className="bg-linear-to-r from-fuchsia-500 to-purple-600 text-transparent bg-clip-text">
              {" "}
              Anywhere, Anytime
            </span>
          </h2>

          <p className="text-gray-600 text-lg">
            A simple yet powerful task management system built to help you stay
            organized, increase productivity, and stay ahead of deadlines.
          </p>

          <div className="flex gap-4">
            <Link to="/signup" className="px-6 py-3 rounded-lg bg-linear-to-r from-fuchsia-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg">
              Get Started
            </Link>
            {/* <button className="px-6 py-3 rounded-lg bg-white border border-purple-200 text-purple-600 font-semibold hover:bg-purple-50">
              Learn More
            </button> */}
          </div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="hidden md:block">
          <img
            src={TaskImage}
            alt="Task Illustration"
            className="w-[380px] drop-shadow-xl"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 md:px-12 py-16">
        <h3 className="text-center text-3xl font-bold text-gray-900 mb-10">
          Why Choose <span className="text-purple-600">TaskMaster?</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ClipboardList,
              title: "Smart Task Filters",
              desc: "Filter tasks by priority, date, or status instantly.",
            },
            {
              icon: CheckCircle,
              title: "Track Progress",
              desc: "Mark tasks completed and stay productive every day.",
            },
            {
              icon: ShieldCheck,
              title: "Secure Access",
              desc: "Role-based access control ensures safe and organized task management.",
            },
            {
              icon: Sparkles,
              title: "Clean UI",
              desc: "A smooth, modern interface designed for simplicity.",
            },
          ].map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition"
            >
              <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                <Icon className="text-purple-600 w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
              <p className="text-gray-500 text-sm mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      {/* <section className="py-20 px-6 md:px-12 text-center bg-white shadow-inner">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Organize Your Life?
        </h3>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Join thousands of people using TaskMaster to stay ahead of their
          tasks.
        </p>

        <button className="px-8 py-3 bg-linear-to-r from-fuchsia-500 to-purple-600 text-white rounded-lg text-lg font-semibold shadow-md hover:shadow-lg">
          Start Now
        </button>
      </section> */}

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} TaskMaster. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
