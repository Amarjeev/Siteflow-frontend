import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showError } from '../../utils/toast'

export const useLandingPage = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState('')

  const handleContinue = () => {
    if (!role) {
      showError('Please select your role')
      return
    }

    sessionStorage.setItem('userRole', role)

    switch (role) {
      case 'admin':
        navigate('/admin/login')
        break

      case 'labour':
        navigate('/labour/assigned-jobs')
        break

      default:
        navigate('/staff/login')
    }
  }

  return { handleContinue, setRole, role }
}
