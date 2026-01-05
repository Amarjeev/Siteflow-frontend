import axios from 'axios'
import { API_BASE_URL } from '../../config/api.config'

export const adminSignupApi = async payload => {
  try {
    const response = await axios.post(`${API_BASE_URL}admin/signup`, payload)

    return response.data.success === true
  } catch (error) {
    throw (
      error.response?.data || 'Something went wrong. Please try again later.'
    )
  }
}
