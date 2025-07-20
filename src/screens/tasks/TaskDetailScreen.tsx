import React, { useEffect, useState } from "react"
import { View, Text, Button } from "react-native"
import { useRoute } from "@react-navigation/native"
import { getTaskById } from "../../api/tasksApi"
import { useTheme } from "../../contexts/ThemeContext"
import { Task } from "../../types"

const TaskDetailScreen = () => {
  const { colors } = useTheme()
  const route = useRoute<any>()
  const { taskId } = route.params
  const [task, setTask] = useState<Task | null>(null)

  const fetchTask = async () => {
    try {
      const data = await getTaskById(taskId)
      setTask(data)
    } catch (error) {
      console.error("Failed to load task", error)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [])

  if (!task) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background }}>
        <Text style={{ color: colors.text }}>Loading task...</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
      <Text className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{task.title}</Text>
      <Text className="text-base mb-4" style={{ color: colors.text }}>{task.description}</Text>
      <Text className="text-sm text-gray-400">Due: {task.dueDate || "N/A"}</Text>
    </View>
  )
}

export default TaskDetailScreen
