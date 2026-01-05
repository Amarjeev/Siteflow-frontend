import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyOtpValidation } from '../validations/resetPassword.validation'
import { forgotPwdVerifyOtpApi } from '../../api/auth/forgotPassword.api'

// ---------- Forgot Password: Verify OTP Hook ----------
export const useForgotPwdVerifyOtp = () => {
  // ---------- Router ----------
  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email
  const role = location.state?.role

  // ---------- States ----------
  const [otp, setOtp] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // ---------- Protect Route ----------
  useEffect(() => {
    if (!email || !role) {
      navigate('/forgot-password', { replace: true })
    }
  }, [email, role, navigate])

  // ---------- Verify OTP ----------
  const handleVerifyOtp = async e => {
    e.preventDefault()

    // ---------- Validation ----------
    if (!verifyOtpValidation(email, otp, role)) return

    try {
      setLoading(true)

      const isSuccess = await forgotPwdVerifyOtpApi({
        email: email.trim().toLowerCase(),
        role: role?.toLowerCase(),
        otp: otp?.trim()
      })

      if (isSuccess) {
        navigate('/forgot-password/reset', {
          state: { email, role }
        })
      }
    } catch (error) {
      setErrorMessage(error?.message || 'OTP sending failed')
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    setOtp,
    otp,
    email,
    errorMessage,
    handleVerifyOtp,
    loading
  }
}
