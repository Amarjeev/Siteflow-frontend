import { useState, useCallback } from 'react'
import {
  fetchAssignedJobSupervisorDetailsApi,
  fetchAssignedJobProjectDetailsApi
} from '../../../api/common/assignedJobs.api'

/**
 * Custom hook to manage assigned job related details
 * - Fetch supervisor info (name & mobile)
 * - Fetch project details
 */
export const useAssignedJobDetails = () => {
  const [supervisor, setSupervisor] = useState(null)
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Fetch supervisor details for an assigned job
   */
  const handleFetchSupervisorInfo = useCallback(async params => {
    try {
      setLoading(true)
      setError(null)

      const response =
        await fetchAssignedJobSupervisorDetailsApi(params)

      setSupervisor(response?.supervisor || null)
      return response
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Failed to fetch supervisor details'
      )
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Fetch project details for an assigned job
   */
  const handleFetchProjectInfo = useCallback(async params => {
    try {
      setLoading(true)
      setError(null)

      const response =
        await fetchAssignedJobProjectDetailsApi(params)

      setProject(response?.project || null)
      return response
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Failed to fetch project details'
      )
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    supervisor,
    project,
    loading,
    error,
    handleFetchSupervisorInfo,
    handleFetchProjectInfo
  }
}
