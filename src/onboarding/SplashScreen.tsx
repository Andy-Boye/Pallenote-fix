"use client"

import React, { useEffect, useRef } from "react"
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"

const SplashScreen = () => {
  const navigation = useNavigation<any>()
  const { user, loading } = useAuth()
  const { colors } = useTheme()

  const fadeAnim = useRef(new Animated.Value(0)).current
  const spinAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current

  const sparkles = useRef(
    Array.from({ length: 8 }).map((_, i) => {
      const angle = (360 / 8) * i
      const radius = width * 0.2
      const x = radius * Math.cos((angle * Math.PI) / 180)
      const y = radius * Math.sin((angle * Math.PI) / 180)
      return {
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(0),
        translateX: new Animated.Value(x),
        baseY: y,
      }
    })
  ).current

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()

    // One-time spin
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start()

    // Logo pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start()

    // Sparkle animations
    sparkles.forEach((sparkle, index) => {
      const delay = index * 300
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(sparkle.opacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(sparkle.translateY, {
              toValue: -10,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(sparkle.opacity, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(sparkle.translateY, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start()
    })

    if (!loading) {
      const timeout = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          navigation.replace(user ? "MainTabs" : "OnboardingStack")
        })
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [fadeAnim, sparkles, user, loading, navigation])

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <Animated.View style={[styles.logoWrapper, { opacity: fadeAnim }]}>
        {/* Sparkles */}
        {sparkles.map((sparkle, i) => (
          <Animated.View
            key={i}
            style={[
              styles.sparkle,
              {
                transform: [
                  { translateX: sparkle.translateX },
                  { translateY: Animated.add(new Animated.Value(sparkle.baseY), sparkle.translateY) },
                ],
                opacity: sparkle.opacity,
              },
            ]}
          />
        ))}

        {/* Rotating "P" Circle */}
        <Animated.View style={[styles.logoCircle, { transform: [{ rotate: spin }] }]}>
          <Text style={styles.logoText}>P</Text>
        </Animated.View>

        {/* Brand Text with Pulse */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Text style={styles.brandText}>
            Pall
            <Text style={styles.brandTextE}>e</Text>
            note
          </Text>
        </Animated.View>
      </Animated.View>
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
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoCircle: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    marginBottom: 10,
  },
  logoText: {
    fontSize: width * 0.15,
    fontWeight: "bold",
    color: "#6A0DAD",
  },
  brandText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  brandTextE: {
    fontSize: 42,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#6A0DAD",
    paddingHorizontal: 4,
  },
  sparkle: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff80",
  },
})

export default SplashScreen
