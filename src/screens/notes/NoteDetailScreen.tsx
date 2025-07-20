// ../src/screens/notes/NoteDetailScreen.tsx

import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import { getNoteById } from "../../api/notesApi";

const NoteDetailScreen = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { noteId } = route.params as { noteId: string };
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(noteId);
        setNote(data);
      } catch (error) {
        console.error("Failed to load note:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!note) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
        <Text style={{ color: theme.text }}>Note not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.text }}>{note.title}</Text>
        <Text style={{ fontSize: 14, color: theme.textSecondary }}>{note.date}</Text>
      </View>
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ fontSize: 16, color: theme.text }}>{note.content}</Text>
      </ScrollView>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: theme.primary,
          borderRadius: 30,
          padding: 14,
        }}
        onPress={() => navigation.navigate("EditNote" as never, { noteId } as never)}
      >
        <Ionicons name="create" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default NoteDetailScreen;
