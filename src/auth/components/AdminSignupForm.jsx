import React from "react";
import { Link } from "react-router";
import Navbar from "../../components/common/Navbar";
import { useAdminSignup } from "../hooks/useAdminSignup";
import SocialAuthButtons from "../../components/common/SocialAuthButtons";

function AdminSignupForm() {
  const {
    username,
    email,
    password,
    rePassword,
    errorMessage,
    setUsername,
    setEmail,
    setPassword,
    setRePassword,
    handleSubmit,
    loading,
  } = useAdminSignup();

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-200 mt-11">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create an Account
        </h2>

        {/* ✅ Error Message */}
        {errorMessage && (
          <p className="mb-4 text-sm text-red-600 text-center">
            {errorMessage}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="
    w-full bg-blue-600 text-white py-2 rounded-lg
    transition-transform duration-150
    hover:scale-105
    active:scale-95
    disabled:opacity-60
  "
          >
            Register
          </button>
        </form>

        <SocialAuthButtons />

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default AdminSignupForm;
