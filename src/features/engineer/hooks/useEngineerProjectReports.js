import { useState, useEffect, useCallback } from 'react'
import {
  deleteEngineerProjectReportApi,
  updateEngineerProjectReportApi,
  fetchEngineerProjectReportsApi
} from '../../../api/engineer/projectReports.api'
import { showSuccess } from '../../../utils/toast'
import { fetchProjectbyIdApi } from '../../../api/admin/Projects.api'

// ---------- Engineer Project Reports Hook ----------
export const useEngineerProjectReports = () => {
  // ---------- States ----------
  const [projectId, setProjectId] = useState(() => {
    return sessionStorage.getItem('projectId') || ''
  })

  const [filterDate, setFilterDate] = useState('')
  const [projectDetails, setProjectDetails] = useState(null)
  const [projectReport, setProjectReport] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const [editingId, setEditingId] = useState(null)
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [editForm, setEditForm] = useState({
    updateDate: '',
    progressSummary: '',
    projectStatus: ''
  })

  // ---------- Fetch Project & Reports ----------
  const handleFetchProject = useCallback(async () => {
    if (projectId.trim().length !== 17) return

    setLoading(true)
    setErrorMessage(null)
    setProjectDetails(null)

    try {
      const [project, report] = await Promise.all([
        fetchProjectbyIdApi(projectId),
        fetchEngineerProjectReportsApi(projectId, filterDate)
      ])

      setProjectDetails(project?.project)
      setProjectReport(report?.reports || [])
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || 'Failed to fetch project data'
      )
    } finally {
      setLoading(false)
    }
  }, [projectId, filterDate])

  // ---------- Persist Project ID ----------
  useEffect(() => {
    if (projectId.trim().length !== 17) return
    sessionStorage.setItem('projectId', projectId)
  }, [projectId])

  // ---------- Auto Fetch On Load ----------
  useEffect(() => {
    setProjectDetails(null)
    setProjectReport(null)

    if (projectId.trim().length !== 17) return
    handleFetchProject()
  }, [handleFetchProject, projectId])

  // ---------- Filter Updates ----------
  const filteredUpdates = filterDate
    ? projectReport?.filter(
        u => u.updateDate?.slice(0, 10) === filterDate
      )
    : projectReport

  // ---------- Helpers ----------
  const formatDate = date =>
    date ? new Date(date).toLocaleDateString() : '-'

  const startEdit = update => {
    setEditingId(update._id)
    setEditForm({
      updateDate: update.updateDate?.slice(0, 10),
      progressSummary: update.progressSummary,
      projectStatus: update.projectStatus
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const handleEditChange = e => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  // ---------- Save Edit ----------
  const handleSaveEdit = async updateId => {
    try {
      if (!updateId || !editForm) return

      const length = editForm?.progressSummary.trim().length

      if (length < 10 || length > 150) {
        setEditError('Progress summary must be between 10 and 150 characters')
        return
      }

      const payload = {
        id: updateId,
        projectId,
        editForm
      }

      setEditLoading(true)
      setEditError(null)

      const success = await updateEngineerProjectReportApi(payload)

      if (success) {
        showSuccess('Project report updated successfully')
        setEditingId(null)
        handleFetchProject()
      }
    } catch (error) {
      setEditError(
        error?.response?.data?.message || 'Something went wrong while saving'
      )
    } finally {
      setEditLoading(false)
    }
  }

  // ---------- Delete Report (Soft Delete) ----------
  const handleDelete = async updateId => {
    if (!updateId) return

    const confirmed = window.confirm(
      'Are you sure you want to delete this update?'
    )
    if (!confirmed) return

    try {
      setDeleteLoading(true)
      setEditError(null)

      const payload = {
        id: updateId,
        projectId
      }

      const success = await deleteEngineerProjectReportApi(payload)

      if (success) {
        showSuccess('Project report deleted successfully')
        await handleFetchProject()
      }
    } catch (error) {
      console.error(error.response)
      setEditError(
        error?.response?.data?.message || 'Something went wrong while saving'
      )
    } finally {
      setDeleteLoading(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    projectId,
    setProjectId,
    filterDate,
    setFilterDate,
    projectDetails,
    projectReport,
    errorMessage,
    loading,
    handleFetchProject,

    editingId,
    setEditingId,
    filteredUpdates,
    formatDate,
    startEdit,
    cancelEdit,
    handleEditChange,
    handleSaveEdit,
    editForm,
    editLoading,
    editError,
    deleteLoading,
    handleDelete
  }
}
