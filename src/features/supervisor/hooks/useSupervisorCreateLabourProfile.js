import { useState } from 'react'
import { validateLabourProfile } from '../validations/LabourProfile.validation'
import { createLabourProfileSupApi } from '../../../api/supervisor/labourProfile.api'
import { showSuccess } from '../../../utils/toast'

// ---------- Supervisor Create Labour Profile Hook ----------
export const useSupervisorCreateLabourProfile = () => {
  // ---------- States ----------
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [createdLabour, setCreatedLabour] = useState(null)
  const [showPoster, setShowPoster] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    mobile: ''
  })

  // ---------- Input Change ----------
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // ---------- Submit Handler ----------
  const handleSubmit = async e => {
    e.preventDefault()

    // ---------- Validation ----------
    const error = validateLabourProfile(formData)

    if (error) {
      setErrorMessage(error)
      return
    }

    try {
      setLoading(true)
      setErrorMessage(null)

      const payload = {
        username: formData.username.trim(),
        mobile: formData.mobile.trim()
      }

      const response = await createLabourProfileSupApi(payload)

      showSuccess('Labour profile created successfully')

      setCreatedLabour(response?.data)
      setShowPoster(true)

      setFormData({ username: '', mobile: '' })
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || 'Failed to create labour profile'
      )
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    formData,
    loading,
    errorMessage,
    createdLabour,
    showPoster,
    setShowPoster,
    handleChange,
    handleSubmit
  }
}
