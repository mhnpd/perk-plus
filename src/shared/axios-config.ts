import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_UPSTREAM_API_URL,
  withCredentials: true, // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  },
})

export default axiosInstance