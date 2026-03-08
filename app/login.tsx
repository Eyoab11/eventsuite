import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet
} from 'react-native';
import LoginForm from '../components/auth/LoginForm';
import LoginHeader from '../components/auth/LoginHeader';
import Footer from '../components/common/Footer';

export default function LoginScreen() {
  const router = useRouter();

  const handleSignIn = (email: string, password: string) => {
    console.log('Sign In pressed');
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Backend authentication will go here later
    // For now, simulate successful login
    if (email && password) {
      // Navigate to dashboard with tabs
      router.replace('/(tabs)/dashboard');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <LoginHeader badge="RSVP Admin" title="Sign in to manage your events" />
        <LoginForm onSubmit={handleSignIn} />
        <Footer text="Event RSVP Management System" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
});
