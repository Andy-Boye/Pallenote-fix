"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { signIn as apiSignIn, signUp as apiSignUp, signOut as apiSignOut } from "../api/authApi"
import type { User } from "../api/typesApi"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user")
      const token = await AsyncStorage.getItem("authToken")

      if (userData && token) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Error loading user:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const authResponse = await apiSignIn(email, password)
      setUser(authResponse.user)
      await AsyncStorage.setItem("user", JSON.stringify(authResponse.user))
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setLoading(true)
      const authResponse = await apiSignUp(name, email, password)
      setUser(authResponse.user)
      await AsyncStorage.setItem("user", JSON.stringify(authResponse.user))
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await apiSignOut()
      setUser(null)
      await AsyncStorage.removeItem("user")
    } catch (error) {
      console.error("Sign out error:", error)
      // Still clear local state even if API call fails
      setUser(null)
      await AsyncStorage.removeItem("user")
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
