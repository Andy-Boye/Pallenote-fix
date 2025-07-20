"use client"

import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"
import { useAuth } from "../contexts/AuthContext"

const SettingsScreen = () => {
  const navigation = useNavigation<any>()
  const { colors, toggleTheme, isDarkMode } = useTheme()
  const { signOut, user } = useAuth()

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut()
            navigation.reset({
              index: 0,
              routes: [{ name: "AuthStack" }],
            })
          } catch (error) {
            Alert.alert("Error", "Failed to sign out")
          }
        },
      },
    ])
  }

  const settingsOptions = [
    {
      title: "Account Information",
      icon: "person-outline",
      onPress: () => navigation.navigate("AccountInfo"),
    },
    {
      title: `Switch to ${isDarkMode ? "Light" : "Dark"} Mode`,
      icon: isDarkMode ? "sunny-outline" : "moon-outline",
      onPress: toggleTheme,
    },
    {
      title: "Language",
      icon: "language-outline",
      onPress: () => navigation.navigate("Language"),
    },
    {
      title: "Payment Plan",
      icon: "card-outline",
      onPress: () => navigation.navigate("PaymentPlan"),
    },
    {
      title: "Community",
      icon: "people-outline",
      onPress: () => navigation.navigate("Community"),
    },
    {
      title: "Privacy Policy",
      icon: "shield-outline",
      onPress: () => navigation.navigate("PrivacyPolicy"),
    },
    {
      title: "About Us",
      icon: "information-circle-outline",
      onPress: () => navigation.navigate("AboutUs"),
    },
    {
      title: "FAQ",
      icon: "help-circle-outline",
      onPress: () => navigation.navigate("FAQ"),
    },
  ]

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        {user && (
          <View style={[styles.userCard, { backgroundColor: colors.surface }]}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.avatarText, { color: colors.background }]}>{user.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user.email}</Text>
            </View>
          </View>
        )}

        {/* Settings Options */}
        <View style={styles.optionsContainer}>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, { backgroundColor: colors.surface }]}
              onPress={option.onPress}
            >
              <Ionicons name={option.icon as any} size={24} color={colors.primary} />
              <Text style={[styles.optionText, { color: colors.text }]}>{option.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={[styles.signOutButton, { backgroundColor: colors.error }]} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    marginLeft: 16,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
})

export default SettingsScreen
