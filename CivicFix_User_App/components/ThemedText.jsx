import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const primary = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
  return (
    <Text
      style={[
        { color }, // Dynamic text color based on theme
        styles[type] ? styles[type] : undefined, // Apply the style based on the type
        rest.primaryColor ? { color: primary } : undefined,
        style, // Additional styles from props
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    color: '#0a7ea4', // Link color using the primary color in light mode
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  heading1: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  heading3: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  heading4: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  heading5: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  heading6: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
});
