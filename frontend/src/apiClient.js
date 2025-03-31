import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import { ref } from 'vue'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

apiClient.interceptors.request.use(
  (config) => {
    const auth = useAuthStore()
    const token = ref(auth.token)
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default apiClient
