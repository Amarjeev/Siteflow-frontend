import React from "react";
import SupervisorNavbar from "../../../layouts/navbar/SupervisorNavbar";
import { useSupervisorFetchAssignedJobs } from "../hooks/useSupervisorFetchAssignedJobs";
import { useSupervisorDeleteAssignedJobs } from "../hooks/useSupervisorDeleteAssignedJobs";

function EditJobAssignment() {
  const {
    searchValue,
    setSearchValue,
    jobDate,
    setJobDate,
    jobs,
    loading,
    errorMessage,
    handleSearch,
    labourProfile,
    formatJobDate,
    formatJobTime,
    toggleReadMore,
    expandedJobs,
  } = useSupervisorFetchAssignedJobs();

  const { handleDelete, deletingJobId, deleteErrors } =
    useSupervisorDeleteAssignedJobs(handleSearch);

  return (
    <div className="min-h-screen bg-black text-white">
      <SupervisorNavbar />

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* ================= SEARCH CARD ================= */}
        <div className="mb-6 rounded-xl border border-white/10 bg-zinc-900 p-5">
          <h2 className="mb-4 text-lg font-semibold">Search Assigned Jobs</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <input
              type="text"
              placeholder="Labour ID or Mobile Number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="rounded-md border border-white/10 bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />

            <input
              type="date"
              value={jobDate}
              onChange={(e) => setJobDate(e.target.value)}
              className="rounded-md border border-white/10 bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-200 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search Jobs"}
            </button>
          </div>

          {errorMessage && (
            <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
          )}
        </div>

        {/* ================= JOB LIST ================= */}
        {!loading && jobs.length === 0 ? (
          <p className="text-center text-sm text-white/60">No jobs found</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group rounded-xl border border-white/10 bg-zinc-900 p-4 shadow-sm transition hover:border-white/20 hover:shadow-lg"
              >
                {/* Header */}
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="text-xs text-white/50">Project ID</p>
                    <p className="text-sm font-medium">{job.projectId}</p>
                  </div>

                  <span className="rounded-full bg-green-600/20 px-2 py-0.5 text-xs text-green-400">
                    {job.status}
                  </span>
                </div>

                {/* Description */}
                <p
                  className={`text-sm text-white/80 ${
                    expandedJobs[job._id] ? "" : "line-clamp-3"
                  }`}
                >
                  {job.jobDescription}
                </p>

                {job.jobDescription?.length > 120 && (
                  <button
                    onClick={() => toggleReadMore(job._id)}
                    className="mb-2 text-xs font-medium text-blue-400 hover:underline"
                  >
                    {expandedJobs[job._id] ? "▲ Read less" : "▼ Read more"}
                  </button>
                )}

                {/* Meta */}
                <div className=" mt-3 space-y-1 text-xs text-white/50">
                  <p>Name: {labourProfile.username}</p>
                  <p>Labour ID: {labourProfile.userId}</p>
                  <p>Mobile Number : {labourProfile.mobile}</p>
                  <p>
                    <strong>Date:</strong> {formatJobDate(job.jobDate)}
                  </p>
                  <p>
                    <strong>Time:</strong> {formatJobTime(job.jobStartTime)} –{" "}
                    {formatJobTime(job.jobEndTime)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleDelete(job._id)}
                    disabled={deletingJobId === job._id}
                    className="rounded-md border border-white/20 px-2 py-1 text-xs text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                  >
                    {deletingJobId === job._id ? "Deleting..." : "🗑"}
                  </button>
                </div>

                {deleteErrors[job._id] && (
                  <p className="mt-1 text-xs text-red-400">
                    {deleteErrors[job._id]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditJobAssignment;
