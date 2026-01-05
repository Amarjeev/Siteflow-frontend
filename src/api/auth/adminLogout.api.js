import api from '../../config/api.config'

export const adminLogoutApi = async () => {
  const response = await api.post('/admin/logout')

  return response.data.success === true
}
