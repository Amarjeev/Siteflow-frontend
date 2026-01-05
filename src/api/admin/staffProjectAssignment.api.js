import api from '../../config/api.config'

// ---------- Assign Project To Staff ----------
export const assignProjectToStaffApi = async payload => {
  const response = await api.post('/admin/assign-projects/staff', payload)

  return response.data.success === true
}

// ---------- Validate Staff & Project ----------
export const validateStaffAndProjectApi = async payload => {
  const response = await api.post(
    '/admin/assign-projects/validate',
    payload
  )

  return response.data
}
