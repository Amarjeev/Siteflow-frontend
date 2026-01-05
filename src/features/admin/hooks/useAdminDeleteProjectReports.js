import { useState, useCallback } from 'react'
import { deleteProjectReportsApi } from '../../../api/admin/Projects.api'
import { showError, showSuccess } from '../../../utils/toast'

// ---------- Admin Delete Project Report Hook ----------
export const useAdminDeleteProjectReports = () => {
  const [deletingId, setDeletingId] = useState(null)

  const handleDeleteReport = useCallback(async id => {
    if (!id) return

    const confirmed = window.confirm(
      'Are you sure you want to delete this project report?'
    )
    if (!confirmed) return

    try {
      setDeletingId(id)

      await deleteProjectReportsApi(id)

      showSuccess('Project report deleted successfully')
      
      return true
    } catch (error) {
      showError(
        error?.response?.data?.message || 'Failed to delete project report'
      )
      return false
    } finally {
      setDeletingId(null)
    }
  }, [])

  return {
    handleDeleteReport,
    deletingId
  }
}
