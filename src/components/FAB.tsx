"use client"

import { Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

interface FABProps {
  onPress?: () => void
  icon?: string
  size?: number
}

const FAB = ({ onPress, icon = "add", size = 24 }: FABProps) => {
  const { colors } = useTheme()

  const handlePress = () => {
    if (onPress) {
      onPress()
    } else {
      // Default action - could navigate to a create screen
      console.log("FAB pressed - no action defined")
    }
  }

  return (
    <Pressable
      style={[
        styles.fab,
        {
          backgroundColor: colors.primary,
          shadowColor: colors.text,
        },
      ]}
      onPress={handlePress}
      android_ripple={{ color: "rgba(255,255,255,0.2)" }}
    >
      <Ionicons name={icon as any} size={size} color="#FFFFFF" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
})

export default FAB
