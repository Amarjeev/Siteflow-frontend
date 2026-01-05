import axios from 'axios'
import { API_BASE_URL } from '../../config/api.config'
import { show429Error } from '../../utils/show429Error'

export const adminLoginApi = async payload => {
  try {
    const response = await axios.post(`${API_BASE_URL}admin/login`, payload, {
      withCredentials: true
    })

    return response.data.success===true
  } catch (error) {
    show429Error(error)

    throw (
      error.response?.data || 'Something went wrong. Please try again later.'
    )
  }
}
