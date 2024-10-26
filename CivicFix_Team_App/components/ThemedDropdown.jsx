import React from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useThemeColor} from '@/hooks/useThemeColor'; // Assuming you have this hook
export const ThemedDropdown = ({
  data,
  placeholder = 'Select an item',
  lightColor,
  darkColor,
  value,
  setValue,
  ...otherProps
}) => {
  // Fetch theme colors dynamically
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'cardBackground');
  const textColor = useThemeColor({light: lightColor, dark: darkColor}, 'text');
  const borderColor = useThemeColor({light: lightColor, dark: darkColor}, 'border');
  return (
    <Dropdown
      style={[
        styles.dropdown,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
      ]}
      placeholderStyle={[styles.placeholderStyle, {color: textColor}]}
      selectedTextStyle={[styles.selectedTextStyle, {color: textColor}]}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
