import api from '../../config/api.config'

// ---------- Fetch Labour Profile ----------
export const getLabourProfileApi = async payload => {
  const response = await api.get('/admin/labours/fetch-profile', {
    params: payload
  })

  return response.data.labour
}

// ---------- Restrict / Restore Labour Access ----------
export const restrictLabourAccessApi = async payload => {
  const response = await api.post('/admin/labours/access-status', payload)

  return response.data
}
