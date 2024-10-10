import {Pressable, StyleSheet, Text} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';

export function ThemedButton({style, lightColor, darkColor, type = 'default', ...otherProps}) {
  // Fetch the colors from the theme (light and dark)
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'primary', // Use primary color from the theme by default
  );
  const textColor = useThemeColor({light: lightColor, dark: darkColor}, 'text');
  const primaryColor = useThemeColor({light: lightColor, dark: darkColor}, 'primary');
  return (
    <Pressable
      style={[
        ButtonStyle.default,
        type === 'outlined'
          ? {backgroundColor: 'transparent', borderColor: primaryColor, borderWidth: 1}
          : {backgroundColor}, // Apply the background color dynamically
        style, // Additional styles passed in props
      ]}
      {...otherProps}
    >
      <Text
        style={[
          ButtonStyle.defaultText,
          type === 'outlined' ? {color: primaryColor} : {color: textColor,backgroundColor: 'transparent'}, // Dynamically apply text color
        ]}
      >
        {otherProps.title} {/* Display the title passed as a prop */}
      </Text>
    </Pressable>
  );
}

const ButtonStyle = StyleSheet.create({
  default: {
    alignItems: 'center', // Center the content inside the button
    justifyContent: 'center', // Center vertically
    paddingVertical: 12, // Padding to make the button vertically spacious
    paddingHorizontal: 24, // Horizontal padding for width
    borderRadius: 4, // Slightly rounded corners
    width: '100%', // Full width for responsive design
    minWidth: 100, // Minimum width
    maxWidth: 300, // Maximum width to avoid too wide buttons
    borderRadius: 10,
    marginBottom: 10,
  },
  defaultText: {
    fontSize: 16, // Slightly larger text for readability
    fontWeight: 'condensedBold', // Condensed font for modern look
    letterSpacing: 0.5, // Spacing between letters for modern look
  },
});
