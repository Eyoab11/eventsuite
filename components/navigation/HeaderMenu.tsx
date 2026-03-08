import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HeaderMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const handleProfile = () => {
    setMenuVisible(false);
    console.log('Profile clicked');
    // Navigation to profile will go here
  };

  const handleSheets = () => {
    setMenuVisible(false);
    console.log('Sheets clicked');
    // Navigation to sheets will go here
  };

  const handleLogout = () => {
    setMenuVisible(false);
    console.log('Logout clicked');
    // Clear session/token here
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Ionicons name="ellipsis-vertical" size={24} color="#374151" />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleProfile}
              activeOpacity={0.7}
            >
              <Ionicons name="person-outline" size={20} color="#374151" />
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSheets}
              activeOpacity={0.7}
            >
              <Ionicons name="document-text-outline" size={20} color="#374151" />
              <Text style={styles.menuText}>Sheets</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  menuButton: {
    padding: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 60,
    marginRight: 16,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  logoutText: {
    color: '#EF4444',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
});
