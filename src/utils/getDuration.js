export const getDuration = (start, end) => {
  if (!start || !end) return ''

  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)

  const startMin = sh * 60 + sm
  const endMin = eh * 60 + em

  const diff = endMin - startMin
  if (diff <= 0) return ''

  const hours = Math.floor(diff / 60)
  const minutes = diff % 60

  return `(${hours}h ${minutes}m)`
}
