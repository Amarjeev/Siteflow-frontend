import { Link } from "react-router-dom";
import { useNavbar } from "../hooks/useNavbar";

function Navbar() {
  const { userRole, handleExit, menuOpen, setMenuOpen } = useNavbar();

  return (
    <nav className="mx-2 my-2 px-4 sm:px-6 lg:px-8 sticky top-2 z-30 rounded-xl sm:rounded-full bg-white/80 backdrop-blur-xl shadow">
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-red-600">Sit</span>
          <span className="text-gray-900">Flow</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          {userRole && (
            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px]">
                👤
              </span>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          )}

          {userRole === "admin" && (
            <>
              <Link
                to={userRole ? "/login" : "#"}
                onClick={(e) => !userRole && e.preventDefault()}
                className={`px-4 py-1.5 rounded-full text-sm transition-all
              ${
                userRole
                  ? "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  : "border border-gray-300 text-gray-400 cursor-not-allowed"
              }
            `}
              >
                Login
              </Link>

              <Link
                to={userRole ? "/signup" : "#"}
                onClick={(e) => !userRole && e.preventDefault()}
                className={`px-4 py-1.5 rounded-full text-sm transition-all
              ${
                userRole
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
              >
                Signup
              </Link>
            </>
          )}

          {/* Exit Button */}
          {userRole && (
            <button
              onClick={handleExit}
              className="px-4 py-1.5 rounded-full text-sm border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              🚪 Exit
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 rounded-xl bg-white shadow p-4">
          {userRole && (
            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px]">
                👤
              </span>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          )}

          {userRole === "admin" && (
            <>
              <Link
                to={userRole ? "/login" : "#"}
                onClick={(e) => !userRole && e.preventDefault()}
                className={`block w-full text-center py-2 rounded-lg text-sm
              ${
                userRole
                  ? "border border-red-600 text-red-600"
                  : "border border-gray-300 text-gray-400 cursor-not-allowed"
              }
            `}
              >
                Login
              </Link>

              <Link
                to={userRole ? "/signup" : "#"}
                onClick={(e) => !userRole && e.preventDefault()}
                className={`block w-full text-center py-2 rounded-lg text-sm
              ${
                userRole
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
              >
                Signup
              </Link>
            </>
          )}

          {userRole && (
            <button
              onClick={handleExit}
              className="block w-full py-2 rounded-lg text-sm border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              🚪 Exit
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
