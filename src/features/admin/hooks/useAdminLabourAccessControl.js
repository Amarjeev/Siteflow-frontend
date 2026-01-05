import { useState } from 'react'
import {
  getLabourProfileApi,
  restrictLabourAccessApi
} from '../../../api/admin/labourManagement.api'
import { showSuccess } from '../../../utils/toast'

// ---------- Admin Labour Access Control Hook ----------
export const useAdminLabourAccessControl = () => {
  // ---------- States ----------
  const [labourId, setLabourId] = useState('')
  const [labour, setLabour] = useState(null)
  const [isEditingStatus, setIsEditingStatus] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  // ---------- Search Labour (ID / Mobile) ----------
  const handleSearch = async () => {
    const input = labourId.trim().toUpperCase()
    if (!input) return

    const payload =
      input.length === 16 ? { labourId: input } : { mobile: input }

    try {
      setLoading(true)
      setErrorMessage(null)

      const res = await getLabourProfileApi(payload)
      setLabour(res)
    } catch (error) {
      console.log(error)
      setErrorMessage(
        error.response?.data?.message || 'Failed to fetch labour profile.'
      )
      setLabour(null)
    } finally {
      setLoading(false)
    }
  }

  // ---------- Restrict / Restore Labour Access ----------
  const handleSaveStatus = async () => {
    if (!labour.userId) return

    const actionText =
      labour.status === 'active' ? 'deny access to' : 'restore access for'

    const confirmed = window.confirm(
      `Are you sure you want to ${actionText} this labour account?`
    )

    if (!confirmed) return

    try {
      setLoading(true)
      setErrorMessage(null)

      const result = await restrictLabourAccessApi({
        labourId: labour.userId
      })

      const { success, message, updatedstatus } = result

      if (success) {
        showSuccess(message)

        setLabour(prev => ({
          ...prev,
          status: updatedstatus
        }))

        setIsEditingStatus(false)
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to update labour status.'
      )
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    labourId,
    setLabourId,
    labour,
    setLabour,
    isEditingStatus,
    setIsEditingStatus,
    loading,
    errorMessage,
    handleSearch,
    handleSaveStatus
  }
}
