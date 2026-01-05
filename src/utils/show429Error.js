import { showError } from "./toast"

export  const show429Error = error => {
  const status = error?.response?.status
  const message = error?.response?.data?.message || 'Login failed'
  if (status === 429) {
    showError(message)
  }
}
