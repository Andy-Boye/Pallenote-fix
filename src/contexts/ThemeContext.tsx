"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const lightTheme = {
  background: "#FFFFFF",
  surface: "#F8F9FA",
  text: "#1F2937",
  textSecondary: "#6B7280",
  primary: "#007AFF",
  accent: "#F3F4F6",
  border: "#E5E7EB",
  notification: "#FF3B30",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
}

const darkTheme = {
  background: "#111827",
  surface: "#1F2937",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  primary: "#3B82F6",
  accent: "#374151",
  border: "#4B5563",
  notification: "#FF453A",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
}

type ThemeColors = typeof lightTheme

interface ThemeContextType {
  colors: ThemeColors
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  colors: lightTheme,
  isDarkMode: false,
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    loadTheme()
  }, [])

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme")
      if (savedTheme) {
        setIsDarkMode(savedTheme === "dark")
      }
    } catch (error) {
      console.error("Error loading theme:", error)
    }
  }

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode
      setIsDarkMode(newTheme)
      await AsyncStorage.setItem("theme", newTheme ? "dark" : "light")
    } catch (error) {
      console.error("Error saving theme:", error)
    }
  }

  const colors = isDarkMode ? darkTheme : lightTheme

  return <ThemeContext.Provider value={{ colors, isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
