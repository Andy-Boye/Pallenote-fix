"use client"

import { useEffect, useState } from "react"
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../contexts/ThemeContext"

// Mock API function - replace with actual API
const getTasks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Complete project proposal", dueDate: "Due: Tomorrow", completed: false },
        { id: 2, title: "Review meeting notes", dueDate: "Due: Today", completed: true },
        { id: 3, title: "Update documentation", dueDate: "Due: Next week", completed: false },
      ])
    }, 1000)
  })
}

const TasksScreen = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks()
        setTasks(data as any)
      } catch (error) {
        console.error("Error fetching tasks:", error)
        Alert.alert("Error", "Failed to load tasks")
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const toggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task: any) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    )
  }

  const addTask = () => {
    Alert.alert("Add Task", "Creating new task...")
  }

  const renderTask = ({ item }: any) => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.surface,
        padding: 16,
        margin: 10,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
      onPress={() => toggleTask(item.id)}
    >
      <Ionicons
        name={item.completed ? "checkbox" : "checkbox-outline"}
        size={24}
        color={item.completed ? colors.primary : colors.textSecondary}
        style={{ marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: item.completed ? colors.textSecondary : colors.text,
            textDecorationLine: item.completed ? "line-through" : "none",
          }}
        >
          {item.title}
        </Text>
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>{item.dueDate}</Text>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: colors.textSecondary }}>No tasks available.</Text>
        }
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: colors.primary,
          borderRadius: 30,
          padding: 14,
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
        onPress={addTask}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

export default TasksScreen
