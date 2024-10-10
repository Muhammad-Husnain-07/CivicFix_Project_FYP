/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C', // Primary text color
    background: '#F8F9FA', // Main background color
    cardBackground: '#FFFFFF', // Background for cards
    inputBackground: '#FFFFFF', // Background for input fields
    inputText: '#11181C', // Text inside input fields
    inputBorder: '#CED4DA', // Border color for input fields
    border: '#DEE2E6', // General border color
    icon: '#495057', // Icon color for light mode
    tabIconDefault: '#ADB5BD', // Inactive tab icons
    tabIconSelected: tintColorLight, // Active tab icon
    primary: '#0a7ea4', // Primary action color (buttons, links)
    secondary: '#6C757D', // Secondary elements
    button: '#0a7ea4', // Primary button background color
    buttonText: '#FFFFFF', // Button text color
    cardShadow: 'rgba(0, 0, 0, 0.1)', // Light shadow for card elements
    error: '#D32F2F', // Error text and input border color
    success: '#388E3C', // Success text or border color
    warning: '#FFA000', // Warning text or border color
    info: '#1976D2', // Info messages or icons
    disabled: '#E9ECEF', // Disabled field background
  },
  dark: {
    text: '#ECEDEE', // Primary text color in dark mode
    background: '#121212', // Main background color
    cardBackground: '#1E1E1E', // Background for cards
    inputBackground: '#1E1E1E', // Background for input fields
    inputText: '#ECEDEE', // Text inside input fields
    inputBorder: '#3A3A3A', // Border color for input fields
    border: '#3A3A3A', // General border color
    icon: '#ADB5BD', // Icon color for dark mode
    tabIconDefault: '#6C757D', // Inactive tab icons
    tabIconSelected: tintColorDark, // Active tab icon
    primary: '#0a7ea4', // Primary action color (buttons, links)
    secondary: '#6C757D', // Secondary elements
    button: '#0a7ea4', // Primary button background color
    buttonText: '#FFFFFF', // Button text color
    cardShadow: 'rgba(0, 0, 0, 0.5)', // Darker shadow for card elements
    error: '#D32F2F', // Error text and input border color
    success: '#388E3C', // Success text or border color
    warning: '#FFA000', // Warning text or border color
    info: '#1976D2', // Info messages or icons
    disabled: '#424242', // Disabled field background
  },
};
