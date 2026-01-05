import { useState, useEffect } from 'react'
import {
  requestAdminAccountDeletionApi,
  confirmAdminAccountDeletionApi
} from '../../api/auth/adminDeleteAcc.api'
import { showError } from '../../utils/toast'
import { useNavigate } from 'react-router'

export const useAdminDelete = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')

  const [profileOpen, setProfileOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const [showDeleteModal, setShowDeleteModal] = useState(() => {
    return sessionStorage.getItem('showDeleteModal') === 'true'
  })

  useEffect(() => {
    sessionStorage.setItem('showDeleteModal', String(showDeleteModal))
  }, [showDeleteModal])

  //request to email
  const handleDeleteRequest = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to permanently delete your account?\n\nThis action cannot be undone.'
    )

    if (!confirmed) return

    setProfileOpen(false)
    setShowDeleteModal(true)
    try {
      await requestAdminAccountDeletionApi()
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Unable to send account deletion request. Please try again later.'
      showError(message)
    }
  }

  //verify otp and confirm delete
  const handleConfirmDelete = async () => {
    if (otp.length !== 5) {
      showError('eneter 5 digit op')
      return
    }

    setLoading(true)
    setErrorMessage(null)

    try {
      await confirmAdminAccountDeletionApi(otp)

      sessionStorage.removeItem('showDeleteModal')
      sessionStorage.removeItem('userEmail')
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('userRole')
      navigate('/', { replace: true })
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || 'Failed to save changes.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setShowDeleteModal(false)
    setOtp('')
    sessionStorage.removeItem('showDeleteModal')
  }

  return {
    setOtp,
    otp,
    handleDeleteRequest,
    profileOpen,
    showDeleteModal,
    setProfileOpen,
    handleCancel,
    errorMessage,
    loading,
    handleConfirmDelete
  }
}
