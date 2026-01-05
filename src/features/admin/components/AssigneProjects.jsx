import AdminNavbar from "../../../layouts/navbar/AdminNavbar";
import { useAdminProjectAssignment } from "../hooks/useAdminProjectAssignment";

function AssignProjects() {
  const {
    staffId,
    setStaffId,
    staffDetails,
    projectId,
    setProjectId,
    projectDetails,
    errorMessage,
    loading,
    handleSubmit,
    isLocked,
    resetForm,
  } = useAdminProjectAssignment();

  return (
    <>
      <AdminNavbar />

      <div className="mx-auto mt-6 max-w-3xl rounded-xl bg-white shadow border">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Assign Project
          </h2>
          <p className="text-sm text-gray-500">
            Use this page to verify staff and project details before securely
            assigning an active project to a staff member.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {/* ================= STAFF SECTION ================= */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Staff Information
            </h3>

            <input
              type="text"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value.toUpperCase())}
              minLength={20}
              maxLength={20}
              disabled={isLocked}
              className={`
    w-full rounded-md border px-4 py-2 text-sm
    focus:ring-2 focus:ring-black
    ${isLocked ? "bg-gray-100 cursor-not-allowed" : ""}
  `}
              placeholder="Enter Staff ID (ENG001 / SUP001)"
              required
            />

            {/* Staff Details Card */}
            {staffDetails && (
              <div className="rounded-lg border bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">
                    {staffDetails.name}
                  </h4>
                  <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
                    {staffDetails.role}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {staffDetails.email}
                  </p>
                  <p>
                    <span className="font-medium">Mobile:</span>{" "}
                    {staffDetails.mobile}
                  </p>
                  <p>
                    <span className="font-medium">User ID:</span>{" "}
                    {staffDetails.userId}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ================= PROJECT SECTION ================= */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Project Information
            </h3>

            <input
              type="text"
              value={projectId}
              minLength={17}
              maxLength={17}
              onChange={(e) => setProjectId(e.target.value.toUpperCase())}
              disabled={isLocked}
              className={`
    w-full rounded-md border px-4 py-2 text-sm
    focus:ring-2 focus:ring-black
    ${isLocked ? "bg-gray-100 cursor-not-allowed" : ""}
  `}
              placeholder="Enter Project ID (PROJ001)"
              required
            />

            {/* Project Details Card */}
            {projectDetails && (
              <div className="rounded-lg border bg-gray-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">
                    {projectDetails.projectName}
                  </h4>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium
                      ${
                        projectDetails.projectStatus === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {projectDetails.projectStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Project ID:</span>{" "}
                    {projectDetails.projectId}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {projectDetails.siteLocation}
                  </p>
                  <p className="sm:col-span-2">
                    <span className="font-medium">Work Summary:</span>{" "}
                    {projectDetails.workSummary}
                  </p>
                  <p>
                    <span className="font-medium">Start Date:</span>{" "}
                    {projectDetails.startDate}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ================= CONFIRMATION MESSAGE ================= */}
          {staffDetails && projectDetails ? (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              ✅ Please review the staff and project details above. Click{" "}
              <strong>“Assign Project”</strong> to confirm.
            </div>
          ) : (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
              ℹ️ Enter valid <strong>Staff ID</strong> and{" "}
              <strong>Project ID</strong> to verify details before assigning.
            </div>
          )}

          {/* ================= ACTION ================= */}
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="
              w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white
              hover:bg-gray-800 transition-all duration-200
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            )}
            {loading
              ? "Assigning..."
              : staffDetails && projectDetails
              ? "Confirm & Assign Project"
              : "Verify Details First"}
          </button>

          {isLocked && (
            <button
              type="button"
              onClick={resetForm}
              className="
        rounded-md border border-gray-300 px-4 py-2 text-sm
        font-medium text-gray-700 hover:bg-gray-100 transition
      "
            >
              Reset
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default AssignProjects;
