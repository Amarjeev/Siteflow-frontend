import SupervisorNavbar from "../../../layouts/navbar/SupervisorNavbar";
import { useFetchStaffProfile } from "../../../hooks/common/projects/useFetchStaffProfile";
import { useUpdateStaffProfile } from "../../../hooks/common/projects/useUpdateStaffProfile";

/* ================= MAIN COMPONENT ================= */

function ProfileDeatilesSup() {
  const {
    engineerProfile,
    fetchLoadingProfile,
    fetchProfileError,
    handleFetchProfile,
  } = useFetchStaffProfile();

  const {
    profile,
    isEditing,
    setIsEditing,
    showPassword,
    setShowPassword,
    passwords,
    updateError,
    handleProfileChange,
    handlePasswordChange,
    handleSaveProfile,
    handleChangePassword,
    handleLogout,
    updateLoadingProfile,
    pwdLoadingProfile,
    handleCancel,
  } = useUpdateStaffProfile(engineerProfile, handleFetchProfile);

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* NAVBAR */}
      <SupervisorNavbar />

      {/* PAGE CONTENT */}
      <main className="flex-1 bg-black">
        {/* LOADING */}
        {fetchLoadingProfile && <ProfileSkeleton />}

        {/* ERROR */}
        {fetchProfileError && (
          <div className="flex justify-center px-4 pt-6">
            <div className="w-full max-w-4xl rounded-xl border border-red-800 bg-red-900/30 px-4 py-3 text-sm text-red-300">
              ⚠️ {fetchProfileError}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {profile && (
          <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* ================= HEADER ================= */}
            <div className="rounded-2xl bg-gray-900 border border-gray-800 shadow p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-100">
                  👷 Engineer Profile
                </h2>
                <p className="text-sm text-gray-400">
                  Manage your personal information
                </p>
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-xl bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600"
                  >
                    ✏️ Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      disabled={updateLoadingProfile}
                      className="rounded-xl bg-green-700 px-4 py-2 text-sm text-white disabled:opacity-60"
                    >
                      {updateLoadingProfile ? (
                        <ButtonLoader text="Saving..." />
                      ) : (
                        "💾 Save"
                      )}
                    </button>

                    <button
                      onClick={handleCancel}
                      className="rounded-xl border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-600"
                >
                  🚪 Logout
                </button>
              </div>
            </div>

            {/* ================= PROFILE INFO ================= */}
            <div className="rounded-2xl bg-gray-900 border border-gray-800 shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-100">
                📄 Profile Information
              </h3>

              {updateError && (
                <div className="mb-4 text-sm text-red-300 bg-red-900/30 border border-red-800 rounded-lg px-4 py-2">
                  {updateError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Input
                  label="Full Name"
                  name="username"
                  value={profile.username}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
                <Input label="Role" value={profile.role} disabled />
                <Input label="User ID" value={profile.userId} disabled />
                <Input
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
                <Input
                  label="Mobile"
                  name="mobile"
                  value={profile.mobile}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* ================= PASSWORD ================= */}
            <div className="rounded-2xl bg-gray-900 border border-gray-800 shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-100">
                🔐 Change Password
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <PasswordInput
                  name="newPassword"
                  placeholder="New"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  show={showPassword}
                />
                <PasswordInput
                  name="confirmPassword"
                  placeholder="Confirm"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  show={showPassword}
                />
              </div>

              <div className="mt-4 flex justify-between items-center">
                <label className="flex gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  Show password
                </label>

                <button
                  onClick={handleChangePassword}
                  disabled={pwdLoadingProfile}
                  className="rounded-xl bg-gray-700 px-4 py-2 text-sm text-white disabled:opacity-60 hover:bg-gray-600"
                >
                  {pwdLoadingProfile ? (
                    <ButtonLoader text="Updating..." />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-gray-400 text-sm">{label}</label>
      <input
        {...props}
        className={`mt-1 w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100
        focus:outline-none focus:ring-2 focus:ring-gray-600
        ${props.disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      />
    </div>
  );
}

function PasswordInput({ show, ...props }) {
  return (
    <input
      {...props}
      type={show ? "text" : "password"}
      className="rounded-xl border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100
      focus:outline-none focus:ring-2 focus:ring-gray-600"
    />
  );
}

/* ================= LOADERS ================= */

function ButtonLoader({ text }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      {text}
    </span>
  );
}

function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 animate-pulse bg-black">
      <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-2">
        <div className="h-5 w-40 bg-gray-700 rounded" />
        <div className="h-4 w-64 bg-gray-700 rounded" />
      </div>

      <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="h-4 w-24 bg-gray-700 rounded mb-1" />
            <div className="h-10 w-full bg-gray-700 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileDeatilesSup;
