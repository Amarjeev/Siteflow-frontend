import { Link } from "react-router-dom";
import { useStaffLogin, STAFF_LOGIN_STATUS } from "../hooks/useStaffLogin";

function StaffLoginForm() {
  const {
    errorMessage,
    loading,
    email,
    setEmail,
    password,
    setPassword,
    newPassword,
    setNewPassword,
    rePassword,
    setRePassword,
    loginStatus,
    handleSubmit,
    userRole
  } = useStaffLogin();

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-200 mt-14">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
       { `${userRole} Login`}
      </h2>

      {/* Error Message */}
      {errorMessage && (
        <p className="mb-4 text-sm text-red-600 text-center">{errorMessage}</p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* ENTER EMAIL */}
        {loginStatus === STAFF_LOGIN_STATUS.ENTER_EMAIL && (
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* ENTER PASSWORD */}
        {loginStatus === STAFF_LOGIN_STATUS.ENTER_PASSWORD && (
          <>
            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </>
        )}

        {/* SET PASSWORD */}
        {loginStatus === STAFF_LOGIN_STATUS.SET_PASSWORD && (
          <>
            <div>
              <label className="block mb-1 text-sm text-gray-600">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2 text-white
                     hover:bg-blue-700 transition
                     disabled:opacity-60 disabled:cursor-not-allowed
                     flex justify-center"
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </form>
    </div>
  );
}

export default StaffLoginForm;
