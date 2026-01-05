import { API_BASE_URL } from '../../config/api.config'
import axios from 'axios'


export const verifyLoginOtpApi = async payload => {
  const response = await axios.post(
    `${API_BASE_URL}auth/login-otp/verify-otp`,
    payload,
    { withCredentials: true }
  )

  return response.data
}

export const resendLoginOtpApi = async payload => {
  const response = await axios.post(
    `${API_BASE_URL}auth/login-otp/resend-otp`,
    payload,
    { withCredentials: true }
  )

  return response.data.success === true
}
