import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

// Screens
import HomeScreen from "../tabs/HomeScreen";
import NotesScreen from "../tabs/NotesScreen";
import TasksScreen from "../tabs/TasksScreen";
import CalendarScreen from "../tabs/CalendarScreen";
import NotebooksScreen from "../tabs/NotebooksScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Notes") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Tasks") {
            iconName = focused ? "checkbox" : "checkbox-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Notebooks") {
            iconName = focused ? "library" : "library-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Notebooks" component={NotebooksScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
