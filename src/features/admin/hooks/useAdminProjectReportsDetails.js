import { useCallback, useEffect, useState } from 'react'
import { fetchProjectReportsApi } from '../../../api/admin/projects.api'

// ---------- Admin Project Reports Hook ----------
export const useAdminProjectReportsDetails = () => {
  const [projectId, setProjectId] = useState('')
  const [reports, setReports] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const formatDate = date =>
    date
      ? new Date(date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      : '—'

  const removeReportById = useCallback(id => {
    setReports(prev => prev.filter(report => report._id !== id))
  }, [])

  // ---------- Fetch More Reports (INFINITE SCROLL) ----------
  const fetchMoreReports = useCallback(async () => {
    if (!projectId || loading || !hasMore) return

    try {
      setLoading(true)

      const data = await fetchProjectReportsApi(projectId, page)

      // no more data
      if (!data || data.length === 0) {
        setHasMore(false)
        return
      }

      setReports(prev => [...prev, ...data])
      setPage(prev => prev + 1)
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || 'Unable to fetch project reports'
      )
    } finally {
      setLoading(false)
    }
  }, [projectId, page, hasMore, loading])

  useEffect(() => {
    fetchMoreReports()
  }, [fetchMoreReports])

  // ---------- Hook Return ----------
  return {
    projectId,
    setProjectId,
    reports,
    loading,
    errorMessage,
    hasMore,
    fetchMoreReports,
    formatDate,
    removeReportById
  }
}
