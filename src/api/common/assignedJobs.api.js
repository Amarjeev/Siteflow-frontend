import api from '../../config/api.config'

// ---------- Fetch Assign Job for Labour ----------
export const fetchAssignedJobsApi = async params => {
  const response = await api.get('/labour/assigned-jobs', { params })
  return response.data
}

// ---------- Fetch assigned job supervisor details (name & mobile) ----------
export const fetchAssignedJobSupervisorDetailsApi = async params => {
  const response = await api.get('/labour/assigned-jobs/supervisor', { params })
  return response.data
}

// ---------- Fetch assigned job project details ----------
export const fetchAssignedJobProjectDetailsApi = async params => {
  const response = await api.get('/labour/assigned-jobs/project', { params })
  return response.data
}
