import AdminNavbar from "../../../layouts/navbar/AdminNavbar";
import { useAdminCreateStaffProfile } from "../hooks/useAdminCreateStaffProfile";

function CreateStaffProfile() {
  const { formData, errorMessage, loading, handleChange, handleSubmit } =
    useAdminCreateStaffProfile();

  return (
    <>
      <AdminNavbar />
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow border">
        <h2 className="mb-6 text-xl font-semibold text-gray-800">
          Add Staff Profile
        </h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@company.com"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="engineer">Engineer</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`
    w-full flex items-center justify-center gap-2
    rounded-md bg-black px-4 py-2 text-sm font-medium text-white
    transition-all duration-200
    hover:bg-gray-800
    active:scale-[0.98]
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            )}
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateStaffProfile;
