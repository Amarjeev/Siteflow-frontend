import { Link } from "react-router-dom";
import { useAdminLogout } from "../hooks/useAdminLogout";
import { useAdminNavLogic } from "../hooks/useAdminNavLogic";
import { useAdminDelete } from "../hooks/useAdminDelete";

function AdminNavbar() {
  const {
    adminName,
    adminEmail,
    menuOpen,
    setMenuOpen,
    pathname,
    navLinks,
    linkStyle,
  } = useAdminNavLogic();

  const { handleLogout } = useAdminLogout();
  const {
    setOtp,
    otp,
    handleDeleteRequest,
    profileOpen,
    showDeleteModal,
    setProfileOpen,
    handleCancel,
    errorMessage,
    loading,
    handleConfirmDelete,
  } = useAdminDelete();

  return (
    <>
      {/* NAVBAR */}
      <nav className="mx-2 my-2 px-4 sm:px-6 lg:px-8 sticky top-2 z-30 rounded-xl sm:rounded-full bg-white/80 backdrop-blur-xl shadow">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/admin" className="text-2xl font-extrabold tracking-tight">
            <span className="text-red-600">Sit</span>
            <span className="text-gray-900">Flow</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map(([label, link, icon]) => (
              <Link
                key={label}
                to={link}
                className={linkStyle(pathname === link)}
              >
                <span>{icon}</span>
                {label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="relative flex items-center gap-3">
            {/* Avatar */}
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold"
            >
              {adminName?.charAt(0)}
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-12 z-40 w-64 sm:w-72 rounded-2xl bg-white shadow-xl border overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
                    {adminName?.charAt(0)?.toUpperCase() || "A"}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {adminName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {adminEmail}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-3 space-y-1">
                  <button
                    className="w-full flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>

                {/* Danger Zone */}
                <div className="border-t p-3">
                  <button
                    className="w-full flex items-center gap-2 text-sm px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                    onClick={handleDeleteRequest}
                  >
                    🗑️ Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-1 rounded-xl bg-white shadow p-4">
            {navLinks.map(([label, link, icon]) => (
              <Link
                key={label}
                to={link}
                onClick={() => setMenuOpen(false)}
                className={linkStyle(pathname === link)}
              >
                <span>{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* DELETE ACCOUNT OTP MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Account Deletion
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              A <span className="font-medium">5-digit OTP</span> has been sent
              to your registered email:
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-800 truncate">
              {adminEmail}
            </p>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            {/* OTP Input */}
            <input
              autoFocus
              type="text"
              maxLength={5}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 5-digit OTP"
              className={`mt-4 w-full rounded-lg border px-4 py-2 text-center tracking-widest text-lg focus:outline-none focus:ring-2
    ${errorMessage ? "border-red-500 focus:ring-red-500" : "focus:ring-red-500"}
  `}
            />

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                disabled={loading || otp.length !== 5}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminNavbar;
