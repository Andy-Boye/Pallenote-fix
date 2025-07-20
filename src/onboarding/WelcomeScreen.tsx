"use client"

import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../contexts/ThemeContext"

const WelcomeScreen = () => {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()

  const handleGetStarted = () => {
    navigation.replace("AuthStack") // replace to avoid going back to onboarding
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Welcome to Pallenote</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Your smart study partner
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleGetStarted}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
})

export default WelcomeScreen
