import api from '../../config/api.config'

export const requestAdminAccountDeletionApi = async () => {
  const response = await api.post('/admin/account/delete')

  return response.data.success === true
}

export const confirmAdminAccountDeletionApi = async otp => {
  const response = await api.post('/admin/account/confirm-delete', {
    otp
  })

  return response.data.success === true
}
