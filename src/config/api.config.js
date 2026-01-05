import axios from 'axios'

export const API_BASE_URL = 'http://localhost:3000/api/'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
})

export default api
