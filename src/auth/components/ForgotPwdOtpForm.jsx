import Navbar from "../../components/common/Navbar";
import { useForgotPwdVerifyOtp } from "../hooks/useForgotPwdVerifyOtp";
import { useForgotPwdResendOtp } from "../hooks/useForgotPwdReSendOtp";


function ForgotPwdOtpForm() {
  const { setOtp, otp, email, errorMessage, handleVerifyOtp, loading } =
    useForgotPwdVerifyOtp();

  const { loadingResendOtp, errorMessageResendOtp, handleRequestResendOtp } =
    useForgotPwdResendOtp();

  const maskEmail = () => {
    const [name, domain] = email.split("@");
    if (!name || !domain) return "";
    return `${name[0]}***@${domain}`;
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-1 justify-center mt-24 px-4">
        <div className="w-full max-w-md border-2 border-blue-500 rounded-xl p-6 space-y-6 shadow-sm">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Confirm OTP</h2>
            <p className="text-sm text-gray-600">
              5 Digit OTP sent to your registered email address{" "}
              <span className="font-medium text-gray-800">
                {maskEmail(email)}
              </span>
            </p>
          </div>

          {/* Error */}
          {errorMessage && (
            <p className="text-sm text-red-600 text-center">{errorMessage}</p>
          )}

          {/* Input + Button */}
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 5-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={5}
              minLength={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         tracking-widest text-center"
            />
            <div className="text-center text-sm text-gray-600">
              Didn’t receive the OTP?{" "}
              <button
                type="button"
                disabled={loadingResendOtp}
                onClick={handleRequestResendOtp}
                className="
    relative text-blue-600 font-medium
    hover:underline
    focus:outline-none
    transition-all duration-200
    disabled:text-gray-400 disabled:cursor-not-allowed
  "
              >
                {loadingResendOtp ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    Sending...
                  </span>
                ) : (
                  "Resend OTP"
                )}
              </button>
            </div>
            {/* Error */}
            {errorMessageResendOtp && (
              <p className="text-sm text-red-600 text-center">
                {errorMessageResendOtp}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || otp?.trim().length !== 5 || loadingResendOtp}
              className="w-full py-3 rounded-lg bg-blue-600 text-white
                         font-semibold hover:bg-blue-700 transition
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Confirm"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPwdOtpForm;
