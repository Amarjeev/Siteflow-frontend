function ProjectSearchBar({
  projectId,
  setProjectId,
  projectStatus,
  setProjectStatus,
  startDate,
  setStartDate,
  handleClear,
}) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Project ID */}
        <input
          type="text"
          placeholder="Search Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        {/* Status */}
        <select
          value={projectStatus}
          onChange={(e) => setProjectStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
        >
          <option value="">All Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Start Date */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="w-full bg-gray-100 text-gray-700 rounded-md px-3 py-2 text-sm font-medium"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default ProjectSearchBar;
