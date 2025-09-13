import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import { ref } from 'vue'

const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:9000' : '/api/naga-fct',
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
