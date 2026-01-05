export const validateLabourProfile = payload => {
  const { username, mobile } = payload
  /* ================= NAME ================= */

  if (!username || !username.trim()) {
    return 'Name is required'
  }

  const trimmedName = username.trim()

  if (trimmedName.length < 2 || trimmedName.length > 20) {
    return 'Name must be between 2 and 20 characters'
  }

  if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
    return 'Name can contain only letters and spaces'
  }

  /* ================= MOBILE ================= */

  if (!mobile || !mobile.trim()) {
    return 'Mobile number is required'
  }

  const trimmedMobile = mobile.trim()

  if (!/^[6-9]\d{9}$/.test(trimmedMobile)) {
    return 'Mobile number must be a valid 10-digit Indian number'
  }

  /* ================= VALID ================= */

  return null
}
