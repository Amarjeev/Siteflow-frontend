export const projectUpdateEngValidation = ({
  projectId,
  newStatus,
  updateText
}) => {
  if (!projectId || !newStatus) {
    return "Something went wrong. Please try again.";
  }

  if (!updateText.trim()) {
    return "Progress summary is required";
  }

  if (updateText.trim().length < 10) {
    return "Progress summary must be at least 10 characters";
  }

  if (updateText.trim().length > 150) {
    return "Progress summary must not exceed 150 characters";
  }

  return null;
};
