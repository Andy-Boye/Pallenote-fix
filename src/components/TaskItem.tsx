"use client"

import { View, Text, StyleSheet, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

interface TaskItemProps {
  id: string
  title: string
  completed: boolean
  onToggle?: (id: string) => void
  onPress?: (id: string) => void
}

const TaskItem = ({ id, title, completed, onToggle, onPress }: TaskItemProps) => {
  const { colors } = useTheme()

  const handleToggle = () => {
    if (onToggle) {
      onToggle(id)
    }
  }

  const handlePress = () => {
    if (onPress) {
      onPress(id)
    }
  }

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.surface }]}
      onPress={handlePress}
      android_ripple={{ color: colors.accent }}
    >
      <Pressable style={styles.checkboxContainer} onPress={handleToggle}>
        <Ionicons
          name={completed ? "checkbox" : "checkbox-outline"}
          size={24}
          color={completed ? colors.success : colors.textSecondary}
        />
      </Pressable>
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: completed ? colors.textSecondary : colors.text,
              textDecorationLine: completed ? "line-through" : "none",
            },
          ]}
        >
          {title}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxContainer: {
    marginRight: 12,
    padding: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
})

export default TaskItem
