import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../config/api.config'

export const useAuthRedirect = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const publicPaths = [
      '/admin/login',
      '/admin/signup',
      '/admin/forgot-password',
      '/staff/login'
    ]

    if (!publicPaths.includes(location.pathname)) return

    // Prevent repeated calls
    const alreadyChecked = sessionStorage.getItem('authChecked')
    if (alreadyChecked) return

    const checkAuth = async () => {
      try {
        sessionStorage.setItem('authChecked', 'true')

        const res = await api.get('/auth/me')
        const { role, userId, name } = res.data.user

        switch (role) {
          case 'admin':
            sessionStorage.setItem('userName', name)
            sessionStorage.setItem('userRole', role)
            sessionStorage.setItem('userEmail', userId)
            navigate('/admin/projects', { replace: true })
            break

          case 'supervisor':
            navigate('/supervisor/labours', { replace: true })
            break

          case 'engineer':
            navigate('/engineer/my-projects', { replace: true })
            break

          default:
            navigate('/', { replace: true })
        }
      } catch {
        sessionStorage.removeItem('authChecked')
        // Not logged in  stay on public page
      }
    }

    checkAuth()
  }, [location.pathname, navigate])
}
