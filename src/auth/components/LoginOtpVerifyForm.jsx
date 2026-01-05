import { useVerifyLoginOtp } from "../hooks/useVerifyLoginOtp";

function LoginOtpVerifyForm() {
  const {
    otp,
    setOtp,
    loading,
    errorMessage,
    handleSubmit,
    handleResendOtp,
  } = useVerifyLoginOtp();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          OTP Verification
        </h2>

        <p className="mt-2 text-sm text-center text-gray-500">
          Enter the 6-digit OTP sent to your registered email
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Plain OTP Input */}
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter OTP"
              aria-label="One time password"
              className="w-full border-b-2 border-gray-300 bg-transparent py-3 text-center text-2xl tracking-widest font-semibold focus:border-black focus:outline-none transition"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="mt-3 text-sm text-center text-red-600">
              {errorMessage}
            </p>
          )}

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="mt-6 w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend */}
        <div className="mt-4 text-center">
          <button
            type="button"
            disabled={loading}
            onClick={handleResendOtp}
            className="text-sm text-blue-600 hover:underline disabled:opacity-50"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginOtpVerifyForm;
