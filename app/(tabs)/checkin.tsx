import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CameraScanner from '../../components/checkin/CameraScanner';

export default function CheckInScreen() {
  const [selectedEvent, setSelectedEvent] = useState('Levy Eromo Media Launch - 3/14/2026');
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [checkInResult, setCheckInResult] = useState<{
    success: boolean;
    name?: string;
    message: string;
  } | null>(null);

  const events = [
    'Levy Eromo Media Launch - 3/14/2026',
    'Tech Conference 2026 - 4/20/26',
    'Annual Gala - 5/15/26',
  ];

  const handleStartScanning = () => {
    console.log('Start scanning QR code');
    setShowScanner(true);
  };

  const handleScanComplete = (data: string) => {
    console.log('Scanned data:', data);
    setShowScanner(false);
    
    // Simulate validation
    const isValid: boolean = !!(data && data.length > 5);
    
    setCheckInResult({
      success: isValid,
      name: isValid ? 'George Peters II' : undefined,
      message: isValid ? 'Successfully checked in!' : 'Invalid QR code',
    });
    setShowResult(true);
  };

  const handleManualCheckIn = () => {
    console.log('Manual check-in:', manualCode);
    
    if (!manualCode.trim()) {
      setCheckInResult({
        success: false,
        message: 'Please enter a QR code',
      });
      setShowResult(true);
      return;
    }

    // Simulate validation
    const isValid: boolean = manualCode.length > 5; // Simple validation
    
    setCheckInResult({
      success: isValid,
      name: isValid ? 'John Doe' : undefined,
      message: isValid ? 'Successfully checked in!' : 'Invalid QR code',
    });
    setShowResult(true);
    
    if (isValid) {
      setManualCode('');
    }
  };

  const closeResult = () => {
    setShowResult(false);
    setCheckInResult(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="qr-code" size={48} color="#6366F1" />
          <Text style={styles.title}>Event Check-In</Text>
          <Text style={styles.subtitle}>Scan QR codes to check in attendees</Text>
        </View>

        {/* Event Selection Card */}
        <View style={styles.card}>
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

          <Text style={styles.capacity}>Capacity: 35 / 500</Text>
        </View>

        {/* QR Scanner Card */}
        <View style={styles.scannerCard}>
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={64} color="#9CA3AF" />
          </View>
          <Text style={styles.scannerTitle}>Ready to Scan</Text>
          <Text style={styles.scannerSubtitle}>
            Click the button below to start scanning QR codes
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleStartScanning}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={24} color="#FFFFFF" />
            <Text style={styles.scanButtonText}>Start Scanning</Text>
          </TouchableOpacity>
        </View>

        {/* Manual Entry Card */}
        <View style={styles.manualCard}>
          <Text style={styles.manualTitle}>Manual Entry</Text>
          <Text style={styles.manualSubtitle}>
            Enter the QR code manually if scanning is not available
          </Text>
          <View style={styles.manualInputRow}>
            <TextInput
              style={styles.manualInput}
              placeholder="Enter QR code..."
              placeholderTextColor="#9CA3AF"
              value={manualCode}
              onChangeText={setManualCode}
            />
            <TouchableOpacity
              style={styles.checkInButton}
              onPress={handleManualCheckIn}
              activeOpacity={0.8}
            >
              <Text style={styles.checkInButtonText}>Check In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Camera Scanner */}
      <CameraScanner
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={handleScanComplete}
      />

      {/* Result Modal */}
      <Modal
        visible={showResult}
        transparent
        animationType="fade"
        onRequestClose={closeResult}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.resultCard}>
            <View
              style={[
                styles.resultIconContainer,
                checkInResult?.success ? styles.successBg : styles.errorBg,
              ]}
            >
              <Ionicons
                name={checkInResult?.success ? 'checkmark-circle' : 'close-circle'}
                size={64}
                color={checkInResult?.success ? '#10B981' : '#EF4444'}
              />
            </View>
            
            {checkInResult?.name && (
              <Text style={styles.resultName}>{checkInResult.name}</Text>
            )}
            
            <Text
              style={[
                styles.resultMessage,
                checkInResult?.success ? styles.successText : styles.errorText,
              ]}
            >
              {checkInResult?.message}
            </Text>

            <TouchableOpacity
              style={[
                styles.closeButton,
                checkInResult?.success ? styles.successButton : styles.errorButton,
              ]}
              onPress={closeResult}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
    zIndex: 10,
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
    top: 100,
    left: 20,
    right: 20,
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
  capacity: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
  },
  scannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  cameraIcon: {
    marginBottom: 20,
  },
  scannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  scannerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    gap: 10,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  manualCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  manualTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  manualSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  manualInputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  manualInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  checkInButton: {
    backgroundColor: '#93C5FD',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  checkInButtonText: {
    color: '#1E40AF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  resultIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successBg: {
    backgroundColor: '#D1FAE5',
  },
  errorBg: {
    backgroundColor: '#FEE2E2',
  },
  resultName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  resultMessage: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  successText: {
    color: '#10B981',
  },
  errorText: {
    color: '#EF4444',
  },
  closeButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: '#10B981',
  },
  errorButton: {
    backgroundColor: '#EF4444',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
