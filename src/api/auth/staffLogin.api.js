import axios from 'axios'
import { API_BASE_URL } from '../../config/api.config'

export const staffVerifyAccountApi = async payload => {
  const response = await axios.post(
    `${API_BASE_URL}staff/login/verify-account`,
    payload
  )

  return response.data
}

export const staffVerifyPasswordApi = async payload => {
  const response = await axios.post(
    `${API_BASE_URL}staff/login/verify-password`,
    payload
  )

  return response.data.success === true
}

export const staffCreatePasswordApi = async payload => {
  const response = await axios.post(
    `${API_BASE_URL}staff/login/create-password`,
    payload
  )

  return response.data.success === true
}

