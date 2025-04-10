import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';

export default ThemedTextField = ({style, lightColor, darkColor, ...otherProps}) => {
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'inputBackground');
  const borderColor = useThemeColor({light: lightColor, dark: darkColor}, 'inputBorder');
  const textColor = useThemeColor({light: lightColor, dark: darkColor}, 'inputText');

  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        style={[
          {backgroundColor, borderColor, color: textColor, flex: 1}, // Base input styles
          otherProps.multiline ? InputFieldStyle.inputMultiline : InputFieldStyle.input,
          style, // Additional styles
        ]}
        placeholderTextColor={useThemeColor({light: '#9BA1A6', dark: '#6C757D'}, 'placeholder')} // Placeholder color
        {...otherProps}
      />
    </View>
  );
};

const InputFieldStyle = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
    flex: 1,
  },
  inputMultiline: {
    height: 150,
    textAlignVertical: 'top',
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 4,
    margin: 12,
    flex: 1,
  },
});

