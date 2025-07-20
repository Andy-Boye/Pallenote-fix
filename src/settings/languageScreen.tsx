"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

const LanguageScreen = ({ navigation }: any) => {
  const { theme } = useTheme()
  const [selectedLanguage, setSelectedLanguage] = useState("English")

  const languages = [
    { name: "English", code: "en", flag: "🇺🇸" },
    { name: "Spanish", code: "es", flag: "🇪🇸" },
    { name: "French", code: "fr", flag: "🇫🇷" },
    { name: "German", code: "de", flag: "🇩🇪" },
    { name: "Italian", code: "it", flag: "🇮🇹" },
    { name: "Portuguese", code: "pt", flag: "🇵🇹" },
    { name: "Russian", code: "ru", flag: "🇷🇺" },
    { name: "Chinese", code: "zh", flag: "🇨🇳" },
    { name: "Japanese", code: "ja", flag: "🇯🇵" },
    { name: "Korean", code: "ko", flag: "🇰🇷" },
    { name: "Hindi", code: "hi", flag: "🇮🇳" },
    { name: "Arabic", code: "ar", flag: "🇸🇦" },
    { name: "Turkish", code: "tr", flag: "🇹🇷" },
    {name : "Twi", code: "tw", flag: "🇬🇭" },
    { name: "Dutch", code: "nl", flag: "🇳🇱" },
    { name: "Swedish", code: "sv", flag: "🇸🇪" },
    { name: "Danish", code: "da", flag: "🇩🇰" },
    { name: "Norwegian", code: "no", flag: "🇳🇴" },
  
  ]

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)
    // TODO: Implement language change logic
  }

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
    },
    languageItem: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    selectedLanguage: {
      borderColor: theme.primary,
    },
    flag: {
      fontSize: 24,
      marginRight: 16,
    },
    languageInfo: {
      flex: 1,
    },
    languageName: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
    },
    languageCode: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 2,
    },
    checkIcon: {
      marginLeft: 16,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Language</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Choose your preferred language</Text>

        {languages.map((language, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.languageItem, selectedLanguage === language.name && styles.selectedLanguage]}
            onPress={() => handleLanguageSelect(language.name)}
          >
            <Text style={styles.flag}>{language.flag}</Text>
            <View style={styles.languageInfo}>
              <Text style={styles.languageName}>{language.name}</Text>
              <Text style={styles.languageCode}>{language.code}</Text>
            </View>
            {selectedLanguage === language.name && (
              <Ionicons name="checkmark-circle" size={24} color={theme.primary} style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default LanguageScreen
