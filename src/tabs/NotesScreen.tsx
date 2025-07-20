"use client"

import { useEffect, useState } from "react"
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

// Mock API function - replace with actual API
const getNotes = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Meeting Notes", preview: "Discussed project timeline..." },
        { id: 2, title: "Ideas for App", preview: "Feature improvements..." },
        { id: 3, title: "Shopping List", preview: "Milk, Bread, Eggs..." },
      ])
    }, 1000)
  })
}

const NotesScreen = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes()
        setNotes(data as any)
      } catch (error) {
        console.error("Error fetching notes:", error)
        Alert.alert("Error", "Failed to load notes")
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  const openNote = (note: any) => {
    Alert.alert("Note", `Opening: ${note.title}`)
  }

  const addNote = () => {
    Alert.alert("Add Note", "Opening note editor...")
  }

  const renderNote = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => openNote(item)}
      style={{
        backgroundColor: colors.surface,
        padding: 16,
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 12,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>{item.title}</Text>
      <Text style={{ color: colors.textSecondary, marginTop: 4 }}>{item.preview}</Text>
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
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNote}
        contentContainerStyle={{ paddingVertical: 8 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: colors.textSecondary }}>No notes available.</Text>
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
        onPress={addNote}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

export default NotesScreen
