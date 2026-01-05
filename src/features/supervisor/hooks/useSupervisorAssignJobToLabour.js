import { useState, useCallback } from 'react'
import { validateAssignJob } from '../validations/jobAssigne.validation'
import { showSuccess } from '../../../utils/toast'
import { assignJobToLabourSupApi } from '../../../api/supervisor/jobAssignment.api'

// ---------- Supervisor Assign Job To Labour Hook ----------
export const useSupervisorAssignJobToLabour = () => {
  // ---------- States ----------
  const [assignJobData, setAssignJobData] = useState({
    jobDescription: '',
    jobDate: '',
    jobStartTime: '',
    jobEndTime: '',
    labourId: '',
    projectId: ''
  })

  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  // ---------- Handle Input Change ----------
  const handleChange = useCallback(e => {
    const { name, value } = e.target

    setAssignJobData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  // ---------- Set Labour & Project IDs ----------
  const setIds = useCallback((labourId, projectId) => {
    setAssignJobData(prev => ({
      ...prev,
      labourId,
      projectId
    }))
  }, [])

  // ---------- Assign Job ----------
  const handleAssignJob = async () => {
    setErrorMessage(null)

    // ---------- Validation ----------
    const error = validateAssignJob(assignJobData)

    if (error) {
      setErrorMessage(error)
      return
    }

    try {
      setLoading(true)

      const payload = {
        labourId: assignJobData.labourId.trim(),
        projectId: assignJobData.projectId.trim().toUpperCase(),
        jobDescription: assignJobData.jobDescription.trim(),
        jobDate: assignJobData.jobDate,
        jobStartTime: assignJobData.jobStartTime,
        jobEndTime: assignJobData.jobEndTime
      }

      await assignJobToLabourSupApi(payload)

      showSuccess('Job assigned to labour successfully')

      setAssignJobData(prev => ({
        ...prev,
        jobDescription: '',
        jobDate: '',
        jobStartTime: '',
        jobEndTime: ''
      }))
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || 'Failed to assign job to labour'
      )
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    assignJobData,
    setAssignJobData,
    errorMessage,
    loading,
    handleChange,
    handleAssignJob,
    setIds
  }
}
