import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function SupervisorNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `relative px-3 py-1 rounded-full text-sm font-medium transition-all duration-300
     ${
       pathname === path
         ? "text-white bg-white/10 shadow-inner"
         : "text-gray-300 hover:text-white hover:bg-white/5"
     }`;

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/supervisor/dashboard"
            className="text-xl font-bold tracking-wide"
          >
            <span className="text-red-500">Sit</span>
            <span className="text-white">Flow</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/supervisor/labours" className={linkClass("/supervisor/labours")}>
              Labour Profiles
            </Link>

            <Link to="/supervisor/assign-jobs" className={linkClass("/supervisor/assign-jobs")}>
              Assign Jobs
            </Link>

            <Link to="/supervisor/projects" className={linkClass("/supervisor/projects")}>
              Current Projects
            </Link>

            {/* <Link to="/supervisor/attendance" className={linkClass("/supervisor/attendance")}>
              Attendance
            </Link> */}

            {/* Profile */}
            <Link
              to="/supervisor/profile"
              className={`flex items-center gap-2 px-3 py-1 rounded-full transition
                ${
                  pathname === "/supervisor/profile"
                    ? "bg-red-600 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
            >
              <span className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center font-semibold">
                S
              </span>
              Profile
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-4 py-4 space-y-2">
          {[
            { label: "Labour Profiles", path: "/supervisor/labours" },
            { label: "Assign Jobs", path: "/supervisor/assign-jobs" },
            { label: "Current Projects", path: "/supervisor/projects" },
            { label: "Attendance", path: "/supervisor/attendance" },
            { label: "Profile", path: "/supervisor/profile" },
          ].map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg transition
                ${
                  pathname === path
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default SupervisorNavbar;
