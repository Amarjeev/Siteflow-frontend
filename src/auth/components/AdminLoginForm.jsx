import { Link } from "react-router";
import SocialAuthButtons from "../../components/common/SocialAuthButtons";
import { useAdminLogin } from "../hooks/useAdminLogin";

function AdminLoginForm() {
  const {
    errorMessage,
    setEmail,
    setPassword,
    handleSubmit,
    loading,
    email,
    password,
  } = useAdminLogin();

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-200 mt-4">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Login
      </h2>

      {/* ✅ Error Message */}
      {errorMessage && (
        <p className="mb-4 text-sm text-red-600 text-center">{errorMessage}</p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Email Address
          </label>

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-600">Password</label>

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <Link
            to={"/forgot-password"}
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <SocialAuthButtons />
      <p className="text-sm text-center text-gray-500 mt-6">
        Don't have an account?{" "}
        <Link to={"/signup"} className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default AdminLoginForm;
