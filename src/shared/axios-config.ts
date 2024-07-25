import axios from 'axios'
import { getAuthToken } from '../api/user-login'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_UPSTREAM_API_URL,
  withCredentials: true, // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`,
    // Add any other default headers here
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Otherwise, reject the promise with the error object
    return Promise.reject(error)
  }
)

export default axiosInstance