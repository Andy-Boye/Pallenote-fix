"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

const CommunityScreen = ({ navigation }: any) => {
  const { theme } = useTheme()

  const communityLinks = [
    {
      title: "Discord Server",
      description: "Join our Discord community for real-time discussions",
      icon: "chatbubbles-outline",
      members: "2.5k",
    },
    {
      title: "Reddit Community",
      description: "Share tips and tricks with fellow users",
      icon: "logo-reddit",
      members: "1.8k",
    },
    {
      title: "Facebook Group",
      description: "Connect with users and get updates",
      icon: "logo-facebook",
      members: "3.2k",
    },
    {
      title: "Twitter",
      description: "Follow us for the latest news and updates",
      icon: "logo-twitter",
      members: "5.1k",
    },
  ]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      backgroundColor: theme.surface,
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    backButton: {
      marginRight: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.text,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: "center",
      marginBottom: 30,
      lineHeight: 24,
    },
    communityCard: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.accent,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    communityContent: {
      flex: 1,
    },
    communityTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 4,
    },
    communityDescription: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 8,
    },
    memberCount: {
      fontSize: 12,
      color: theme.primary,
      fontWeight: "600",
    },
    joinButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    joinButtonText: {
      color: theme.background,
      fontSize: 14,
      fontWeight: "600",
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Community</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Connect with other Pallenote users, share tips, and get help from our community
        </Text>

        {communityLinks.map((community, index) => (
          <TouchableOpacity key={index} style={styles.communityCard}>
            <View style={styles.iconContainer}>
              <Ionicons name={community.icon as any} size={30} color={theme.primary} />
            </View>

            <View style={styles.communityContent}>
              <Text style={styles.communityTitle}>{community.title}</Text>
              <Text style={styles.communityDescription}>{community.description}</Text>
              <Text style={styles.memberCount}>{community.members} members</Text>
            </View>

            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default CommunityScreen

 