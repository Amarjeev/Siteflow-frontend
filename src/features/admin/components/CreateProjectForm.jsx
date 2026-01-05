import { useAdminCreateProject } from "../hooks/useAdminCreateProject";

function CreateProjectForm() {
  const { project, handleSubmit, handleChange, errorMessage, loading } =
    useAdminCreateProject();

  return (
    <div className="bg-white border-4 rounded-lg shadow relative m-10">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold">Create Project</h3>
      </div>

      {/* Global Error Message */}
      {errorMessage && (
        <div className="px-6 pt-4">
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {errorMessage}
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-6 gap-6">
          {/* Project Name */}
          <div className="col-span-6 sm:col-span-3">
            <label className="text-sm font-medium text-gray-900 block mb-2">
              Project Name
            </label>
            <input
              type="text"
              name="projectName"
              minLength={3}
              maxLength={60}
              value={project.projectName}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
              required
            />
          </div>

          {/* Site Location */}
          <div className="col-span-6 sm:col-span-3">
            <label className="text-sm font-medium text-gray-900 block mb-2">
              Site Location
            </label>
            <input
              type="text"
              name="siteLocation"
              minLength={3}
              maxLength={150}
              value={project.siteLocation}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
              required
            />
          </div>

          {/* Start Date */}
          <div className="col-span-6 sm:col-span-3">
            <label className="text-sm font-medium text-gray-900 block mb-2">
              Project Starting Date
            </label>
            <input
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
              required
            />
          </div>

          {/* End Date */}
          <div className="col-span-6 sm:col-span-3">
            <label className="text-sm font-medium text-gray-900 block mb-2">
              Project Ending Date
            </label>
            <input
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
              required
            />
          </div>

          {/* Work Summary */}
          <div className="col-span-full">
            <label className="text-sm font-medium text-gray-900 block mb-2">
              Work Summary
            </label>
            <textarea
              rows="6"
              name="workSummary"
              minLength={10}
              maxLength={500}
              value={project.workSummary}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 rounded-lg w-full p-4"
              placeholder="Details"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="border-t pt-6 flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className={`flex items-center justify-center gap-2 
    text-white font-medium rounded-lg text-sm px-5 py-2.5
    ${
      loading
        ? "bg-cyan-400 cursor-not-allowed"
        : "bg-cyan-600 hover:bg-cyan-700"
    }
  `}
          >
            {loading && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Saving..." : "Save all"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProjectForm;
