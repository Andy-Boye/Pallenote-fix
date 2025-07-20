"use client"

import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"

// Screens
import SplashScreen from "../onboarding/SplashScreen"
import OnboardingStack from "./OnboardingStack"
import AuthStack from "./AuthStack"
import BottomTabNavigator from "./BottomTabNavigator"
import SettingsStack from "./SettingsStack"
import RecordingScreen from "../screens/notes/RecordingScreen"

export type RootStackParamList = {
  Splash: undefined
  OnboardingStack: undefined
  AuthStack: undefined
  MainTabs: undefined
  SettingsStack: undefined
  RecordingScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const MainNavigator = () => {
  const { user, loading } = useAuth()
  const { colors } = useTheme()

  if (loading) {
    return <SplashScreen />
  }

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      {!user ? (
        <>
          <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen
            name="SettingsStack"
            component={SettingsStack}
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="RecordingScreen"
            component={RecordingScreen}
            options={{ presentation: "fullScreenModal" }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default MainNavigator
