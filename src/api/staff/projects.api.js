import api from '../../config/api.config'

// ---------- Fetch Staff Assigned Projects ----------
export const fetchStaffAssignedProjectsApi = async params => {
  const response = await api.get('/staff/assigned-projects', { params })
  return response.data
}

// ---------- Fetch Staff Assigned Project By ID ----------
export const fetchStaffAssignedProjectApi = async projectId => {
  const response = await api.get(`/staff/assigned-projects/${projectId}`)
  return response.data
}
