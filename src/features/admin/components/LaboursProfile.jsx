import AdminNavbar from "../../../layouts/navbar/AdminNavbar";
import { useAdminLabourAccessControl } from "../hooks/useAdminLabourAccessControl";

function LaboursProfile() {
  const {
    labourId,
    setLabourId,
    labour,
    isEditingStatus,
    setIsEditingStatus,
    loading,
    errorMessage,
    handleSearch,
    handleSaveStatus,
  } = useAdminLabourAccessControl();

  return (
    <>
      <AdminNavbar />

      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow border">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Labour Profile
        </h2>

        {/* Access note */}
        <p className="mb-6 rounded-md bg-gray-100 px-3 py-2 text-xs text-gray-600">
          ⚠️ Access Denied: Labour users cannot access or modify this page. Only
          admins can block or unblock labour accounts.
        </p>

        {/* Search */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={labourId}
            onChange={(e) => setLabourId(e.target.value.trim())}
            placeholder="Enter Labour ID or Mobile Number"
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="
    rounded-md bg-black px-4 py-2 text-sm text-white
    transition-all duration-200 ease-out
    hover:bg-gray-800
    active:scale-95
    disabled:opacity-60 disabled:cursor-not-allowed
  "
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        {/* Labour Details */}
        {labour && (
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                value={labour.username}
                readOnly
                className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-sm"
              />
            </div>

            {/* Labour ID */}
            <div>
              <label className="text-sm font-medium">Labour ID</label>
              <input
                value={labour.userId}
                readOnly
                className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-sm"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm font-medium">Mobile</label>
              <input
                value={labour.mobile}
                readOnly
                className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-sm"
              />
            </div>

            {/* Supervisor */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Created By (Supervisor ID)
              </label>
              <input
                value={labour.supervisorId}
                readOnly
                className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">
                This labour profile was created by the above supervisor.
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium">Account Status</label>

              <div
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm font-medium
      ${
        labour.status === "active"
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      }
    `}
              >
                {labour.status === "active"
                  ? "Active (Unblocked)"
                  : "Inactive (Blocked)"}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              {!isEditingStatus ? (
                <button
                  onClick={() => setIsEditingStatus(true)}
                  className={`rounded-md px-4 py-2 text-sm text-white transition ${
                    labour.status === "active"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {labour.status === "active"
                    ? "Deny Access"
                    : "Restore Access"}
                </button>
              ) : (
                <button
                  onClick={handleSaveStatus}
                  disabled={loading}
                  className="
    rounded-md bg-black px-4 py-2 text-sm text-white
    transition-all duration-200 ease-out
    hover:bg-gray-800
    active:scale-95
    disabled:opacity-60 disabled:cursor-not-allowed
  "
                >
                  {loading ? "Saving..." : "Save Status"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LaboursProfile;
