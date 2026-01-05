import Navbar from "../../components/common/Navbar";
import { useForgotPwdCreatePwd } from "../hooks/useForgotPwdCreatePwd";
import { Link } from "react-router-dom";

function ResetPasswordForm() {
  const {
    password,
    setPassword,
    reEnterPassword,
    setReEnterPassword,
    handleSubmitPwd,
    loading,
    errorMessage,
    showSuccessMessage,
  } = useForgotPwdCreatePwd();

  return (
    <div>
      <Navbar />

      <div className="flex flex-1 justify-center mt-24 px-4">
        <div className="w-full max-w-md border-2 border-blue-500 rounded-xl p-6 space-y-6 shadow-sm">
          {/* Header */}
          <div className="text-center space-y-1">
            <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
            <p className="text-sm text-gray-500">
              Password must be between 6 and 10 characters
            </p>

            {showSuccessMessage && (
              <p className="text-green-600 text-sm text-center">
                Password reset successful. Redirecting to login{" "}
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login now
                </Link>
              </p>
            )}
          </div>

          {/* Error */}
          {errorMessage && (
            <p className="text-sm text-red-600 text-center">{errorMessage}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmitPwd} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                minLength={6}
                maxLength={10}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 text-white
                         font-semibold hover:bg-blue-700 transition
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Confirm"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
