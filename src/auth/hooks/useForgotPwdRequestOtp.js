import { useState } from 'react'
import { requestOtpValidation } from '../validations/resetPassword.validation'
import { forgotPwdRequestOtpApi } from '../../api/auth/forgotPassword.api'
import { useNavigate } from 'react-router-dom'

// ---------- Forgot Password: Request OTP Hook ----------
export const useForgotPwdRequestOtp = () => {
  // ---------- States ----------
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [role, _setRole] = useState(
    () => sessionStorage.getItem('userRole') || ''
  )

  // ---------- Router ----------
  const navigate = useNavigate()

  // ---------- Request OTP ----------
  const handleRequestOtp = async e => {
    e.preventDefault()

    // ---------- Validation ----------
    if (!requestOtpValidation(email, role)) return

    try {
      setLoading(true)

      const isSuccess = await forgotPwdRequestOtpApi({
        email: email.trim().toLowerCase(),
        role: role?.toLowerCase()
      })

      if (isSuccess) {
        navigate('/forgot-password/otp', {
          state: {
            email: email.trim().toLowerCase(),
            role
          }
        })
      }
    } catch (error) {
      setErrorMessage(error.message || 'OTP sending failed')
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    setEmail,
    email,
    setPassword,
    password,
    setOtp,
    otp,
    handleRequestOtp,
    loading,
    errorMessage
  }
}
