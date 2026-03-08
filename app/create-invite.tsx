import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CreateInviteScreen() {
  const router = useRouter();
  const [inviteType, setInviteType] = useState<'single' | 'bulk'>('single');
  const [email, setEmail] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('Levy Eromo Media Launch - 3/14/2026');
  const [sendImmediately, setSendImmediately] = useState(true);
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [bulkEmails, setBulkEmails] = useState(['', '', '']);

  const events = [
    'Levy Eromo Media Launch - 3/14/2026',
    'Tech Conference 2026 - 4/20/26',
    'Annual Gala - 5/15/26',
  ];

  const handleAddAnother = () => {
    setBulkEmails([...bulkEmails, '']);
  };

  const handleBulkEmailChange = (index: number, value: string) => {
    const newEmails = [...bulkEmails];
    newEmails[index] = value;
    setBulkEmails(newEmails);
  };

  const handleCreateInvite = () => {
    if (inviteType === 'single') {
      console.log('Create single invite:', { email, selectedEvent, sendImmediately });
    } else {
      const validEmails = bulkEmails.filter((e) => e.trim() !== '');
      console.log('Create bulk invites:', { emails: validEmails, selectedEvent, sendImmediately });
    }
    // Navigate back after creation
    router.back();
  };

  const getBulkInviteCount = () => {
    return bulkEmails.filter((e) => e.trim() !== '').length;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
          <Text style={styles.backText}>Back to Invites</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create Invite</Text>
        <Text style={styles.subtitle}>Send invitations to your guests</Text>

        {/* Invite Type Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, inviteType === 'single' && styles.activeTab]}
            onPress={() => setInviteType('single')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, inviteType === 'single' && styles.activeTabText]}>
              Single Invite
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, inviteType === 'bulk' && styles.activeTab]}
            onPress={() => setInviteType('bulk')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, inviteType === 'bulk' && styles.activeTabText]}>
              Bulk Invites
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          {/* Single Invite Form */}
          {inviteType === 'single' && (
            <>
              {/* Email Address */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Email Address <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.inputWithIcon}>
                  <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="guest@example.com"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </>
          )}

          {/* Event Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Event <Text style={styles.required}>*</Text>
            </Text>
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

          {/* Send Immediately Checkbox */}
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setSendImmediately(!sendImmediately)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkboxBox, sendImmediately && styles.checkboxChecked]}>
              {sendImmediately && <Ionicons name="checkmark" size={18} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxLabel}>
              Send invitation email{inviteType === 'bulk' ? 's' : ''} immediately
            </Text>
          </TouchableOpacity>

          {/* Bulk Invites Section */}
          {inviteType === 'bulk' && (
            <View style={styles.bulkSection}>
              <View style={styles.bulkHeader}>
                <Text style={styles.label}>
                  Invites <Text style={styles.required}>*</Text>
                </Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddAnother}>
                  <Ionicons name="add-circle" size={20} color="#6366F1" />
                  <Text style={styles.addButtonText}>Add Another</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.bulkSubtitle}>
                Add multiple email addresses to send invites in bulk. Empty rows will be ignored.
              </Text>
              
              {bulkEmails.map((bulkEmail, index) => (
                <View key={index} style={styles.bulkInputRow}>
                  <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.bulkInput}
                    placeholder={`guest${index + 1}@example.com`}
                    placeholderTextColor="#9CA3AF"
                    value={bulkEmail}
                    onChangeText={(value) => handleBulkEmailChange(index, value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              ))}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateInvite}
              activeOpacity={0.8}
            >
              <Ionicons name="paper-plane" size={20} color="#FFFFFF" />
              <Text style={styles.createButtonText}>
                {inviteType === 'single'
                  ? 'Create Invite'
                  : `Create ${getBulkInviteCount()} Invites`}
              </Text>
            </TouchableOpacity>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  backText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#6366F1',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
    zIndex: 1,
  },
  inputGroup: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
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
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#374151',
  },
  bulkSection: {
    marginBottom: 20,
  },
  bulkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addButtonText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  bulkSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 18,
  },
  bulkInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  bulkInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  createButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
