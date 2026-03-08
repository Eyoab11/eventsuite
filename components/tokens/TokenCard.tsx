import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TokenCardProps {
  status: 'Available' | 'Used';
  url: string;
  created: string;
  expires: string;
  onCopy: () => void;
}

export default function TokenCard({ status, url, created, expires, onCopy }: TokenCardProps) {
  const isAvailable = status === 'Available';

  return (
    <View style={[styles.card, isAvailable ? styles.availableCard : styles.usedCard]}>
      <View style={styles.header}>
        <View style={styles.statusContainer}>
          <Ionicons
            name={isAvailable ? 'time-outline' : 'checkmark-circle'}
            size={20}
            color={isAvailable ? '#6366F1' : '#10B981'}
          />
          <Text style={[styles.status, isAvailable ? styles.availableText : styles.usedText]}>
            {status}
          </Text>
        </View>
        <Text style={styles.dateText}>Created: {created}</Text>
      </View>

      <Text style={styles.url} numberOfLines={2}>
        {url}
      </Text>

      <Text style={styles.expiresText}>Expires: {expires}</Text>

      <TouchableOpacity style={styles.copyButton} onPress={onCopy} activeOpacity={0.8}>
        <Ionicons name="copy" size={20} color="#FFFFFF" />
        <Text style={styles.copyButtonText}>Copy URL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
  },
  availableCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  usedCard: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
  },
  availableText: {
    color: '#6366F1',
  },
  usedText: {
    color: '#10B981',
  },
  dateText: {
    fontSize: 13,
    color: '#6B7280',
  },
  url: {
    fontSize: 13,
    color: '#374151',
    fontFamily: 'monospace',
    marginBottom: 8,
    lineHeight: 18,
  },
  expiresText: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
