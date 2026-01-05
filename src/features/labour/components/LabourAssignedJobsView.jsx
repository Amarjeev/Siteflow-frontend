import { useState } from "react";
import LabourNavbar from "../../../layouts/navbar/LabourNavbar";
import { useFetchLabourAssignedJobs } from "../hooks/useFetchLabourAssignedJobs";
import { useAssignedJobDetails } from "../hooks/useAssignedJobDetails";
import { formatTime } from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";
import { getDuration } from "../../../utils/getDuration";

function LabourAssignedJobsView() {
  const [openProjectIndex, setOpenProjectIndex] = useState(null);
  const [openSupervisorIndex, setOpenSupervisorIndex] = useState(null);

  /* ================= JOB LIST ================= */
  const {
    labourInput,
    setLabourInput,
    jobDate,
    setJobDate,
    jobs,
    jobsLoading,
    jobsDetailsError,
    handleSubmit,
    labourProfile,
  } = useFetchLabourAssignedJobs();

  /* ================= ASSIGNED JOB DETAILS ================= */
  const {
    supervisor,
    project,
    loading: detailsLoading,
    error: detailsError,
    handleFetchSupervisorInfo,
    handleFetchProjectInfo,
  } = useAssignedJobDetails();

  return (
    <>
      <LabourNavbar />

      <div className="min-h-screen bg-linear-to-br from-emerald-50 to-white px-4 py-6">
        <div className="mx-auto max-w-6xl space-y-6">

          {/* ================= SEARCH ================= */}
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Search Assigned Jobs
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-3">
              <input
                type="text"
                value={labourInput}
                onChange={(e) => setLabourInput(e.target.value)}
                placeholder="Labour ID or Mobile Number"
                className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-300"
              />

              <input
                type="date"
                value={jobDate}
                onChange={(e) => setJobDate(e.target.value)}
                className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-300"
              />

              <button
                type="submit"
                disabled={jobsLoading}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {jobsLoading ? "Searching..." : "Search"}
              </button>
            </form>

            {/* ================= LABOUR PROFILE ================= */}
            {labourProfile && (jobs.length > 0 || jobsLoading) && (
              <div className="relative mt-4 overflow-hidden rounded-2xl bg-white p-6 shadow-lg">
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-400 to-emerald-600" />

                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Labour Profile
                    </h3>
                    <p className="text-xs text-gray-500">
                      Verified labour information
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    ● Active
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs uppercase text-gray-500">Labour Name</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {labourProfile.username}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs uppercase text-gray-500">Labour ID</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {labourProfile.userId}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {jobsDetailsError && (
              <p className="mt-3 text-sm text-red-600">{jobsDetailsError}</p>
            )}
          </div>

          {/* ================= JOB GRID ================= */}
          {jobs.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Assigned Jobs
                </h3>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {jobs.length} Jobs
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job, index) => (
                  <div
                    key={job._id}
                    className="rounded-2xl bg-white p-5 shadow-md hover:shadow-lg"
                  >
                    <p className="mb-4 text-sm text-gray-700">
                      {job.jobDescription}
                    </p>

                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {formatDate(job.jobDate)}
                      </p>

                      <p>
                        <span className="font-medium">Time:</span>{" "}
                        {formatTime(job.jobStartTime)} –{" "}
                        {formatTime(job.jobEndTime)}
                        <span className="ml-1 text-xs text-gray-500">
                          {getDuration(job.jobStartTime, job.jobEndTime)}
                        </span>
                      </p>

                      {/* ================= SUPERVISOR ================= */}
                      <button
                        type="button"
                        onClick={async () => {
                          if (openSupervisorIndex === index) {
                            setOpenSupervisorIndex(null);
                            return;
                          }

                          setOpenSupervisorIndex(index);
                          await handleFetchSupervisorInfo({ jobId: job?._id });
                        }}
                        className="mt-2 inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                      >
                        👤 Assigned by Supervisor
                        <span>
                          {openSupervisorIndex === index ? "▲" : "▼"}
                        </span>
                      </button>

                      {openSupervisorIndex === index && (
                        <>
                          {detailsLoading && (
                            <p className="text-xs text-gray-400">
                              Loading supervisor details…
                            </p>
                          )}

                          {detailsError && (
                            <p className="text-xs text-red-500">
                              {detailsError}
                            </p>
                          )}

                          {supervisor && (
                            <div className="rounded-xl bg-gray-50 p-3">
                              <p className="text-xs text-gray-500">
                                Assigned By
                              </p>

                              <div className="mt-1 flex items-center justify-between">
                                <p className="text-sm font-semibold text-gray-800">
                                  {supervisor.name}
                                </p>

                                <a
                                  href={`tel:${supervisor.mobile}`}
                                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                                >
                                  📞 Contact
                                </a>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span className="capitalize text-emerald-600">
                          {job.status}
                        </span>
                      </p>
                    </div>

                    {/* ================= PROJECT ================= */}
                    <button
                      onClick={async () => {
                        if (openProjectIndex === index) {
                          setOpenProjectIndex(null);
                          return;
                        }

                        setOpenProjectIndex(index);
                        await handleFetchProjectInfo({ jobId: job._id });
                      }}
                      className="mt-4 w-full rounded-lg border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                    >
                      {openProjectIndex === index
                        ? "Hide Project Details"
                        : "Show Project Details"}
                    </button>

                    {openProjectIndex === index && project && (
                      <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm">
                        <p>
                          <span className="font-medium">Project:</span>{" "}
                          {project.projectName}
                        </p>
                        <p>
                          <span className="font-medium">Location:</span>{" "}
                          {project.siteLocation}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          {project.projectStatus}
                        </p>
                        <p className="mt-2">{project.workSummary}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {!jobsLoading && jobs.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              No jobs found for the selected date.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default LabourAssignedJobsView;
