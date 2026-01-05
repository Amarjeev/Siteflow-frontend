import { useState } from 'react'
import { fetchLabourProfileSupApi } from '../../../api/supervisor/labourProfile.api'
import { validateLabourProfile } from '../validations/LabourProfile.validation'
import { updateLabourProfileSupApi } from '../../../api/supervisor/labourProfile.api'
import { showSuccess } from '../../../utils/toast'
import { deleteLabourProfileSupApi } from '../../../api/supervisor/labourProfile.api'

// ---------- Supervisor Labour Profile Hook ----------
export const useSupervisorLabourProfile = () => {
  // ---------- States ----------
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [updateError, setUpdateError] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [searchedLabour, setSearchedLabour] = useState(null)
  const [isInlineEdit, setIsInlineEdit] = useState(false)
  const [editData, setEditData] = useState(null)

  // ---------- Search Labour ----------
  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setUpdateError('Please enter Labour ID or Mobile number')
      return
    }

    try {
      setIsUpdating(true)
      setUpdateError(null)
      setSearchedLabour(null)
      setIsInlineEdit(false)

      const response = await fetchLabourProfileSupApi(searchValue)
      setSearchedLabour(response.profile)
    } catch (error) {
      setUpdateError(
        error?.response?.data?.message || 'Failed to fetch labour profile'
      )
    } finally {
      setIsUpdating(false)
    }
  }

  // ---------- Save Inline Edit ----------
  const handleSaveInlineEdit = async () => {
    const error = validateLabourProfile(editData)

    if (error) {
      setUpdateError(error)
      return
    }

    try {
      setIsUpdating(true)
      setUpdateError(null)

      await updateLabourProfileSupApi(editData)

      showSuccess('Changes saved successfully')

      setSearchedLabour(editData)
      setIsInlineEdit(false)
      setEditData(null)
    } catch (error) {
      setUpdateError(
        error?.response?.data?.message || 'Failed to update labour profile'
      )
    } finally {
      setIsUpdating(false)
    }
  }

  // ---------- Delete Labour Profile ----------
  const handleDeleteProfile = async labourId => {
    const id = labourId?.trim()
    if (!id) return

    const confirmed = window.confirm(
      'Are you sure you want to delete this labour profile? This action cannot be undone.'
    )

    if (!confirmed) return

    try {
      setIsDeleting(true)
      setUpdateError(null)

      await deleteLabourProfileSupApi(id)

      showSuccess('Labour profile deleted successfully')

      setSearchedLabour(null)
      setIsInlineEdit(false)
      setEditData(null)

      searchValue('')
    } catch (error) {
      setUpdateError(
        error?.response?.data?.message || 'Failed to delete labour profile'
      )
    } finally {
      setIsDeleting(false)
    }
  }

  // ---------- Hook Return ----------
  return {
    isUpdating,
    updateError,
    searchValue,
    searchedLabour,
    setSearchValue,
    setSearchedLabour,
    handleSearch,
    handleSaveInlineEdit,
    isInlineEdit,
    setEditData,
    editData,
    setIsInlineEdit,
    isDeleting,
    handleDeleteProfile
  }
}
