import { useState, useEffect } from 'react'
import {
  validateStaffAndProjectApi,
  assignProjectToStaffApi
} from '../../../api/admin/staffProjectAssignment.api'
import { showSuccess } from '../../../utils/toast'

// ---------- Admin Project Assignment Hook ----------
export const useAdminProjectAssignment = () => {
  // ---------- States ----------
  const [staffId, setStaffId] = useState(
    () => sessionStorage.getItem('staffId') || ''
  )

  const [projectId, setProjectId] = useState(
    () => sessionStorage.getItem('projectId') || ''
  )

  const [staffDetails, setStaffDetails] = useState(null)
  const [projectDetails, setProjectDetails] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  // ---------- Helpers ----------
  const getErrorMessage = error =>
    error?.response?.data?.message || 'Something went wrong'

  const isValidStaffId = id => id?.trim().length === 20
  const isValidProjectId = id => id?.trim().length === 17

  const resetForm = () => {
    setStaffId('')
    setProjectId('')
    setStaffDetails(null)
    setProjectDetails(null)
    setIsLocked(false)

    sessionStorage.removeItem('staffId')
    sessionStorage.removeItem('projectId')
  }

  // ---------- API: Validate Staff & Project ----------
  const handleEnsureStaffAndProjectExist = async payload => {
    try {
      setLoading(true)
      setErrorMessage(null)

      const res = await validateStaffAndProjectApi(payload)
      const { project, staffProfile } = res

      setProjectDetails(project)
      setStaffDetails(staffProfile)

      if (project && staffProfile) {
        setIsLocked(true)
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  // ---------- API: Assign Project to Staff ----------
  const handleAssignProjectToStaff = async payload => {
    try {
      const isSuccess = await assignProjectToStaffApi(payload)

      if (isSuccess) {
        showSuccess('Project created successfully')
        resetForm()
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  // ---------- Form Submit Handler ----------
  const handleSubmit = e => {
    e.preventDefault()

    const validStaffId = isValidStaffId(staffId)
    const validProjectId = isValidProjectId(projectId)

    // ---------- Step 1: Validate & Lock ----------
    if (validStaffId && validProjectId && !isLocked) {
      const trimmedStaffId = staffId.trim()
      const trimmedProjectId = projectId.trim()

      sessionStorage.setItem('staffId', trimmedStaffId)
      sessionStorage.setItem('projectId', trimmedProjectId)

      setStaffDetails(null)
      setProjectDetails(null)

      handleEnsureStaffAndProjectExist({
        userId: trimmedStaffId,
        projectId: trimmedProjectId
      })
    }

    // ---------- Step 2: Assign Project ----------
    if (
      validStaffId &&
      validProjectId &&
      isLocked &&
      staffDetails &&
      projectDetails
    ) {
      handleAssignProjectToStaff({
        userId: staffId.trim(),
        projectId: projectId.trim()
      })
    }
  }

  // ---------- Re-fetch on Page Refresh ----------
  useEffect(() => {
    const validStaffId = isValidStaffId(staffId)
    const validProjectId = isValidProjectId(projectId)

    if (validStaffId && validProjectId && !staffDetails && !projectDetails) {
      handleEnsureStaffAndProjectExist({
        userId: staffId.trim(),
        projectId: projectId.trim()
      })
    }
  }, [])

  // ---------- Hook Return ----------
  return {
    staffId,
    setStaffId,
    projectId,
    setProjectId,
    staffDetails,
    projectDetails,
    errorMessage,
    loading,
    isLocked,
    handleSubmit,
    resetForm
  }
}
