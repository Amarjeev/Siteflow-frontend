import { useEffect, useState } from 'react'
import {
  fetchProjectbyIdApi,
  updateProjectApi,
  deleteProjectApi
} from '../../../api/admin/Projects.api'
import { showSuccess } from '../../../utils/toast'
import { createProjectValidation } from '../validations/createProject.validation'
import { useParams, useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

// ---------- Admin Project Details Hook ----------
export const useAdminProjectDetails = () => {
  const { projectId: paramProjectId } = useParams()
  const [searchParams] = useSearchParams()

  const projectId = paramProjectId || searchParams.get('projectId')

  const navigate = useNavigate()

  // ---------- States ----------
  const [project, setProject] = useState(null)
  const [originalProject, setOriginalProject] = useState(null)

  const [isEditing, setIsEditing] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  // ---------- Fetch Project From URL ----------
  useEffect(() => {
    if (!projectId) {
      navigate('/admin/projects')
      return
    }

    const fetchProject = async () => {
      try {
        setLoading(true)
        setErrorMessage(null)
        setIsEditing(false)

        const res = await fetchProjectbyIdApi(projectId)
        const projectData = res

        if (!projectData) {
          throw new Error('Project not found')
        }
        setProject(projectData)
        setOriginalProject(projectData)
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId, navigate])

  // ---------- Edit ----------
  const startEditing = () => {
    if (!project) {
      navigate('/admin/projects')
      return
    }
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setProject(originalProject)
    setIsEditing(false)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setProject(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // ---------- Save ----------
  const saveChanges = async () => {
    if (!project) return

    if (project.projectStatus === 'ongoing') {
      project.completedAt = undefined
      project.closedByRole = undefined
    }

    if (!createProjectValidation(project)) return

    try {
      setLoading(true)
      setErrorMessage(null)

      const isSuccess = await updateProjectApi({
        projectId: project.projectId,
        projectName: project.projectName,
        siteLocation: project.siteLocation,
        workSummary: project.workSummary,
        startDate: project.startDate,
        endDate: project.endDate,
        projectStatus: project.projectStatus,
        completedAt: project?.completedAt
      })

      if (isSuccess) {
        showSuccess('Project updated successfully')
        setOriginalProject(project)
        setIsEditing(false)
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // ---------- Delete ----------
  const handleDelete = async () => {
    if (!projectId) {
      navigate('/admin/projects')
      return
    }

    const isConfirmed = window.confirm(
      'Are you sure you want to delete this active project? This action cannot be undone.'
    )

    if (!isConfirmed) return

    try {
      setLoading(true)

      const isSuccess = await deleteProjectApi(projectId)
      if (isSuccess) {
        showSuccess('Project delete successfully')
        setTimeout(() => {
          navigate('/admin/projects')
        }, 2000)
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    project,
    handleChange,
    isEditing,
    startEditing,
    cancelEditing,
    loading,
    errorMessage,
    saveChanges,
    handleDelete
  }
}
