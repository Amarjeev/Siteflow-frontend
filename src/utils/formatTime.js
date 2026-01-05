export const formatTime = time => {
  if (!time) return '—'

  // Expected format: "HH:mm"
  const [hours, minutes] = time.split(':').map(Number)

  const date = new Date()
  date.setHours(hours, minutes)

  return date.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}
