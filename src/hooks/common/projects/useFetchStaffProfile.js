import { fetchStaffProfileApi } from '../../../api/staff/staffProfile.api'
import { useEffect, useState } from 'react'

// ---------- Fetch Staff Profile Hook ----------
export const useFetchStaffProfile = () => {
  // ---------- States ----------
  const [engineerProfile, setEngineerProfile] = useState(null)
  const [fetchProfileError, setFetchProfileError] = useState(null)
  const [fetchLoadingProfile, setFetchLoadingProfile] = useState(false)

  // ---------- Fetch Profile ----------
  const handleFetchProfile = async () => {
    setFetchLoadingProfile(true)
    setFetchProfileError(null)

    try {
      const response = await fetchStaffProfileApi()
      setEngineerProfile(response.profile)
    } catch (error) {
      setFetchProfileError(
        error?.response?.data?.message || 'Something went wrong'
      )
    } finally {
      setFetchLoadingProfile(false)
    }
  }

  // ---------- Auto Fetch On Mount ----------
  useEffect(() => {
    handleFetchProfile()
  }, [])

  // ---------- Hook Return ----------
  return {
    engineerProfile,
    fetchLoadingProfile,
    fetchProfileError,
    handleFetchProfile
  }
}
