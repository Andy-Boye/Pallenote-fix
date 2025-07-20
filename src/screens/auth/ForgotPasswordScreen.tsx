// ../src/screens/auth/ForgotPasswordScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import { forgotPassword } from "../../api/authApi";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email);
      Alert.alert("Check your email", "Password reset instructions sent");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to send reset email");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>      
      <Text style={[styles.title, { color: theme.textPrimary }]}>Forgot Password</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.surface, color: theme.textPrimary }]}
        placeholder="Enter your email"
        placeholderTextColor={theme.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[styles.link, { color: theme.primary }]}>Back to Login</Text>
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
  link: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
