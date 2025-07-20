"use client"

import React from "react"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { AuthProvider } from "./src/contexts/AuthContext"
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext"
import MainNavigator from "./src/navigation/MainNavigator"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { View, StyleSheet } from "react-native"

const AppContent = () => {
  const { colors, isDarkMode } = useTheme()

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDarkMode,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      text: colors.text,
      primary: colors.primary,
      card: colors.surface,
      border: colors.border,
      notification: colors.notification,
    },
  }

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <NavigationContainer theme={navigationTheme}>
        <MainNavigator />
      </NavigationContainer>
    </>
  )
}

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

export default App
