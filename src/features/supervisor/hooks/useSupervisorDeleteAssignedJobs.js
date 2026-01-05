import { useState, useCallback } from 'react'
import { deleteAssignedJobSupApi } from '../../../api/supervisor/jobAssignment.api'
import { showSuccess } from '../../../utils/toast'

export const useSupervisorDeleteAssignedJobs = handleSearch => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deletingJobId, setDeletingJobId] = useState(null)
  const [deleteErrors, setDeleteErrors] = useState({})

  const handleDelete = useCallback(
    async jobId => {
      if (!jobId) return false

      const confirmed = window.confirm(
        'Are you sure you want to delete this job?'
      )
      if (!confirmed) return

      try {
        setDeleteLoading(true)
        setDeletingJobId(jobId)
        setDeleteErrors({})

        const success = await deleteAssignedJobSupApi(jobId)

        showSuccess('Job deleted successfully')

        if (success) {
          handleSearch() // 🔁 re-fetch jobs from fetch hook
        }
      } catch (error) {
        setDeleteErrors(prev => ({
          ...prev,
          [jobId]:
            error?.response?.data?.message || 'Failed to delete assigned job'
        }))
        return false
      } finally {
        setDeleteLoading(false)
      }
    },
    [handleSearch]
  )

  return {
    deleteLoading,
    handleDelete,
    deletingJobId,
    deleteErrors
  }
}
