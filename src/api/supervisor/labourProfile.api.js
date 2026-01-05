import api from '../../config/api.config'

// ---------- Create Labour Profile ----------
export const createLabourProfileSupApi = async payload => {
  const response = await api.post(
    '/supervisor/labours/create-profile',
    payload
  )
  return response.data
}

// ---------- Fetch Labour Profile ----------
export const fetchLabourProfileSupApi = async labourId => {
  const response = await api.get(
    `/supervisor/labours/fetch-profile/${labourId}`
  )
  return response.data
}

// ---------- Update Labour Profile ----------
export const updateLabourProfileSupApi = async payload => {
  const response = await api.post(
    '/supervisor/labours/update-profile',
    payload
  )
  return response.data
}

// ---------- Delete Labour Profile ----------
export const deleteLabourProfileSupApi = async labourId => {
  const response = await api.post(
    '/supervisor/labours/delete-profile',
    { labourId }
  )
  return response.data.success === true
}
