import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TokenCard from '../../components/tokens/TokenCard';
import TokenMetricCard from '../../components/tokens/TokenMetricCard';

// Mock token data
const mockTokens = [
  {
    id: '1',
    status: 'Available' as const,
    url: 'https://event.levyeromimedia.com/?token=817a7ca3-17a2-4521-bc6e-dd01ef216e74',
    created: '3/5/2026 at 11:01:50 PM',
    expires: '4/4/2026 at 11:01:50 PM',
  },
  {
    id: '2',
    status: 'Available' as const,
    url: 'https://event.levyeromimedia.com/?token=92b4f8d1-3c5e-4a32-9f7b-1e8d4c6a9b2f',
    created: '3/5/2026 at 11:02:15 PM',
    expires: '4/4/2026 at 11:02:15 PM',
  },
  {
    id: '3',
    status: 'Used' as const,
    url: 'https://event.levyeromimedia.com/?token=4f3a9c7e-2d1b-4e8f-a6c5-9b3d7e1f4a8c',
    created: '3/4/2026 at 10:30:00 PM',
    expires: '4/3/2026 at 10:30:00 PM',
  },
  {
    id: '4',
    status: 'Available' as const,
    url: 'https://event.levyeromimedia.com/?token=7e2c8f4a-9b1d-4c3e-8a6f-5d9b2e7c1a4f',
    created: '3/5/2026 at 11:03:45 PM',
    expires: '4/4/2026 at 11:03:45 PM',
  },
];

export default function TokensScreen() {
  const [selectedEvent, setSelectedEvent] = useState('Levy Eromo Media Launch - 3/14/26');
  const [numberOfTokens, setNumberOfTokens] = useState('10');
  const [showEventDropdown, setShowEventDropdown] = useState(false);

  const events = [
    'Levy Eromo Media Launch - 3/14/26',
    'Tech Conference 2026 - 4/20/26',
    'Annual Gala - 5/15/26',
  ];

  const handleGenerateTokens = () => {
    console.log('Generate tokens:', { selectedEvent, numberOfTokens });
    // Token generation logic will go here
  };

  const handleCopyToken = (url: string) => {
    console.log('Copy token URL:', url);
    // Copy to clipboard logic will go here
  };

  const handleRefresh = () => {
    console.log('Refresh token history');
    // Refresh logic will go here
  };

  const totalTokens = mockTokens.length;
  const usedTokens = mockTokens.filter((t) => t.status === 'Used').length;
  const availableTokens = mockTokens.filter((t) => t.status === 'Available').length;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="key" size={48} color="#6366F1" />
          <Text style={styles.title}>Generate Tokens</Text>
          <Text style={styles.subtitle}>
            Generate invitation tokens for manual distribution without sending emails
          </Text>
        </View>

        {/* Token Generation Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Token Generation</Text>

          {/* Select Event */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Event</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowEventDropdown(!showEventDropdown)}
              activeOpacity={0.7}
            >
              <Text style={styles.dropdownText}>{selectedEvent}</Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>

            {showEventDropdown && (
              <>
                <View style={styles.backdrop} />
                <View style={styles.dropdownMenu}>
                  {events.map((event, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dropdownItem,
                        index === events.length - 1 && styles.lastDropdownItem,
                      ]}
                      onPress={() => {
                        setSelectedEvent(event);
                        setShowEventDropdown(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          selectedEvent === event && styles.selectedItemText,
                        ]}
                      >
                        {event}
                      </Text>
                      {selectedEvent === event && (
                        <Ionicons name="checkmark" size={20} color="#6366F1" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>

          {/* Number of Tokens */}
          <View style={styles.inputGroupLower}>
            <Text style={styles.label}>Number of Tokens (1-100)</Text>
            <TextInput
              style={styles.input}
              value={numberOfTokens}
              onChangeText={setNumberOfTokens}
              keyboardType="number-pad"
              maxLength={3}
              placeholder="Enter number"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={styles.generateButton}
            onPress={handleGenerateTokens}
            activeOpacity={0.8}
          >
            <Ionicons name="key" size={24} color="#FFFFFF" />
            <Text style={styles.generateButtonText}>Generate Tokens</Text>
          </TouchableOpacity>
        </View>

        {/* Token History Section */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <View>
              <Text style={styles.historyTitle}>Token History</Text>
              <Text style={styles.historySubtitle}>All generated tokens for this event</Text>
            </View>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
              <Ionicons name="refresh" size={20} color="#6B7280" />
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          </View>

          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            <TokenMetricCard
              title="Total Tokens"
              value={totalTokens}
              icon="key"
              color="#6366F1"
              bgColor="#EEF2FF"
            />
            <View style={styles.metricGap} />
            <TokenMetricCard
              title="Used"
              value={usedTokens}
              icon="person"
              color="#10B981"
              bgColor="#D1FAE5"
            />
            <View style={styles.metricGap} />
            <TokenMetricCard
              title="Available"
              value={availableTokens}
              icon="time"
              color="#F59E0B"
              bgColor="#FEF3C7"
            />
          </View>

          {/* Token List */}
          <View style={styles.tokenList}>
            {mockTokens.map((token) => (
              <TokenCard
                key={token.id}
                status={token.status}
                url={token.url}
                created={token.created}
                expires={token.expires}
                onCopy={() => handleCopyToken(token.url)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
    position: 'relative',
    zIndex: 10,
  },
  inputGroupLower: {
    marginBottom: 24,
    position: 'relative',
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontSize: 16,
    color: '#111827',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 76,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedItemText: {
    color: '#6366F1',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 8,
    gap: 12,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  historySection: {
    marginTop: 32,
    position: 'relative',
    zIndex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  historySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  refreshText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  metricsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  metricGap: {
    width: 12,
  },
  tokenList: {
    marginTop: 8,
  },
});
