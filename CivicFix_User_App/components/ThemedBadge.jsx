import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemedView} from './ThemedView';
import {ThemedText} from './ThemedText';
import {useThemeColor} from '@/hooks/useThemeColor';

const ThemedBadge = ({children, lightColor, darkColor, status = 'warning'}) => {
  const badgeColor = useThemeColor({light: lightColor, dark: darkColor}, status);
  const badgeText = useThemeColor({light: lightColor, dark: darkColor}, 'text');

  return (
    <ThemedView style={[styles.badge, {backgroundColor: badgeColor}]}>
      <ThemedText style={[styles.text, {color: badgeText}]}>{children}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ThemedBadge;
