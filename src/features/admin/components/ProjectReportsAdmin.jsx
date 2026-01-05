import { useEffect } from "react";
import AdminNavbar from "../../../layouts/navbar/AdminNavbar";
import { useAdminProjectDetails } from "../hooks/useAdminProjectDetails";
import { useAdminProjectReportsDetails } from "../hooks/useAdminProjectReportsDetails";
import { useAdminDeleteProjectReports } from "../hooks/useAdminDeleteProjectReports";
import InfiniteScroll from "react-infinite-scroll-component";

function ProjectReportsAdmin() {
  const { project, loading } = useAdminProjectDetails();

  const {
    reports,
    formatDate,
    hasMore,
    fetchMoreReports,
    setProjectId,
    removeReportById,
  } = useAdminProjectReportsDetails();

  const { handleDeleteReport, deletingId } = useAdminDeleteProjectReports();

  useEffect(() => {
    if (project?.projectId) {
      setProjectId(project.projectId);
    }
  }, [project?.projectId, setProjectId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <section className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-6 text-xl font-semibold text-gray-800">
          Project Reports –{" "}
          <span className="text-blue-600">
            {loading ? "Loading..." : project?.projectId}
          </span>
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ================= LEFT : PROJECT DETAILS ================= */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Project Details
            </h2>

            {loading ? (
              /* 🔹 DIRECT SKELETON */
              <div className="animate-pulse space-y-3">
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="h-4 w-1/3 rounded bg-gray-200" />
                <div className="h-4 w-1/3 rounded bg-gray-200" />
                <div className="mt-4 h-20 rounded bg-gray-200" />
              </div>
            ) : (
              <>
                <Detail label="Project ID" value={project?.projectId} />
                <Detail label="Project Name" value={project?.projectName} />
                <Detail label="Location" value={project?.siteLocation} />
                <Detail
                  label="Start Date"
                  value={formatDate(project?.startDate)}
                />
                <Detail label="End Date" value={formatDate(project?.endDate)} />

                <div className="mt-3">
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {project?.projectStatus}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600">
                    Work Summary
                  </p>
                  <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                    {project?.workSummary}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* ================= RIGHT : PROJECT REPORTS ================= */}
          <div className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Project Reports
              </h2>
              <span className="text-xs text-gray-500">
                Total: {reports.length}
              </span>
            </div>

            <div id="reportsScroll" className="max-h-130 overflow-y-auto pr-2">
              <InfiniteScroll
                dataLength={reports.length}
                next={() => fetchMoreReports(project?.projectId)}
                hasMore={hasMore}
                scrollableTarget="reportsScroll"
                loader={
                  <p className="py-3 text-center text-sm text-gray-500">
                    Loading more reports…
                  </p>
                }
                endMessage={
                  <p className="py-3 text-center text-xs text-gray-400">
                    No more reports
                  </p>
                }
              >
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report._id}
                      className="group rounded-lg border bg-linear-to-br from-white to-gray-50 p-4 transition hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">
                          Engineer ID:{" "}
                          <span className="font-semibold">
                            {report.engineerId}
                          </span>
                        </p>

                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-medium text-blue-700">
                            {report.projectStatus}
                          </span>

                          <button
                            disabled={deletingId === report._id}
                            onClick={async () => {
                              const success = await handleDeleteReport(
                                report._id
                              );
                              if (success) {
                                removeReportById(report._id);
                              }
                            }}
                            className={`
    relative flex items-center gap-2
    rounded-md border border-red-200 px-2 py-1 text-xs font-medium
    text-red-600 transition-all duration-200
    hover:bg-red-50 hover:scale-105
    disabled:cursor-not-allowed disabled:opacity-60
    ${deletingId === report._id ? "animate-pulse" : ""}
  `}
                          >
                            {deletingId === report._id && (
                              <span className="h-3 w-3 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                            )}

                            {deletingId === report._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed">
                        {report.progressSummary}
                      </p>

                      <div className="mt-2 text-xs text-gray-500">
                        Uploaded On: {formatDate(report.updateDate)}
                      </div>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const Detail = ({ label, value }) => (
  <div className="mb-3">
    <p className="text-xs font-medium text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value}</p>
  </div>
);

export default ProjectReportsAdmin;
