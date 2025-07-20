"use client"

import { useEffect, useState } from "react"
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

// Mock API function - replace with actual API
const getNotebooks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Work Notes", description: "Meeting notes and project updates" },
        { id: 2, title: "Personal", description: "Personal thoughts and ideas" },
        { id: 3, title: "Study", description: "Learning materials and notes" },
      ])
    }, 1000)
  })
}

const NotebooksScreen = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const [notebooks, setNotebooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        const data = await getNotebooks()
        setNotebooks(data as any)
      } catch (err) {
        console.error("Error loading notebooks:", err)
        Alert.alert("Error", "Failed to load notebooks")
      } finally {
        setLoading(false)
      }
    }
    fetchNotebooks()
  }, [])

  const openNotebook = (notebook: any) => {
    Alert.alert("Notebook", `Opening: ${notebook.title}`)
  }

  const addNotebook = () => {
    Alert.alert("Add Notebook", "Creating new notebook...")
  }

  const renderNotebook = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => openNotebook(item)}
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 16,
        marginVertical: 6,
        marginHorizontal: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text }}>{item.title}</Text>
      <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>{item.description}</Text>
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
        data={notebooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotebook}
        contentContainerStyle={{ paddingVertical: 8 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: colors.textSecondary }}>No notebooks found.</Text>
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
        onPress={addNotebook}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

export default NotebooksScreen
