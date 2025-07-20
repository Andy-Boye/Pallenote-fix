import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useTheme } from "../../contexts/ThemeContext";

const RecordingScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState("");
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveformAnim = useRef(new Animated.Value(0)).current;
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((t) => t + 1);
        setTranscription((prev) => prev + (Math.random() > 0.9 ? "... " : "word "));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(waveformAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(waveformAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setTranscription("");
  };

  const handleStopRecording = () => {
    if (recordingTime > 0) {
      Alert.alert("Save Recording", "Would you like to save this recording?", [
        { text: "Discard", style: "destructive", onPress: discardRecording },
        { text: "Save", onPress: saveRecording },
      ]);
    } else {
      discardRecording();
    }
  };

  const discardRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    setTranscription("");
  };

  const saveRecording = () => {
    const newRecording = {
      id: Date.now().toString(),
      title: `Recording ${new Date().toLocaleDateString()}`,
      duration: formatTime(recordingTime),
      date: new Date().toISOString().split("T")[0],
      size: "1.2 MB",
    };
    setRecordings([newRecording, ...recordings]);
    discardRecording();
    Alert.alert("Saved", "Recording saved successfully!");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Voice Recording</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.recordingSection}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              style={[styles.recordingButton, { backgroundColor: colors.primary }]}
              onPress={isRecording ? handleStopRecording : handleStartRecording}
            >
              <Ionicons name={isRecording ? "stop" : "mic"} size={48} color={colors.background} />
            </TouchableOpacity>
          </Animated.View>
          <Text style={[styles.recordingTime, { color: colors.text }]}>{formatTime(recordingTime)}</Text>
          <Text style={{ color: colors.text }}>{isRecording ? "Recording..." : "Tap to start"}</Text>
          {isRecording && (
            <Animated.View style={[styles.waveform, { opacity: waveformAnim }]}> 
              <Text style={{ color: colors.primary }}>🎵 Live Waveform</Text>
            </Animated.View>
          )}
          {isRecording && (
            <Text style={[styles.transcription, { color: colors.text }]}>{transcription}</Text>
          )}
        </View>

        <View style={styles.recordingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Recordings</Text>
          {recordings.length === 0 ? (
            <Text style={{ color: colors.text }}>No recordings yet</Text>
          ) : (
            recordings.map((r) => (
              <View key={r.id} style={[styles.recordingItem, { backgroundColor: colors.card }]}>
                <View style={styles.recordingInfo}>
                  <Text style={{ color: colors.text, fontWeight: "600" }}>{r.title}</Text>
                  <Text style={{ color: colors.text, fontSize: 12 }}>{r.duration} • {r.date} • {r.size}</Text>
                </View>
                <TouchableOpacity onPress={() => setRecordings(recordings.filter((rec) => rec.id !== r.id))}>
                  <Ionicons name="trash-outline" size={20} color={colors.notification} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  recordingSection: { alignItems: "center", marginTop: 30, paddingHorizontal: 20 },
  recordingButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  recordingTime: { fontSize: 32, fontWeight: "bold" },
  waveform: { marginTop: 20 },
  transcription: { marginTop: 12, fontStyle: "italic", textAlign: "center" },
  recordingsSection: { marginTop: 32, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  recordingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  recordingInfo: { flex: 1, marginRight: 12 },
});

export default RecordingScreen;
