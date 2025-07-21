"use client"

import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../contexts/ThemeContext"

const WelcomeScreen = () => {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()

  const handleGetStarted = () => {
    navigation.replace("AuthStack")
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.emoji, { color: colors.primary }]}>📚</Text>

      <Text style={[styles.title, { color: colors.primary }]}>
        Welcome to Pallenote
      </Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Your smart AI-powered study partner.
        {"\n"}Let's take your learning to the next level!
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: colors.primary,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 6,
          },
        ]}
        onPress={handleGetStarted}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <Text style={[styles.footerText, { color: colors.textSecondary }]}>
        🚀 Powered by AI • Designed for Students
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 60,
    alignItems: "center",
  },
  emoji: {
    fontSize: 72, // made bigger
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  footerText: {
    fontSize: 12,
    marginTop: 50,
    textAlign: "center",
  },
})

export default WelcomeScreen
