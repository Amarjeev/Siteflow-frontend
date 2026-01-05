import SupervisorNavbar from "../../../layouts/navbar/SupervisorNavbar";
import {useSupervisorCreateLabourProfile } from "../hooks/useSupervisorCreateLabourProfile";
import { useSupervisorLabourProfile } from "../hooks/useSupervisorLabourProfile";

/* ================= MAIN COMPONENT ================= */

function CreateLabourProfile() {
  const {
    formData,
    loading,
    errorMessage,
    createdLabour,
    showPoster,
    setShowPoster,
    handleChange,
    handleSubmit,
  } = useSupervisorCreateLabourProfile();

  const {
    isUpdating,
    updateError,
    searchValue,
    searchedLabour,
    setSearchValue,
    handleSearch,
    handleSaveInlineEdit,
    isInlineEdit,
    setEditData,
    editData,
    setIsInlineEdit,
    isDeleting,
    handleDeleteProfile,
  } = useSupervisorLabourProfile();

  const canEdit = true;

  return (
    <div className="min-h-screen bg-black text-white">
      <SupervisorNavbar />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* ================= CREATE SECTION ================= */}

        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-6">
            🧑‍🔧 Create Labour Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <h1 className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 animate-[fadeIn_0.3s_ease-out]">
                {errorMessage}
              </h1>
            )}

            <div>
              <label className="text-sm text-gray-400">Labour Name</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-black border border-neutral-700 px-4 py-2 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Mobile</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full bg-black border border-neutral-700 px-4 py-2 rounded-lg text-sm"
              />
            </div>

            <button
              disabled={loading}
              className={`w-full sm:w-auto flex items-center justify-center gap-2
              bg-white text-black px-6 py-2 rounded-xl text-sm font-medium
              transition-all duration-300
              ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? "Creating..." : "Create Profile"}
            </button>
          </form>
        </div>

        {/* ================= SEARCH SECTION ================= */}

        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-4">
            🔍 Search Labour Profile
          </h2>

          {updateError && (
            <h1 className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 animate-[fadeIn_0.3s_ease-out]">
              {updateError}
            </h1>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter Labour ID or Mobile Number"
              className="flex-1 bg-black border border-neutral-700 px-4 py-2 rounded-lg text-sm"
            />
            <button
              onClick={handleSearch}
              disabled={isUpdating}
              className={`flex items-center justify-center gap-2
    bg-white text-black px-6 py-2 rounded-lg text-sm font-medium
    transition-all duration-300
    ${isUpdating ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
            >
              {isUpdating && (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              )}
              {isUpdating ? "Searching..." : "Search"}
            </button>
          </div>

          {/* ================= SEARCH RESULT + INLINE EDIT ================= */}

          {searchedLabour && (
            <div className="mt-6 bg-black border border-neutral-800 rounded-xl p-5 space-y-3 text-sm">
              <p>
                <span className="text-gray-400">Labour ID:</span>{" "}
                {searchedLabour.labourId}
              </p>

              <p>
                <span className="text-gray-400">Name:</span>
                <span className="ml-2">
                  {isInlineEdit ? (
                    <input
                      value={editData?.username || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, username: e.target.value })
                      }
                      className="bg-black border border-neutral-700 px-2 py-1 rounded"
                    />
                  ) : (
                    searchedLabour.username
                  )}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Mobile:</span>{" "}
                {isInlineEdit ? (
                  <input
                    value={editData?.mobile || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, mobile: e.target.value })
                    }
                    className="ml-2 bg-black border border-neutral-700 px-2 py-1 rounded"
                  />
                ) : (
                  searchedLabour.mobile
                )}
              </p>

              <div className="flex gap-3 pt-3">
                {!isInlineEdit ? (
                  <>
                    <button
                      onClick={() => {
                        setEditData({ ...searchedLabour });
                        setIsInlineEdit(true);
                      }}
                      disabled={!canEdit}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        canEdit
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-neutral-700 cursor-not-allowed"
                      }`}
                    >
                      Edit
                    </button>

                    <button
                      disabled={isDeleting}
                      onClick={() =>
                        handleDeleteProfile(searchedLabour.labourId)
                      }
                      className="
    px-4 py-2 rounded-lg text-sm font-medium text-white
    bg-red-600 hover:bg-red-700
    transition-all duration-200 ease-out
    active:scale-95
    flex items-center justify-center gap-2
    disabled:opacity-60 disabled:cursor-not-allowed
  "
                    >
                      {isDeleting && (
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      disabled={isUpdating}
                      onClick={handleSaveInlineEdit}
                      className={`
    px-4 py-2 rounded-lg text-sm font-medium text-white
    bg-green-600 hover:bg-green-700
    transition-all duration-200 ease-out
    active:scale-95
    disabled:opacity-60 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  `}
                    >
                      {isUpdating && (
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      {isUpdating ? "Saving..." : "Save"}
                    </button>

                    <button
                      onClick={() => {
                        setIsInlineEdit(false);
                        setEditData(null);
                      }}
                      className="px-4 py-2 rounded-lg text-sm bg-neutral-700 hover:bg-neutral-600"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= SUCCESS POSTER ================= */}

      {showPoster && (
        <LabourPosterModal
          data={createdLabour}
          onClose={() => setShowPoster(false)}
        />
      )}
    </div>
  );
}

/* ================= POSTER MODAL ================= */

function LabourPosterModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-4">
          🎉 Labour Created Successfully
        </h3>

        <div className="space-y-3 text-sm">
          <p>
            <span className="text-gray-400">Labour Name:</span>{" "}
            <span className="font-medium">{data.name}</span>
          </p>
          <p>
            <span className="text-gray-400">Labour ID:</span>{" "}
            <span className="font-medium">{data.labourId}</span>
          </p>
          <p>
            <span className="text-gray-400">Mobile:</span>{" "}
            <span className="font-medium">{data.mobile}</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-white text-black py-2 rounded-xl text-sm font-medium hover:opacity-90"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CreateLabourProfile;
