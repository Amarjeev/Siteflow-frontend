import { Link } from "react-router-dom";
import { useEngineerNavLogic } from "../hooks/useEngineerNavLogic";

function EngineerNavbar() {
  const { pathname, navLinks, menuOpen, setMenuOpen } = useEngineerNavLogic();

  // 🔹 Reusable link style
  const linkStyle = (isActive, activeClass) =>
    `
      flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
      ${
        isActive
          ? `${activeClass} shadow-md`
          : "text-gray-200 hover:bg-white/10"
      }
    `;

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="mx-3 my-3 sticky top-3 z-30 rounded-2xl 
        bg-black/30 backdrop-blur-xl border border-white/10 shadow-xl"
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            to="/staff/home"
            className="text-xl font-extrabold tracking-tight"
          >
            <span className="text-red-500">Sit</span>
            <span className="text-white">Flow</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(({ label, link, icon, activeClass }) => (
              <Link
                key={label}
                to={link}
                className={linkStyle(pathname === link, activeClass)}
              >
                <span>{icon}</span>
                {label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <Link
              to="/engineer/profile"
              className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold"
            >
              A
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden rounded-lg p-2 text-white hover:bg-white/10"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden mt-3 mx-3 rounded-xl 
            bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg p-3 space-y-1"
          >
            {navLinks.map(({ label, link, icon, activeClass }) => (
              <Link
                key={label}
                to={link}
                onClick={() => setMenuOpen(false)}
                className={linkStyle(pathname === link, activeClass)}
              >
                <span>{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

export default EngineerNavbar;
