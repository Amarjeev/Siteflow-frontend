import { useState, useCallback, useEffect } from 'react'
import { fetchAssignedJobsApi } from '../../../api/common/assignedJobs.api'

export const useSupervisorFetchAssignedJobs = () => {
  const [searchValue, setSearchValue] = useState('')
  const [jobDate, setJobDate] = useState('')
  const [jobs, setJobs] = useState([])
  const [labourProfile, setLabourProfile] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [expandedJobs, setExpandedJobs] = useState({})

  const formatJobDate = date =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })

  const formatJobTime = time => {
    const [hour, minute] = time.split(':')
    const date = new Date()
    date.setHours(hour, minute)
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const toggleReadMore = jobId => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }))
  }

  const handleSearch = useCallback(async () => {
    if (!searchValue.trim()) {
      setErrorMessage('Please enter Labour ID')
      return
    }

    if (!jobDate) {
      setErrorMessage('Please select a job date')
      return
    }

    try {
      setLoading(true)
      setErrorMessage(null)
      setJobs([])

      const payload = {
        labourId: searchValue.trim(),
        jobDate
      }

      const response = await fetchAssignedJobsApi(payload)

      setJobs(response?.jobs || [])
      setLabourProfile(response?.labourProfile)
    } catch (error) {
      console.log(error.response)
      setErrorMessage(
        error?.response?.data?.message || 'Failed to fetch assigned jobs'
      )
    } finally {
      setLoading(false)
    }
  }, [searchValue, jobDate])

  //NO INPUT VALUE CLEAR DATA
  useEffect(() => {
    if (!searchValue.trim() || !jobDate.trim()) {
      setJobs([])
    }
  }, [searchValue, jobDate])

  return {
    searchValue,
    setSearchValue,
    jobDate,
    setJobDate,
    jobs,
    loading,
    errorMessage,
    handleSearch,
    labourProfile,
    formatJobDate,
    formatJobTime,
    toggleReadMore,
    expandedJobs
  }
}
