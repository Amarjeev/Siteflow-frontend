import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { showError } from '../../utils/toast'
import {
  staffVerifyAccountApi,
  staffVerifyPasswordApi,
  staffCreatePasswordApi
} from '../../api/auth/staffLogin.api'

// ---------- Staff Login Flow States ----------
export const STAFF_LOGIN_STATUS = {
  ENTER_EMAIL: 'ENTER_EMAIL',
  ENTER_PASSWORD: 'ENTER_PASSWORD',
  SET_PASSWORD: 'SET_PASSWORD'
}

// ---------- Staff Login Hook ----------
export const useStaffLogin = () => {
  // ---------- Router ----------
  const navigate = useNavigate()

  // ---------- States ----------
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState(() => {
    return sessionStorage.getItem('loginEmail') || ''
  })

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const [userRole, _setUserRole] = useState(
    () => sessionStorage.getItem('userRole') || ''
  )

  const [loginStatus, setLoginStatus] = useState(() => {
    return (
      sessionStorage.getItem('loginStatus') ||
      STAFF_LOGIN_STATUS.ENTER_EMAIL
    )
  })

  // ---------- Persist Login Step ----------
  useEffect(() => {
    sessionStorage.setItem('loginStatus', loginStatus)
  }, [loginStatus])

  // ---------- Persist Email ----------
  useEffect(() => {
    if (email) {
      sessionStorage.setItem('loginEmail', email.trim())
    }
  }, [email])

  // ---------- Submit Handler ----------
  const handleSubmit = async e => {
    e.preventDefault()

    // ---------- Validation ----------
    if (!userRole) {
      navigate('/', { replace: true })
    }

    if (loginStatus === STAFF_LOGIN_STATUS.ENTER_EMAIL) {
      if (!email.trim()) {
        showError('Please enter email address')
        return
      }
    }

    if (loginStatus === STAFF_LOGIN_STATUS.ENTER_PASSWORD) {
      if (!email) {
        setLoginStatus(STAFF_LOGIN_STATUS.ENTER_EMAIL)
        return
      }

      if (!password.trim()) {
        showError('Please enter password')
        return
      }
    }

    if (loginStatus === STAFF_LOGIN_STATUS.SET_PASSWORD) {
      if (!email) {
        setLoginStatus(STAFF_LOGIN_STATUS.ENTER_EMAIL)
        return
      }

      if (!newPassword.trim()) {
        showError('Please enter new password')
        return
      }

      if (newPassword.length < 6 || newPassword.length > 10) {
        showError('Password must be between 6 and 10 characters')
        return
      }

      if (newPassword.trim() !== rePassword.trim()) {
        showError('Passwords do not match')
        return
      }
    }

    // ---------- API Flow ----------
    try {
      setLoading(true)

      switch (loginStatus) {
        case STAFF_LOGIN_STATUS.ENTER_EMAIL: {
          setErrorMessage('')

          const response = await staffVerifyAccountApi({
            email,
            role: userRole
          })

          const { success, hasPassword } = response

          if (success) {
            setLoginStatus(STAFF_LOGIN_STATUS.ENTER_PASSWORD)
          } else if (!hasPassword) {
            setLoginStatus(STAFF_LOGIN_STATUS.SET_PASSWORD)
          }
          break
        }

        case STAFF_LOGIN_STATUS.ENTER_PASSWORD: {
          setErrorMessage('')

          const success = await staffVerifyPasswordApi({
            email,
            password,
            role: userRole
          })

          if (success) {
            navigate('/auth/verify-otp')
          } else {
            setLoginStatus(STAFF_LOGIN_STATUS.SET_PASSWORD)
          }
          break
        }

        case STAFF_LOGIN_STATUS.SET_PASSWORD: {
          const payload = {
            email,
            password: newPassword
          }

          setErrorMessage('')

          const success = await staffCreatePasswordApi(payload)

          if (success) {
            setLoginStatus(STAFF_LOGIN_STATUS.ENTER_EMAIL)
            setErrorMessage('')
            setEmail('')
            setPassword('')
            setNewPassword('')
            setRePassword('')
            sessionStorage.removeItem('loginEmail')
          }
          break
        }

        default:
          break
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    errorMessage,
    loading,

    email,
    setEmail,

    password,
    setPassword,

    newPassword,
    setNewPassword,

    rePassword,
    setRePassword,

    loginStatus,
    handleSubmit,
    userRole
  }
}
