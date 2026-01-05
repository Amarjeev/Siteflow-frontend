import AdminNavbar from "../../../layouts/navbar/AdminNavbar";
import { useAdminProjectDetails } from "../hooks/useAdminProjectDetails";

function ProjectEdit() {
  const {
    project,
    handleChange,
    isEditing,
    startEditing,
    cancelEditing,
    loading,
    errorMessage,
    saveChanges,
    handleDelete
  } = useAdminProjectDetails();

  const inputBase =
    "mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20";

  const readOnlyStyle = "bg-gray-100 text-gray-700";

  return (
    <>
      <AdminNavbar />

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl bg-white shadow-sm border">
          {/* Header */}
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Edit Project
            </h2>
            <p className="text-sm text-gray-500">
              Search and update project information
            </p>
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="m-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <div className="p-6">
            {/* Project Details */}
            {project && (
              <div className="space-y-6">
                {/* Project Name */}
                <div>
                  <label className="text-sm font-medium">Project Name</label>
                  <input
                    name="projectName"
                    value={project.projectName}
                    readOnly={!isEditing}
                    onChange={handleChange}
                    className={`${inputBase} ${!isEditing && readOnlyStyle}`}
                  />
                </div>

                {/* Project ID */}
                <div>
                  <label className="text-sm font-medium">Project ID</label>
                  <input
                    value={project.projectId}
                    readOnly
                    className={`${inputBase} ${readOnlyStyle}`}
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium">Site Location</label>
                  <input
                    name="siteLocation"
                    value={project.siteLocation}
                    readOnly={!isEditing}
                    onChange={handleChange}
                    className={`${inputBase} ${!isEditing && readOnlyStyle}`}
                  />
                </div>

                {/* Summary */}
                <div>
                  <label className="text-sm font-medium">Work Summary</label>
                  <textarea
                    rows="4"
                    name="workSummary"
                    value={project.workSummary}
                    readOnly={!isEditing}
                    onChange={handleChange}
                    className={`${inputBase} resize-none ${
                      !isEditing && readOnlyStyle
                    }`}
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={
                        project?.startDate
                          ? project.startDate.split("T")[0]
                          : ""
                      }
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className={`${inputBase} ${!isEditing && readOnlyStyle}`}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={
                        project?.endDate ? project.endDate.split("T")[0] : ""
                      }
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className={`${inputBase} ${!isEditing && readOnlyStyle}`}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Project Status
                    </label>
                    <select
                      name="projectStatus"
                      value={project.projectStatus}
                      disabled={!isEditing}
                      onChange={handleChange}
                      className={`${inputBase} bg-white`}
                    >
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Completion Date
                    </label>

                    <input
                      type="date"
                      name="completedAt"
                      value={
                        project?.completedAt
                          ? project.completedAt.split("T")[0]
                          : ""
                      }
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className={`${inputBase} ${!isEditing && readOnlyStyle}`}
                    />

                    {!project?.completedAt && (
                      <p className="mt-1 text-xs font-medium text-amber-600">
                        Not completed yet
                      </p>
                    )}
                  </div>

                  {project?.closedByRole && (
                    <div>
                      <label className="text-sm font-medium">Closed By</label>
                      <input
                        value={project?.closedByRole || "Not closed yet"}
                        readOnly
                        className={`${inputBase} ${readOnlyStyle}`}
                      />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                  {!isEditing ? (
                    <button
                      onClick={startEditing}
                      className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                      Edit Project
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={saveChanges}
                        disabled={loading}
                        className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 transition disabled:opacity-60"
                      >
                        Save Changes
                      </button>

                      <button
                        onClick={cancelEditing}
                        className="rounded-lg bg-gray-200 px-5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className={`
    rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white
    transition-all duration-200
    hover:bg-red-700
    ${loading ? "animate-pulse cursor-wait" : ""}
  `}
                  >
                    {loading ? "Deleting..." : "Delete Project"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectEdit;
