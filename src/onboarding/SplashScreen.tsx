"use client"

import { useEffect } from "react"
import { View, Image, StyleSheet, Dimensions, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"

const SplashScreen = () => {
  const navigation = useNavigation<any>()
  const { user, loading } = useAuth()
  const { colors } = useTheme()

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        if (user) {
          navigation.replace("MainTabs")
        } else {
          navigation.replace("OnboardingStack")
        }
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [user, loading, navigation])

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Image
        // source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.65,
    height: width * 0.65,
  },
})

export default SplashScreen
