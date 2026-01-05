import { useAdminStaffProfileDetails } from "../hooks/useAdminStaffProfileDetails";
import AdminNavbar from "../../../layouts/navbar/AdminNavbar";

function StaffProfileEdit() {
  const {
    staff,
    editableStaff,
    isEditing,
    loading,
    errorMessage,
    handleSearch,
    handleEdit,
    handleChange,
    handleSave,
    handleCancel,
    handleDeleteProfile,
    handleRemoveProject,
    searchType,
    setSearchType,
    searchValue,
    setSearchValue,
  } = useAdminStaffProfileDetails();

  return (
    <>
      <AdminNavbar />
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow border">
        <h2 className="mb-6 text-xl font-semibold text-gray-800">
          Staff Profile
        </h2>

        {/* Search */}
        <div className="mb-6 flex gap-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm bg-white"
          >
            <option value="userId">Staff ID</option>
            <option value="email">Email</option>
            <option value="mobile">Mobile Number</option>
          </select>

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Enter ${searchType}`}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <button
            onClick={handleSearch}
            disabled={loading || !searchValue.trim()}
            className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        {/* Profile */}
        {staff && editableStaff && (
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={editableStaff.name}
                readOnly={!isEditing}
                onChange={handleChange}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                  !isEditing && "bg-gray-100"
                }`}
              />
            </div>

            {/* User ID */}
            <div>
              <label className="text-sm font-medium">User ID</label>
              <input
                type="text"
                value={staff.userId}
                readOnly
                className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-sm"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm font-medium">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={editableStaff.mobile}
                readOnly={!isEditing}
                onChange={handleChange}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                  !isEditing && "bg-gray-100"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="text"
                name="email"
                value={editableStaff.email}
                readOnly={!isEditing}
                onChange={handleChange}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
                  !isEditing && "bg-gray-100"
                }`}
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-sm font-medium">Role</label>

              <select
                name="role"
                value={editableStaff.role}
                disabled={!isEditing}
                onChange={handleChange}
                className={`
      mt-1 w-full rounded-md border px-3 py-2 text-sm
      transition-all duration-200
      ${
        !isEditing
          ? "bg-gray-100 text-gray-600 cursor-not-allowed"
          : "bg-white focus:border-black focus:outline-none"
      }
    `}
              >
                <option value="">Select role</option>
                <option value="engineer">Engineer</option>
                <option value="supervisor">Supervisor</option>
              </select>
            </div>

            {/* Assigned Projects */}
            <div>
              <label className="text-sm font-medium">Assigned Projects</label>

              {editableStaff.assignedProjects.length === 0 ? (
                <p className="mt-2 text-sm text-gray-500">
                  No Projects Assigned
                </p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {editableStaff.assignedProjects.map((projectId) => (
                    <li
                      key={projectId}
                      className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                    >
                      {projectId}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveProject(projectId)}
                          className="text-red-600 hover:underline text-xs"
                        >
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className={`
    rounded-md bg-green-600 px-4 py-2 text-sm text-white
    transition-all duration-200
    ${loading ? "animate-pulse" : "hover:bg-green-700 hover:-translate-y-0.5"}
  `}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              )}

              {isEditing && (
                <button
                  onClick={handleDeleteProfile}
                  disabled={loading}
                  className="
      rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white
      transition-all duration-200 ease-out
      hover:bg-red-700 hover:scale-105 hover:shadow-lg
      active:scale-95
      disabled:opacity-50 disabled:cursor-not-allowed
    "
                >
                  Delete Profile
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default StaffProfileEdit;
