import { useState } from 'react'
import { updateEngineerProjectReportApi } from '../../../api/engineer/projectReports.api'
import { showSuccess } from '../../../utils/toast'
import { projectUpdateEngValidation } from '../validations/ProjectUpdate.validation'

// ---------- Engineer Project Update Hook ----------
export const useEngineerProjectUpdate = () => {
  // ---------- States ----------
  const [updateText, setUpdateText] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [updateDate, setUpdateDate] = useState(
    () => new Date().toISOString().split('T')[0]
  )

  const [projectId, setProjectId] = useState('')
  const [validationError, setValidationError] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  // ---------- Submit Handler ----------
  const handleSubmit = async e => {
    e.preventDefault()
    setValidationError('')

    const payload = {
      projectId,
      progressSummary: updateText.trim(),
      updateDate,
      status: newStatus
    }

    // ---------- Validation ----------
    const error = projectUpdateEngValidation({
      projectId,
      newStatus,
      updateText
    })

    if (error) {
      setValidationError(error)
      return
    }

    try {
      setLoading(true)
      setErrorMessage(null)

      const success = await updateEngineerProjectReportApi(payload)

      if (success) {
        showSuccess('Project update submitted successfully')
        setUpdateText('')
        setUpdateDate(new Date().toISOString().split('T')[0])
        return
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    updateText,
    setUpdateText,
    newStatus,
    setNewStatus,
    updateDate,
    setUpdateDate,
    projectId,
    setProjectId,
    validationError,
    handleSubmit,
    errorMessage,
    loading
  }
}
