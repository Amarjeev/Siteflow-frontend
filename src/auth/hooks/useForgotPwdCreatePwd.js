import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetPasswordValidation } from '../validations/resetPassword.validation'
import { forgotPwdCreatePwdApi } from '../../api/auth/forgotPassword.api'
import { showSuccess } from '../../utils/toast'

// ---------- Forgot Password: Create New Password Hook ----------
export const useForgotPwdCreatePwd = () => {
  // ---------- Router ----------
  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email
  const role = location.state?.role

  // ---------- States ----------
  const [password, setPassword] = useState('')
  const [reEnterPassword, setReEnterPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [loading, setLoading] = useState(false)

  // ---------- Protect Route ----------
  useEffect(() => {
    if (!email || !role) {
      navigate('/forgot-password', { replace: true })
    }
  }, [email, role, navigate])

  // ---------- Submit New Password ----------
  const handleSubmitPwd = async e => {
    e.preventDefault()

    // ---------- Validation ----------
    if (!resetPasswordValidation(email, password, reEnterPassword, role)) return

    try {
      setLoading(true)
      setErrorMessage('')

      const isSuccess = await forgotPwdCreatePwdApi({
        email: email?.trim().toLowerCase(),
        role: role?.toLowerCase(),
        password: password?.trim()
      })

      if (isSuccess) {
        showSuccess('Password reset successful. Redirecting to login...')
        setShowSuccessMessage(true)

        setTimeout(() => {
          navigate('/', { replace: true })
        }, 4000)
      }
    } catch (error) {
      setErrorMessage(error.message || 'OTP sending failed')
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    password,
    setPassword,
    reEnterPassword,
    setReEnterPassword,
    handleSubmitPwd,
    loading,
    errorMessage,
    showSuccessMessage
  }
}
