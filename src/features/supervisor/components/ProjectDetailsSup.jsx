import { useEffect } from "react";
import { useEngineerProjectUpdate } from "../../engineer/hooks/useEngineerProjectUpdate";

function ProjectDetailsSup({ projectState }) {
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

  const { setProjectId, setNewStatus } = useEngineerProjectUpdate();

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
      <section className="flex-1 rounded-2xl border border-dashed border-gray-700 bg-black p-6 flex items-center justify-center">
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
    <section className="flex-1 rounded-2xl bg-black shadow-lg border border-gray-800 p-6">
      {/* Global Project Error */}
      {detailsError && (
        <div className="mb-4 text-sm text-red-300 bg-red-900/30 border border-red-800 rounded-lg px-4 py-2">
          {detailsError}
        </div>
      )}

      <div>
        {/* ================= PROJECT DETAILS ================= */}
        <h3 className="text-lg font-semibold text-gray-100 mb-4">
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
            <span className="text-gray-400">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                ${
                  project.projectStatus === "completed"
                    ? "bg-green-900/40 text-green-300"
                    : project.projectStatus === "cancelled"
                    ? "bg-yellow-900/40 text-yellow-300"
                    : "bg-blue-900/40 text-blue-300"
                }`}
            >
              {project.projectStatus}
            </span>
          </div>
        </div>

        {/* Work Summary */}
        <div className="mt-5 rounded-xl bg-gray-900 p-4 border border-gray-800">
          <p className="text-sm font-medium text-gray-200 mb-1">
            📝 Work Summary
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            {project.workSummary}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================= REUSABLE ROW ================= */

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed border-gray-700 pb-1">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-gray-100 text-right">
        {value || "—"}
      </span>
    </div>
  );
}

export default ProjectDetailsSup;
