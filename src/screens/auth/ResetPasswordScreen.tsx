// ../src/screens/auth/ResetPasswordScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import { resetPassword } from "../../api/authApi";

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = (route.params as { token?: string })?.token;

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Mismatch", "Passwords do not match");
      return;
    }
    try {
      await resetPassword(token || "", newPassword);
      Alert.alert("Success", "Password has been reset");
      navigation.navigate("Login" as never);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Reset failed");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>      
      <Text style={[styles.title, { color: theme.textPrimary }]}>Reset Password</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.surface, color: theme.textPrimary }]}
        placeholder="New password"
        placeholderTextColor={theme.textSecondary}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.surface, color: theme.textPrimary }]}
        placeholder="Confirm password"
        placeholderTextColor={theme.textSecondary}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ResetPasswordScreen;
