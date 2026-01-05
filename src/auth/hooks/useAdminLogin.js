import { useState ,useEffect} from 'react'
import { adminLoginApi } from '../../api/auth/adminLogin.api'
import { showError } from '../../utils/toast'
import { useNavigate } from 'react-router-dom'

// ---------- Admin Login Hook ----------
export const useAdminLogin = () => {
  // ---------- States ----------
  const [errorMessage, setErrorMessage] = useState(null)
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // ---------- Router ----------
  const navigate = useNavigate()

  useEffect(() => {
  if (email) {
    sessionStorage.setItem("loginEmail", email);
  } else {
    sessionStorage.removeItem("loginEmail");
  }
}, [email]);


  // ---------- Submit Handler ----------
  const handleSubmit = async e => {
    e.preventDefault()

    if (!email || !password) {
      showError('Please fill all field')
      return
    }

    try {
      setLoading(true)

      await adminLoginApi({ email, password })

      navigate('/auth/verify-otp')
      setPassword('')
      setErrorMessage('')
    } catch (error) {
      console.log('login error :', error)
      setErrorMessage(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    errorMessage,
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    loading
  }
}
