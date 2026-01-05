import axios from 'axios'
import { API_BASE_URL } from '../../config/api.config'
import { show429Error } from '../../utils/show429Error'

export const forgotPwdRequestOtpApi = async payload => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}password-reset/request-otp`,
      payload
    )

    return response.data.success === true
  } catch (error) {
    show429Error(error)
    throw (
      error.response?.data || 'Something went wrong. Please try again later.'
    )
  }
}

export const forgotPwdVerifyOtpApi = async payload => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}password-reset/verify-otp`,
      payload
    )

    return response.data.success === true
  } catch (error) {
    show429Error(error)
    throw (
      error.response?.data || 'Something went wrong. Please try again later.'
    )
  }
}

export const forgotPwdCreatePwdApi = async payload => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}password-reset/reset-password`,
      payload
    )

    return response.data.success === true
  } catch (error) {
    show429Error(error)
    throw (
      error.response?.data || 'Something went wrong. Please try again later.'
    )
  }
}
