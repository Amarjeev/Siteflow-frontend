import { useEffect, useRef, useState, useCallback } from 'react'
import { fetchProjectApi } from '../../../api/admin/Projects.api'

// ---------- Admin Project List With Filters Hook ----------
export const useAdminProjectListWithFilters = () => {
  // ---------- Request Control ----------
  const requestIdRef = useRef(0)

  // ---------- Filters ----------
  const [projectId, setProjectId] = useState('')
  const [projectStatus, setProjectStatus] = useState('')
  const [startDate, setStartDate] = useState('')

  // ---------- Data & Pagination ----------
  const [projects, setProjects] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  // ---------- Fetch Projects ----------
  const fetchProjects = useCallback(
    async (pageNumber = 1, reset = false) => {
      const requestId = ++requestIdRef.current

      try {
        setLoading(true)

        const res = await fetchProjectApi({
          page: pageNumber,
          limit: 9,
          projectId,
          projectStatus,
          startDate
        })

        if (requestId !== requestIdRef.current) return

        setProjects(prev => (reset ? res.data : [...prev, ...res.data]))
        setHasMore(res.hasMore)
        setPage(pageNumber + 1)
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false)
        }
      }
    },
    [projectId, projectStatus, startDate]
  )

  // ---------- Re-fetch On Filter Change ----------
  useEffect(() => {
    setProjects([])
    setPage(1)
    setHasMore(true)
    fetchProjects(1, true)
  }, [projectId, projectStatus, startDate, fetchProjects])

  // ---------- Load More ----------
  const loadMore = () => {
    if (!hasMore || loading) return
    fetchProjects(page)
  }

  // ---------- Clear Filters ----------
  const handleClear = () => {
    setProjectId('')
    setProjectStatus('')
    setStartDate('')
  }

  // ---------- Hook Return ----------
  return {
    projectId,
    setProjectId,
    projectStatus,
    setProjectStatus,
    startDate,
    setStartDate,
    projects,
    loadMore,
    hasMore,
    loading,
    handleClear
  }
}
