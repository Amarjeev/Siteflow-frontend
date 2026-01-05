import { useEffect } from "react";
import { useEngineerProjectUpdate } from "../hooks/useEngineerProjectUpdate";

function ProjectDetails({ projectState }) {
  const { selectedProjectDetails, detailsLoading, detailsError } = projectState;
  const project = selectedProjectDetails;

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const {
    updateText,
    setUpdateText,
    newStatus,
    setNewStatus,
    updateDate,
    setUpdateDate,
    setProjectId,
    validationError,
    handleSubmit,
    errorMessage,
    loading,
  } = useEngineerProjectUpdate();

  /* ================= SET PROJECT ID ================= */

  useEffect(() => {
    if (project?.projectId) {
      setProjectId(project.projectId);
    }
  }, [project?.projectId, setProjectId]);

  useEffect(() => {
    if (project?.projectStatus) {
      setNewStatus(project.projectStatus);
    }
  }, [project?.projectStatus, setNewStatus]);

  /* ================= EMPTY / LOADING STATE ================= */

  if (!project) {
    return (
      <section className="flex-1 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 flex items-center justify-center">
        {detailsLoading ? (
          <div className="flex flex-col items-center text-gray-500 text-sm">
            <span className="text-2xl mb-2 animate-spin">⏳</span>
            <p className="animate-pulse">Loading project details...</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            👈 Select a project to view details
          </p>
        )}
      </section>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <section className="flex-1 rounded-2xl bg-white shadow-lg border p-6">
      {/* Global Project Error */}
      {detailsError && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {detailsError}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* ================= PROJECT DETAILS ================= */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📁 Project Details
          </h3>

          <div className="space-y-3 text-sm">
            <DetailRow label="Project ID" value={project.projectId} />
            <DetailRow label="Project Name" value={project.projectName} />
            <DetailRow label="Location" value={project.siteLocation} />
            <DetailRow
              label="Start Date"
              value={formatDate(project.startDate)}
            />
            <DetailRow label="End Date" value={formatDate(project.endDate)} />
            <DetailRow
              label="Completed At"
              value={
                project?.completedAt
                  ? formatDate(project.completedAt)
                  : "Work in progress"
              }
            />

            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Status</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                  ${
                    project.projectStatus === "completed"
                      ? "bg-green-100 text-green-700"
                      : project.projectStatus === "cancelled"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
              >
                {project.projectStatus}
              </span>
            </div>
          </div>

          {/* Work Summary */}
          <div className="mt-5 rounded-xl bg-gray-50 p-4 border">
            <p className="text-sm font-medium text-gray-700 mb-1">
              📝 Work Summary
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {project.workSummary}
            </p>
          </div>
        </div>

        {/* ================= UPDATE SECTION ================= */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-gradient from-red-50 to-white p-5"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            ✍️ Add Project Update
          </h3>

          {/* Validation / API Errors */}
          {(validationError || errorMessage) && (
            <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {validationError || errorMessage}
            </div>
          )}

          <textarea
            rows={4}
            value={updateText}
            disabled={project.projectStatus !== "ongoing"}
            onChange={(e) => setUpdateText(e.target.value)}
            placeholder="Describe today’s progress, issues, or milestones..."
            className="w-full rounded-xl border px-4 py-3 text-sm resize-none
    focus:outline-none focus:ring-2 focus:ring-red-500
    disabled:bg-gray-100 disabled:text-gray-400
    disabled:cursor-not-allowed"
          />

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Update Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Update Date
              </label>
              <input
                type="date"
                value={updateDate}
                disabled={project.projectStatus !== "ongoing"}
                onChange={(e) => setUpdateDate(e.target.value)}
                className="w-full rounded-xl border px-4 py-2 text-sm
    focus:outline-none focus:ring-2 focus:ring-red-500
    disabled:bg-gray-100 disabled:text-gray-400
    disabled:cursor-not-allowed"
              />
            </div>

            {/* Update Status */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Update Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                disabled={project.projectStatus !== "ongoing"}
                className="w-full rounded-xl border px-4 py-2 text-sm
    focus:outline-none focus:ring-2 focus:ring-red-500
    disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || project.projectStatus !== "ongoing"}
            className="mt-5 w-full rounded-xl bg-red-600 py-2.5 text-sm font-medium text-white
              hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "🚀 Submit Update"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ================= REUSABLE ROW ================= */

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed pb-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800 text-right">
        {value || "—"}
      </span>
    </div>
  );
}

export default ProjectDetails;
