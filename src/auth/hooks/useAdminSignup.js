import { useState } from 'react'
import { validateSignup } from '../validations/signup.validation'
import { adminSignupApi } from '../../api/auth/adminSignup.api'
import { showSuccess } from '../../utils/toast'

// ---------- Admin Signup Hook ----------
export const useAdminSignup = () => {
  // ---------- States ----------
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  // ---------- Submit Handler ----------
  const handleSubmit = async e => {
    e.preventDefault()

    // ---------- Validation ----------
    const errors = validateSignup({
      username,
      email,
      password,
      rePassword
    })

    if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors)[0])
      return
    }

    try {
      setLoading(true)

      const isSuccess = await adminSignupApi({ username, email, password })

      if (isSuccess) {
        showSuccess('Signup successful. You can now log in')

        setUsername('')
        setEmail('')
        setPassword('')
        setRePassword('')
        setErrorMessage(null)
      }
    } catch (error) {
      setErrorMessage(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    username,
    email,
    password,
    rePassword,
    errorMessage,
    setUsername,
    setEmail,
    setPassword,
    setRePassword,
    handleSubmit,
    loading
  }
}
