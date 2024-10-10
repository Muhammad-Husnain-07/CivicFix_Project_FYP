import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';

export default ThemedTextField = ({style, lightColor, darkColor, ...otherProps}) => {
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'inputBackground');
  const borderColor = useThemeColor({light: lightColor, dark: darkColor}, 'inputBorder');
  const textColor = useThemeColor({light: lightColor, dark: darkColor}, 'inputText');

  return (
    <TextInput
      style={[
        {backgroundColor, borderColor, color: textColor},
        InputFieldStyle.input, // Base input styles
        style, // Additional styles
      ]}
      placeholderTextColor={useThemeColor({light: '#9BA1A6', dark: '#6C757D'}, 'placeholder')} // Placeholder color
      {...otherProps}
    />
  );
};

const InputFieldStyle = StyleSheet.create({
  input: {
    width: '100%',
    minWidth: 200,
    maxWidth: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
  },
});
