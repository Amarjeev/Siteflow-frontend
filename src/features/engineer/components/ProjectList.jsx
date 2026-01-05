function ProjectList({ projectState }) {
  const {
    listLoading,
    searchProjectId,
    setSearchProjectId,
    statusFilter,
    setStatusFilter,
    projects,
    fetchProjects,
    activeProjectId,
    setActiveProjectId,
    listError,
  } = projectState;

  return (
    <aside className="w-full lg:w-80 rounded-2xl bg-white shadow-lg border border-gray-100 p-5">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        📌 Assigned Projects
      </h2>

      {/* Error Banner */}
      {listError && (
        <div className="mb-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="mt-0.5">⚠️</span>
          <p className="leading-snug">{listError}</p>
        </div>
      )}

      {/* Search */}
      <div className="flex gap-2 mb-3">
        <input
          value={searchProjectId}
          onChange={(e) => setSearchProjectId(e.target.value)}
          placeholder="Search by ID or name..."
          className="flex-1 rounded-xl border px-4 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={fetchProjects}
          disabled={listLoading}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white
    transition-all duration-200
    hover:bg-red-700 hover:-translate-y-0.5
    active:scale-95"
        >
          <span className="inline-block transition-transform duration-300 hover:rotate-12">
            🔍
          </span>
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { key: "ongoing", label: "Ongoing" },
          { key: "completed", label: "Completed" },
          { key: "cancelled", label: "Cancelled" },
        ].map((filter) => {
          const isActive = statusFilter === filter.key;

          const activeColors = {
            ongoing: "bg-red-600 text-white",
            completed: "bg-green-600 text-white",
            cancelled: "bg-gray-600 text-white",
          };

          return (
            <button
              key={filter.key}
              disabled={listLoading}
              onClick={() => setStatusFilter(filter.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition
                ${
                  isActive
                    ? `${activeColors[filter.key]} scale-105`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Project List */}
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        {projects && projects.length > 0 ? (
          projects.map((project) => {
            const isActive = activeProjectId === project._id;

            return (
              <div
                key={project?.projectId}
                onClick={() => setActiveProjectId(project?.projectId)}
                className={`cursor-pointer rounded-xl border p-4 transition-all
                  ${
                    isActive
                      ? "border-red-500 bg-red-50 shadow-sm"
                      : "border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                  }`}
              >
                <p className="text-[11px] text-gray-500 truncate">
                  {project.projectId}
                </p>

                <p className="mt-1 font-medium text-sm text-gray-800 leading-snug">
                  {project.projectName}
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-0.5 text-[11px] font-medium capitalize
                    ${
                      project.projectStatus === "completed"
                        ? "bg-green-100 text-green-700"
                        : project.projectStatus === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {project.projectStatus}
                </span>
              </div>
            );
          })
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {listLoading && (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400 text-sm">
                <span className="text-2xl mb-2 animate-spin">⏳</span>
                <p className="animate-pulse">Fetching projects...</p>
              </div>
            )}

            {!listLoading && projects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400 text-sm">
                <span className="text-2xl mb-2">📭</span>
                <p>No projects match your filter</p>
              </div>
            )}

            {!listLoading &&
              projects.length > 0 &&
              projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default ProjectList;
