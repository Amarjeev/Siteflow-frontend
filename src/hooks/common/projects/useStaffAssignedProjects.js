import { useEffect, useState } from 'react'
import {
  fetchStaffAssignedProjectApi,
  fetchStaffAssignedProjectsApi
} from '../../../api/staff/projects.api'
import { useCallback } from 'react'

/* =========================================================
   SHARED HOOK : ENGINEER & SUPERVISOR PROJECT MANAGEMENT
   ========================================================= */

export const useStaffAssignedProjects = () => {
  const [searchProjectId, setSearchProjectId] = useState('')
  const [statusFilter, setStatusFilter] = useState(() => {
    return sessionStorage.getItem('statusFilter') || 'ongoing'
  })

  const [projects, setProjects] = useState([])
  const [listError, setListError] = useState(null)
  const [detailsError, setDetailsError] = useState(null)

  const [listLoading, setListLoading] = useState(false)
  const [detailsLoading, setDetailsLoading] = useState(false)

  const [activeProjectId, setActiveProjectId] = useState(() => {
    return sessionStorage.getItem('activeProjectId') || ''
  })
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null)

  /* ===================== API : PROJECT LIST ===================== */

  const fetchProjects = useCallback(async () => {
    const payload = {
      projectId: searchProjectId.trim(),
      projectStatus: statusFilter
    }

    try {
      setListLoading(true)
      setListError(null)

      const response = await fetchStaffAssignedProjectsApi(payload)
      setProjects(response?.projects || [])
    } catch (error) {
      setListError(error?.response?.data?.message || 'Failed to fetch projects')
    } finally {
      setListLoading(false)
    }
  }, [searchProjectId, statusFilter])

  /* ===================== API : PROJECT DETAILS ===================== */

  const fetchProjectById = useCallback(async () => {
    try {
      setDetailsLoading(true)
      setDetailsError(null)

      const response = await fetchStaffAssignedProjectApi(activeProjectId)
      setSelectedProjectDetails(response?.project)
    } catch (error) {
      console.log(error.response)
      setDetailsError(
        error?.response?.data?.message || 'Failed to fetch project details'
      )
    } finally {
      setDetailsLoading(false)
    }
  }, [activeProjectId])

  /* ===================== STORAGE SYNC ===================== */

  useEffect(() => {
    if (statusFilter) {
      sessionStorage.setItem('statusFilter', statusFilter)
    }

    if (activeProjectId) {
      sessionStorage.setItem('activeProjectId', activeProjectId)
    }
  }, [statusFilter, activeProjectId])

  /* ===================== EFFECT : FILTER CHANGE ===================== */

  useEffect(() => {
    if (!statusFilter) return

    setActiveProjectId('')
    setSelectedProjectDetails(null)
    fetchProjects()
  }, [statusFilter, fetchProjects])

  /* ===================== EFFECT : PROJECT SELECTION ===================== */

  useEffect(() => {
    fetchProjectById()
  }, [activeProjectId, fetchProjectById])

  return {
    searchProjectId,
    setSearchProjectId,
    statusFilter,
    setStatusFilter,
    projects,
    fetchProjects,
    activeProjectId,
    setActiveProjectId,
    selectedProjectDetails,
    listError,
    detailsError,
    listLoading,
    detailsLoading,
    fetchProjectById
  }
}
