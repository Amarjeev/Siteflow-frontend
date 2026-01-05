import { useState, useEffect, useCallback } from 'react'
import { verifyProjectAndLabourSupApi } from '../../../api/supervisor/jobAssignment.api'

// ---------- Supervisor Verify Project & Labour Hook ----------
export const useSupervisorVerifyProjectAndLabour = () => {
  // ---------- States ----------
  const [projectId, setProjectId] = useState(() => {
    return localStorage.getItem('assignJob_projectId') || ''
  })

  const [labourId, setLabourId] = useState(() => {
    return localStorage.getItem('assignJob_labourId') || ''
  })

  const [project, setProject] = useState(null)
  const [labour, setLabour] = useState(null)
  const [verifyError, setVerifyError] = useState(null)
  const [loadingVerify, setLoadingVerify] = useState(false)

  // ---------- Persist IDs ----------
  useEffect(() => {
    if (projectId) {
      localStorage.setItem('assignJob_projectId', projectId)
    }

    if (labourId) {
      localStorage.setItem('assignJob_labourId', labourId)
    }
  }, [projectId, labourId])

  // ---------- Verify Project & Labour ----------
  const handleVerify = useCallback(async () => {
    if (!projectId.trim()) {
      setVerifyError('Please enter the Project ID')
      return
    }

    if (!labourId.trim()) {
      setVerifyError('Please enter a Labour ID or mobile number')
      return
    }

    try {
      setVerifyError(null)
      setLoadingVerify(true)
      setProject(null)
      setLabour(null)

      const payload = {
        projectId: projectId.trim().toUpperCase(),
        labourId: labourId.trim()
      }

      const response = await verifyProjectAndLabourSupApi(payload)

      setProject(response.project)
      setLabour(response.labour)
    } catch (error) {
      setVerifyError(
        error?.response?.data?.message || 'Failed to verify project and labour'
      )
    } finally {
      setLoadingVerify(false)
    }
  }, [projectId, labourId])

  // ---------- Clear Data ----------
  const handleClear = useCallback(() => {
    setLoadingVerify(null)
    setProjectId('')
    setLabourId('')
    setProject(null)
    setLabour(null)
    setVerifyError(null)
    setLoadingVerify(false)

    localStorage.removeItem('assignJob_projectId')
    localStorage.removeItem('assignJob_labourId')
  }, [])

  // ---------- Auto Verify On Load ----------
  useEffect(() => {
    if (projectId && labourId) {
      handleVerify()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---------- Hook Return ----------
  return {
    projectId,
    setProjectId,
    labourId,
    setLabourId,
    project,
    labour,
    verifyError,
    loadingVerify,
    handleVerify,
    handleClear
  }
}
