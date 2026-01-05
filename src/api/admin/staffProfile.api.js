import api from '../../config/api.config'

// ---------- Create Staff Profile ----------
export const createStaffProfileApi = async payload => {
  const response = await api.post('/admin/staff/create-profile', payload)

  return response.data.success === true
}

// ---------- Fetch Staff Profile ----------
export const fetchStaffProfileApi = async payload => {
  const response = await api.get('/admin/staff/fetch-profile', {
    params: payload
  })

  return response.data
}

// ---------- Update Staff Profile ----------
export const updateStaffProfileApi = async payload => {
  const response = await api.post('/admin/staff/profile/update', payload)

  return response.data
}

// ---------- Delete Staff Profile ----------
export const deleteStaffProfileApi = async userId => {
  const response = await api.post(`/admin/staff/profile/delete/${userId}`)

  return response.data.success === true
}
