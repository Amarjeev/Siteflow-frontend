import { showError } from '../../../utils/toast'

export const createProjectValidation = project => {
  const {
    projectName,
    siteLocation,
    workSummary,
    startDate,
    endDate,
    completedAt,
    projectStatus
  } = project

  // Project Name
  if (!projectName?.trim()) {
    showError('Project name is required')
    return false
  }

  if (projectName.trim().length < 3 || projectName.trim().length > 60) {
    showError('Project name must be between 3 and 60 characters')
    return false
  }

  // Site Location
  if (!siteLocation?.trim()) {
    showError('Site location is required')
    return false
  }

  if (siteLocation.trim().length < 3 || siteLocation.trim().length > 150) {
    showError('Site location must be between 3 and 150 characters')
    return false
  }

  // Work Summary
  if (!workSummary?.trim()) {
    showError('Work summary is required')
    return false
  }

  if (workSummary.trim().length < 10 || workSummary.trim().length > 500) {
    showError('Work summary must be between 10 and 500 characters')
    return false
  }

  // Start Date
  if (!startDate) {
    showError('Start date is required')
    return false
  }

  // End Date
  if (!endDate) {
    showError('End date is required')
    return false
  }

  if (new Date(endDate) < new Date(startDate)) {
    showError('End date must be after start date')
    return false
  }

  if (completedAt && new Date(completedAt) < new Date(startDate)) {
    showError('Completion date cannot be before project start date')
    return false
  }

  if (completedAt && !['completed', 'cancelled'].includes(projectStatus)) {
    showError(
      'Project status must be "completed" or "cancelled" when date is provided'
    )
    return false
  }

  if (['completed', 'cancelled'].includes(projectStatus) && !completedAt) {
    showError('Date is required when project status is completed or cancelled')
    return false
  }

  return true
}
