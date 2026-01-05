import SupervisorNavbar from "../../../layouts/navbar/SupervisorNavbar";
import { useSupervisorVerifyProjectAndLabour } from "../hooks/useSupervisorVerifyProjectAndLabour";
import { useSupervisorAssignJobToLabour } from "../hooks/useSupervisorAssignJobToLabour";
import { useEffect } from "react";
import { Link } from "react-router";

function AssigneJobsToLabour() {
  const {
    projectId,
    setProjectId,
    labourId,
    setLabourId,
    project,
    labour,
    verifyError,
    loadingVerify,
    handleVerify,
    handleClear,
  } = useSupervisorVerifyProjectAndLabour();

  const {
    assignJobData,
    errorMessage,
    loading,
    handleChange,
    handleAssignJob,
    setIds,
  } = useSupervisorAssignJobToLabour();

  useEffect(() => {
    if (project && labour) {
      setIds(labour.labourId, project.projectId);
    }
  }, [project, labour, setIds]);

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* ================= COMMON INPUT CLASS ================= */
  const inputClass =
    "w-full bg-white text-black placeholder:text-gray-500 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40";

  return (
    <div className="min-h-screen bg-black text-white">
      <SupervisorNavbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-6">
          🛠 Assign Job to Labour
        </h1>

        {/* ================= ERROR ================= */}
        {verifyError && (
          <div className="mb-3 text-sm text-red-400 bg-red-950 border border-red-800 rounded-lg px-4 py-2">
            {verifyError}
          </div>
        )}

        {/* ================= SEARCH ================= */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          {/* EDIT ASSIGNED JOB BUTTON */}
          <Link
            to={"/supervisor/job-assignments/edit"}
            className="
      px-2 py-1.5 text-sm rounded-md
      border border-yellow-500/60 text-yellow-300
      hover:bg-yellow-500/10
      transition-all duration-200
      active:scale-95
    "
          >
            ✏️ Edit Assigned Job
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Project ID */}
            <input
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="Enter Project ID"
              className={inputClass}
            />

            {/* Labour ID */}
            <input
              value={labourId}
              onChange={(e) => setLabourId(e.target.value)}
              placeholder="Enter Labour ID or Mobile"
              className={inputClass}
            />

            {/* Buttons */}
            <div className="flex gap-3 md:justify-end">
              <button
                onClick={handleVerify}
                disabled={loadingVerify}
                className="
          rounded-md bg-white text-black font-medium
           h-10.5 px-6
          transition-all duration-200
          hover:bg-gray-200
          active:scale-95
          disabled:opacity-60 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
        "
              >
                {loadingVerify ? (
                  <>
                    <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Checking...
                  </>
                ) : (
                  "Check"
                )}
              </button>

              <button
                onClick={handleClear}
                className="
          rounded-md border border-neutral-600 text-neutral-300
            h-10.5 px-6
          transition-all duration-200
          hover:bg-neutral-800 hover:text-white
          active:scale-95
        "
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        {/* ================= DETAILS ================= */}
        {(project || labour) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {project && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                <h2 className="text-lg font-semibold mb-4">
                  📋 Project Details
                </h2>
                <Detail label="Project ID" value={project.projectId} />
                <Detail label="Project Name" value={project.projectName} />
                <Detail label="Location" value={project.siteLocation} />
                <Detail
                  label="Project Status"
                  value={project.projectStatus}
                  badge
                />
                <Detail
                  label="Project StartDate"
                  value={formatDate(project.startDate)}
                />
                <Detail
                  label="Project EndDate"
                  value={formatDate(project.endDate)}
                />
              </div>
            )}

            {labour && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                <h2 className="text-lg font-semibold mb-4">
                  👷 Labour Profile
                </h2>
                <Detail label="Labour ID" value={labour.labourId} />
                <Detail label="Name" value={labour.username} />
                <Detail label="Mobile" value={labour.mobile} />
              </div>
            )}
          </div>
        )}

        {/* ================= ASSIGN JOB (NEW THEME) ================= */}
        {project && labour && (
          <div className="mt-6 bg-gradient from-slate-900 via-blue-950 to-slate-900 border border-blue-800/40 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-200">
              📝 Assign Job
            </h2>

            {/* ================= ERROR ================= */}
            {errorMessage && (
              <div className="mb-3 text-sm text-red-400 bg-red-950 border border-red-800 rounded-lg px-4 py-2">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm text-blue-300">
                  Job Date
                </label>
                <input
                  type="date"
                  name="jobDate"
                  value={assignJobData.jobDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-blue-300">
                  Start Time
                </label>
                <input
                  type="time"
                  name="jobStartTime"
                  value={assignJobData.jobStartTime}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-blue-300">
                  End Time
                </label>
                <input
                  type="time"
                  name="jobEndTime"
                  value={assignJobData.jobEndTime}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-sm text-blue-300">
                  Job Description
                </label>
                <textarea
                  rows={3}
                  name="jobDescription"
                  value={assignJobData.jobDescription}
                  onChange={handleChange}
                  placeholder="Describe the job to be assigned"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            <button
              onClick={handleAssignJob}
              disabled={loading}
              className={`
        mt-4 px-6 py-2 rounded-md font-medium
        flex items-center justify-center gap-2
        transition-all duration-300 ease-in-out transform
        ${
          loading
            ? "bg-slate-700 text-slate-400 cursor-not-allowed scale-95"
            : "bg-blue-600 text-white hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
        }
      `}
            >
              {loading && (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Assigning..." : "Assign Job"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= DETAIL COMPONENT ================= */
const Detail = ({ label, value, badge }) => (
  <div className="flex items-start justify-between gap-4 text-sm mb-3">
    <span className="text-gray-400 whitespace-nowrap">{label}</span>

    {badge ? (
      <span
        className="px-3 py-1 rounded-full text-xs font-medium
        bg-emerald-950 text-emerald-300
        border border-emerald-800"
      >
        {value}
      </span>
    ) : (
      <span className="font-medium text-right text-gray-200 max-w-[65%]">
        {value}
      </span>
    )}
  </div>
);

export default AssigneJobsToLabour;
