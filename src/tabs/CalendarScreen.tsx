"use client"

import { useEffect, useState } from "react"
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native"
import { useTheme } from "../contexts/ThemeContext"

interface CalendarEvent {
  id: string
  title: string
  date: string
}

// Mock API function - replace with actual API
const getCalendarEvents = async (): Promise<CalendarEvent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "1", title: "Team Meeting", date: "2024-01-15T10:00:00Z" },
        { id: "2", title: "Project Review", date: "2024-01-16T14:00:00Z" },
        { id: "3", title: "Client Call", date: "2024-01-17T09:00:00Z" },
      ])
    }, 1000)
  })
}

// Mock utility function - replace with actual utility
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const CalendarScreen = () => {
  const { colors } = useTheme()
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getCalendarEvents()
        setEvents(data)
      } catch (error) {
        console.error("Error fetching calendar events:", error)
        Alert.alert("Error", "Failed to load calendar events")
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const renderItem = ({ item }: { item: CalendarEvent }) => (
    <View style={[styles.eventCard, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.date, { color: colors.textSecondary }]}>{formatDate(item.date)}</Text>
    </View>
  )

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No events scheduled.</Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 16,
  },
  eventCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 14,
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
})

export default CalendarScreen
