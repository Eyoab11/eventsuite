import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit(email, password);
  };

  return (
    <View style={styles.formContainer}>
      <Input
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
      />

      <Button title="Sign In" onPress={handleSubmit} variant="primary" />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
});
