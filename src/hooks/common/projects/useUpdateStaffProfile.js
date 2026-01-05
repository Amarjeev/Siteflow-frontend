import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStaffProfileValidation } from '../../../features/admin/validations/createStaffProfile.validation'
import {
  logoutStaffApi,
  updateStaffPasswordApi,
  updateStaffProfileApi
} from '../../../api/staff/staffProfile.api'
import { showError, showSuccess } from '../../../utils/toast'

// ---------- Staff Profile Hook ----------
export const useUpdateStaffProfile = (engineerProfile, refetchProfile) => {
  // ---------- Router ----------
  const navigate = useNavigate()

  // ---------- States ----------
  const [profile, setProfile] = useState(engineerProfile || {})
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  const [updateError, setUpdateError] = useState(null)
  const [updateLoadingProfile, setUpdateLoadingProfile] = useState(false)
  const [pwdLoadingProfile, setPwdLoadingProfile] = useState(false)

  // ---------- Sync Profile On Cancel / Refresh ----------
  useEffect(() => {
    if (!isEditing && engineerProfile) {
      setProfile(engineerProfile)
    }
  }, [engineerProfile, isEditing])

  // ---------- Logout ----------
  const handleLogout = async () => {
    try {
      await logoutStaffApi()
      navigate('/', { replace: true })
      sessionStorage.clear()
    } catch {
      showError(
        'We logged you out, but couldn’t complete all background actions.'
      )
    }
  }

  // ---------- Profile Change ----------
  const handleProfileChange = e => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  // ---------- Password Change ----------
  const handlePasswordChange = e => {
    const { name, value } = e.target
    setPasswords(prev => ({ ...prev, [name]: value }))
  }

  // ---------- Cancel Edit ----------
  const handleCancel = () => {
    setIsEditing(false)
    setProfile(engineerProfile)
  }

  // ---------- Save Profile ----------
  const handleSaveProfile = async () => {
    if (!createStaffProfileValidation(profile)) return

    try {
      setUpdateLoadingProfile(true)
      setUpdateError(null)

      await updateStaffProfileApi(profile)

      showSuccess('Profile updated successfully')

      await refetchProfile()

      setIsEditing(false)
    } catch (error) {
      setUpdateError(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setUpdateLoadingProfile(false)
    }
  }

  // ---------- Change Password ----------
  const handleChangePassword = async () => {
    const trimmedPassword = passwords.newPassword.trim()

    if (trimmedPassword.length < 6 || trimmedPassword.length > 10) {
      setUpdateError('Password must be between 6 and 10 characters long')
      return
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setUpdateError('Passwords do not match')
      return
    }

    try {
      setPwdLoadingProfile(true)
      setUpdateError(null)

      await updateStaffPasswordApi({ password: passwords.newPassword })

      showSuccess('Password updated successfully')

      setPasswords({
        newPassword: '',
        confirmPassword: ''
      })

      setShowPassword(false)
    } catch (error) {
      console.log(error.response)
      setUpdateError(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setPwdLoadingProfile(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    profile,
    setProfile,
    isEditing,
    setIsEditing,
    showPassword,
    setShowPassword,
    passwords,
    updateError,
    handleProfileChange,
    handlePasswordChange,
    handleSaveProfile,
    handleChangePassword,
    handleLogout,
    updateLoadingProfile,
    pwdLoadingProfile,
    handleCancel
  }
}
