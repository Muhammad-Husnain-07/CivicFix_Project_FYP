import { Pressable, StyleSheet, Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...otherProps
}) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <Pressable
      style={[
        { backgroundColor, color },
        type === "default" ? ButtonStyle.default : undefined,
        style,
      ]}
      {...otherProps}
    >
      <Text
        style={[
          { color },
          type === "default" ? ButtonStyle.defaultText : undefined,
        ]}
      >
        {otherProps.title}
      </Text>
    </Pressable>
  );
}

const ButtonStyle = StyleSheet.create({
  default: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
    width: "100%",
    minWidth: 200,
    maxWidth: 300,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
