"use client"

import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from "../onboarding/WelcomeScreen"
import OnboardingScreen from "../onboarding/OnboardingScreen"
import { useTheme } from "../contexts/ThemeContext"

export type OnboardingStackParamList = {
  Onboarding: undefined
  Welcome: undefined
}

const Stack = createNativeStackNavigator<OnboardingStackParamList>()

const OnboardingStack = () => {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  )
}

export default OnboardingStack
