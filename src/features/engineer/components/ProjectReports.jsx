import StaffNavbar from "../../../layouts/navbar/EngineerNavbar";
import {useEngineerProjectUpdate } from "../hooks/useEngineerProjectUpdate";

/* ================= MAIN COMPONENT ================= */

function ProjectReports() {
  const {
    projectId,
    setProjectId,
    filterDate,
    setFilterDate,
    projectDetails,
    errorMessage,
    loading,
    handleFetchProject,

    editingId,
    filteredUpdates,
    formatDate,
    startEdit,
    cancelEdit,
    handleEditChange,
    handleSaveEdit,
    editForm,
    editLoading,
    editError,
    deleteLoading,
    handleDelete
  } = useEngineerProjectUpdate();

  return (
    <>
      <StaffNavbar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        {/* ================= LEFT ================= */}
        <aside className="space-y-6">
          {/* SEARCH */}
          <div className="rounded-2xl bg-white border shadow-lg p-5">
            <h2 className="text-lg font-semibold mb-4">🔍 Search Project</h2>

            <input
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="Enter project ID..."
              className="w-full rounded-xl border px-4 py-2 mb-3 text-sm
                focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              onClick={handleFetchProject}
              disabled={loading || projectId.trim().length !== 17}
              className="w-full rounded-xl bg-red-600 py-2 text-sm font-medium text-white
                hover:bg-red-700 transition disabled:opacity-60"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* ERROR */}
          {errorMessage && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {errorMessage}
            </div>
          )}

          {/* PROJECT DETAILS */}
          {projectDetails && (
            <div className="rounded-2xl bg-white border shadow-lg p-5">
              <h3 className="text-lg font-semibold mb-4">📁 Project Details</h3>

              <div className="space-y-3 text-sm">
                <Detail label="Project ID" value={projectDetails.projectId} />
                <Detail label="Name" value={projectDetails.projectName} />
                <Detail label="Location" value={projectDetails.siteLocation} />
                <Detail
                  label="Start"
                  value={formatDate(projectDetails.startDate)}
                />
                <Detail
                  label="End"
                  value={formatDate(projectDetails.endDate)}
                />
                <Detail
                  label="Status"
                  value={
                    <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-medium text-blue-700 capitalize">
                      {projectDetails.projectStatus}
                    </span>
                  }
                />
              </div>

              <div className="mt-4 rounded-xl bg-gray-50 p-4 border">
                <p className="text-sm font-medium mb-1">📝 Work Summary</p>
                <p className="text-sm text-gray-600">
                  {projectDetails.workSummary}
                </p>
              </div>
            </div>
          )}
        </aside>

        {/* ================= RIGHT ================= */}
        <section className="lg:col-span-2">
          {!projectDetails ? (
            <div className="rounded-2xl border border-dashed bg-gray-50 p-10 text-center text-gray-500">
              👈 Search a project to view updates
            </div>
          ) : (
            <div className="rounded-2xl bg-white border shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">🧾 Project Updates</h3>

                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="rounded-xl border px-3 py-1.5 text-sm"
                />
              </div>

              {filteredUpdates?.length ? (
                <div className="space-y-4">
                  {filteredUpdates.map((update) => (
                    <div key={update._id} className="rounded-xl border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">
                          📅 {formatDate(update.updateDate)}
                        </p>

                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs capitalize">
                            {update.projectStatus}
                          </span>

                          <button
                            onClick={() => startEdit(update)}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      {editingId === update._id ? (
                        <div className="space-y-3">
                          {/* Global Project Error */}
                          {editError && (
                            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                              {editError}
                            </div>
                          )}

                          <input
                            type="date"
                            name="updateDate"
                            value={editForm.updateDate}
                            onChange={handleEditChange}
                            className="w-full rounded-lg border px-3 py-2 text-sm"
                          />

                          <select
                            name="projectStatus"
                            value={editForm.projectStatus}
                            onChange={handleEditChange}
                            className="w-full rounded-lg border px-3 py-2 text-sm capitalize"
                          >
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          <textarea
                            name="progressSummary"
                            rows={3}
                            value={editForm.progressSummary}
                            onChange={handleEditChange}
                            maxLength={150}
                            className="w-full rounded-lg border px-3 py-2 text-sm"
                          />

                          <div className="flex justify-end gap-2">
                            <button
                              onClick={cancelEdit}
                              className="rounded-lg border px-4 py-1.5 text-sm"
                            >
                              Cancel
                            </button>

                            <button
                              onClick={() => handleDelete(update._id)}
                              disabled={deleteLoading}
                              className="
    relative flex items-center justify-center gap-2
    rounded-lg bg-red-100 px-4 py-1.5 text-sm text-red-700
    border border-red-200
    transition-all duration-200
    hover:bg-red-200
    active:scale-95
    disabled:opacity-60 disabled:cursor-not-allowed
  "
                            >
                              {deleteLoading && (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                              )}

                              <span>
                                {deleteLoading ? "Deleting..." : "Delete"}
                              </span>
                            </button>

                            <button
                              onClick={() => handleSaveEdit(update._id)}
                              disabled={editLoading}
                              className="
    relative flex items-center justify-center gap-2
    rounded-lg bg-red-600 px-4 py-1.5 text-sm text-white
    transition-all duration-200 ease-in-out
    hover:bg-red-700
    active:scale-95
    disabled:opacity-60 disabled:cursor-not-allowed
  "
                            >
                              {editLoading && (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              )}

                              <span
                                className={`transition-opacity duration-200 ${
                                  editLoading ? "opacity-70" : "opacity-100"
                                }`}
                              >
                                {editLoading ? "Saving..." : "Save"}
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">
                          {update.progressSummary}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-6">
                  No updates found
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

/* ================= HELPER ================= */
function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed pb-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}

export default ProjectReports;
