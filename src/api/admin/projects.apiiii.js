import api from '../../config/api.config'

// ---------- Create Project ----------
export const createProjectApi = async payload => {
  const response = await api.post('/admin/project/create-projects', payload)

  return response.data.success === true
}

// ---------- Fetch Projects (With Filters / Pagination) ----------
export const fetchProjectApi = async payload => {
  const response = await api.post('/admin/project/fetch-projects', payload)

  return response.data
}

// ---------- Fetch Project By ID ----------
export const fetchProjectbyIdApi = async projectId => {
  const response = await api.post(`/admin/project/fetch-project/${projectId}`)

  return response.data
}

// ---------- Update Project ----------
export const updateProjectApi = async payload => {
  const response = await api.post('/admin/project/update', payload)

  return response.data.success === true
}

// ---------- Delete Project ----------
export const deleteProjectApi = async projectId => {
  const response = await api.post(`/admin/project/${projectId}/delete`)

  return response.data.success === true
}

// ---------- Fetch Project Reports ----------
export const fetchProjectReportsApi = async (
  projectId,
  page = 1,
  limit = 10
) => {
  const response = await api.get(`/admin/project/${projectId}/reports`, {
    params: { page, limit }
  })

  return response.data.reports
}

// ---------- Delete Project Reports ----------
export const deleteProjectReportsApi = async projectId => {
  const response = await api.post(`/admin/project/${projectId}/reports/delete`)

  return response.data.success === true
}
