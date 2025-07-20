"use client"

import { useState } from "react"
import { View, Pressable, StyleSheet, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"
import { useNavigation } from "@react-navigation/native"

const FloatingActionButton = () => {
  const { colors } = useTheme()
  const navigation = useNavigation<any>()
  const [isOpen, setIsOpen] = useState(false)
  const [animation] = useState(new Animated.Value(0))

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start()
    setIsOpen(!isOpen)
  }

  const handleAction = (action: string) => {
    setIsOpen(false)
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start()

    switch (action) {
      case "note":
        // Navigate to create note or show alert
        console.log("Create note")
        break
      case "task":
        navigation.navigate("Tasks")
        break
      case "recording":
        navigation.navigate("RecordingScreen")
        break
      default:
        break
    }
  }

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  })

  const translateY1 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70],
  })

  const translateY2 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -130],
  })

  const translateY3 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -190],
  })

  return (
    <View style={styles.container}>
      {/* Action buttons */}
      <Animated.View
        style={[
          styles.actionButton,
          {
            backgroundColor: colors.success,
            transform: [{ translateY: translateY3 }],
            opacity: animation,
          },
        ]}
      >
        <Pressable onPress={() => handleAction("note")} style={styles.actionButtonInner}>
          <Ionicons name="document-text" size={20} color="#FFFFFF" />
        </Pressable>
      </Animated.View>

      <Animated.View
        style={[
          styles.actionButton,
          {
            backgroundColor: colors.warning,
            transform: [{ translateY: translateY2 }],
            opacity: animation,
          },
        ]}
      >
        <Pressable onPress={() => handleAction("task")} style={styles.actionButtonInner}>
          <Ionicons name="checkbox" size={20} color="#FFFFFF" />
        </Pressable>
      </Animated.View>

      <Animated.View
        style={[
          styles.actionButton,
          {
            backgroundColor: colors.error,
            transform: [{ translateY: translateY1 }],
            opacity: animation,
          },
        ]}
      >
        <Pressable onPress={() => handleAction("recording")} style={styles.actionButtonInner}>
          <Ionicons name="mic" size={20} color="#FFFFFF" />
        </Pressable>
      </Animated.View>

      {/* Main FAB */}
      <Pressable
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={toggleMenu}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      >
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </Animated.View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  actionButton: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    right: 6,
    bottom: 6,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  actionButtonInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default FloatingActionButton
