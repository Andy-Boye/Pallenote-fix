// ../src/screens/notebooks/AddNotebookScreen.tsx

import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import { createNotebook } from "../../api/notebooksApi";

const AddNotebookScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Notebook title is required");
      return;
    }

    try {
      await createNotebook({ title });
      Alert.alert("Success", "Notebook created");
      navigation.goBack();
    } catch (error) {
      console.error("Create notebook failed", error);
      Alert.alert("Error", "Could not create notebook");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Notebook Title</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.border, color: theme.text }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter notebook title"
        placeholderTextColor={theme.textSecondary}
      />
      <Button title="Create" onPress={handleCreate} color={theme.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});

export default AddNotebookScreen;






