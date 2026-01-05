import { useState } from 'react'
import { createStaffProfileValidation } from '../validations/createStaffProfile.validation'
import { createStaffProfileApi } from '../../../api/admin/staffProfile.api'
import { showSuccess } from '../../../utils/toast'

// ---------- Admin Create Staff Profile Hook ----------
export const useAdminCreateStaffProfile = () => {
  // ---------- States ----------
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  // ---------- Initial Form Data ----------
  const initialFormData = {
    username: '',
    mobile: '',
    role: '',
    email: ''
  }

  const [formData, setFormData] = useState(initialFormData)

  // ---------- Input Change Handler ----------
  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // ---------- Submit Handler ----------
  const handleSubmit = async e => {
    e.preventDefault()

    // ---------- Validation ----------
    if (!createStaffProfileValidation(formData)) return

    try {
      setLoading(true)

      // ---------- API Call ----------
      const isSuccess = await createStaffProfileApi(formData)

      if (isSuccess) {
        showSuccess('Staff profile created successfully')
        setErrorMessage(null)
        setFormData(initialFormData)
      }
    } catch (error) {
      // ---------- Error Handling ----------
      setErrorMessage(
        error.response?.data?.message || 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    formData,
    errorMessage,
    loading,
    handleChange,
    handleSubmit
  }
}
