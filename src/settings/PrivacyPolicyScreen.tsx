"use client";

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

const PrivacyPolicyScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Privacy Policy</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>1. Introduction</Text>
        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
          Welcome to Pallenote. We respect your privacy and are committed to protecting your personal data. This Privacy
          Policy explains how we collect, use, and safeguard your information.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>2. Information We Collect</Text>
        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
          We may collect personal information you provide directly to us, such as your name, email address, and any
          notes or recordings you create in the app.
        </Text>
        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
          We also automatically collect usage data, device information, and log data to improve our services.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>3. How We Use Your Information</Text>
        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
          - To provide and maintain our services
          {"\n"}- To improve user experience and develop new features
          {"\n"}- To communicate with you about updates or support
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>4. Data Sharing and Disclosure</Text>
        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
          We do not sell your personal information. We may share data with service providers who help us operate the app,
          under strict confidentiality agreements.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>5. Data Security</Text>
        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
          We implement technical and organizational measures to protect your information. However, no internet
          transmission is 100% secure.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>6. Your Rights</Text>
        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
          You may access, update, or delete your personal data by contacting us. You can also disable data collection
          through your device settings.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>7. Children's Privacy</Text>
        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
          Our services are not intended for children under 13. We do not knowingly collect personal data from children.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>8. Changes to This Policy</Text>
        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
          We may update this policy from time to time. We will notify you of any significant changes by posting a notice
          in the app.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>9. Contact Us</Text>
        <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
          If you have questions or concerns about this Privacy Policy, please contact us at support@pallenoteapp.com.
        </Text>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
});

export default PrivacyPolicyScreen;
