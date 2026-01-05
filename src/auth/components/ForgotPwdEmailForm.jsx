import { useForgotPwdRequestOtp } from "../hooks/useForgotPwdRequestOtp";
import { Link } from "react-router";
import Navbar from "../../components/common/Navbar";

function ForgotPwdEmailForm() {
  const { setEmail, email, handleRequestOtp, loading, errorMessage } =
    useForgotPwdRequestOtp();

  return (
    <div>
      <Navbar />
      <div class="w-full  max-w-md mx-auto p-6">
        <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div class="p-4 sm:p-7">
            <div class="text-center">
              <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
                Forgot password?
              </h1>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Remember your password?
                <Link
                  class="text-blue-600 decoration-2 hover:underline font-medium"
                  to={"/login"}
                >
                  Login here
                </Link>
              </p>
              {errorMessage && (
                <h3 className="text-red-600 text-sm mt-2">{errorMessage}</h3>
              )}
            </div>

            <div class="mt-5">
              <form onSubmit={handleRequestOtp}>
                <div class="grid gap-y-4">
                  <div>
                    <label
                      for="email"
                      class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div class="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                    <p
                      class="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md
    font-semibold text-white text-sm
    bg-blue-500 hover:bg-blue-600
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
                  >
                    {loading && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    )}
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPwdEmailForm;
