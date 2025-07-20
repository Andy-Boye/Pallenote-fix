"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

const FAQScreen = ({ navigation }: any) => {
  const { theme } = useTheme()
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const faqData = [
    {
      question: "How do I create a new note?",
      answer:
        'You can create a new note by tapping the "+" button on the home screen or using the floating action button.',
    },
    {
      question: "Can I sync my notes across devices?",
      answer: "Yes! With a Pro or Premium subscription, your notes automatically sync across all your devices.",
    },
    {
      question: "How do I record audio notes?",
      answer: "Tap the microphone icon in the floating action button or go to the recording screen from the main menu.",
    },
    {
      question: "Is my data secure?",
      answer: "We use end-to-end encryption to protect your notes and personal information.",
    },
    {
      question: "How do I organize my notes?",
      answer: "You can organize notes using notebooks, tags, and folders. Create notebooks from the main menu.",
    },
    {
      question: "Can I export my notes?",
      answer: "Yes, you can export your notes in various formats including PDF, TXT, and Markdown from the settings.",
    },
    {
      question: "How do I upgrade my plan?",
      answer: "Go to Settings > Payment Plans to view and upgrade to Pro or Premium plans.",
    },
    {
      question: "What happens if I forget my password?",
      answer: 'Use the "Forgot Password" link on the login screen to reset your password via email.',
    },
  ]

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
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
    faqItem: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      marginBottom: 12,
      overflow: "hidden",
    },
    questionContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
    },
    questionText: {
      flex: 1,
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
    },
    answerContainer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    answerText: {
      fontSize: 14,
      color: theme.textSecondary,
      lineHeight: 20,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title}>FAQ</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Frequently asked questions about Pallenote</Text>

        {faqData.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity style={styles.questionContainer} onPress={() => toggleExpanded(index)}>
              <Text style={styles.questionText}>{item.question}</Text>
              <Ionicons
                name={expandedItems.includes(index) ? "chevron-up" : "chevron-down"}
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>

            {expandedItems.includes(index) && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default FAQScreen
