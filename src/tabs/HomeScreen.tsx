"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import FloatingActionButton from "../components/FAB"
import { useTheme } from "../contexts/ThemeContext"

const { width } = Dimensions.get("window")

const HomeScreen = ({ navigation }: any) => {
  const { colors } = useTheme()
  const [searchText, setSearchText] = useState("")

  const recentNotes = [
    {
      id: "1",
      title: "Meeting Notes",
      preview: "Discussed project timeline...",
      date: "2 hours ago",
      type: "note",
    },
    {
      id: "2",
      title: "Shopping List",
      preview: "Milk, Bread, Eggs...",
      date: "1 day ago",
      type: "task",
    },
    {
      id: "3",
      title: "Ideas for App",
      preview: "Feature improvements...",
      date: "3 days ago",
      type: "note",
    },
  ]

  const quickStats = [
    {
      label: "Notes",
      count: 24,
      icon: "document-text-outline",
      color: "#3B82F6",
    },
    {
      label: "Tasks",
      count: 8,
      icon: "checkbox-outline",
      color: "#10B981",
    },
    {
      label: "Recordings",
      count: 5,
      icon: "mic-outline",
      color: "#F59E0B",
    },
  ]

  const handleSearch = () => {
    Alert.alert("Search", `Searching for: ${searchText}`)
  }

  const handleNotifications = () => {
    Alert.alert("Notifications", "No new notifications")
  }

  const handleSettings = () => {
    navigation.navigate("SettingsStack")
  }

  const handleRecording = () => {
    navigation.navigate("RecordingScreen")
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleSettings}>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNotifications}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.greeting, { color: colors.text }]}>Good morning, John!</Text>

        <View style={[styles.searchContainer, { backgroundColor: colors.accent }]}>
          <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search notes, tasks..."
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          {quickStats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: colors.surface }]}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <Text style={[styles.statCount, { color: colors.text }]}>{stat.count}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Recent Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Items</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Notes")}>
              <Text style={[styles.seeAll, { color: colors.accent }]}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentNotes.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.itemCard, { backgroundColor: colors.surface }]}
              onPress={() => navigation.navigate(item.type === "note" ? "Notes" : "Tasks")}
            >
              <View style={[styles.itemIcon, { backgroundColor: colors.accent }]}>
                <Ionicons name={item.type === "note" ? "document-text" : "checkbox"} size={20} color={colors.primary} />
              </View>
              <View style={styles.itemContent}>
                <Text style={[styles.itemTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.itemPreview, { color: colors.textSecondary }]}>{item.preview}</Text>
                <Text style={[styles.itemDate, { color: colors.textSecondary }]}>{item.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.quickAction, { backgroundColor: colors.surface }]}
              onPress={handleRecording}
            >
              <Ionicons name="mic" size={24} color={colors.primary} />
              <Text style={[styles.quickActionText, { color: colors.text }]}>Record</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickAction, { backgroundColor: colors.surface }]}
              onPress={() => navigation.navigate("Tasks")}
            >
              <Ionicons name="add-circle" size={24} color={colors.primary} />
              <Text style={[styles.quickActionText, { color: colors.text }]}>New Task</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickAction, { backgroundColor: colors.surface }]}
              onPress={() => navigation.navigate("Calendar")}
            >
              <Ionicons name="calendar" size={24} color={colors.primary} />
              <Text style={[styles.quickActionText, { color: colors.text }]}>Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <FloatingActionButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  content: { flex: 1, paddingHorizontal: 20 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 4,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statCount: { fontSize: 20, fontWeight: "bold" },
  statLabel: { fontSize: 12 },
  section: { marginBottom: 30 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold" },
  seeAll: { fontSize: 14, fontWeight: "500" },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemContent: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  itemPreview: { fontSize: 14 },
  itemDate: { fontSize: 12 },
  quickActions: { flexDirection: "row", justifyContent: "space-between" },
  quickAction: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionText: { fontSize: 12, fontWeight: "500", marginTop: 8 },
})

export default HomeScreen
