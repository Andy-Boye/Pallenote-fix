import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { createTask } from "../../api/tasksApi"
import { useTheme } from "../../contexts/ThemeContext"

const AddTaskScreen = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Task title is required")
      return
    }

    try {
      await createTask({ title, description })
      navigation.goBack()
    } catch (error) {
      console.error("Failed to create task", error)
      Alert.alert("Error", "Could not create task")
    }
  }

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
      <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>
        Add New Task
      </Text>

      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        className="border rounded-md p-2 mb-4"
        placeholderTextColor={colors.placeholder}
        style={{ borderColor: colors.border, color: colors.text }}
      />

      <TextInput
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        className="border rounded-md p-2 mb-4"
        placeholderTextColor={colors.placeholder}
        style={{ borderColor: colors.border, color: colors.text }}
        multiline
      />

      <Button title="Create Task" onPress={handleCreate} color={colors.primary} />
    </View>
  )
}

export default AddTaskScreen
