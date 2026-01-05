import { useState, useCallback, useEffect } from 'react'
import { fetchAssignedJobsApi } from '../../../api/common/assignedJobs.api'

export const useFetchLabourAssignedJobs = () => {
  const [labourInput, setLabourInput] = useState(() => {
    return sessionStorage.getItem('labour_assignedJobs_labourInput') || ''
  })

  const [jobDate, setJobDate] = useState(() => {
    return sessionStorage.getItem('labour_assignedJobs_jobDate') || ''
  })

  const [jobs, setJobs] = useState([])
  const [jobsLoading, setJobsLoading] = useState(false)
  const [jobsDetailsError, setJobsDetailsError] = useState(null)
  const [labourProfile, setLabourProfile] = useState(null)

  useEffect(() => {
    const storageMap = {
      labour_assignedJobs_labourInput: labourInput,
      labour_assignedJobs_jobDate: jobDate
    }

    Object.entries(storageMap).forEach(([key, value]) => {
      value
        ? sessionStorage.setItem(key, value)
        : sessionStorage.removeItem(key)
    })

    // Reset UI state if inputs are incomplete
    if (!labourInput || !jobDate) {
      setJobs([])
      setLabourProfile(null)
      setJobsDetailsError(null)
    }
  }, [labourInput, jobDate])

  /* ================= FETCH HANDLER ================= */

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()

      if (!labourInput.trim()) {
        setJobsDetailsError('Please enter Labour ID or mobile number')
        return
      }

      if (!jobDate) {
        setJobsDetailsError('Please select a job date')
        return
      }

      try {
        setJobsLoading(true)
        setJobsDetailsError(null)
        setLabourProfile(null)
        setJobs([])

        const params = {
          labourId: labourInput.trim(),
          jobDate
        }

        const response = await fetchAssignedJobsApi(params)

        setLabourProfile(response?.labourProfile || null)
        setJobs(response?.jobs || [])
      } catch (error) {
        setJobsDetailsError(
          error?.response?.data?.message || 'Failed to fetch assigned jobs'
        )
      } finally {
        setJobsLoading(false)
      }
    },
    [labourInput, jobDate]
  )

  return {
    labourInput,
    setLabourInput,
    jobDate,
    setJobDate,
    jobs,
    jobsLoading,
    jobsDetailsError,
    handleSubmit,
    labourProfile
  }
}
