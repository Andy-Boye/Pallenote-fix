import React, { useEffect, useState } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { getNotesByNotebookId } from "../api/notesApi"
import { Note } from "../../types"
import { useTheme } from "../../contexts/ThemeContext"
import { FAB } from "../../components/FAB"
import NoteCard from "../../components/NoteCard"

const NotebookDetailScreen = () => {
  const { colors } = useTheme()
  const route = useRoute<any>()
  const navigation = useNavigation()
  const { notebookId, notebookName } = route.params
  const [notes, setNotes] = useState<Note[]>([])

  const fetchNotes = async () => {
    try {
      const data = await getNotesByNotebookId(notebookId)
      setNotes(data)
    } catch (error) {
      console.error("Failed to load notes", error)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleNotePress = (note: Note) => {
    navigation.navigate("NoteDetail", { noteId: note.id })
  }

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
      <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>
        {notebookName}
      </Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NoteCard note={item} onPress={() => handleNotePress(item)} />
        )}
        ListEmptyComponent={<Text style={{ color: colors.text }}>No notes in this notebook.</Text>}
      />

      <FAB onPress={() => navigation.navigate("AddNote", { notebookId })} />
    </View>
  )
}

export default NotebookDetailScreen
