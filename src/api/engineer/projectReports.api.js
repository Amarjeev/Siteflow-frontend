import api from '../../config/api.config'

// ---------- Fetch Engineer Project Reports ----------
export const fetchEngineerProjectReportsApi = async (id, date) => {
  const response = await api.get(
    `/engineer/project-reports?id=${id}&date=${date}`
  )
  return response.data
}

// ---------- Create Daily Project Progress ----------
export const createDailyProjectProgressApi = async payload => {
  const response = await api.post('/engineer/projects/daily-progress', payload)

  return response.data.success === true
}

// ---------- Update Engineer Project Report ----------
export const updateEngineerProjectReportApi = async payload => {
  const response = await api.post('/engineer/project-reports/edit', payload)

  return response.data.success === true
}

// ---------- Delete Engineer Project Report ----------
export const deleteEngineerProjectReportApi = async payload => {
  const response = await api.post('/engineer/project-reports/delete', payload)

  return response.data.success === true
}
