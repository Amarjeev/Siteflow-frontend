import { adminLogoutApi } from '../../api/auth/adminLogout.api'
import { useNavigate } from 'react-router'
import { showError } from '../../utils/toast'

export const useAdminLogout = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await adminLogoutApi()

      if (res) {
        sessionStorage.removeItem('userEmail')
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('userRole')
        navigate('/', { replace: true })
      }
    } catch (error) {
      const err =
        error.response?.data || 'Something went wrong. Please try again later.'
      showError(err)
    }
  }

  return { handleLogout }
}
