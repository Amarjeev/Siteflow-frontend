import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { requestOtpValidation } from '../validations/resetPassword.validation'
import { forgotPwdRequestOtpApi } from '../../api/auth/forgotPassword.api'
import { showSuccess } from '../../utils/toast'

// ---------- Forgot Password: Resend OTP Hook ----------
export const useForgotPwdResendOtp = () => {
  // ---------- States ----------
  const [loadingResendOtp, setLoadingResendOtp] = useState(false)
  const [errorMessageResendOtp, setErrorMessageResendOtp] = useState('')

  // ---------- Router ----------
  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email
  const role = location.state?.role

  // ---------- Protect Route ----------
  useEffect(() => {
    if (!email || !role) {
      navigate('/forgot-password', { replace: true })
    }
  }, [email, role, navigate])

  // ---------- Resend OTP ----------
  const handleRequestResendOtp = async () => {
    // ---------- Validation ----------
    if (!requestOtpValidation(email, role)) return

    try {
      setLoadingResendOtp(true)
      setErrorMessageResendOtp('')

      const isSuccess = await forgotPwdRequestOtpApi({
        email: email.trim().toLowerCase(),
        role: role.toLowerCase()
      })

      if (isSuccess) {
        showSuccess('OTP sent successfully')
      }
    } catch (error) {
      setErrorMessageResendOtp(error.message || 'OTP sending failed')
    } finally {
      setLoadingResendOtp(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    loadingResendOtp,
    errorMessageResendOtp,
    handleRequestResendOtp
  }
}
