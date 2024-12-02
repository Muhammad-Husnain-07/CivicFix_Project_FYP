import React from 'react';
import {StyleSheet} from 'react-native';
import {ThemedView} from '@/components/ThemedView';
import {useThemeColor} from '@/hooks/useThemeColor'; // Assuming a hook for color

const ThemedDetailCard = ({children, style, ...props}) => {
  const backgroundColor = useThemeColor({}, 'cardBackground');
  const shadowColor = useThemeColor({}, 'cardShadow');

  return (
    <ThemedView
      style={[styles.card, {backgroundColor: backgroundColor, shadowColor: shadowColor}, style]}
      {...props}
    >
      {children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 20,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
});

export default ThemedDetailCard;
