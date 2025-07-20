"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"

const PaymentPlanScreen = ({ navigation }: any) => {
  const { theme } = useTheme()

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["Up to 100 notes", "Basic text formatting", "1GB storage", "Mobile app access"],
      current: true,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      features: [
        "Unlimited notes",
        "Advanced formatting",
        "100GB storage",
        "Voice recording",
        "Cloud sync",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "per month",
      features: [
        "Everything in Pro",
        "AI-powered search",
        "Unlimited storage",
        "Team collaboration",
        "Advanced analytics",
        "Custom integrations",
      ],
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
    },
    planCard: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 2,
      borderColor: "transparent",
    },
    popularPlan: {
      borderColor: theme.primary,
    },
    currentPlan: {
      borderColor: theme.success,
    },
    planHeader: {
      alignItems: "center",
      marginBottom: 20,
    },
    planBadge: {
      backgroundColor: theme.primary,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      marginBottom: 8,
    },
    planBadgeText: {
      color: theme.background,
      fontSize: 12,
      fontWeight: "600",
    },
    currentBadge: {
      backgroundColor: theme.success,
    },
    planName: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 8,
    },
    planPrice: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.primary,
    },
    planPeriod: {
      fontSize: 16,
      color: theme.textSecondary,
    },
    featuresList: {
      marginBottom: 20,
    },
    feature: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    featureText: {
      fontSize: 16,
      color: theme.text,
      marginLeft: 12,
    },
    planButton: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
    },
    currentPlanButton: {
      backgroundColor: theme.success,
    },
    planButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.background,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Plans</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Choose the plan that works best for you</Text>

        {plans.map((plan, index) => (
          <View
            key={index}
            style={[styles.planCard, plan.popular && styles.popularPlan, plan.current && styles.currentPlan]}
          >
            <View style={styles.planHeader}>
              {plan.popular && (
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>MOST POPULAR</Text>
                </View>
              )}
              {plan.current && (
                <View style={[styles.planBadge, styles.currentBadge]}>
                  <Text style={styles.planBadgeText}>CURRENT PLAN</Text>
                </View>
              )}

              <Text style={styles.planName}>{plan.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planPeriod}> {plan.period}</Text>
              </View>
            </View>

            <View style={styles.featuresList}>
              {plan.features.map((feature, featureIndex) => (
                <View key={featureIndex} style={styles.feature}>
                  <Ionicons name="checkmark-circle" size={20} color={theme.success} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={[styles.planButton, plan.current && styles.currentPlanButton]}>
              <Text style={styles.planButtonText}>{plan.current ? "Current Plan" : "Choose Plan"}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default PaymentPlanScreen
