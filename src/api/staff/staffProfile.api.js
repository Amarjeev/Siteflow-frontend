import api from '../../config/api.config'

// ---------- Fetch Staff Profile ----------
export const fetchStaffProfileApi = async () => {
  const response = await api.get('/staff/fetch-profile')
  return response.data
}

// ---------- Update Staff Profile ----------
export const updateStaffProfileApi = async payload => {
  const response = await api.put('/staff/update-profile', payload)
  return response.data
}

// ---------- Update Staff Password ----------
export const updateStaffPasswordApi = async payload => {
  const response = await api.put('/staff/update-password', payload)
  return response.data.success === true
}

// ---------- Logout Staff ----------
export const logoutStaffApi = async () => {
  const response = await api.post('/staff/logout')
  return response.data.success === true
}
