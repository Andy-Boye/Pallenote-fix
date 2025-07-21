"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  ViewToken,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../contexts/ThemeContext"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { OnboardingStackParamList } from "../navigation/OnboardingStack"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const { width } = Dimensions.get("window")

const onboardingData = [
  {
    id: "1",
    title: "Capture Your Ideas",
    description: "Write notes, record audio, and save your thoughts instantly",
    icon: "bulb-outline",
  },
  {
    id: "2",
    title: "Stay Organized",
    description: "Organize notes in notebooks and manage tasks efficiently",
    icon: "folder-outline",
  },
  {
    id: "3",
    title: "Access Anywhere",
    description: "Sync across all your devices and access your notes anytime",
    icon: "cloud-outline",
  },
]

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList>

const OnboardingScreen = () => {
  const { colors } = useTheme()
  const navigation = useNavigation<NavigationProp>()
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 30 }).current

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0)
      }
    }
  ).current

  const startAutoScroll = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (currentIndex < onboardingData.length - 1) {
        scrollToIndex(currentIndex + 1)
      } else {
        navigation.replace("Welcome")
      }
    }, 4000)
  }, [currentIndex, navigation])

  useEffect(() => {
    startAutoScroll()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentIndex, startAutoScroll])

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true })
  }

  const handleNext = () => {
    console.log("Next pressed")
    clearTimeout(timerRef.current!)
    if (currentIndex < onboardingData.length - 1) {
      scrollToIndex(currentIndex + 1)
    } else {
      navigation.replace("Welcome")
    }
  }

  const handleBack = () => {
    console.log("Back pressed")
    clearTimeout(timerRef.current!)
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1)
    }
  }

  const handleSkip = () => {
    console.log("Skip pressed")
    clearTimeout(timerRef.current!)
    navigation.replace("Welcome")
  }

  const renderItem = ({ item }: { item: typeof onboardingData[0] }) => (
    <View style={[styles.slide, { width }]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.accent }]}>
        <Ionicons name={item.icon as any} size={80} color={colors.primary} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>{item.description}</Text>
    </View>
  )

  const renderPagination = () => (
    <View style={styles.pagination}>
      {onboardingData.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 20, 8],
          extrapolate: "clamp",
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        })

        return (
          <Animated.View
            key={index}
            style={[styles.dot, { width: dotWidth, opacity, backgroundColor: colors.primary }]}
          />
        )
      })}
    </View>
  )

  return (
    <GestureHandlerRootView style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Top Buttons */}
      <View style={styles.topButtons}>
        {currentIndex > 0 && (
          <TouchableOpacity style={styles.topLeft} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.topRight} onPress={handleSkip}>
          <Text style={[styles.skipText, { color: colors.textSecondary }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Pagination */}
      {renderPagination()}

      {/* Bottom Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          {
            backgroundColor: colors.primary,
            position: "absolute",
            bottom: 40,
            left: 40,
            right: 40,
            zIndex: 10,
          },
        ]}
        onPress={handleNext}
      >
        <Text style={styles.nextText}>
          {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
        </Text>
        <Ionicons name="arrow-forward" size={20} color="white" style={styles.nextIcon} />
      </TouchableOpacity>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 60,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  topButtons: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 20 : 50,
    zIndex: 10,
    pointerEvents: "box-none",
  },
  topLeft: {
    padding: 10,
  },
  topRight: {
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "500",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  nextText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  nextIcon: {
    marginLeft: 8,
  },
})

export default OnboardingScreen
