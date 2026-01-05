export const validateAssignJob = payload => {
  const {
    jobDescription,
    jobDate,
    jobStartTime,
    jobEndTime,
    labourId,
    projectId
  } = payload
  /* ================= LABOUR ID ================= */
  if (!labourId?.trim()) {
    return 'Please enter the Labour ID'
  }

  /* ================= PROJECT ID ================= */
  if (!projectId?.trim()) {
    return 'Please enter the Project ID'
  }

  /* ================= JOB DESCRIPTION ================= */
  if (!jobDescription?.trim()) {
    return 'Please enter the job description'
  }

  if (jobDescription.trim().length < 5 || jobDescription.trim().length > 500) {
    return 'Job description must be between 5 and 500 characters'
  }

  /* ================= JOB DATE ================= */
  if (!jobDate) {
    return 'Please select the job date'
  }

  /* ================= JOB START TIME ================= */
  if (!jobStartTime) {
    return 'Please select the job start time'
  }

  if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(jobStartTime)) {
    return 'Start time must be in HH:mm format'
  }

  /* ================= JOB END TIME ================= */
  if (!jobEndTime) {
    return 'Please select the job end time'
  }

  if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(jobEndTime)) {
    return 'End time must be in HH:mm format'
  }

  /* ================= TIME LOGIC ================= */
  if (jobEndTime <= jobStartTime) {
    return 'End time must be after the start time'
  }

  return null
}
