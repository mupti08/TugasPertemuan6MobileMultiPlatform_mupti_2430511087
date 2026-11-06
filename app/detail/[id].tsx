import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useDiary } from '../../src/context/DiaryContext';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById, likedIds, toggleLike } = useDiary();
  
  const entry = getById(id);

  if (!entry) {
    return (
      <View style={styles.center}>
        <Text>Diary tidak ditemukan.</Text>
      </View>
    );
  }

  const liked = likedIds.has(entry.id);

  return (
    <>
      <Stack.Screen options={{ title: entry.title }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.mood}>{entry.mood}</Text>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.date}>{entry.date}</Text>
        <Text style={styles.body}>{entry.body}</Text>
        
        <Pressable
          onPress={() => toggleLike(entry.id)}
          style={styles.likeButton}
        >
          <Text style={styles.likeText}>
            {liked ? '❤️ Disukai' : '🤍 Suka'}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.xl,
    gap: SPACE.m,
    backgroundColor: COLORS.surface, 
    minHeight: '100%',
  },
  mood: {
    fontSize: 72,
    textAlign: 'center',
    marginVertical: SPACE.m,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: SPACE.l,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  body: {
    fontSize: 16,
    lineHeight: 26, 
    color: '#374151',
  },
  likeButton: {
    marginTop: SPACE.xl,
    padding: SPACE.m,
    borderWidth: 2,
    borderColor: '#FEE2E2', 
    backgroundColor: '#FEF2F2',
    borderRadius: 100, 
    alignItems: 'center',
  },
  likeText: {
    fontWeight: '700',
    color: COLORS.danger,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});