import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  counter: {
    position: "relative",
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
  },
  token: {
    zIndex: 1,
    overflow: "visible",
    alignItems: "center",
  },
});
