import { Link } from "react-router-dom";
import { useLabourNavbar } from "../hooks/useLabourNavbar";

function LabourNavbar() {
  const { userRole, handleExit, menuOpen, setMenuOpen } = useLabourNavbar();

  return (
    <nav className="sticky top-2 z-30 mx-2 my-2 rounded-xl bg-white/80 px-4 shadow backdrop-blur-xl sm:rounded-full sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        {/* ================= LOGO ================= */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-red-600">Sit</span>
          <span className="text-black">Flow</span>
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden items-center gap-3 md:flex">
          {userRole && (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
                👤
              </span>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          )}

          {userRole && (
            <button
              onClick={handleExit}
              className="rounded-full border border-emerald-300 px-4 py-1.5 text-sm text-emerald-700 transition hover:bg-emerald-50"
            >
              🚪 Exit
            </button>
          )}
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-lg p-2 text-emerald-700 transition hover:bg-emerald-50 md:hidden"
        >
          ☰
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="mt-4 space-y-3 rounded-xl bg-white p-4 shadow md:hidden">
          {userRole && (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
                👤
              </span>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          )}

          {userRole && (
            <button
              onClick={handleExit}
              className="block w-full rounded-lg border border-emerald-300 py-2 text-sm text-emerald-700 transition hover:bg-emerald-50"
            >
              🚪 Exit
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default LabourNavbar;
