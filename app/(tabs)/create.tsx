import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDiary } from "../../src/context/DiaryContext";
import { COLORS, RADIUS, SPACE } from "../../src/styles/tokens";

const MOODS = ["😀", "🎯", "😌", "🥳"];

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2026-11-02");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("");

  const canSave = title.trim().length > 0 && body.trim().length > 0;

  const save = () => {
    if (!canSave) return;

    addEntry({
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 80),
      body: body.trim(),
      mood,
    });

    setTitle("");
    setBody("");
    setMood("");

    router.replace("/");
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Tambah Diary</Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Judul"
          style={styles.input}
        />

        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          style={styles.input}
        />

        <TextInput
          value={body}
          onChangeText={setBody}
          placeholder="Ceritakan harimu..."
          multiline
          style={[styles.input, styles.bodyInput]}
        />

        <Text style={styles.label}>Mood</Text>
        <View style={styles.moodRow}>
          {MOODS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setMood(item)}
              style={[styles.moodButton, mood === item && styles.moodSelected]}
            >
              <Text style={styles.mood}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={save}
          disabled={!canSave}
          style={[styles.saveButton, !canSave && styles.disabled]}
        >
          <Text style={styles.saveText}>Simpan</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: SPACE.l,
    gap: SPACE.m,
    paddingBottom: 40, // Memberikan ruang ekstra di bawah butang simpan
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  input: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: RADIUS.card,
    padding: 16,
    backgroundColor: COLORS.surface,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bodyInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  label: {
    fontWeight: "700",
    color: COLORS.text,
    marginTop: SPACE.s,
  },
  moodRow: {
    flexDirection: "row",
    gap: SPACE.s,
  },
  moodButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    flex: 1,
    alignItems: "center",
  },
  moodSelected: {
    borderColor: COLORS.accent,
    borderWidth: 2,
    backgroundColor: "#EFF6FF",
  },
  mood: {
    fontSize: 28,
  },
  saveButton: {
    padding: 16,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.card,
    alignItems: "center",
    marginTop: SPACE.m,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
