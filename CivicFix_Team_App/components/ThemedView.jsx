import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';

export function ThemedView({style, lightColor, darkColor, enableScroll, children, ...otherProps}) {
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

  const content = (
    <View style={[{backgroundColor}, style]} {...otherProps}>
      {children}
    </View>
  );

  return enableScroll ? (
    <KeyboardAwareScrollView
      style={[{backgroundColor}, style]}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      enableOnAndroid={true} // Ensures scrolling works on Android
      extraScrollHeight={20} // Adjust this value to prevent blank space
      keyboardShouldPersistTaps="handled" // Handles taps outside the keyboard
      scrollEnabled={true}
    >
      {content}
    </KeyboardAwareScrollView>
  ) : (
    content
  );
}
