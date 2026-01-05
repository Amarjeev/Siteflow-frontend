import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showError, showSuccess } from '../../utils/toast'
import {
  verifyLoginOtpApi,
  resendLoginOtpApi
} from '../../api/auth/login-Otp.api'

export const useVerifyLoginOtp = () => {
  const navigate = useNavigate()

  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [userRole, _setUserRole] = useState(() => {
    return sessionStorage.getItem('userRole') || ''
  })

  const [email, _setEmail] = useState(() => {
    return sessionStorage.getItem('loginEmail') || ''
  })

  // ================= VERIFY OTP =================
  const handleSubmit = async e => {
    e.preventDefault()

    if (otp.trim().length !== 6) {
      showError('Please enter a valid 6-digit OTP')
      return
    }

    if (!userRole || !email) {
      navigate('/')
      return
    }

    try {
      setLoading(true)
      setErrorMessage(null)

      const response = await verifyLoginOtpApi({
        email,
        otp,
        role: userRole
      })

      const { userProfile } = response

      showSuccess('Logged in successfully')

      sessionStorage.removeItem('loginEmail')
      sessionStorage.removeItem('loginStatus')

      switch (userRole) {
        case 'engineer':
          navigate('/engineer/my-projects', { replace: true })
          break

        case 'supervisor':
          navigate('/supervisor/labours', { replace: true })
          break

        case 'admin':
          navigate('/admin/projects', { replace: true })

          // ---------- Persist Admin Info ----------
          sessionStorage.setItem('userEmail', userProfile?.email)
          sessionStorage.setItem('userName', userProfile?.name)
          break

        default:
          navigate('/', { replace: true })
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || 'OTP verification failed'
      )
    } finally {
      setLoading(false)
    }
  }

  // ================= RESEND OTP =================
  const handleResendOtp = async () => {
    if (!email || !userRole) return

    try {
      setLoading(true)
      await resendLoginOtpApi({ email, role: userRole })
      showSuccess('OTP resent successfully')
    } catch (error) {
      showError(error?.response?.data?.message || 'Failed to resend OTP')
    } finally {
      setLoading(false)
    }
  }

  return {
    otp,
    setOtp,
    loading,
    errorMessage,
    handleSubmit,
    handleResendOtp
  }
}
