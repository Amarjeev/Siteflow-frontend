import { showError } from '../../utils/toast'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const requestOtpValidation = (email, role) => {
  if (!email?.trim()) {
    showError('Please enter the email address linked to your account')
    return false
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    showError('Please enter a valid email address')
    return false
  }

  if (!role?.trim()) {
    showError('Please select a role')
    return false
  }

  return true
}

export const verifyOtpValidation = (email, otp, role) => {
  if (!email?.trim()) {
    showError('Please enter the email address linked to your account')
    return false
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    showError('Please enter a valid email address')
    return false
  }

  if (!role?.trim()) {
    showError('Please select a role')
    return false
  }

  if (!otp?.trim()) {
    showError('Please Enter Otp')
    return false
  }

  if (!/^\d{5}$/.test(Number(otp))) {
    showError('Please enter a valid 5-digit OTP')
    return false
  }

  return true
}

export const resetPasswordValidation = (
  email,
  password,
  reEnterPassword,
  role
) => {
  if (!email?.trim()) {
    showError('Please enter the email address linked to your account')
    return false
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    showError('Please enter a valid email address')
    return false
  }

  if (!role?.trim()) {
    showError('Please select a role')
    return false
  }
  if (!password?.trim()) {
    showError('Please enter password')
    return false
  }

  if (!reEnterPassword?.trim()) {
    showError('Please enter confirm password')
    return false
  }

  if (password.length < 6 || password.length > 10) {
    showError('Password must be between 6 and 10 characters')
    return false
  }

  if (password !== reEnterPassword) {
    showError('Passwords do not match')
    return false
  }

  return true
}
