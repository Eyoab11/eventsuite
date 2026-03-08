import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FooterProps {
  text: string;
}

export default function Footer({ text }: FooterProps) {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 48,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});
