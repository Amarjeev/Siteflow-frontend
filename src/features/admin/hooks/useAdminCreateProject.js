import { useState } from 'react'
import { createProjectValidation } from '../validations/createProject.validation'
import { createProjectApi } from '../../../api/admin/projects.api'
import { showSuccess } from '../../../utils/toast'

// ---------- Admin Create Project Hook ----------
export const useAdminCreateProject = () => {
  // ---------- States ----------
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  // ---------- Initial Form Data ----------
  const initialProjectState = {
    projectName: '',
    siteLocation: '',
    workSummary: '',
    startDate: '',
    endDate: ''
  }

  const [project, setProject] = useState(initialProjectState)

  // ---------- Input Change Handler ---------
  const handleChange = e => {
    const { name, value } = e.target
    setProject(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // ---------- Submit Handler ----------
  const handleSubmit = async e => {
    e.preventDefault()

    // ---------- Validation ----------
    if (!createProjectValidation(project)) return

    try {
      setLoading(true)

      // ---------- API Call ----------
      const isSuccess = await createProjectApi(project)

      if (isSuccess) {
        showSuccess('Project created successfully')
        setErrorMessage(null)
        setProject(initialProjectState)
      }
    } catch (error) {
      const status = error.response?.status
      // ---------- Error Handling ----------
      if (status === 404) {
        setProject(initialProjectState)
      }

      setErrorMessage(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return {
    project,
    handleSubmit,
    handleChange,
    errorMessage,
    loading
  }
}
