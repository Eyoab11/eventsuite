import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface LoginHeaderProps {
  badge: string;
  title: string;
}

export default function LoginHeader({ badge, title }: LoginHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.badge}>{badge}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  badge: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 32,
  },
});
