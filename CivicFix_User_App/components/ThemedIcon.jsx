import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useThemeColor} from '@/hooks/useThemeColor'; // Make sure the path is correct

const ThemedIcon = ({name, colorType = 'default', size = 28, style = {}, ...rest}) => {
  // Fetch color based on the theme and specified color type
  const iconColor = useThemeColor(
    {
      light:
        colorType === 'primary' ? '#1D24CA' : colorType === 'secondary' ? '#98ABEE' : '#201658', // Light theme colors
      dark: colorType === 'primary' ? '#F9E8C9' : colorType === 'secondary' ? '#1D24CA' : '#FFFFFF', // Dark theme colors
    },
    'primary', // Default fallback color
  );

  return (
    <Ionicons
      name={name}
      size={size}
      color={iconColor} // Set icon color dynamically
      style={[style]} // Apply custom styles
      {...rest}
    />
  );
};

export default ThemedIcon;
