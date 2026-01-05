import { showError } from '../../../utils/toast'

export const createStaffProfileValidation = staff => {
  const { username, email, mobile, role } = staff

  // Name
  if (!username?.trim()) {
    showError('Name is required')
    return false
  }

  // Name length validation
  if (username.trim().length < 3 || username.trim().length > 100) {
    showError('Name must be between 3 and 100 characters')
    return false
  }

  // Email
  if (!email?.trim()) {
    showError('Email is required')
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    showError('Please enter a valid email address')
    return false
  }

  if (email.trim().length > 100) {
    showError('Email can be at most 100 characters')
    return false
  }

  // Mobile
  if (!mobile?.trim()) {
    showError('Mobile number is required')
    return false
  }

  if (!/^\d{10}$/.test(mobile.trim())) {
    showError('Mobile number must be a valid 10-digit number')
    return false
  }

  // Role
  if (!role?.trim()) {
    showError('Role is required')
    return false
  }

  if (!['supervisor', 'engineer'].includes(role)) {
    showError("Role must be either 'supervisor' or 'engineer'")
    return false
  }

  return true
}
