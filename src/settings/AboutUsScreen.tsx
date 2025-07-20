"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

const AboutUsScreen = ({ navigation }: any) => {
  const { colors } = useTheme()

  const teamMembers = [
    {
      name: "Group 57",
      role: "Development Team",
      icon: "people-outline",
    },
    {
      name: "Lead Developer",
      role: "Technical Architecture",
      icon: "code-slash-outline",
    },
    {
      name: "UI/UX Designer",
      role: "User Experience",
      icon: "color-palette-outline",
    },
  ]

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>About Us</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Logo and Info */}
        <View style={styles.logoContainer}>
          <View style={[styles.logo, { backgroundColor: colors.primary }]}>
            <Text style={[styles.logoText, { color: colors.background }]}>P</Text>
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>PALLENOTE</Text>
          <Text style={[styles.version, { color: colors.textSecondary }]}>Version 1.0.0</Text>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Mission</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Pallenote is designed to help you capture, organize, and access your ideas effortlessly. We believe that
            great ideas shouldn't be lost, and our app provides the perfect platform to keep your thoughts organized and
            accessible across all your devices.
          </Text>
        </View>

        {/* Team Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Meet Our Team</Text>
          {teamMembers.map((member, index) => (
            <View key={index} style={[styles.teamMember, { backgroundColor: colors.surface }]}>
              <Ionicons name={member.icon as any} size={40} color={colors.primary} style={styles.memberIcon} />
              <View style={styles.memberInfo}>
                <Text style={[styles.memberName, { color: colors.text }]}>{member.name}</Text>
                <Text style={[styles.memberRole, { color: colors.textSecondary }]}>{member.role}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Us</Text>
          <View style={[styles.contactSection, { backgroundColor: colors.surface }]}>
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={24} color={colors.primary} />
              <Text style={[styles.contactText, { color: colors.text }]}>support@pallenote.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="globe-outline" size={24} color={colors.primary} />
              <Text style={[styles.contactText, { color: colors.text }]}>www.pallenote.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="logo-twitter" size={24} color={colors.primary} />
              <Text style={[styles.contactText, { color: colors.text }]}>@pallenote</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
  },
  version: {
    fontSize: 16,
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  teamMember: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  memberIcon: {
    marginRight: 16,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
  },
  contactSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 16,
  },
})

export default AboutUsScreen
