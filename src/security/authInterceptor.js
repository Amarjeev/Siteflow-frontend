import api from "../config/api.config"

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/token/refresh'
    ) {
      originalRequest._retry = true

      try {
        const res = await api.post('/token/refresh')

        const { userId, name } = res.data

        sessionStorage.setItem('userEmail', userId)
        sessionStorage.setItem('userName', name)

        return api(originalRequest)
      } catch {
        window.location.href = '/'
      }
    }

    return Promise.reject(error)
  }
)

export default api
