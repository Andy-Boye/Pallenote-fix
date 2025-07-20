"use client"

import { View, Text, Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

interface NoteCardProps {
  id: string
  title: string
  content: string
  preview?: string
  date?: string
  hasAudio?: boolean
  onPress: (id: string) => void
}

const NoteCard = ({ id, title, content, preview, date, hasAudio, onPress }: NoteCardProps) => {
  const { colors } = useTheme()

  const handlePress = () => {
    onPress(id)
  }

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.surface }]}
      onPress={handlePress}
      android_ripple={{ color: colors.accent }}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
        {hasAudio && <Ionicons name="mic" size={16} color={colors.primary} />}
      </View>

      <Text style={[styles.content, { color: colors.textSecondary }]} numberOfLines={2}>
        {preview || content}
      </Text>

      <View style={styles.footer}>
        {date && <Text style={[styles.date, { color: colors.textSecondary }]}>{date}</Text>}
        <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
  },
})

export default NoteCard
