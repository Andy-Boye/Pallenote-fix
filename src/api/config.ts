import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { __DEV__ } from "react-native"

// API Configuration
export const API_BASE_URL = __DEV__ ? "http://localhost:3000/api" : "https://your-production-api.com/api"

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("authToken")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.error("Error getting auth token:", error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      await AsyncStorage.removeItem("authToken")
      // You might want to redirect to login here
    }
    return Promise.reject(error)
  },
)
